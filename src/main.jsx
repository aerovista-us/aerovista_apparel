import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowRight, ShoppingBag, ChevronLeft, DoorOpen, Layers3, Minus,
  Search, Sparkles, X
} from 'lucide-react'
import { products } from './data/products'
import { fixtures } from './data/fixtures'
import './styles.css'

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
const productMap = new Map(products.map(product => [product.id, product]))

function GarmentArt({ type, accent = '#00AEEF' }) {
  const common = { fill: '#111419', stroke: '#c8cbd0', strokeWidth: 1.5 }
  const gradientId = `g-${type}`
  return (
    <svg className="garment-art" viewBox="0 0 180 180" role="img" aria-label={`${type} image placeholder`}>
      <defs>
        <linearGradient id={gradientId} x1="0" x2="1">
          <stop offset="0" stopColor="#20242b" />
          <stop offset="1" stopColor="#080a0d" />
        </linearGradient>
      </defs>
      {type === 'hoodie' && <>
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
      {type === 'jogger' && <>
        <path d="M63 30h54l-4 38-10 82H82L90 74l-12 76H57L64 68Z" fill={`url(#${gradientId})`} stroke="#c8cbd0" strokeWidth="2"/>
        <path d="M65 42h50" stroke={accent}/>
      </>}
      {type === 'cap' && <>
        <path d="M48 96 Q54 45 92 42 Q132 43 137 91 Q98 83 48 96Z" fill={`url(#${gradientId})`} stroke="#c8cbd0" strokeWidth="2"/>
        <path d="M79 93 Q117 82 155 100 Q121 116 79 104Z" fill="#101318" stroke="#aeb4ba" strokeWidth="2"/><path d="M62 78 Q92 62 126 78" fill="none" stroke={accent}/>
      </>}
      {type === 'deck' && <rect x="55" y="24" width="70" height="132" rx="7" fill="#0d1014" stroke="#c8cbd0" strokeWidth="2"/>}
      <circle cx="90" cy="90" r="70" fill="none" stroke={accent} opacity=".08" />
    </svg>
  )
}

function ProductImage({ product, large = false, stage = false }) {
  const style = product.display?.objectPosition ? { objectPosition: product.display.objectPosition } : undefined
  return (
    <div className={`product-image ${large ? 'large' : ''} ${stage ? 'stage' : ''}`}>
      {product.image
        ? <img src={product.image} alt={product.name} style={style} />
        : <GarmentArt type={product.type} accent={product.accent} />}
      {!product.image && !stage && <span className="replace-label">IMAGE SLOT</span>}
    </div>
  )
}

function MerchItem({ product, slot, onOpen }) {
  const style = {
    left: `${slot.x}%`,
    top: `${slot.y}%`,
    '--item-scale': slot.scale ?? 1,
    '--item-tilt': `${slot.tilt ?? 0}deg`,
    '--accent': product.accent,
  }
  return (
    <button className={`merch-item merch-${product.type}`} style={style} onClick={() => onOpen(product)} aria-label={`View ${product.name}`}>
      <span className="merch-object"><ProductImage product={product} stage /></span>
      <span className="merch-pin" />
      <span className="merch-tag"><b>{product.shortName}</b><em>{money.format(product.price)}</em></span>
    </button>
  )
}

function FixtureShell({ fixture, children, showMap }) {
  const style = {
    left: `${fixture.position.x}%`, top: `${fixture.position.y}%`,
    width: `${fixture.position.w}%`, height: `${fixture.position.h}%`,
  }
  return (
    <div className={`fixture fixture-${fixture.type} ${showMap ? 'show-map' : ''}`} style={style}>
      <div className="fixture-structure" aria-hidden="true">
        {fixture.type === 'wall-rack' && <><i className="rail"/><i className="rack-leg a"/><i className="rack-leg b"/></>}
        {fixture.type === 'hero-mannequin' && <><i className="mannequin-head"/><i className="mannequin-stand"/></>}
        {fixture.type === 'table-stack' && <><i className="table-top"/><i className="table-base"/></>}
        {fixture.type === 'hat-shelf' && <><i className="shelf a"/><i className="shelf b"/></>}
        {fixture.type === 'accessories-case' && <><i className="case-glass"/><i className="case-base"/></>}
      </div>
      {children}
      <span className="fixture-label">{fixture.label}</span>
    </div>
  )
}

function Fixture({ fixture, collection, onOpen, showMap }) {
  const items = fixture.slots
    .map(slot => ({ slot, product: productMap.get(slot.productId) }))
    .filter(({ product }) => product && (collection === 'All' || product.collection === collection))
  if (!items.length) return null
  return (
    <FixtureShell fixture={fixture} showMap={showMap}>
      {items.map(({ product, slot }, index) => <MerchItem key={`${fixture.id}-${product.id}-${index}`} product={product} slot={slot} onOpen={onOpen}/>) }
    </FixtureShell>
  )
}

function ProductDrawer({ product, onClose, onAdd }) {
  const [size, setSize] = useState(product?.sizes?.[0] ?? '')
  useEffect(() => setSize(product?.sizes?.[0] ?? ''), [product])
  if (!product) return null
  return (
    <div className="drawer-shell" role="dialog" aria-modal="true" aria-label={product.name}>
      <button className="drawer-scrim" onClick={onClose} aria-label="Close product" />
      <aside className="drawer">
        <button className="icon-btn drawer-close" onClick={onClose}><X size={20}/></button>
        <ProductImage product={product} large />
        <div className="drawer-content">
          <span className="eyebrow">{product.collection}</span>
          <h2>{product.name}</h2>
          <p className="price">{money.format(product.price)}</p>
          <p>{product.description}</p>
          <div className="selector">
            <span>Size / format</span>
            <div className="chips">{product.sizes.map(s => <button key={s} onClick={() => setSize(s)} className={size === s ? 'active' : ''}>{s}</button>)}</div>
          </div>
          <button className="primary wide" onClick={() => onAdd(product, size)}>Add to bag <ShoppingBag size={17}/></button>
          <small>Merchandising is fixture-driven. Replacing this product image does not require changing the room or fixture layout.</small>
        </div>
      </aside>
    </div>
  )
}

function BagDrawer({ bag, onClose, onRemove }) {
  const total = bag.reduce((sum, item) => sum + item.product.price, 0)
  return (
    <div className="drawer-shell" role="dialog" aria-modal="true" aria-label="Shopping bag">
      <button className="drawer-scrim" onClick={onClose} aria-label="Close bag" />
      <aside className="drawer bag-drawer">
        <button className="icon-btn drawer-close" onClick={onClose}><X size={20}/></button>
        <div className="drawer-content bag-content">
          <span className="eyebrow">AEROVISTA STORE</span><h2>Your bag</h2>
          {bag.length === 0 ? <p className="empty">Nothing here yet. Walk the floor and select an item.</p> : bag.map((item, index) => (
            <div className="bag-row" key={`${item.product.id}-${index}`}>
              <ProductImage product={item.product}/>
              <div><b>{item.product.shortName}</b><span>{item.size}</span><span>{money.format(item.product.price)}</span></div>
              <button className="icon-btn" onClick={() => onRemove(index)}><Minus size={15}/></button>
            </div>
          ))}
          <div className="bag-total"><span>Total</span><b>{money.format(total)}</b></div>
          <button className="primary wide" disabled={!bag.length}>Checkout prototype <ArrowRight size={17}/></button>
        </div>
      </aside>
    </div>
  )
}

function StoreHeader({ bagCount, onBag, onExit, collection, onCollection, showMap, onMap }) {
  const collections = ['All', 'Core', 'Shadow Wear', 'DockLife', 'Apex']
  return <header className="store-header">
    <button className="wordmark" onClick={onExit}><span className="apex">/\\</span> AEROVISTA</button>
    <nav>{collections.map(name => <button key={name} className={collection === name ? 'active' : ''} onClick={() => onCollection(name)}>{name === 'All' ? 'Shop all' : name}</button>)}</nav>
    <div className="header-actions">
      <button className={`icon-btn map-toggle ${showMap ? 'active' : ''}`} onClick={onMap} aria-label="Toggle fixture map" title="Fixture map"><Layers3 size={18}/></button>
      <button className="icon-btn" aria-label="Search"><Search size={18}/></button>
      <button className="bag-button" onClick={onBag}><ShoppingBag size={18}/><span>{bagCount}</span></button>
    </div>
  </header>
}

function Exterior({ entering, onEnter }) {
  return <section className={`exterior ${entering ? 'entering' : ''}`}>
    <div className="exterior-image" />
    <div className="vignette" />
    <div className="brand-plaque"><span>THE AEROVISTA STORE</span><small>COEUR D'ALENE · PROTOTYPE 02</small></div>
    <button className="door-hit" onClick={onEnter} aria-label="Enter AeroVista Store"><span><DoorOpen size={20}/> Enter store</span></button>
    <div className="outside-copy"><span className="eyebrow">A PHYSICAL-DIGITAL STOREFRONT</span><h1>Walk in.<br/>Look around.</h1><p>A real-room shopping concept where products are merchandised onto reusable racks, tables, shelves and displays.</p></div>
    <div className="outside-foot"><span>SEVEN DIVISIONS · ONE VISION</span><span>Click the front door to enter</span></div>
  </section>
}

function Interior({ onExit, onProduct, bagCount, onBag }) {
  const [collection, setCollection] = useState('All')
  const [showMap, setShowMap] = useState(false)
  const visibleProducts = useMemo(() => products.filter(product => collection === 'All' || product.collection === collection), [collection])
  return <section className="interior">
    <StoreHeader bagCount={bagCount} onBag={onBag} onExit={onExit} collection={collection} onCollection={setCollection} showMap={showMap} onMap={() => setShowMap(value => !value)}/>
    <div className="interior-scene">
      <div className="interior-image" />
      <div className="room-shade" />
      <div className="scene-label"><span className="eyebrow">STORE FLOOR · 01</span><h1>{collection === 'All' ? 'Apparel & Objects' : collection}</h1><p>{visibleProducts.length} live product modules · click the merchandise itself.</p></div>
      <button className="walk-back" onClick={onExit}><ChevronLeft size={16}/> Outside</button>
      <div className={`fixture-layer ${showMap ? 'map-on' : ''}`}>
        {fixtures.map(fixture => <Fixture key={fixture.id} fixture={fixture} collection={collection} onOpen={onProduct} showMap={showMap}/>) }
      </div>
      <div className="center-prompt"><Sparkles size={14}/><span>Click a garment or object to pick it up</span></div>
      <div className={`map-note ${showMap ? 'visible' : ''}`}><Layers3 size={14}/><span>Fixture map is a prototype merchandising tool. Customer view is clean by default.</span></div>
    </div>
    <section className="mobile-merch">
      <div className="mobile-title"><span className="eyebrow">BROWSE THE FLOOR</span><h2>{collection === 'All' ? 'Current pieces' : collection}</h2></div>
      <div className="mobile-grid">{visibleProducts.map(product => <button className="mobile-card" key={product.id} onClick={() => onProduct(product)}><ProductImage product={product}/><span><b>{product.shortName}</b><em>{money.format(product.price)}</em></span></button>)}</div>
    </section>
  </section>
}

function App() {
  const [inside, setInside] = useState(false)
  const [entering, setEntering] = useState(false)
  const [selected, setSelected] = useState(null)
  const [bagOpen, setBagOpen] = useState(false)
  const [bag, setBag] = useState([])

  function enter() {
    setEntering(true)
    window.setTimeout(() => { setInside(true); setEntering(false) }, 1050)
  }
  function leave() { setSelected(null); setBagOpen(false); setInside(false) }
  function add(product, size) { setBag(current => [...current, { product, size }]); setSelected(null); setBagOpen(true) }

  return <main className="app">
    {!inside ? <Exterior entering={entering} onEnter={enter}/> : <Interior onExit={leave} onProduct={setSelected} bagCount={bag.length} onBag={() => setBagOpen(true)}/>} 
    <ProductDrawer product={selected} onClose={() => setSelected(null)} onAdd={add}/>
    {bagOpen && <BagDrawer bag={bag} onClose={() => setBagOpen(false)} onRemove={index => setBag(current => current.filter((_, i) => i !== index))}/>} 
  </main>
}

createRoot(document.getElementById('root')).render(<App/>)