import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowRight, ShoppingBag, ChevronLeft, ChevronRight, DoorOpen, Minus, Shuffle, Sparkles, X, UserRound, LogOut, Heart, Package, Ruler, Gift, ExternalLink
} from 'lucide-react'
import { fixtures } from './data/fixtures'
import { retailZones } from './data/merchandising'
import { buildCatalogProducts, selectCommerceVariant } from './commerce/catalog'
import { beginCheckout, commerceConfig, loadCommerceBootstrap, loadCommerceCatalog } from './commerce/client'
import { identityStanding } from './commerce/identity'
import { fulfillmentNote } from './commerce/fulfillment'
import {
  beginIdentityLogin,
  beginIdentityRegistration,
  loadAccountSummary,
  loadIdentitySession,
  loadSavedPieces,
  logoutIdentity,
  removeSavedPiece,
  savePiece,
} from './identity/client'
import { accountFeatures } from './config/accountFeatures'
import './styles.css'
import './product-gallery.css'
import './illusion-polish.css'
import './entry-gallery.css'
import './women-studio.css'

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

function priceLabel(product, variant = null) {
  if (variant && Number.isFinite(variant.price)) return money.format(variant.price)
  if (product?.commerceStatus === 'presentation') return 'Preview'
  if (product?.commerceStatus === 'unavailable') return 'Unavailable'
  if (product?.commerceStatus === 'offline') return 'Catalog offline'
  return Number.isFinite(product?.price) ? money.format(product.price) : 'Preview'
}

function commerceNote(product) {
  if (product?.commerceStatus === 'connected') return 'Live price and availability verified from the AeroVista catalog.'
  if (product?.commerceStatus === 'presentation') return 'Preview from the local gallery. Checkout stays closed until a Square variation is on the live catalog.'
  if (product?.commerceStatus === 'unavailable') return 'This piece is currently unavailable for checkout.'
  return 'Live availability is temporarily unavailable.'
}

const spaceViews = [
  { id: 'left', label: 'Tees & Bombers', note: 'Turn toward tees on the upper rail, with bombers and Shadow Wear bottoms below.' },
  { id: 'room', label: "Men's Gallery · Main Floor", note: 'Take in the full room, feature wall and central editions table.' },
  { id: 'right', label: 'Hoodie Wall', note: 'Turn toward the dedicated hoodie wall for AeroVista, Architect and Shadow Wear layers.' },
  { id: 'objects', label: 'Objects & Editions', note: 'The center table holds cards, the cooler, and the sticker editions.' },
  { id: 'place', label: 'Place Line', note: 'Ridgeline, After Dark, Blue Divide, Source Code, MoonLine, Powderline, and Behind the Scenes.' },
  { id: 'more', label: 'Further Edit', note: 'Photographed pieces that are visible in Square and waiting on a quieter wall.' },
]

function fixtureVisible(fixture, view) {
  const views = fixture.views || ['room']
  return views.includes(view)
}

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

function ProductDrawer({
  product,
  onClose,
  onAdd,
  savedEnabled = false,
  saved = false,
  savedBusy = false,
  authenticated = false,
  onToggleSaved,
  onLogin,
}) {
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
            <span className={`availability-line ${canAdd ? 'available' : 'unavailable'}`}><i aria-hidden="true"/>{canAdd ? 'Available' : product.commerceStatus === 'presentation' ? 'Preview' : 'Unavailable'}</span>
          </div>
          {savedEnabled && <button
            className={`save-piece-button ${saved ? 'is-saved' : ''}`}
            type="button"
            disabled={savedBusy}
            aria-pressed={saved}
            onClick={() => authenticated ? onToggleSaved?.(product) : onLogin?.()}
          >
            <Heart size={16} fill={saved ? 'currentColor' : 'none'}/>
            <span>{savedBusy ? 'Saving…' : saved ? 'Saved piece' : authenticated ? 'Save piece' : 'Sign in to save'}</span>
          </button>}
          <p className="product-description">{product.description}</p>
          <div className="selector">
            <span>{optionLabel}</span>
            <div className="chips">{product.sizes.map(s => <button key={s} onClick={() => setSize(s)} className={size === s ? 'active' : ''} aria-pressed={size === s}>{s}</button>)}</div>
          </div>
          <button className="primary wide" disabled={!canAdd} onClick={() => onAdd(product, size, variant)}>
            {canAdd ? <>Add to bag <ShoppingBag size={17}/></> : product.commerceStatus === 'presentation' ? 'Preview' : 'Currently unavailable'}
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
          <small>Square confirms the amount. Creating checkout does not mark an order paid or redeem a promotion.</small>
          <small>{identityStanding.required ? 'My AeroVista benefits use your verified AeroVista identity. Public shopping and checkout remain available without signing in.' : ''}</small>
        </div>
      </aside>
    </div>
  )
}


function accountLabel(identity) {
  return identity?.profile?.displayName
    || identity?.displayName
    || identity?.name
    || 'Account'
}

function AccountControl({ state, onLogin, onRegister, onLogout, onOpenAccount }) {
  if (state.status === 'authenticated') {
    return <div className="account-control is-authenticated">
      <button className="account-button" type="button" onClick={onOpenAccount} aria-label="Open My AeroVista">
        <UserRound size={16}/><span>{accountLabel(state.identity)}</span>
      </button>
      <button className="account-icon-button" type="button" onClick={onLogout} aria-label="Sign out of AeroVista Account" title="Sign out">
        <LogOut size={15}/>
      </button>
    </div>
  }

  return <div className="account-control" data-status={state.status}>
    <button className="account-button" type="button" onClick={onLogin}>
      <UserRound size={16}/><span>{state.status === 'loading' ? 'Account' : 'Sign in'}</span>
    </button>
    {state.status !== 'loading' && <button className="account-create-button" type="button" onClick={onRegister}>Create</button>}
  </div>
}

const ACCOUNT_SECTION_META = Object.freeze([
  { key: 'orders', label: 'Orders', note: 'Order status, tracking, and purchase history.', icon: Package },
  { key: 'closet', label: 'Closet', note: 'Pieces you own, derived from verified purchases.', icon: ShoppingBag },
  { key: 'saved', label: 'Saved', note: 'Keep pieces here and come back to them later.', icon: Heart },
  { key: 'fit', label: 'Fit', note: 'Your usual sizes and store-specific fit preferences.', icon: Ruler },
  { key: 'benefits', label: 'Benefits', note: 'Member access, private drops, and eligible offers.', icon: Gift },
])

function accountSectionEnabled(key) {
  if (key === 'closet') return accountFeatures.orders || accountFeatures.saved
  if (key === 'orders') return accountFeatures.orders
  if (key === 'saved') return accountFeatures.saved
  if (key === 'fit') return accountFeatures.fit
  if (key === 'benefits') return accountFeatures.benefits
  return false
}

function MyAeroVistaDrawer({
  identityState,
  summaryState,
  savedState,
  savedProducts,
  savedBusyId,
  onOpenSavedProduct,
  onRemoveSaved,
  onClose,
  onRefresh,
  onLogout,
}) {
  const summary = summaryState.data
  const displayName = summary?.identity?.displayName || accountLabel(identityState.identity)
  const summaryReady = summaryState.status === 'ready'

  return <div className="drawer-shell account-drawer-shell" role="dialog" aria-modal="true" aria-label="My AeroVista">
    <button className="drawer-scrim" onClick={onClose} aria-label="Close My AeroVista"/>
    <aside className="drawer account-drawer">
      <button className="icon-btn drawer-close" onClick={onClose} aria-label="Close My AeroVista"><X size={20}/></button>
      <div className="drawer-content account-drawer-content">
        <span className="eyebrow">MY AEROVISTA</span>
        <div className="account-drawer-heading">
          <div>
            <h2>{displayName || 'Your AeroVista'}</h2>
            <p>Your store follows you without turning Apparel into a second account system.</p>
          </div>
          <span className="account-connected"><span/>Connected</span>
        </div>

        {summaryState.status === 'loading' && <div className="account-summary-state">Loading your account benefits…</div>}
        {summaryState.status === 'error' && <div className="account-summary-state is-error">
          <span>Your account is connected, but benefit details are temporarily unavailable.</span>
          <button type="button" onClick={onRefresh}>Retry</button>
        </div>}

        <div className="account-benefit-grid">
          {ACCOUNT_SECTION_META.map(({ key, label, note, icon: Icon }) => {
            const enabled = accountSectionEnabled(key)
            const available = summaryReady && summary?.features?.[key]?.available === true
            const status = available && enabled ? 'Available' : enabled ? 'Connecting' : 'In build'
            return <section className="account-benefit-card" key={key} data-enabled={enabled ? 'true' : 'false'}>
              <div className="account-benefit-icon"><Icon size={18}/></div>
              <div className="account-benefit-copy">
                <div className="account-benefit-title"><b>{label}</b><span>{status}</span></div>
                <p>{note}</p>
              </div>
              <ChevronRight size={16} aria-hidden="true"/>
            </section>
          })}
        </div>

        {accountFeatures.saved && <section className="account-saved-preview" aria-label="Saved Pieces">
          <div className="account-saved-preview-head">
            <div><Heart size={15}/><b>Saved Pieces</b></div>
            <span>{savedState.status === 'ready' ? `${savedState.items.length} / 500` : savedState.status === 'loading' ? 'Loading' : 'Unavailable'}</span>
          </div>

          {savedState.status === 'error' && <p className="account-saved-empty">{savedState.error || 'Saved Pieces are temporarily unavailable.'}</p>}
          {savedState.status === 'ready' && savedProducts.length === 0 && <p className="account-saved-empty">Save pieces from the showroom and they’ll collect here.</p>}
          {savedState.status === 'ready' && savedProducts.length > 0 && <div className="account-saved-list">
            {savedProducts.slice(0, 8).map(({ item, product }) => <div className="account-saved-row" key={item.productId}>
              <button type="button" className="account-saved-open" onClick={() => product && onOpenSavedProduct(product)} disabled={!product}>
                <span>{product?.name || item.productId}</span>
                <small>{product?.collection || 'Saved piece'}</small>
              </button>
              <button
                type="button"
                className="account-saved-remove"
                aria-label={`Remove ${product?.name || item.productId} from Saved Pieces`}
                disabled={savedBusyId === item.productId}
                onClick={() => onRemoveSaved(item.productId)}
              ><X size={14}/></button>
            </div>)}
            {savedProducts.length > 8 && <div className="account-saved-more">+{savedProducts.length - 8} more saved pieces</div>}
          </div>}
        </section>}

        <div className="account-drawer-actions">
          <a href="https://account.aerocoreos.com/" className="account-profile-link">
            Profile & Account <ExternalLink size={14}/>
          </a>
          <button type="button" className="account-signout-link" onClick={onLogout}>
            <LogOut size={14}/> Sign out
          </button>
        </div>

        <small>Orders, payment, fulfillment, and member pricing stay authoritative in Commerce and Square. Apparel only shows customer-safe projections.</small>
      </div>
    </aside>
  </div>
}

function CollectionNav({ products, collection, onCollection, mobile = false }) {
  const collections = ['All', ...Array.from(new Set(products.map(product => product.collection)))]
  return <nav className={mobile ? 'mobile-collection-nav' : ''} aria-label="Collections">
    {collections.map(name => <button key={name} className={collection === name ? 'active' : ''} onClick={() => onCollection(name)} aria-pressed={collection === name}>{name === 'All' ? 'Shop all' : name}</button>)}
  </nav>
}

function StoreHeader({ products, bagCount, onBag, onExit, collection, onCollection, accountControl }) {
  return <header className="store-header">
    <button className="wordmark" onClick={onExit} aria-label="Return to the entry gallery"><span className="apex">/\\</span> AEROVISTA</button>
    <CollectionNav products={products} collection={collection} onCollection={onCollection}/>
    <div className="header-actions">
      {accountControl}
      <button className="bag-button" onClick={onBag} aria-label={`Shopping bag, ${bagCount} ${bagCount === 1 ? 'item' : 'items'}`}><ShoppingBag size={18}/>{bagCount > 0 && <span>{bagCount}</span>}</button>
    </div>
  </header>
}

const galleryDestinations = [
  { id: 'womens', direction: 'LEFT', name: "Women's Studio", note: 'A curated edit of women-specific and unisex pieces.', status: 'OPEN', live: true },
  { id: 'mens', direction: 'RIGHT', name: "Men's Gallery", note: 'Apparel, headwear and current editions.', status: 'OPEN', live: true },
  { id: 'place', direction: 'AHEAD', name: 'Place Line', note: 'Ridgeline, After Dark, Blue Divide, Source Code, MoonLine, Powderline, and Behind the Scenes.', status: 'OPEN', live: true },
  { id: 'objects', direction: 'IN GALLERY', name: 'Objects & Editions', note: 'Cards, cooler, and sticker editions on the center table.', status: 'ON VIEW', live: true },
]

function Foyer({ onOutside, onOpenMens, onOpenWomens, onOpenPlace, onOpenObjects, bagCount, onBag, accountControl }) {
  const openDestination = id => {
    if (id === 'womens') return onOpenWomens()
    if (id === 'place') return onOpenPlace()
    if (id === 'objects') return onOpenObjects()
    return onOpenMens()
  }
  return <section className="foyer space-arrive">
    <header className="foyer-header">
      <button className="wordmark" onClick={onOutside} aria-label="Return outside"><span className="apex">/\\</span> AEROVISTA</button>
      <span className="foyer-location">ENTRY GALLERY</span>
      <div className="foyer-actions">{accountControl}<button className="bag-button" onClick={onBag} aria-label={`Shopping bag, ${bagCount} ${bagCount === 1 ? 'item' : 'items'}`}><ShoppingBag size={18}/>{bagCount > 0 && <span>{bagCount}</span>}</button></div>
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
  { id: 'vespra-moonscript-hoodie', slot: 'left-mid', image: 'products/vespra-moonscript-hoodie/01-hero.webp' },
  { id: 'night-ranger-bear-pullover-hoodie', slot: 'left-far', image: 'products/night-ranger-bear-pullover-hoodie/01-hero.webp' },
  { id: 'aerovista-apex-pattern-print-swimsuit-one-piece', slot: 'right-near', image: 'products/aerovista-apex-pattern-print-swimsuit-one-piece/10-front-02.webp' },
  { id: 'aerovista-wave-mark-full-zip-hoodie-white', slot: 'right-mid', image: 'products/aerovista-wave-mark-full-zip-hoodie-white/01-hero.webp' },
  { id: 'shadow-wear-tactical-bomber-jacket-summit-edition', slot: 'right-far', image: 'products/shadow-wear-tactical-bomber-jacket-summit-edition/01-hero.webp' },
]

function WomenStudioPiece({ display, product, onOpen }) {
  if (!product) return null
  const image = display.image ? `${import.meta.env.BASE_URL}${display.image}` : product.image
  return <button className={`studio-piece studio-${display.slot}`} data-product={product.id} onClick={() => onOpen(product)} aria-label={`View ${product.name}`} aria-haspopup="dialog">
    <ProductImage product={product} image={image} stage/>
    <span className="studio-product-tag"><b>{product.shortName}</b><em>{priceLabel(product)}</em></span>
  </button>
}

function WomenStudio({ products, catalogState, onExit, onProduct, bagCount, onBag, accountControl }) {
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
      <span className="studio-location">WOMEN'S STUDIO · NOCTURNE EDIT</span>
      <div className="studio-actions">
        {accountControl}
        <button className="bag-button" onClick={onBag} aria-label={`Shopping bag, ${bagCount} ${bagCount === 1 ? 'item' : 'items'}`}><ShoppingBag size={18}/>{bagCount > 0 && <span>{bagCount}</span>}</button>
      </div>
    </header>
    <div className="women-studio-scene">
      <div className="women-studio-image" aria-hidden="true"/><div className="women-studio-shade" aria-hidden="true"/>
      <div className="studio-scene-label"><span className="eyebrow">WOMEN'S STUDIO</span><h1>The nocturne edit.</h1><p>Fluid silhouettes, moonlit graphics and selected AeroVista layers in a quieter gallery setting.</p></div>
      <button className="walk-back studio-walk-back" onClick={onExit}><ChevronLeft size={16}/> Entry Gallery</button>
      <div className="studio-fixture-layer">
        {womenStudioDisplays.map(display => <WomenStudioPiece key={display.id} display={display} product={productMap.get(display.id)} onOpen={onProduct}/>)}
        {featureProduct && <button className="studio-editorial" onClick={() => onProduct(featureProduct)} aria-label={`View ${featureProduct.name}`} aria-haspopup="dialog">
          <span className="studio-editorial-models" aria-hidden="true">
            <img src={`${import.meta.env.BASE_URL}products/aerovista-apex-pattern-print-swimsuit-one-piece/10-front-03.webp`} alt=""/>
            <img src={`${import.meta.env.BASE_URL}products/aerovista-apex-pattern-print-swimsuit-one-piece/10-front-04.webp`} alt=""/>
          </span>
          <span className="studio-editorial-caption">APEX PATTERN · SWIM</span>
        </button>}
      </div>
      <div className="studio-floor-status" role="status" aria-live="polite"><Sparkles size={13}/><span>{roomMessage}</span></div>
    </div>
    <section className="women-mobile-assortment" aria-label="Women's Studio opening edit">
      <div className="women-mobile-intro"><span className="eyebrow">NOCTURNE EDIT</span><h2>Women’s Studio</h2><p>Explore fluid silhouettes, moonlit graphics and selected unisex AeroVista layers.</p></div>
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

function Interior({ products, catalogState, onExit, onProduct, bagCount, onBag, view, onView, accountControl }) {
  const [collection, setCollection] = useState('All')
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
    <StoreHeader products={products} bagCount={bagCount} onBag={onBag} onExit={onExit} collection={collection} onCollection={setCollection} accountControl={accountControl}/>
    <div className={`interior-scene view-${view}`}>
      <div className="interior-image"/><div className="room-shade"/>
      <div className="scene-label"><span className="eyebrow">{currentView.label}</span><h1>{collection === 'All' ? 'Apparel & Objects' : collection}</h1><p>{currentView.note}</p></div>
      <button className="walk-back" onClick={onExit}><ChevronLeft size={16}/> Entry Gallery</button>
      {!compact && <div className="fixture-layer">{fixtures.filter(fixture => fixtureVisible(fixture, view)).map(fixture => <Fixture key={fixture.id} fixture={fixture} productMap={productMap} collection={collection} onOpen={onProduct}/>)}</div>}
      <ViewNav view={view} onView={onView}/>
      <div className="center-prompt floor-status" data-status={catalogState.status} role="status" aria-live="polite"><Sparkles size={14}/><span>{floorMessage}</span></div>
    </div>
    {compact && <MobileStore products={products} productMap={productMap} collection={collection} onCollection={setCollection} onProduct={onProduct} catalogState={catalogState}/>} 
  </section>
}

function readStoreRoute() {
  const params = new URLSearchParams(window.location.search)
  const space = ['foyer', 'mens', 'womens'].includes(params.get('space')) ? params.get('space') : 'outside'
  const view = spaceViews.some(item => item.id === params.get('view')) ? params.get('view') : 'room'
  const checkout = params.get('checkout') === 'success' || params.get('checkout') === 'cancel' ? params.get('checkout') : ''
  return { space, view, product: params.get('product') || '', checkout }
}

function App() {
  const initialRoute = useMemo(() => (typeof window === 'undefined' ? { space: 'outside', view: 'room', product: '', checkout: '' } : readStoreRoute()), [])
  const [space, setSpace] = useState(initialRoute.space)
  const [mensView, setMensView] = useState(initialRoute.view)
  const [entering, setEntering] = useState(false)
  const [selected, setSelected] = useState(null)
  const [bagOpen, setBagOpen] = useState(false)
  const [bag, setBag] = useState([])
  const [showroomProducts, setShowroomProducts] = useState([])
  const [womenStudioProducts, setWomenStudioProducts] = useState([])
  const [catalogState, setCatalogState] = useState({ status: 'idle', visibleCatalogCount: 0, showroomCount: 0 })
  const [checkoutBusy, setCheckoutBusy] = useState(false)
  const [checkoutError, setCheckoutError] = useState('')
  const [checkoutNotice, setCheckoutNotice] = useState(initialRoute.checkout)
  const [pendingProduct, setPendingProduct] = useState(initialRoute.product)
  const [routeReady, setRouteReady] = useState(false)
  const [identityState, setIdentityState] = useState({ status: 'loading', authenticated: false, identity: null, csrfToken: null, error: null })
  const [accountOpen, setAccountOpen] = useState(false)
  const [accountSummaryState, setAccountSummaryState] = useState({ status: 'idle', data: null, error: null })
  const [savedState, setSavedState] = useState({ status: 'idle', items: [], error: null })
  const [savedBusyId, setSavedBusyId] = useState('')
  const savedIds = useMemo(
    () => new Set(savedState.items.map(item => item.productId)),
    [savedState.items],
  )
  const productById = useMemo(
    () => new Map([...showroomProducts, ...womenStudioProducts].map(product => [product.id, product])),
    [showroomProducts, womenStudioProducts],
  )
  const savedProducts = useMemo(
    () => savedState.items.map(item => ({ item, product: productById.get(item.productId) || null })),
    [savedState.items, productById],
  )
  const commercePromiseRef = useRef(null)
  const logoutPromiseRef = useRef(null)

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
    let active = true
    loadIdentitySession()
      .then(session => {
        if (!active) return
        if (session?.authenticated) {
          setIdentityState({
            status: 'authenticated',
            authenticated: true,
            identity: session.identity || null,
            csrfToken: session.csrfToken || null,
            error: null,
          })
        } else {
          setIdentityState({ status: 'anonymous', authenticated: false, identity: null, csrfToken: null, error: null })
        }
      })
      .catch(error => {
        if (!active) return
        setIdentityState({
          status: 'unavailable',
          authenticated: false,
          identity: null,
          csrfToken: null,
          error: error?.message || 'Account service unavailable',
        })
      })
      .finally(() => {
        if (!active) return
        const url = new URL(window.location.href)
        if (url.searchParams.has('auth')) {
          url.searchParams.delete('auth')
          window.history.replaceState(window.history.state, '', url)
        }
      })
    return () => { active = false }
  }, [])

  useEffect(() => {
    let active = true

    if (!accountFeatures.saved || identityState.status !== 'authenticated') {
      if (identityState.status !== 'loading') {
        setSavedState({ status: 'idle', items: [], error: null })
      }
      return () => { active = false }
    }

    setSavedState(current => ({ ...current, status: 'loading', error: null }))
    loadSavedPieces()
      .then(payload => {
        if (!active) return
        setSavedState({
          status: 'ready',
          items: Array.isArray(payload?.items) ? payload.items : [],
          error: null,
        })
      })
      .catch(error => {
        if (!active) return
        setSavedState({
          status: 'error',
          items: [],
          error: error?.message || 'Saved Pieces unavailable',
        })
      })

    return () => { active = false }
  }, [identityState.status])

  useEffect(() => {
    if (initialRoute.space !== 'outside') warmCommerce()
    setRouteReady(true)
    const onPop = () => {
      const route = readStoreRoute()
      setSpace(route.space)
      setMensView(route.view)
      setCheckoutNotice(route.checkout)
      setPendingProduct(route.product)
      if (route.space !== 'outside') warmCommerce()
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    if (!routeReady) return undefined
    const params = new URLSearchParams(window.location.search)
    if (space === 'outside') {
      params.delete('space')
      params.delete('view')
      params.delete('product')
    } else {
      params.set('space', space)
      if (space === 'mens') params.set('view', mensView)
      else params.delete('view')
      if (selected?.id) params.set('product', selected.id)
      else if (!pendingProduct) params.delete('product')
    }
    const next = params.toString()
    const current = window.location.search.replace(/^\?/, '')
    if (next === current) return undefined
    const url = next ? `${window.location.pathname}?${next}` : window.location.pathname
    window.history.pushState({ space, view: mensView }, '', url)
    return undefined
  }, [space, mensView, selected, pendingProduct, routeReady])

  useEffect(() => {
    if (!pendingProduct) return undefined
    const product = [...showroomProducts, ...womenStudioProducts].find(item => item.id === pendingProduct)
    if (!product) return undefined
    setSelected(product)
    setPendingProduct('')
    return undefined
  }, [pendingProduct, showroomProducts, womenStudioProducts])

  useEffect(() => {
    const modalOpen = Boolean(selected || bagOpen || accountOpen)
    if (!modalOpen) return undefined
    const priorOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return
      setSelected(null)
      setBagOpen(false)
      setAccountOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = priorOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [selected, bagOpen, accountOpen])

  function enter() {
    if (entering) return
    warmCommerce()
    setEntering(true)
    window.setTimeout(() => { setSpace('foyer'); setEntering(false) }, 680)
  }
  function goOutside() { setSelected(null); setBagOpen(false); setSpace('outside') }
  function openMensGallery(view = 'room') { warmCommerce(); setMensView(view); setSpace('mens') }
  function openWomensStudio() { warmCommerce(); setSpace('womens') }
  function returnToFoyer() { setSelected(null); setBagOpen(false); setSpace('foyer') }
  function add(product, size, variant) {
    setBag(current => [...current, { product, size, variant, quantity: 1 }])
    setSelected(null); setCheckoutError(''); setBagOpen(true)
  }

  async function toggleSavedPiece(product) {
    if (!accountFeatures.saved || !product?.id) return
    if (identityState.status !== 'authenticated') {
      beginIdentityLogin()
      return
    }
    if (savedBusyId) return

    const productId = product.id
    const isSaved = savedIds.has(productId)
    setSavedBusyId(productId)
    setSavedState(current => ({ ...current, error: null }))

    try {
      if (isSaved) {
        await removeSavedPiece(productId, identityState.csrfToken)
        setSavedState(current => ({
          status: 'ready',
          items: current.items.filter(item => item.productId !== productId),
          error: null,
        }))
      } else {
        const payload = await savePiece(productId, identityState.csrfToken)
        const item = payload?.item || { productId, savedAt: new Date().toISOString() }
        setSavedState(current => ({
          status: 'ready',
          items: [item, ...current.items.filter(existing => existing.productId !== productId)],
          error: null,
        }))
      }
    } catch (error) {
      setSavedState(current => ({
        ...current,
        status: 'error',
        error: error?.message || 'Saved Pieces unavailable',
      }))
    } finally {
      setSavedBusyId('')
    }
  }

  async function removeSavedById(productId) {
    if (!accountFeatures.saved || identityState.status !== 'authenticated' || savedBusyId) return
    setSavedBusyId(productId)
    setSavedState(current => ({ ...current, error: null }))
    try {
      await removeSavedPiece(productId, identityState.csrfToken)
      setSavedState(current => ({
        status: 'ready',
        items: current.items.filter(item => item.productId !== productId),
        error: null,
      }))
    } catch (error) {
      setSavedState(current => ({
        ...current,
        status: 'error',
        error: error?.message || 'Saved Pieces unavailable',
      }))
    } finally {
      setSavedBusyId('')
    }
  }

  function openSavedProduct(product) {
    if (!product) return
    setAccountOpen(false)
    setSelected(product)
  }

  async function refreshAccountSummary() {
    if (identityState.status !== 'authenticated') return
    setAccountSummaryState(current => ({ ...current, status: 'loading', error: null }))
    try {
      const summary = await loadAccountSummary()
      setAccountSummaryState({ status: 'ready', data: summary, error: null })
    } catch (error) {
      setAccountSummaryState(current => ({
        status: 'error',
        data: current.data,
        error: error?.message || 'Account summary unavailable',
      }))
    }
  }

  function openAccountHub() {
    if (!accountFeatures.hub) {
      window.location.assign('https://account.aerocoreos.com/')
      return
    }
    setAccountOpen(true)
    if (accountSummaryState.status === 'idle' || accountSummaryState.status === 'error') {
      void refreshAccountSummary()
    }
  }

  async function signOut() {
    if (identityState.status !== 'authenticated') return
    if (logoutPromiseRef.current) return logoutPromiseRef.current

    const csrfToken = identityState.csrfToken
    setIdentityState(current => ({ ...current, error: null }))

    const request = (async () => {
      try {
        await logoutIdentity(csrfToken)
        setIdentityState(current => (
          current.csrfToken === csrfToken
            ? { status: 'anonymous', authenticated: false, identity: null, csrfToken: null, error: null }
            : current
        ))
        setAccountOpen(false)
        setAccountSummaryState({ status: 'idle', data: null, error: null })
        setSavedState({ status: 'idle', items: [], error: null })
        setSavedBusyId('')
      } catch (error) {
        setIdentityState(current => {
          if (current.status !== 'authenticated' || current.csrfToken !== csrfToken) return current
          return {
            ...current,
            error: error?.message || 'Sign out failed. Your account session is still active.',
          }
        })
      } finally {
        logoutPromiseRef.current = null
      }
    })()

    logoutPromiseRef.current = request
    return request
  }

  const accountControl = <AccountControl
    state={identityState}
    onLogin={() => beginIdentityLogin()}
    onRegister={() => beginIdentityRegistration()}
    onLogout={signOut}
    onOpenAccount={openAccountHub}
  />

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
    {identityState.status === 'authenticated' && identityState.error && <div className="identity-notice" role="alert">
      <span>Couldn’t sign out. Your account session is still active.</span>
      <button type="button" onClick={() => setIdentityState(current => ({ ...current, error: null }))}>Dismiss</button>
    </div>}
    {checkoutNotice && <div className="checkout-return" role="status">
      <p>{checkoutNotice === 'success'
        ? 'You came back from checkout. This return is not payment proof. An order is confirmed only after Square verifies payment.'
        : 'Checkout was canceled. Nothing was paid, and no promotion was redeemed.'}</p>
      <p>{fulfillmentNote}</p>
      <button type="button" onClick={() => setCheckoutNotice('')}>Dismiss</button>
    </div>}
    {space === 'outside' && <Exterior entering={entering} onEnter={enter} onWarm={warmCommerce}/>}
    {space === 'foyer' && <Foyer onOutside={goOutside} onOpenMens={() => openMensGallery('room')} onOpenWomens={openWomensStudio} onOpenPlace={() => openMensGallery('place')} onOpenObjects={() => openMensGallery('objects')} bagCount={bag.length} onBag={() => setBagOpen(true)} accountControl={accountControl}/>} 
    {space === 'mens' && <Interior products={showroomProducts} catalogState={catalogState} onExit={returnToFoyer} onProduct={setSelected} bagCount={bag.length} onBag={() => setBagOpen(true)} view={mensView} onView={setMensView} accountControl={accountControl}/>} 
    {space === 'womens' && <WomenStudio products={womenStudioProducts} catalogState={catalogState} onExit={returnToFoyer} onProduct={setSelected} bagCount={bag.length} onBag={() => setBagOpen(true)} accountControl={accountControl}/>} 
    <ProductDrawer
      product={selected}
      onClose={() => setSelected(null)}
      onAdd={add}
      savedEnabled={accountFeatures.saved}
      saved={Boolean(selected?.id && savedIds.has(selected.id))}
      savedBusy={Boolean(selected?.id && savedBusyId === selected.id)}
      authenticated={identityState.status === 'authenticated'}
      onToggleSaved={toggleSavedPiece}
      onLogin={() => beginIdentityLogin()}
    />
    {bagOpen && <BagDrawer bag={bag} onClose={() => setBagOpen(false)} onRemove={index => setBag(current => current.filter((_, i) => i !== index))} onCheckout={checkout} checkoutBusy={checkoutBusy} checkoutError={checkoutError}/>} 
    {accountOpen && identityState.status === 'authenticated' && <MyAeroVistaDrawer
      identityState={identityState}
      summaryState={accountSummaryState}
      savedState={savedState}
      savedProducts={savedProducts}
      savedBusyId={savedBusyId}
      onOpenSavedProduct={openSavedProduct}
      onRemoveSaved={removeSavedById}
      onClose={() => setAccountOpen(false)}
      onRefresh={refreshAccountSummary}
      onLogout={signOut}
    />}
  </main>
}

createRoot(document.getElementById('root')).render(<App/>)
