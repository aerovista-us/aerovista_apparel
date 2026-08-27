import { productPresentation, showroomProductIds } from '../data/merchandising'

const cleanBase = (value) => String(value || '').trim().replace(/\/+$/, '')
const IMAGE_BASE = cleanBase(import.meta.env.VITE_CATALOG_IMAGE_BASE) || 'https://gear.aerovista.us/img'

const titleCase = (value) => String(value || '')
  .split(/\s+/)
  .filter(Boolean)
  .map(word => word.slice(0, 1).toUpperCase() + word.slice(1))
  .join(' ')

const encodePath = (value) => String(value || '')
  .split('/')
  .filter(Boolean)
  .map(part => encodeURIComponent(part))
  .join('/')

function catalogImageUrl(value) {
  const raw = String(value || '').trim()
  if (/^https?:\/\//i.test(raw)) return raw
  const path = encodePath(raw)
  return path ? `${IMAGE_BASE}/${path}` : ''
}

function laneForProduct(product) {
  const collection = String(product.collection || '').trim().toLowerCase()
  if (collection === 'core' || collection === 'division') return 'Core'
  if (collection === 'shadow wear' || collection === 'shadowwear' || collection === 'apex pattern') return 'Shadow Wear'
  if (collection === 'apex') return 'Apex'
  if (collection === 'glitch line' || collection === 'glitch') return 'Glitch'
  if (collection === 'draft series' || collection === 'architect') return 'Architect'
  if (collection === 'docklife' || collection === 'dock life') return 'DockLife'
  if (collection === 'accessories' || collection === 'accessory' || collection === 'gear') return 'Accessories'
  return product.collection ? titleCase(product.collection) : 'Other'
}

function typeForProduct(product) {
  const hay = `${product.name || ''} ${product.category || ''}`.toLowerCase()
  if (/playing cards|card deck|\bdeck\b/.test(hay)) return 'deck'
  if (/\bhat\b|\bcap\b|trucker|snapback|flexfit/.test(hay)) return 'cap'
  if (/\bpants?\b|\bshorts?\b|\bbottoms?\b/.test(hay)) return 'bottom'
  if (/bomber|jacket/.test(hay)) return 'bomber'
  if (/long.?sleeve/.test(hay)) return 'long-sleeve'
  if (/sweatshirt|crewneck/.test(hay)) return 'sweatshirt'
  if (/hoodie|pullover/.test(hay)) return 'hoodie'
  if (/tee|t-shirt|shirt/.test(hay)) return 'tee'
  return 'object'
}

function legacyVariants(product, sellableKeys) {
  return (product.variants || []).map((variant, index) => {
    const size = String(variant.size || 'One Size').trim() || 'One Size'
    const color = String(variant.color || product.color || '').trim()
    const price = Number(variant.price ?? product.price)
    const providerVariationId = String(variant.variation_id || '').trim()
    const merchantSku = String(variant.sku || '').trim()
    const cartKey = `${color || 'Default'}__${size}`
    const allowedByBootstrap = !sellableKeys?.size || sellableKeys.has(cartKey)
    const available = Boolean(providerVariationId && Number.isFinite(price) && allowedByBootstrap)
    return {
      id: providerVariationId || `${product.id}-variant-${index + 1}`,
      providerVariationId,
      merchantSku,
      size,
      color,
      price: Number.isFinite(price) ? price : null,
      availability: available ? 'available' : 'unavailable',
      cartKey,
    }
  })
}

function v1Variants(product) {
  const optionLabels = new Map()
  for (const group of product.optionGroups || []) {
    optionLabels.set(group.id, new Map((group.values || []).map(value => [value.id, value.label])))
  }
  return (product.variants || []).map((variant) => {
    const sizeId = variant.options?.size || ''
    const colorId = variant.options?.color || ''
    const amount = Number(variant.price?.amount)
    return {
      id: String(variant.id || ''),
      providerVariationId: '',
      merchantSku: '',
      size: optionLabels.get('size')?.get(sizeId) || sizeId || 'One Size',
      color: optionLabels.get('color')?.get(colorId) || colorId || '',
      price: Number.isFinite(amount) ? amount / 100 : null,
      availability: variant.availability || 'unavailable',
      cartKey: '',
    }
  })
}

function visibleLegacyProduct(product) {
  const visibility = String(product.visibility ?? 'visible').trim().toLowerCase()
  if (visibility === 'hidden' || visibility === 'draft' || visibility === 'false' || product.visibility === false) return false
  const id = String(product.id || '').toLowerCase()
  const name = String(product.name || '').toLowerCase()
  if (['cash', 'phone-bill', 'rent', 'rent-wk', 'museface'].includes(id)) return false
  if (/^rent/i.test(id) || /^rent/i.test(name) || /phone.*bill/i.test(name) || /museface/i.test(name)) return false
  return true
}

function shortNameFor(product) {
  const override = productPresentation[product.id]
  if (override?.shortName) return override.shortName
  return String(product.name || product.title || product.id)
    .replace(/^AeroVista\s*[—–-]?\s*/i, '')
    .replace(/^Architect\s*[—–-]?\s*/i, '')
    .trim()
}

function normalizeProduct(product, mode, catalogVersion, sellableKeys) {
  const variants = mode === 'v1' ? v1Variants(product) : legacyVariants(product, sellableKeys)
  const sellableVariants = variants.filter(variant => variant.availability === 'available' && Number.isFinite(variant.price))
  const prices = sellableVariants.map(variant => variant.price)
  const sizes = [...new Set(sellableVariants.map(variant => variant.size).filter(Boolean))]
  const presentation = productPresentation[product.id] || {}
  const description = product.description || product.description_text || ''

  return {
    id: String(product.id || ''),
    name: product.title || product.name || product.id,
    shortName: shortNameFor(product),
    type: presentation.type || typeForProduct(product),
    price: prices.length ? Math.min(...prices) : null,
    collection: laneForProduct(product),
    sourceCollection: product.collection || '',
    category: product.category || '',
    image: catalogImageUrl(product.image || product.media?.[0]?.legacySrc || ''),
    accent: presentation.accent || '#00AEEF',
    description,
    colors: [...new Set(sellableVariants.map(variant => variant.color).filter(Boolean))],
    sizes: sizes.length ? sizes : ['One Size'],
    display: presentation.display || { objectPosition: '50% 50%' },
    commerceStatus: sellableVariants.length ? 'connected' : 'unavailable',
    commerce: {
      mode,
      productId: String(product.id || ''),
      squareItemId: String(product.square_item_id || ''),
      catalogVersion,
      variants,
    },
  }
}

export function buildCatalogProducts(catalog, bootstrap = null) {
  const mode = catalog.mode === 'v1' || catalog.schemaVersion ? 'v1' : 'legacy'
  const catalogVersion = catalog.catalogVersion || catalog.meta?.exportedAt || catalog.meta?.version || ''
  const sellableKeys = mode === 'legacy' && Array.isArray(bootstrap?.sellableCartKeys)
    ? new Set(bootstrap.sellableCartKeys)
    : null

  const rawProducts = Array.isArray(catalog.products) ? catalog.products : []
  const visible = mode === 'legacy' ? rawProducts.filter(visibleLegacyProduct) : rawProducts
  const products = visible
    .map(product => normalizeProduct(product, mode, catalogVersion, sellableKeys))
    .filter(product => product.id)

  const byId = new Map(products.map(product => [product.id, product]))
  const showroomProducts = showroomProductIds.map(id => byId.get(id)).filter(Boolean)
  const missingShowroomIds = showroomProductIds.filter(id => !byId.has(id))

  return {
    mode,
    catalogVersion,
    products,
    showroomProducts,
    visibleCatalogCount: products.length,
    showroomCount: showroomProducts.length,
    missingShowroomIds,
  }
}

export function selectCommerceVariant(product, size) {
  const variants = product?.commerce?.variants || []
  const available = variants.filter(variant => variant.availability === 'available' && Number.isFinite(variant.price))
  return available.find(variant => variant.size === size) || (available.length === 1 ? available[0] : null)
}

export { laneForProduct }
