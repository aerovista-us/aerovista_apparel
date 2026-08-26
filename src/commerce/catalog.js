// Explicit bindings are the authority for live checkout identity. A presentation
// image is allowed to differ from the catalog image, but a visual resemblance is
// never enough to decide what Square product a customer is buying.
const PRODUCT_BINDINGS = Object.freeze({
  'core-tee-black': 'aerovista-core-tee',
  'aerovista-divisions-hoodie': 'aerovista-division-hoodie',
  'apex-glitch-tee-black': 'aerovista-apex-glitch-tee-black',
  'apex-signal-sweatshirt': 'aerovista-apex-signal-sweatshirt',
  'apex-vintage-tee': 'aerovista-apex-vintage-tee',
  'apex-shadow-long-sleeve': 'aerovista-shadow-pattern-long-sleeve-tee',
  'apex-embroidered-hat-black': 'aerovista-premium-embroidered-hat-black-cap-with-signature-apex-mark',
  'apex-camo-flexfit-hat': 'aerovista-apex-camo-flexfit-hat',
  'glitch-orbit-cap-black': 'glitch-orbit-logo-black',
  'architect-field-issue-tee-black': 'architect-field-issue-tee-black',
  'architect-field-issue-tee-ash': 'architect-field-issue-tee-ash',
  'architect-built-different-hoodie': 'architect-built-different-hoodie-black',
  'drafted-a-premium-sweatshirt': 'drafted-a-premium-sweatshirt',
  'drafted-a-snapback': 'aerovista-apex-mesh-trucker-cap',
  'apex-relic-deck': 'aerovista-apex-relic-playing-cards',
})

const normalize = (value) => String(value || '')
  .normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, ' ')
  .trim()

const compact = (value) => normalize(value).replace(/\s+/g, '-')
const baseName = (value) => String(value || '').split(/[\\/]/).pop().replace(/\.[^.]+$/, '').toLowerCase()

function exactMatchScore(presentation, backend) {
  const pid = compact(presentation.id)
  const bid = compact(backend.id || backend.slug)
  if (pid && bid && pid === bid) return 100

  const pImage = baseName(presentation.image)
  const bImage = baseName(backend.image || backend.media?.[0]?.legacySrc)
  if (pImage && bImage && pImage === bImage) return 96

  const pName = compact(presentation.name)
  const bName = compact(backend.name || backend.title)
  if (pName && bName && pName === bName) return 92

  return 0
}

function legacyVariants(product) {
  return (product.variants || []).map((variant, index) => {
    const size = String(variant.size || 'One Size').trim() || 'One Size'
    const color = String(variant.color || product.color || '').trim()
    const numericPrice = Number(variant.price ?? product.price)
    const providerVariationId = String(variant.variation_id || '').trim()
    return {
      id: providerVariationId || `${product.id}-variant-${index + 1}`,
      providerVariationId,
      sku: String(variant.sku || '').trim(),
      size,
      color,
      price: Number.isFinite(numericPrice) ? numericPrice : null,
      availability: providerVariationId && Number.isFinite(numericPrice) ? 'available' : 'unavailable',
      cartKey: `${color || 'Default'}__${size}`,
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
      sku: '',
      size: optionLabels.get('size')?.get(sizeId) || sizeId || 'One Size',
      color: optionLabels.get('color')?.get(colorId) || colorId || '',
      price: Number.isFinite(amount) ? amount / 100 : null,
      availability: variant.availability || 'unavailable',
      cartKey: '',
    }
  })
}

function normalizeBackendProduct(product, mode, catalogVersion) {
  const variants = mode === 'v1' ? v1Variants(product) : legacyVariants(product)
  return {
    raw: product,
    id: String(product.id || ''),
    name: product.title || product.name || product.id,
    title: product.title || product.name || product.id,
    slug: product.slug || product.id,
    image: product.image || product.media?.[0]?.legacySrc || '',
    tags: product.tags || product.collections || [],
    collection: product.collection || product.collections?.[0] || '',
    description: product.description || product.description_text || '',
    visibility: product.visibility || 'visible',
    availability: product.availability || (variants.some(v => v.availability === 'available') ? 'available' : 'unavailable'),
    variants,
    catalogVersion,
  }
}

function chooseMatch(presentation, candidates) {
  const boundId = PRODUCT_BINDINGS[presentation.id]
  if (boundId) {
    const bound = candidates.find(candidate => candidate.id === boundId)
    return bound ? { candidate: bound, score: 110, source: 'binding' } : null
  }

  // New presentation entries may bind automatically only on exact identity
  // signals. No fuzzy/token matching is allowed for checkout identity.
  const ranked = candidates
    .map(candidate => ({ candidate, score: exactMatchScore(presentation, candidate), source: 'exact' }))
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score)
  if (!ranked.length) return null
  if (ranked[1] && ranked[0].score === ranked[1].score) return null
  return ranked[0]
}

export function hydratePresentationProducts(presentationProducts, catalog) {
  const mode = catalog.mode === 'v1' || catalog.schemaVersion ? 'v1' : 'legacy'
  const catalogVersion = catalog.catalogVersion || catalog.meta?.exportedAt || catalog.meta?.version || ''
  const backendProducts = (catalog.products || [])
    .map(product => normalizeBackendProduct(product, mode, catalogVersion))
    .filter(product => product.visibility !== 'hidden' && product.visibility !== 'archived')

  const used = new Set()
  const matches = []
  const unmatched = []

  for (const presentation of presentationProducts) {
    const available = backendProducts.filter(product => !used.has(product.id))
    const selected = chooseMatch(presentation, available)
    if (!selected) {
      presentation.commerce = null
      presentation.commerceStatus = 'presentation-only'
      unmatched.push(presentation.id)
      continue
    }

    const backend = selected.candidate
    used.add(backend.id)
    const sellableVariants = backend.variants.filter(variant => variant.availability === 'available' && Number.isFinite(variant.price))
    const prices = sellableVariants.map(variant => variant.price)
    const sizes = [...new Set(sellableVariants.map(variant => variant.size).filter(Boolean))]

    presentation.price = prices.length ? Math.min(...prices) : null
    if (sizes.length) presentation.sizes = sizes
    if (backend.description) presentation.description = backend.description
    presentation.commerceStatus = sellableVariants.length ? 'connected' : 'unavailable'
    presentation.commerce = {
      mode,
      productId: backend.id,
      catalogVersion,
      matchScore: selected.score,
      matchSource: selected.source,
      backendTitle: backend.title,
      variants: backend.variants,
    }
    matches.push({ presentationId: presentation.id, productId: backend.id, score: selected.score, source: selected.source })
  }

  return {
    mode,
    matched: matches.length,
    total: presentationProducts.length,
    unmatched,
    matches,
    catalogVersion,
  }
}

export function selectCommerceVariant(product, size) {
  const variants = product?.commerce?.variants || []
  const available = variants.filter(variant => variant.availability === 'available' && Number.isFinite(variant.price))
  return available.find(variant => variant.size === size) || (available.length === 1 ? available[0] : null)
}

export { PRODUCT_BINDINGS }
