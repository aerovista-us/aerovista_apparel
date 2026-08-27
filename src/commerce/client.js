const STORE_ID = 'aerovista-apparel'
const MODE = String(import.meta.env.VITE_COMMERCE_MODE || 'legacy').trim().toLowerCase()

const cleanBase = (value) => String(value || '').trim().replace(/\/+$/, '')
const browserOrigin = () => (typeof window === 'undefined' ? '' : window.location.origin)
const browserHost = () => (typeof window === 'undefined' ? '' : window.location.hostname)
const isCanonicalStoreHost = () => ['gear.aerovista.us', 'apparel.aerovista.us'].includes(browserHost())
const isVercelPreviewHost = () => browserHost().endsWith('.vercel.app') && !isCanonicalStoreHost()

const configuredApiBase = cleanBase(import.meta.env.VITE_COMMERCE_API_BASE)
const API_BASE = configuredApiBase || (isCanonicalStoreHost() ? browserOrigin() : 'https://gear.aerovista.us')
const V1_BASE = cleanBase(import.meta.env.VITE_COMMERCE_V1_BASE) || API_BASE

const unique = (values) => [...new Set(values.filter(Boolean))]
const legacyCatalogCandidates = () => unique([
  String(import.meta.env.VITE_COMMERCE_CATALOG_URL || '').trim(),
  isCanonicalStoreHost() ? `${browserOrigin()}/square_products_latest.json` : '',
  'https://gear.aerovista.us/square_products_latest.json',
  'https://raw.githubusercontent.com/aerovista-us/store/main/store/square_products_latest.json',
])

function readableApiError(payload, response) {
  if (typeof payload?.message === 'string' && payload.message.trim()) return payload.message
  if (typeof payload?.error === 'string' && payload.error.trim()) return payload.error
  if (typeof payload?.error?.message === 'string' && payload.error.message.trim()) return payload.error.message
  if (typeof payload?.detail === 'string' && payload.detail.trim()) return payload.detail
  return `${response.status} ${response.statusText}`.trim()
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      Accept: 'application/json',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(options.headers || {}),
    },
  })
  let payload = null
  try { payload = await response.json() } catch { payload = null }
  if (!response.ok) {
    const error = new Error(readableApiError(payload, response))
    error.status = response.status
    error.payload = payload
    throw error
  }
  return payload
}

async function loadLegacyCatalog() {
  let lastError = null
  for (const url of legacyCatalogCandidates()) {
    try {
      const catalog = await fetchJson(url, { cache: 'no-store' })
      if (Array.isArray(catalog?.products)) return { mode: 'legacy', sourceUrl: url, ...catalog }
    } catch (error) {
      lastError = error
    }
  }
  throw lastError || new Error('The AeroVista catalog is unavailable.')
}

async function loadV1Catalog() {
  const url = `${V1_BASE}/v1/storefront/${STORE_ID}/catalog`
  const catalog = await fetchJson(url, { cache: 'no-store' })
  return { mode: 'v1', sourceUrl: url, ...catalog }
}

export async function loadCommerceCatalog() {
  return MODE === 'v1' ? loadV1Catalog() : loadLegacyCatalog()
}

export async function loadCommerceBootstrap() {
  if (MODE === 'v1') return { mode: 'v1', currency: 'USD' }
  // Temporary Vercel hosts are intentionally not trusted by the production API.
  // Skip the protected bootstrap there instead of generating a known CORS error.
  if (isVercelPreviewHost()) return null
  return fetchJson(`${API_BASE}/api/square/bootstrap`, { cache: 'no-store' })
}

function randomKey(prefix) {
  const value = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`
  return `${prefix}_${value}`
}

function cartKeyForVariant(variant) {
  if (variant.cartKey) return variant.cartKey
  const color = String(variant.color || 'Default').trim() || 'Default'
  const size = String(variant.size || 'One Size').trim() || 'One Size'
  return `${color}__${size}`
}

async function beginLegacyCheckout(bag) {
  if (isVercelPreviewHost()) {
    throw new Error('Checkout is intentionally disabled on the Vercel preview. Live checkout is available through apparel.aerovista.us.')
  }

  const cart = bag.map((item) => ({
    productId: item.product.commerce?.productId || item.product.id,
    sku: cartKeyForVariant(item.variant),
    variationId: item.variant.providerVariationId || item.variant.variationId || '',
    qty: item.quantity || 1,
  }))
  const invalid = cart.find(line => !line.productId || !line.variationId || !line.sku)
  if (invalid) throw new Error('One or more bag items are missing a verified catalog variation.')

  const result = await fetchJson(`${API_BASE}/api/square/checkout`, {
    method: 'POST',
    body: JSON.stringify({ cart, currency: 'USD' }),
  })
  if (!result?.checkoutUrl) throw new Error('Checkout did not return a payment link.')
  return result
}

async function beginV1Checkout(bag) {
  const firstProduct = bag[0]?.product
  const catalogVersion = firstProduct?.commerce?.catalogVersion || undefined
  const quotePayload = {
    storeId: STORE_ID,
    currency: 'USD',
    ...(catalogVersion ? { catalogVersion } : {}),
    items: bag.map((item, index) => ({
      lineId: randomKey(`line${index + 1}`),
      productId: item.product.commerce.productId,
      variantId: item.variant.id,
      quantity: item.quantity || 1,
    })),
  }
  const quote = await fetchJson(`${V1_BASE}/v1/cart/quote`, {
    method: 'POST',
    body: JSON.stringify(quotePayload),
  })
  const defaultCheckoutOrigin = browserHost() === 'apparel.aerovista.us' ? browserOrigin() : 'https://gear.aerovista.us'
  const checkoutOrigin = cleanBase(import.meta.env.VITE_COMMERCE_CHECKOUT_ORIGIN) || defaultCheckoutOrigin
  const result = await fetchJson(`${V1_BASE}/v1/checkout/session`, {
    method: 'POST',
    headers: { 'Idempotency-Key': randomKey('checkout') },
    body: JSON.stringify({
      storeId: STORE_ID,
      quoteId: quote.quoteId,
      successUrl: `${checkoutOrigin}/?checkout=success`,
      cancelUrl: `${checkoutOrigin}/?checkout=cancel`,
    }),
  })
  if (!result?.checkoutUrl) throw new Error('Checkout did not return a payment link.')
  return result
}

export async function beginCheckout(bag) {
  if (!Array.isArray(bag) || bag.length === 0) throw new Error('Your bag is empty.')
  const unready = bag.find(item => !item?.variant || !item?.product?.commerce?.productId)
  if (unready) throw new Error('One or more pieces are not connected to the live catalog yet.')
  return MODE === 'v1' ? beginV1Checkout(bag) : beginLegacyCheckout(bag)
}

export const commerceConfig = {
  storeId: STORE_ID,
  mode: MODE,
  apiBase: API_BASE,
  v1Base: V1_BASE,
  previewCheckoutDisabled: isVercelPreviewHost(),
}
