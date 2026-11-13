// Checkout redirects are suggestions, never evidence of payment.
export const PENDING_CHECKOUT_KEY = 'aerovista-apparel.checkout.v1'

export function bagSignature(bag) {
  return JSON.stringify((bag || []).map(item => [
    item.product?.id || '',
    item.variant?.providerVariationId || item.variant?.id || '',
    item.quantity || 1,
    item.bundleId || '',
  ]))
}

export function savePendingCheckout(reference, bag, storage = globalThis.sessionStorage) {
  if (typeof reference !== 'string' || !/^[A-Za-z0-9_-]{43}$/.test(reference)) return false
  try {
    storage?.setItem(PENDING_CHECKOUT_KEY, JSON.stringify({
      reference, signature:bagSignature(bag), savedAt:Date.now()
    }))
    return true
  } catch { return false }
}

export function mayClearPaidBag(reference, bag, storage = globalThis.sessionStorage) {
  try {
    const data=JSON.parse(storage?.getItem(PENDING_CHECKOUT_KEY) || 'null')
    return Boolean(data && data.reference === reference
      && typeof data.savedAt === 'number'
      && Date.now()-data.savedAt < 30*24*60*60*1000
      && data.signature === bagSignature(bag)
      && (bag || []).length > 0)
  } catch { return false }
}

export function forgetPendingCheckout(storage = globalThis.sessionStorage) {
  try { storage?.removeItem(PENDING_CHECKOUT_KEY) } catch {}
}

export function returnMessage(status) {
  if (status === 'confirmed') return 'Square verified completed payment for this checkout.'
  if (status === 'pending') return 'Square has not confirmed completed payment yet. Your bag is preserved.'
  if (status === 'unavailable') return 'Square verification is temporarily unavailable. Your bag is preserved. Please check your receipt.'
  if (status === 'cancel') return 'You returned from checkout without completing an in-store confirmation. Your bag is preserved.'
  if (status === 'checking') return 'Checking this checkout directly with Square…'
  return 'This checkout return is not verified payment proof. Your bag is preserved.'
}
