const STOP_WORDS = new Set([
  'aerovista', 'the', 'and', 'with', 'premium', 'unisex', 'apparel', 'wear',
  'black', 'white', 'gray', 'grey', 'tee', 'shirt', 'hoodie', 'sweatshirt', 'cap', 'hat',
])

const normalize = (value) => String(value || '')
  .normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, ' ')
  .trim()

const compact = (value) => normalize(value).replace(/\s+/g, '-')
const baseName = (value) => String(value || '').split(/[\\/]/).pop().replace(/\.[^.]+$/, '').toLowerCase()
const tokenSet = (value) => new Set(normalize(value).split(/\s+/).filter(token => token.length > 2 && !STOP_WORDS.has(token)))

function overlapScore(a, b) {
  const left = tokenSet(a)
  const right = tokenSet(b)
  if (!left.size || !right.size) return 0
  const shared = [...left].filter(token => right.has(token)).length
  if (shared < 2) return 0
  return (shared / Math.max(left.size, right.size)) * 60
}

function presentationSource(product) {
  return [product.id, product.name, product.shortName, ...(product.commerceAliases || [])].filter(Boolean).join(' ')
}

function backendSource(product) {
  return [product.id, product.name, product.title, product.slug, product.image, ...(product.tags || [])].filter(Boolean).join(' ')
}

function matchScore(presentation, backend) {
  const pid = compact(presentation.id)
  const bid = compact(backend.id || backend.slug)
  if (pid && bid && pid === bid) return 100

  const aliases = (presentation.commerceAliases || []).map(compact)
  if (bid && aliases.includes(bid)) return 98

  const pImage = baseName(presentation.image)
  const bImage = baseName(backend.image || backend.media?.[0]?.legacySrc)
  if (pImage && bImage && pImage === bImage) return 96

  const pName = compact(presentation.name)
  const bName = compact(backend.name || backend.title)
  if (pName && bName && pName === bName) return 92

  return overlapScore(presentationSource(presentation), backendSource(backend))
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
  const ranked = candidates
    .map(candidate => ({ candidate, score: matchScore(presentation, candidate) }))
    .filter(result => result.score >= 42)
    .sort((a, b) => b.score - a.score)
  if (!ranked.length) return null
  if (ranked[1] && ranked[0].score < 90 && ranked[0].score - ranked[1].score < 8) return null
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
      backendTitle: backend.title,
      variants: backend.variants,
    }
    matches.push({ presentationId: presentation.id, productId: backend.id, score: selected.score })
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
