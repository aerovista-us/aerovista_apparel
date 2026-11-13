// Browser-local, privacy-minimized cart: never trust persisted prices or objects.
// Versioned and time-limited to avoid stale checkout state across catalog releases.
export const CART_STORAGE_KEY = 'aerovista-apparel.cart.v1'
export const CART_TTL_MS = 30 * 24 * 60 * 60 * 1000
const MAX_LINES = 80
const MAX_QUANTITY = 50
const PRODUCT_ID_PATTERN = /^[a-z0-9][a-z0-9-]{0,127}$/
const VARIATION_ID_PATTERN = /^[A-Za-z0-9_-]{8,128}$/
const BUNDLE_ID_PATTERN = /^sticker-[A-Za-z0-9.-]{4,100}$/

function validIdentity(record) {
  return record && typeof record === 'object'
    && typeof record.productId === 'string' && PRODUCT_ID_PATTERN.test(record.productId)
    && typeof record.variationId === 'string' && VARIATION_ID_PATTERN.test(record.variationId)
    && Number.isInteger(record.quantity) && record.quantity >= 1 && record.quantity <= MAX_QUANTITY
}

export function serializeBag(bag, now = Date.now()) {
  if (!Array.isArray(bag)) return null
  const lines = bag.slice(0, MAX_LINES).map(line => ({
    productId: line?.product?.id,
    variationId: line?.variant?.providerVariationId || line?.variant?.id,
    quantity: line?.quantity ?? 1,
    ...(line?.bundleId ? { bundleId: line.bundleId } : {}),
  }))
  if (lines.some(line => !validIdentity(line) || (line.bundleId && !BUNDLE_ID_PATTERN.test(line.bundleId)))) return null
  return { version: 1, savedAt: now, lines }
}

export function parseSavedCart(raw, now = Date.now()) {
  if (!raw || typeof raw !== 'string' || raw.length > 30000) return null
  try {
    const value = JSON.parse(raw)
    if (value?.version !== 1 || !Number.isFinite(value.savedAt)
      || value.savedAt > now + 60_000 || now - value.savedAt > CART_TTL_MS
      || !Array.isArray(value.lines) || value.lines.length > MAX_LINES) return null
    if (value.lines.some(line => !validIdentity(line) || (line.bundleId && !BUNDLE_ID_PATTERN.test(line.bundleId)))) return null
    return value.lines
  } catch { return null }
}

export function restoreBag(lines, productMap) {
  if (!Array.isArray(lines) || !(productMap instanceof Map)) return []
  const restored = []
  for (const line of lines) {
    const product = productMap.get(line.productId)
    if (!product || product.commerceStatus !== 'connected') continue
    const variant = product.commerce?.variants?.find(v =>
      (v.providerVariationId || v.id) === line.variationId
      && v.availability === 'available' && Number.isFinite(v.price)
    )
    if (!variant) continue
    restored.push({product, variant, size:variant.size, quantity:line.quantity,
      ...(line.bundleId ? {bundleId:line.bundleId} : {})})
  }
  // A partially restored bundle is not a valid checkout unit.
  const expected = new Map()
  for (const line of lines) if (line.bundleId) expected.set(line.bundleId, (expected.get(line.bundleId) || 0) + line.quantity)
  const actual = new Map()
  for (const line of restored) if (line.bundleId) actual.set(line.bundleId, (actual.get(line.bundleId) || 0) + line.quantity)
  return restored.filter(line => !line.bundleId || (
    actual.get(line.bundleId) === expected.get(line.bundleId)
    && actual.get(line.bundleId) >= 3 && actual.get(line.bundleId) <= 50
  ))
}

export function readCart(storage = globalThis.localStorage, now = Date.now()) {
  try { return parseSavedCart(storage?.getItem(CART_STORAGE_KEY), now) }
  catch { return null }
}

export function writeCart(bag, storage = globalThis.localStorage, now = Date.now()) {
  try {
    const value = serializeBag(bag, now)
    if (!value) return false
    if (!value.lines.length) storage?.removeItem(CART_STORAGE_KEY)
    else storage?.setItem(CART_STORAGE_KEY, JSON.stringify(value))
    return true
  } catch { return false }
}
