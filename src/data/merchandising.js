// Spatial merchandising only.
// Every ID below is a canonical product ID from AeroVista's commerce catalog.
// This file decides WHERE a real product appears, never WHAT the product is.

export const productPresentation = Object.freeze({
  // Left wall: tees, bombers and bottoms.
  'aerovista-apex-vintage-tee': { shortName: 'Apex Vintage Tee', accent: '#00AEEF' },
  'aerovista-apex-glitch-tee-black': { shortName: 'Apex Glitch Tee', accent: '#00AEEF' },
  'architect-field-issue-tee-black': { shortName: 'Field Issue Tee', accent: '#D5D7DA' },
  'aerovista-core-tee': { shortName: 'Core Tee', accent: '#00AEEF' },
  'shadow-wear-tactical-bomber-jacket-summit-edition': { shortName: 'Summit Bomber', accent: '#777E86' },
  'aerovista-apex-pattern-bomber-jacket': { shortName: 'Apex Pattern Bomber', accent: '#777E86', display: { stageImageSuffix: '/10-front-02.webp', objectPosition: '50% 50%' } },
  'shadow-pants': { shortName: 'Shadow Pants', accent: '#777E86', type: 'bottom' },
  'men-s-ghost-shorts': { shortName: 'Ghost Shorts', accent: '#777E86', type: 'bottom' },

  // Right wall: hoodies.
  'aerovista-shadow-pattern-hoodie': { shortName: 'Shadow Pattern Hoodie', accent: '#777E86' },
  'architect-built-different-hoodie-black': { shortName: 'Built Different Hoodie', accent: '#D0D2D4' },
  'aerovista-core-hoodie': { shortName: 'Core Hoodie', accent: '#00AEEF' },
  'aerovista-division-hoodie': { shortName: 'Division Hoodie', accent: '#00AEEF' },
  'aerovista-apex-draft-full-zip-hoodie-black': { shortName: 'Apex Draft Zip Hoodie', accent: '#AEB4BA' },
  'aerovista-apex-draft-pullover-hoodie-black': { shortName: 'Apex Draft Hoodie', accent: '#AEB4BA' },
  'aerovista-the-blue-witness-urban-hoodie-black': { shortName: 'Blue Witness Hoodie', accent: '#00AEEF' },

  // Headwear.
  'aerovista-premium-embroidered-hat-black-cap-with-signature-apex-mark': { shortName: 'Apex Hat', accent: '#C0C0C0' },
  'aerovista-apex-camo-flexfit-hat': { shortName: 'Apex Camo Hat', accent: '#8A9187' },
  'glitch-orbit-logo-black': { shortName: 'Glitch Orbit Cap', accent: '#AEB4BA', image: '/products/glitch-orbit-cap-black.png' },
  'aerovista-apex-mesh-trucker-cap': { shortName: 'Apex Mesh Cap', accent: '#D0D2D4' },
  'docklife-drip-osprey-rope-cap': { shortName: 'Docklife Osprey Cap', accent: '#8FBDB7' },

  // Objects.
  'aerovista-apex-relic-playing-cards': { shortName: 'Apex Relic Deck', accent: '#00AEEF' },
  'aerovista-apex-mark-draft-series-s01-sticker': {
    shortName: 'Apex Draft Sticker', accent: '#C0C4C8', type: 'sticker', collection: 'Architect',
    fallback: {
      name: 'AeroVista Apex Mark — Draft Series S01 Sticker',
      images: [
        '/products/aerovista-apex-mark-draft-series-s01-sticker/01-hero.webp',
        '/products/aerovista-apex-mark-draft-series-s01-sticker/60-alternate-01.webp',
        '/products/aerovista-apex-mark-draft-series-s01-sticker/60-alternate-02.webp',
      ],
    },
  },
  'billygoat-sticker': {
    shortName: 'BillyGoat Sticker', accent: '#92B85A', type: 'sticker', collection: 'Accessories',
    fallback: {
      name: 'BillyGoat Sticker',
      images: [
        '/products/billygoat-sticker/01-hero.webp',
        '/products/billygoat-sticker/60-alternate-01.webp',
        '/products/billygoat-sticker/60-alternate-02.webp',
      ],
    },
  },
  'holographic-stickers': {
    shortName: 'Holographic Goat', accent: '#9DE8D2', type: 'sticker', collection: 'Accessories',
    fallback: {
      name: 'Holographic stickers',
      images: [
        '/products/holographic-stickers/01-hero.webp',
        '/products/holographic-stickers/10-front-01.webp',
        '/products/holographic-stickers/10-front-02.webp',
        '/products/holographic-stickers/10-front-03.webp',
      ],
    },
  },
  'can-cooler': { shortName: 'Pattern Can Cooler', accent: '#AEB4BA', type: 'cooler', collection: 'Accessories', display: { stageImageSuffix: '/10-front-01.webp', objectPosition: '50% 50%' } },
})

export const showroomProductIds = Object.freeze(Object.keys(productPresentation))

// Editorial images that have been approved locally but are not yet present in
// the legacy Gear catalog export. Keeping this separate from productPresentation
// prevents future-room products from being added to the current showroom merely
// because their gallery received a new photograph.
export const productGalleryAdditions = Object.freeze({
  'shadow-wear-tactical-bomber-jacket-summit-edition': [
    '/products/shadow-wear-tactical-bomber-jacket-summit-edition/bomber-summit.png',
    '/products/shadow-wear-tactical-bomber-jacket-summit-edition/bomber-summit-f.png',
    '/products/shadow-wear-tactical-bomber-jacket-summit-edition/bomber-summit-m.png',
  ],
  'aerovista-apex-pattern-print-swimsuit-one-piece': [
    '/products/aerovista-apex-pattern-print-swimsuit-one-piece/swimsuit.png',
  ],
})

export const retailZones = Object.freeze([
  {
    id: 'tees-outerwear-wall',
    label: 'Tees & Bombers',
    note: 'Tees take the upper rail; bombers and Shadow Wear bottoms anchor the lower display.',
    kind: 'wall',
    productIds: [
      'aerovista-apex-vintage-tee',
      'aerovista-apex-glitch-tee-black',
      'architect-field-issue-tee-black',
      'aerovista-core-tee',
      'shadow-wear-tactical-bomber-jacket-summit-edition',
      'aerovista-apex-pattern-bomber-jacket',
      'shadow-pants',
      'men-s-ghost-shorts',
    ],
  },
  {
    id: 'hoodie-wall',
    label: 'Hoodie Wall',
    note: 'A dedicated wall of AeroVista, Architect and Shadow Wear hoodies.',
    kind: 'wall',
    productIds: [
      'aerovista-shadow-pattern-hoodie',
      'architect-built-different-hoodie-black',
      'aerovista-core-hoodie',
      'aerovista-division-hoodie',
      'aerovista-apex-draft-full-zip-hoodie-black',
      'aerovista-apex-draft-pullover-hoodie-black',
      'aerovista-the-blue-witness-urban-hoodie-black',
    ],
  },
  {
    id: 'headwear',
    label: 'Headwear',
    note: 'Caps displayed open and face-forward on dedicated shelves.',
    kind: 'shelf',
    productIds: [
      'aerovista-premium-embroidered-hat-black-cap-with-signature-apex-mark',
      'aerovista-apex-camo-flexfit-hat',
      'glitch-orbit-logo-black',
      'aerovista-apex-mesh-trucker-cap',
      'docklife-drip-osprey-rope-cap',
    ],
  },
  {
    id: 'objects',
    label: 'Objects & Editions',
    note: 'Collectibles and limited objects stay on the display surface.',
    kind: 'table',
    productIds: [
      'aerovista-apex-relic-playing-cards',
      'aerovista-apex-mark-draft-series-s01-sticker',
      'billygoat-sticker',
      'holographic-stickers',
      'can-cooler',
    ],
  },
])
