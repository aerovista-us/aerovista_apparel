// Flagship-only browser presentation for the authoritative NXCore contract.
// Backend validates Square prices, variant allowlist, group membership and profit.
// UI figures are previews, never checkout authority.
export const STICKER_BUNDLE_CONTRACT = 'apparel-stickers-v1'

export const stickerSurcharges = Object.freeze({
  '3R4MZTGTSZKFOAOT3ZNXU6B3': 0,
  '2WYP3AIVG3SHS6FXXP5JG7IE': 0,
  'QWQ5TR6LE5OYVSTXGEFPVWBQ': 100,
  'I5VT3PJ5Z5LSBRHCZUGZHVCT': 0,
  '3FLQHCRPLXV2NUDFPHXS6OCG': 100,
  'JNKYIIZUAVYSCU4YUVRDF26H': 250,
  '77GCE4OHHIUKOYBC67UQPR2X': 350,
  'VUJPRWZKT7XONG2CKZTXNTXF': 0,
  'EK6DHXBXTFFDGJI5HQSHK3LV': 100,
  'DKUUN7MCCUL33ZZBRZAYNJYK': 0,
  'SAKT4AKPHABP3HPM6YOVR7FR': 100,
  'SPAGDJWORFKSDYLUF7JG6ZD2': 50,
})

export function stickerBaseCents(quantity) {
  if (quantity >= 5) return 500
  if (quantity >= 3) return 600
  return 850
}

export function stickerUnitPriceCents(variantId, quantity, manifest = null) {
  const current = manifest?.variations?.[variantId]?.surchargeCents
  const surcharge = Number.isInteger(current) ? current : stickerSurcharges[variantId]
  if (!Number.isInteger(surcharge)) return null
  return stickerBaseCents(quantity) + surcharge
}

export function stickerBundlePreview(lines, manifest = null) {
  const count = lines.reduce((sum, line) => sum + Number(line.quantity || 1), 0)
  const prices = lines.map(line => stickerUnitPriceCents(
    String(line.variant?.providerVariationId || line.variant?.id || ''),
    count, manifest,
  ))
  if (prices.some(price => !Number.isInteger(price))) return null
  return {
    count,
    unitBaseCents: stickerBaseCents(count),
    subtotalCents: prices.reduce((sum, price, i) => sum + price * Number(lines[i].quantity || 1), 0),
    complete: count >= 3,
  }
}

export function bagStickerPricePreview(bag, manifest = null) {
  const groups = new Map()
  let totalCents = 0
  for (const line of bag) {
    if (!line.bundleId) {
      if (!Number.isFinite(line.variant?.price)) return null
      totalCents += Math.round(line.variant.price * 100) * Number(line.quantity || 1)
      continue
    }
    if (!groups.has(line.bundleId)) groups.set(line.bundleId, [])
    groups.get(line.bundleId).push(line)
  }
  for (const lines of groups.values()) {
    const quote = stickerBundlePreview(lines, manifest)
    if (!quote || !quote.complete) return null
    totalCents += quote.subtotalCents
  }
  return totalCents
}
