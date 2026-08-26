// Merchandise registry.
// Products own WHAT they are. Fixtures own WHERE they appear in the store.
// Prices are intentionally null until real commerce pricing is supplied.
const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

const apparelSizes = ['S','M','L','XL','2XL']
const hatSizes = ['Adjustable']
const preview = (name, shortName, type, collection, image, accent = '#00AEEF', sizes = apparelSizes, description = '') => ({
  id: image.replace(/^.*\//, '').replace(/\.[^.]+$/, ''),
  name,
  shortName,
  type,
  price: null,
  collection,
  image: asset(image),
  accent,
  description: description || `${name} from the AeroVista apparel archive. Prototype merchandising entry; final product copy and pricing pending.`,
  colors: [],
  sizes,
  display: { objectPosition: '50% 50%' },
})

export const products = [
  preview('AeroVista Core Tee', 'Core Tee', 'tee', 'Core', 'products/core-tee-black.png'),
  preview('AeroVista Divisions Hoodie', 'Divisions Hoodie', 'hoodie', 'Core', 'products/aerovista-divisions-hoodie.png'),

  preview('AeroVista Apex Glitch Tee — Black', 'Apex Glitch Tee', 'tee', 'Apex', 'products/apex-glitch-tee-black.png'),
  {
    ...preview('AeroVista Apex Pattern Hoodie', 'Apex Pattern Hoodie', 'hoodie', 'Apex', 'products/apex-pattern-hoodie.png'),
    gallery: [asset('products/apex-pattern-hoodie-alt.png')],
  },
  preview('AeroVista Apex Signal Sweatshirt', 'Signal Sweatshirt', 'sweatshirt', 'Apex', 'products/apex-signal-sweatshirt.png'),
  preview('AeroVista Apex Vintage Tee', 'Apex Vintage Tee', 'tee', 'Apex', 'products/apex-vintage-tee.png'),
  preview('AeroVista Apex Shadow Long Sleeve', 'Shadow Long Sleeve', 'long-sleeve', 'Shadow Wear', 'products/apex-shadow-long-sleeve.png', '#777E86'),
  preview('Apex Embroidered Hat — Black', 'Apex Hat', 'cap', 'Apex', 'products/apex-embroidered-hat-black.png', '#C0C0C0', hatSizes),
  preview('AeroVista Apex Camo Flexfit Hat', 'Apex Camo Hat', 'cap', 'Apex', 'products/apex-camo-flexfit-hat.png', '#8A9187', hatSizes),
  preview('Glitch Orbit Logo Cap — Black', 'Glitch Orbit Cap', 'cap', 'Apex', 'products/glitch-orbit-cap-black.png', '#AEB4BA', hatSizes),
  preview('Glitched Orbit Gray Hat', 'Orbit Gray Hat', 'cap', 'Apex', 'products/glitch-orbit-cap-gray.png', '#9CA3AA', hatSizes),

  preview('Architect Field Issue Tee — Black', 'Field Issue Tee', 'tee', 'Architect', 'products/architect-field-issue-tee-black.png', '#D5D7DA'),
  preview('Architect Field Issue Tee — Ash', 'Field Issue Tee — Ash', 'tee', 'Architect', 'products/architect-field-issue-tee-ash.png', '#C9C3B7'),
  preview('Architect Built Different Hoodie', 'Built Different Hoodie', 'hoodie', 'Architect', 'products/architect-built-different-hoodie.png', '#D0D2D4'),
  preview('Drafted A Premium Sweatshirt', 'Drafted A Sweatshirt', 'sweatshirt', 'Architect', 'products/drafted-a-premium-sweatshirt.png', '#D0D2D4'),
  preview('Drafted A Snapback', 'Drafted A Snapback', 'cap', 'Architect', 'products/drafted-a-snapback.png', '#D0D2D4', hatSizes),

  preview('Vespera Moonscript Hoodie', 'Moonscript Hoodie', 'hoodie', 'Vespera', 'products/vespera-moonscript-hoodie.png', '#B8B2C8'),
  preview('SoundGoat Hoodie', 'SoundGoat Hoodie', 'hoodie', 'EchoVerse', 'products/soundgoat-hoodie.png', '#9FD279'),
  preview('Powder Peaks V2', 'Powder Peaks', 'hoodie', 'Shadow Wear', 'products/powder-peaks-v2.png', '#B6C2CA'),

  {
    id: 'apex-relic-deck',
    name: 'AeroVista Apex Relic Playing Cards',
    shortName: 'Apex Relic Deck',
    type: 'deck',
    price: 28,
    collection: 'Apex',
    image: asset('products/apex-relic.svg'),
    accent: '#00AEEF',
    description: 'A premium collectible deck built around AeroVista’s Apex system and Seven Divisions, One Vision.',
    colors: ['Apex Relic'],
    sizes: ['Poker Size'],
    display: { objectPosition: '50% 50%' },
  },
]
