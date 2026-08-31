import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowRight, ShoppingBag, ChevronLeft, ChevronRight, DoorOpen, Minus, Shuffle, Sparkles, X
} from 'lucide-react'
import { fixtures } from './data/fixtures'
import { retailZones } from './data/merchandising'
import { buildCatalogProducts, selectCommerceVariant } from './commerce/catalog'
import { beginCheckout, commerceConfig, loadCommerceBootstrap, loadCommerceCatalog } from './commerce/client'
import './styles.css'
import './product-gallery.css'
import './illusion-polish.css'
import './entry-gallery.css'
import './women-studio.css'

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

function priceLabel(product, variant = null) {
  if (variant && Number.isFinite(variant.price)) return money.format(variant.price)
  if (product?.commerceStatus === 'unavailable') return 'Unavailable'
  if (product?.commerceStatus === 'offline') return 'Catalog offline'
  return Number.isFinite(product?.price) ? money.format(product.price) : 'Unavailable'
}

function commerceNote(product) {
  if (product?.commerceStatus === 'connected') return 'Live price and availability verified from the AeroVista catalog.'
  if (product?.commerceStatus === 'unavailable') return 'This piece is currently unavailable for checkout.'
  return 'Live availability is temporarily unavailable.'
}

const spaceViews = [
  { id: 'left', label: 'Tees & Bombers', note: 'Turn toward tees on the upper rail, with bombers and Shadow Wear bottoms below.' },
  { id: 'room', label: "Men's Gallery · Main Floor", note: 'Take in the full room, feature wall and central editions table.' },
  { id: 'right', label: 'Hoodie Wall', note: 'Turn toward the dedicated hoodie wall for AeroVista, Architect and Shadow Wear layers.' },
]

function useCompactStore() {
  const query = '(max-width: 900px)'
  const [compact, setCompact] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const media = window.matchMedia(query)
    const update = () => setCompact(media.matches)
    update()
    media.addEventListener?.('change', update)
    return () => media.removeEventListener?.('change', update)
  }, [])
  return compact
}

function GarmentArt({ type, accent = '#00AEEF' }) {
  const common = { fill: '#111419', stroke: '#c8cbd0', strokeWidth: 1.5 }
  const gradientId = `g-${type}`
  return (
    <svg className="garment-art" viewBox="0 0 180 180" role="img" aria-label={`${type} image placeholder`}>
      <defs><linearGradient id={gradientId} x1="0" x2="1"><stop offset="0" stopColor="#20242b"/><stop offset="1" stopColor="#080a0d"/></linearGradient></defs>
      {(type === 'hoodie' || type === 'sweatshirt' || type === 'long-sleeve') && <>
        <path d="M66 40 Q90 20 114 40 L128 58 153 75 140 105 124 96 121 148 59 148 56 96 40 105 27 75 52 58Z" fill={`url(#${gradientId})`} stroke="#c8cbd0" strokeWidth="2"/>
        <path d="M67 42 Q90 66 113 42 Q112 23 90 23 Q68 23 67 42Z" {...common}/><path d="M90 54V139" stroke={accent} opacity=".65"/>
      </>}
      {type === 'bomber' && <>
        <path d="M58 44 74 34h32l16 10 29 31-20 20-13-12-4 64H66l-4-64-13 12-20-20Z" fill={`url(#${gradientId})`} stroke="#c8cbd0" strokeWidth="2"/>
        <path d="M75 35 Q90 53 105 35" fill="none" stroke={accent}/><path d="M90 48v98" stroke="#9299a2"/>
      </>}
      {type === 'tee' && <>
        <path d="M68 38 78 31h24l10 7 30 16-13 29-20-9v74H71V74l-20 9-13-29Z" fill={`url(#${gradientId})`} stroke="#c8cbd0" strokeWidth="2"/>
        <path d="M78 32 Q90 49 102 32" fill="none" stroke={accent}/><path d="M72 91h36" stroke={accent} opacity=".75"/>
      </>}
      {type === 'bottom' && <>
        <path d="M67 34h46l4 31-12 82H91L90 83l-1 64H75L63 65Z" fill={`url(#${gradientId})`} stroke="#c8cbd0" strokeWidth="2"/>
        <path d="M65 52h50" stroke={accent} opacity=".75"/><path d="M90 52v34" stroke="#9299a2" opacity=".7"/>
      </>}
      {type === 'cap' && <>
        <path d="M48 96 Q54 45 92 42 Q132 43 137 91 Q98 83 48 96Z" fill={`url(#${gradientId})`} stroke="#c8cbd0" strokeWidth="2"/>
        <path d="M79 93 Q117 82 155 100 Q121 116 79 104Z" fill="#101318" stroke="#aeb4ba" strokeWidth="2"/><path d="M62 78 Q92 62 126 78" fill="none" stroke={accent}/>
      </>}
      {type === 'deck' && <rect x="55" y="24" width="70" height="132" rx="7" fill="#0d1014" stroke="#c8cbd0" strokeWidth="2"/>}
      <circle cx="90" cy="90" r="70" fill="none" stroke={accent} opacity=".08"/>
    </svg>
  )
}

function ProductImage({ product, image = product?.image, alt = product?.name, large = false, stage = false }) {
  const [failed, setFailed] = useState(false)
  const stageImage = stage && product?.display?.stageImageSuffix
    ? product.images?.find(candidate => candidate.endsWith(product.display.stageImageSuffix))
    : ''
  const resolvedImage = stageImage || image
  useEffect(() => setFailed(false), [resolvedImage])
  const style = product?.display?.objectPosition ? { objectPosition: product.display.objectPosition } : undefined
  return (
    <div className={`product-image ${large ? 'large' : ''} ${stage ? 'stage' : ''}`}>
      {resolvedImage && !failed
        ? <img
            src={resolvedImage}
            alt={alt}
            style={style}
            loading={large ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={large ? 'high' : 'low'}
            draggable={false}
            onError={() => setFailed(true)}
          />
        : <GarmentArt type={product?.type || 'object'} accent={product?.accent}/>} 
    </div>
  )
}

function MerchItem({ product, slot, onOpen, highlighted = true }) {
  const style = {
    left: `${slot.x}%`, top: `${slot.y}%`,
    '--item-scale': slot.scale ?? 1,
    '--item-tilt': `${slot.tilt ?? 0}deg`,
    '--stage-scale': product.display?.stageScale ?? 1,
    '--accent': product.accent,
  }
  return (
    <button
      className={`merch-item merch-${product.type}${highlighted ? '' : ' is-muted'}`}
      data-product={product.id}
      style={style}
      onClick={() => onOpen(product)}
      aria-label={`View ${product.name}`}
      aria-haspopup="dialog"
    >
      <span className="merch-object"><ProductImage product={product} stage/></span>
      <span className="merch-pin"/>
      <span className="merch-tag"><b>{product.shortName}</b><em>{priceLabel(product)}</em></span>
    </button>
  )
}

function FixtureShell({ fixture, children }) {
  const style = { left: `${fixture.position.x}%`, top: `${fixture.position.y}%`, width: `${fixture.position.w}%`, height: `${fixture.position.h}%` }
  return (
    <div className={`fixture fixture-${fixture.type} fixture-${fixture.id}`} data-fixture={fixture.id} style={style}>
      <div className="fixture-structure" aria-hidden="true">
        {fixture.type === 'wall-rack' && <><i className="rail"/><i className="rack-leg a"/><i className="rack-leg b"/></>}
        {fixture.type === 'table-stack' && <><i className="table-top"/><i className="table-base"/></>}
        {fixture.type === 'hat-shelf' && <><i className="shelf a"/><i className="shelf b"/></>}
      </div>
      {children}
    </div>
  )
}

function Fixture({ fixture, productMap, collection, onOpen }) {
  const items = fixture.slots
    .map(slot => ({ slot, product: productMap.get(slot.productId) }))
    .filter(({ product }) => product)
  if (!items.length) return null
  if (fixture.type === 'table-stack') return <EditionTable fixture={fixture} items={items} collection={collection} onOpen={onOpen}/>
  return <FixtureShell fixture={fixture}>{items.map(({ product, slot }, index) => <MerchItem
    key={`${fixture.id}-${product.id}-${index}`}
    product={product}
    slot={slot}
    onOpen={onOpen}
    highlighted={collection === 'All' || product.collection === collection}
  />)}</FixtureShell>
}

function EditionTable({ fixture, items, collection, onOpen }) {
  const [spread, setSpread] = useState(0)
  return <FixtureShell fixture={fixture}>
    <span className="edition-table-label" aria-hidden="true">OBJECTS · EDITIONS</span>
    {items.map(({ product, slot }, index) => {
      const positions = slot.spreads?.length ? slot.spreads : [slot]
      const position = { ...slot, ...positions[spread % positions.length] }
      return <MerchItem
        key={`${fixture.id}-${product.id}-${index}`}
        product={product}
        slot={position}
        onOpen={onOpen}
        highlighted={collection === 'All' || product.collection === collection}
      />
    })}
    <button
      type="button"
      className="edition-shuffle"
      onClick={() => setSpread(current => current + 1)}
      aria-label="Shuffle the sticker display"
    ><Shuffle size={11}/><span>Shuffle stickers</span></button>
  </FixtureShell>
}

function ProductDrawer({ product, onClose, onAdd }) {
  const [size, setSize] = useState(product?.sizes?.[0] ?? '')
  const [galleryIndex, setGalleryIndex] = useState(0)
  useEffect(() => {
    setSize(product?.sizes?.[0] ?? '')
    setGalleryIndex(0)
  }, [product])
  if (!product) return null
  const gallery = product.images?.length ? product.images : [product.image].filter(Boolean)
  const activeImage = gallery[galleryIndex] || product.image
  const variant = selectCommerceVariant(product, size)
  const canAdd = Boolean(variant && product.commerceStatus === 'connected')
  const optionLabel = product.sizes.length > 1 ? 'Size' : 'Format'
  const moveGallery = (direction) => setGalleryIndex((current) => (current + direction + gallery.length) % gallery.length)
  return (
    <div className="drawer-shell" role="dialog" aria-modal="true" aria-label={product.name}>
      <button className="drawer-scrim" onClick={onClose} aria-label="Close product"/>
      <aside className="drawer">
        <button className="icon-btn drawer-close" onClick={onClose} aria-label="Close product details"><X size={20}/></button>
        <div className="product-gallery">
          <ProductImage
            product={product}
            image={activeImage}
            alt={`${product.name}, view ${galleryIndex + 1} of ${gallery.length}`}
            large
          />
          {gallery.length > 1 && <>
            <button className="gallery-arrow gallery-arrow-prev" onClick={() => moveGallery(-1)} aria-label="Previous product image"><ChevronLeft size={20}/></button>
            <button className="gallery-arrow gallery-arrow-next" onClick={() => moveGallery(1)} aria-label="Next product image"><ChevronRight size={20}/></button>
            <span className="gallery-count" aria-live="polite">{galleryIndex + 1} / {gallery.length}</span>
          </>}
        </div>
        {gallery.length > 1 && <div className="gallery-thumbs" role="list" aria-label={`${product.name} gallery`}>
          {gallery.map((image, index) => <button
            key={image}
            type="button"
            role="listitem"
            className={index === galleryIndex ? 'active' : ''}
            onClick={() => setGalleryIndex(index)}
            aria-label={`Show product image ${index + 1} of ${gallery.length}`}
            aria-pressed={index === galleryIndex}
          ><img src={image} alt="" loading="lazy" decoding="async"/></button>)}
        </div>}
        <div className="drawer-content">
          <span className="eyebrow">{product.collection}</span>
          <h2>{product.name}</h2>
          <div className="product-meta-row">
            <p className="price">{priceLabel(product, variant)}</p>
            <span className={`availability-line ${canAdd ? 'available' : 'unavailable'}`}><i aria-hidden="true"/>{canAdd ? 'Available' : 'Unavailable'}</span>
          </div>
          <p className="product-description">{product.description}</p>
          <div className="selector">
            <span>{optionLabel}</span>
            <div className="chips">{product.sizes.map(s => <button key={s} onClick={() => setSize(s)} className={size === s ? 'active' : ''} aria-pressed={size === s}>{s}</button>)}</div>
          </div>
          <button className="primary wide" disabled={!canAdd} onClick={() => onAdd(product, size, variant)}>
            {canAdd ? <>Add to bag <ShoppingBag size={17}/></> : 'Currently unavailable'}
          </button>
          <small>{commerceNote(product)}</small>
        </div>
      </aside>
    </div>
  )
}

function BagDrawer({ bag, onClose, onRemove, onCheckout, checkoutBusy, checkoutError }) {
  const hasUnready = bag.some(item => !item.variant || !Number.isFinite(item.variant.price))
  const total = bag.reduce((sum, item) => sum + (Number.isFinite(item.variant?.price) ? item.variant.price * (item.quantity || 1) : 0), 0)
  return (
    <div className="drawer-shell" role="dialog" aria-modal="true" aria-label="Shopping bag">
      <button className="drawer-scrim" onClick={onClose} aria-label="Close bag"/>
      <aside className="drawer bag-drawer">
        <button className="icon-btn drawer-close" onClick={onClose} aria-label="Close shopping bag"><X size={20}/></button>
        <div className="drawer-content bag-content">
          <span className="eyebrow">AEROVISTA STORE</span><h2>Your bag</h2>
          {bag.length === 0 ? <p className="empty">Nothing here yet. Explore the walls and select a piece.</p> : bag.map((item, index) => (
            <div className="bag-row" key={`${item.product.id}-${item.variant?.id || item.size}-${index}`}>
              <ProductImage product={item.product}/>
              <div><b>{item.product.shortName}</b><span>{item.variant?.size || item.size}</span><span>{priceLabel(item.product, item.variant)}</span></div>
              <button className="icon-btn" onClick={() => onRemove(index)} aria-label={`Remove ${item.product.shortName} from bag`}><Minus size={15}/></button>
            </div>
          ))}
          <div className="bag-total"><span>Total</span><b>{hasUnready ? 'TBD' : money.format(total)}</b></div>
          {checkoutError && <p className="checkout-error" role="alert">{checkoutError}</p>}
          <button className={`primary wide ${checkoutBusy ? 'is-busy' : ''}`} disabled={!bag.length || hasUnready || checkoutBusy} onClick={onCheckout} aria-live="polite">
            {checkoutBusy ? 'Opening secure checkout…' : <>Checkout <ArrowRight size={17}/></>}
          </button>
          <small>Secure checkout through AeroVista Commerce.</small>
        </div>
      </aside>
    </div>
  )
}

function CollectionNav({ products, collection, onCollection, mobile = false }) {
  const collections = ['All', ...Array.from(new Set(products.map(product => product.collection)))]
  return <nav className={mobile ? 'mobile-collection-nav' : ''} aria-label="Collections">
    {collections.map(name => <button key={name} className={collection === name ? 'active' : ''} onClick={() => onCollection(name)} aria-pressed={collection === name}>{name === 'All' ? 'Shop all' : name}</button>)}
  </nav>
}

function StoreHeader({ products, bagCount, onBag, onExit, collection, onCollection }) {
  return <header className="store-header">
    <button className="wordmark" onClick={onExit} aria-label="Return to the entry gallery"><span className="apex">/\\</span> AEROVISTA</button>
    <CollectionNav products={products} collection={collection} onCollection={onCollection}/>
    <div className="header-actions">
      <button className="bag-button" onClick={onBag} aria-label={`Shopping bag, ${bagCount} ${bagCount === 1 ? 'item' : 'items'}`}><ShoppingBag size={18}/><span>{bagCount}</span></button>
    </div>
  </header>
}

const galleryDestinations = [
  { id: 'womens', direction: 'LEFT', name: "Women's Studio", note: 'A curated edit of women-specific and unisex pieces.', status: 'OPEN', live: true },
  { id: 'mens', direction: 'RIGHT', name: "Men's Gallery", note: 'Apparel, headwear and current editions.', status: 'OPEN', live: true },
  { id: 'collections', direction: 'AHEAD', name: 'Collections Hall', note: 'Seven divisions presented line by line.', status: 'OPENING SOON' },
  { id: 'objects', direction: 'IN GALLERY', name: 'Objects & Editions', note: 'Sticker and card table preview.', status: 'ON VIEW' },
]

function Foyer({ onOutside, onOpenMens, onOpenWomens, bagCount, onBag }) {
  const openDestination = id => id === 'womens' ? onOpenWomens() : onOpenMens()
  return <section className="foyer space-arrive">
    <header className="foyer-header">
      <button className="wordmark" onClick={onOutside} aria-label="Return outside"><span className="apex">/\\</span> AEROVISTA</button>
      <span className="foyer-location">ENTRY GALLERY</span>
      <button className="bag-button" onClick={onBag} aria-label={`Shopping bag, ${bagCount} ${bagCount === 1 ? 'item' : 'items'}`}><ShoppingBag size={18}/><span>{bagCount}</span></button>
    </header>
    <div className="foyer-stage">
      <div className="foyer-image" aria-hidden="true"/>
      <div className="foyer-atmosphere" aria-hidden="true"/>
      <div className="foyer-intro">
        <span className="eyebrow">AEROVISTA FLAGSHIP</span>
        <h1>Welcome in.</h1>
        <p>Choose a gallery or look over what is opening next.</p>
      </div>
      <section className="directory-board" aria-labelledby="directory-title">
        <div className="directory-mark"><img src={`${import.meta.env.BASE_URL}img/aa_logo.png`} alt="AeroVista Apparel"/></div>
        <div className="directory-heading"><span id="directory-title">STORE DIRECTORY</span><small>COEUR D'ALENE · IDAHO</small></div>
        <div className="directory-list">
          {galleryDestinations.map(destination => destination.live
            ? <button key={destination.id} className="directory-row is-live" onClick={() => openDestination(destination.id)}>
                <span className="directory-direction">{destination.direction}</span>
                <span><b>{destination.name}</b><small>{destination.note}</small></span>
                <em>{destination.status}<ChevronRight size={13}/></em>
              </button>
            : <div key={destination.id} className="directory-row" aria-label={`${destination.name}, ${destination.status}`}>
                <span className="directory-direction">{destination.direction}</span>
                <span><b>{destination.name}</b><small>{destination.note}</small></span>
                <em>{destination.status}</em>
              </div>)}
        </div>
      </section>
      <button className="gallery-threshold threshold-womens" onClick={onOpenWomens} aria-label="Enter Women's Studio"><span>WOMEN'S STUDIO</span><small>ENTER <ChevronLeft size={12}/></small></button>
      <button className="gallery-threshold threshold-mens" onClick={onOpenMens} aria-label="Enter Men's Gallery"><span>MEN'S GALLERY</span><small>ENTER <ChevronRight size={12}/></small></button>
      <button className="foyer-outside" onClick={onOutside}><ChevronLeft size={14}/> Outside</button>
      <div className="foyer-floor-note"><Sparkles size={13}/><span>WOMEN'S + MEN'S GALLERIES NOW OPEN</span></div>
    </div>
  </section>
}

const womenStudioDisplays = [
  { id: 'aerovista-apex-pattern-skater-dress', slot: 'left-near', image: 'products/aerovista-apex-pattern-skater-dress/10-front-03.webp' },
  { id: 'aerovista-wave-mark-full-zip-hoodie-white', slot: 'left-mid', image: 'products/aerovista-wave-mark-full-zip-hoodie-white/01-hero.webp' },
  { id: 'shadow-pants', slot: 'left-far', image: 'products/shadow-pants/01-hero.webp' },
  { id: 'aerovista-apex-pattern-print-swimsuit-one-piece', slot: 'right-near', image: 'products/aerovista-apex-pattern-print-swimsuit-one-piece/10-front-02.webp' },
  { id: 'shadow-wear-tactical-bomber-jacket-summit-edition', slot: 'right-mid', image: 'products/shadow-wear-tactical-bomber-jacket-summit-edition/01-hero.webp' },
  { id: 'aerovista-shadow-pattern-hoodie', slot: 'right-far' },
]

function WomenStudioPiece({ display, product, onOpen }) {
  if (!product) return null
  const image = display.image ? `${import.meta.env.BASE_URL}${display.image}` : product.image
  return <button className={`studio-piece studio-${display.slot}`} data-product={product.id} onClick={() => onOpen(product)} aria-label={`View ${product.name}`} aria-haspopup="dialog">
    <ProductImage product={product} image={image} stage/>
    <span className="studio-product-tag"><b>{product.shortName}</b><em>{priceLabel(product)}</em></span>
  </button>
}

function WomenStudio({ products, catalogState, onExit, onProduct, bagCount, onBag }) {
  const productMap = useMemo(() => new Map(products.map(product => [product.id, product])), [products])
  const featureProduct = productMap.get('aerovista-apex-pattern-print-swimsuit-one-piece')
  const roomMessage = catalogState.status === 'loading'
    ? 'Preparing the studio edit…'
    : catalogState.status === 'offline'
      ? 'Live catalog temporarily unavailable'
      : `${products.length} pieces in the opening edit`

  return <section className="women-studio space-arrive" data-catalog-status={catalogState.status}>
    <header className="studio-header">
      <button className="wordmark" onClick={onExit} aria-label="Return to the entry gallery"><span className="apex">/\\</span> AEROVISTA</button>
      <span className="studio-location">WOMEN'S STUDIO · OPENING EDIT</span>
      <button className="bag-button" onClick={onBag} aria-label={`Shopping bag, ${bagCount} ${bagCount === 1 ? 'item' : 'items'}`}><ShoppingBag size={18}/><span>{bagCount}</span></button>
    </header>
    <div className="women-studio-scene">
      <div className="women-studio-image" aria-hidden="true"/><div className="women-studio-shade" aria-hidden="true"/>
      <div className="studio-scene-label"><span className="eyebrow">WOMEN'S STUDIO</span><h1>The opening edit.</h1><p>Women-specific silhouettes and selected AeroVista layers, presented in a quieter gallery setting.</p></div>
      <button className="walk-back studio-walk-back" onClick={onExit}><ChevronLeft size={16}/> Entry Gallery</button>
      <div className="studio-fixture-layer">
        {womenStudioDisplays.map(display => <WomenStudioPiece key={display.id} display={display} product={productMap.get(display.id)} onOpen={onProduct}/>)}
        {featureProduct && <button className="studio-editorial" onClick={() => onProduct(featureProduct)} aria-label={`View ${featureProduct.name}`} aria-haspopup="dialog"><img src={`${import.meta.env.BASE_URL}products/aerovista-apex-pattern-print-swimsuit-one-piece/swimsuit.png`} alt="Two models wearing the AeroVista Apex Pattern one-piece swimsuit"/><span>APEX PATTERN · SWIM</span></button>}
      </div>
      <div className="studio-floor-status" role="status" aria-live="polite"><Sparkles size={13}/><span>{roomMessage}</span></div>
    </div>
    <section className="women-mobile-assortment" aria-label="Women's Studio opening edit">
      <div className="women-mobile-intro"><span className="eyebrow">OPENING EDIT</span><h2>Women’s Studio</h2><p>Explore the first women-specific silhouettes alongside selected unisex AeroVista layers.</p></div>
      <div className="women-mobile-grid">{products.map(product => <button key={product.id} onClick={() => onProduct(product)} aria-label={`View ${product.name}`}><ProductImage product={product} stage/><span><b>{product.shortName}</b><em>{priceLabel(product)}</em></span></button>)}</div>
    </section>
  </section>
}

function Exterior({ entering, onEnter, onWarm }) {
  return <section className={`exterior ${entering ? 'entering' : ''}`}>
    <div className="exterior-image"><span className="exterior-sign-logo" aria-hidden="true"><img src={`${import.meta.env.BASE_URL}img/aa_logo.png`} alt=""/></span></div><div className="vignette"/>
    <button
      className="door-hit"
      onClick={onEnter}
      onPointerEnter={onWarm}
      onPointerDown={onWarm}
      onFocus={onWarm}
      disabled={entering}
      aria-label="Enter AeroVista Store"
    ><span><DoorOpen size={20}/> {entering ? 'Opening…' : 'Enter store'}</span></button>
    <div className="outside-copy"><span className="eyebrow">FLAGSHIP SHOWROOM</span><h1>Walk in.</h1><p>Apparel, objects and editions are on display inside.</p></div>
    <div className="outside-foot"><span>SEVEN DIVISIONS · ONE VISION</span><span>Enter through the front door</span></div>
  </section>
}

function MobileHangingPiece({ product, onOpen, highlighted = true }) {
  return <button className={`mobile-hanging-piece${highlighted ? '' : ' is-muted'}`} data-product={product.id} onClick={() => onOpen(product)} aria-label={`View ${product.name}`} aria-haspopup="dialog"><span className="hanger-hook" aria-hidden="true"/><ProductImage product={product} stage/><span className="retail-tag"><b>{product.shortName}</b><em>{priceLabel(product)}</em></span></button>
}
function MobileShelfPiece({ product, onOpen, highlighted = true }) {
  return <button className={`mobile-shelf-piece${highlighted ? '' : ' is-muted'}`} data-product={product.id} onClick={() => onOpen(product)} aria-label={`View ${product.name}`} aria-haspopup="dialog"><ProductImage product={product} stage/><span className="retail-tag"><b>{product.shortName}</b><em>{priceLabel(product)}</em></span></button>
}

function MobileStore({ products, productMap, collection, onCollection, onProduct, catalogState }) {
  const zones = retailZones.map(zone => ({ ...zone, items: zone.productIds.map(id => productMap.get(id)).filter(Boolean) })).filter(zone => zone.items.length)
  const introCopy = catalogState.status === 'loading'
    ? 'Preparing current sizes and availability while you enter.'
    : catalogState.status === 'offline'
      ? 'The room is open, but live availability is temporarily offline.'
      : 'Swipe along each fixture, then select a piece for current sizes and availability.'
  return <section className="mobile-store">
    <div className="mobile-store-intro"><span className="eyebrow">MEN'S GALLERY</span><h2>Continue through the showroom</h2><p>{introCopy}</p></div>
    <CollectionNav products={products} collection={collection} onCollection={onCollection} mobile/>
    {zones.map(zone => <section key={zone.id} className={`retail-zone retail-zone-${zone.kind}`}>
      <header className="retail-zone-header"><div><span>{zone.label}</span><p>{zone.note}</p></div><small>{collection === 'All' ? zone.items.length : zone.items.filter(product => product.collection === collection).length} {collection === 'All' ? 'pieces' : 'lit'}</small></header>
      {zone.kind === 'wall' && <div className="mobile-wall"><div className="mobile-rail" aria-hidden="true"/><div className="mobile-hanging-row">{zone.items.map(product => <MobileHangingPiece key={product.id} product={product} onOpen={onProduct} highlighted={collection === 'All' || product.collection === collection}/>)}</div></div>}
      {zone.kind === 'shelf' && <div className="mobile-shelf"><div className="mobile-shelf-row">{zone.items.map(product => <MobileShelfPiece key={product.id} product={product} onOpen={onProduct} highlighted={collection === 'All' || product.collection === collection}/>)}</div><div className="shelf-edge" aria-hidden="true"/></div>}
      {zone.kind === 'table' && <div className="mobile-display-table"><div className="mobile-object-row">{zone.items.map(product => <MobileShelfPiece key={product.id} product={product} onOpen={onProduct} highlighted={collection === 'All' || product.collection === collection}/>)}</div><div className="display-table-edge" aria-hidden="true"/></div>}
    </section>)}
  </section>
}

function ViewNav({ view, onView }) {
  return <nav className="view-nav" aria-label="Look around the store">{spaceViews.map(space => <button key={space.id} className={view === space.id ? 'active' : ''} onClick={() => onView(space.id)} aria-pressed={view === space.id}><i aria-hidden="true"/><span>{space.label}</span></button>)}</nav>
}

function Interior({ products, catalogState, onExit, onProduct, bagCount, onBag }) {
  const [collection, setCollection] = useState('All')
  const [view, setView] = useState('room')
  const compact = useCompactStore()
  const productMap = useMemo(() => new Map(products.map(product => [product.id, product])), [products])
  const visibleProducts = useMemo(() => products.filter(product => collection === 'All' || product.collection === collection), [products, collection])
  const currentView = spaceViews.find(space => space.id === view) ?? spaceViews[1]
  const floorMessage = catalogState.status === 'loading'
    ? 'Preparing the floor…'
    : catalogState.status === 'offline'
      ? 'Live catalog unavailable'
      : collection === 'All'
        ? `${visibleProducts.length} ${visibleProducts.length === 1 ? 'piece' : 'pieces'} in the room`
        : `${visibleProducts.length} highlighted · ${products.length} pieces remain in the room`

  return <section className="interior space-arrive" data-catalog-status={catalogState.status}>
    <StoreHeader products={products} bagCount={bagCount} onBag={onBag} onExit={onExit} collection={collection} onCollection={setCollection}/>
    <div className={`interior-scene view-${view}`}>
      <div className="interior-image"/><div className="room-shade"/>
      <div className="scene-label"><span className="eyebrow">{currentView.label}</span><h1>{collection === 'All' ? 'Apparel & Objects' : collection}</h1><p>{currentView.note}</p></div>
      <button className="walk-back" onClick={onExit}><ChevronLeft size={16}/> Entry Gallery</button>
      {!compact && <div className="fixture-layer">{fixtures.map(fixture => <Fixture key={fixture.id} fixture={fixture} productMap={productMap} collection={collection} onOpen={onProduct}/>)}</div>}
      <ViewNav view={view} onView={setView}/>
      <div className="center-prompt floor-status" data-status={catalogState.status} role="status" aria-live="polite"><Sparkles size={14}/><span>{floorMessage}</span></div>
    </div>
    {compact && <MobileStore products={products} productMap={productMap} collection={collection} onCollection={setCollection} onProduct={onProduct} catalogState={catalogState}/>} 
  </section>
}

function App() {
  const [space, setSpace] = useState('outside')
  const [entering, setEntering] = useState(false)
  const [selected, setSelected] = useState(null)
  const [bagOpen, setBagOpen] = useState(false)
  const [bag, setBag] = useState([])
  const [showroomProducts, setShowroomProducts] = useState([])
  const [womenStudioProducts, setWomenStudioProducts] = useState([])
  const [catalogState, setCatalogState] = useState({ status: 'idle', visibleCatalogCount: 0, showroomCount: 0 })
  const [checkoutBusy, setCheckoutBusy] = useState(false)
  const [checkoutError, setCheckoutError] = useState('')
  const commercePromiseRef = useRef(null)

  function warmCommerce() {
    if (catalogState.status === 'ready') return Promise.resolve(catalogState)
    if (commercePromiseRef.current) return commercePromiseRef.current
    setCatalogState(current => ({ ...current, status: 'loading' }))
    const promise = Promise.allSettled([loadCommerceCatalog(), loadCommerceBootstrap()]).then(([catalogResult, bootstrapResult]) => {
      if (catalogResult.status === 'fulfilled') {
        const bootstrap = bootstrapResult.status === 'fulfilled' ? bootstrapResult.value : null
        const report = buildCatalogProducts(catalogResult.value, bootstrap)
        setShowroomProducts(report.showroomProducts)
        setWomenStudioProducts(report.womenStudioProducts)
        const nextState = { status: 'ready', ...report, bootstrapReady: Boolean(bootstrap) }
        setCatalogState(nextState)
        return nextState
      }
      setShowroomProducts([])
      setWomenStudioProducts([])
      const nextState = { status: 'offline', visibleCatalogCount: 0, showroomCount: 0, error: catalogResult.reason?.message || 'Catalog unavailable' }
      setCatalogState(nextState)
      commercePromiseRef.current = null
      return nextState
    })
    commercePromiseRef.current = promise
    return promise
  }

  useEffect(() => {
    const modalOpen = Boolean(selected || bagOpen)
    if (!modalOpen) return undefined
    const priorOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return
      setSelected(null)
      setBagOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = priorOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [selected, bagOpen])

  function enter() {
    if (entering) return
    warmCommerce()
    setEntering(true)
    window.setTimeout(() => { setSpace('foyer'); setEntering(false) }, 980)
  }
  function goOutside() { setSelected(null); setBagOpen(false); setSpace('outside') }
  function openMensGallery() { warmCommerce(); setSpace('mens') }
  function openWomensStudio() { warmCommerce(); setSpace('womens') }
  function returnToFoyer() { setSelected(null); setBagOpen(false); setSpace('foyer') }
  function add(product, size, variant) {
    setBag(current => [...current, { product, size, variant, quantity: 1 }])
    setSelected(null); setCheckoutError(''); setBagOpen(true)
  }
  async function checkout() {
    setCheckoutBusy(true); setCheckoutError('')
    try {
      const result = await beginCheckout(bag)
      window.location.assign(result.checkoutUrl)
    } catch (error) {
      setCheckoutError(error?.message || 'Checkout is temporarily unavailable.')
      setCheckoutBusy(false)
    }
  }

  return <main className="app" data-commerce={catalogState.status} data-commerce-mode={commerceConfig.mode}>
    {space === 'outside' && <Exterior entering={entering} onEnter={enter} onWarm={warmCommerce}/>}
    {space === 'foyer' && <Foyer onOutside={goOutside} onOpenMens={openMensGallery} onOpenWomens={openWomensStudio} bagCount={bag.length} onBag={() => setBagOpen(true)}/>}
    {space === 'mens' && <Interior products={showroomProducts} catalogState={catalogState} onExit={returnToFoyer} onProduct={setSelected} bagCount={bag.length} onBag={() => setBagOpen(true)}/>}
    {space === 'womens' && <WomenStudio products={womenStudioProducts} catalogState={catalogState} onExit={returnToFoyer} onProduct={setSelected} bagCount={bag.length} onBag={() => setBagOpen(true)}/>}
    <ProductDrawer product={selected} onClose={() => setSelected(null)} onAdd={add}/>
    {bagOpen && <BagDrawer bag={bag} onClose={() => setBagOpen(false)} onRemove={index => setBag(current => current.filter((_, i) => i !== index))} onCheckout={checkout} checkoutBusy={checkoutBusy} checkoutError={checkoutError}/>} 
  </main>
}

createRoot(document.getElementById('root')).render(<App/>)
