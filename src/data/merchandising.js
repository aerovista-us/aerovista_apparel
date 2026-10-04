// Spatial merchandising only.
// Every ID below is a canonical product ID from AeroVista's commerce catalog.
// This file decides WHERE a real product appears, never WHAT the product is.

export const productPresentation = Object.freeze({
  // Left wall: tees, bombers and bottoms.
  'aerovista-apex-vintage-tee': { shortName: 'Apex Vintage Tee', accent: '#00AEEF', display: { stageScale: 1.43 } },
  'aerovista-apex-glitch-tee-black': { shortName: 'Apex Glitch Tee', accent: '#00AEEF', display: { stageScale: 1 } },
  'architect-field-issue-tee-black': { shortName: 'Field Issue Tee', accent: '#D5D7DA', display: { stageScale: 1.34 } },
  'aerovista-core-tee': { shortName: 'Core Tee', accent: '#00AEEF', display: { stageScale: 1.42 } },
  'shadow-wear-tactical-bomber-jacket-summit-edition': { shortName: 'Summit Bomber', accent: '#777E86', display: { stageScale: 1.36 } },
  'aerovista-apex-pattern-bomber-jacket': { shortName: 'Apex Pattern Bomber', accent: '#777E86', display: { stageImageSuffix: '/10-front-02.webp', objectPosition: '50% 50%', stageScale: 1.38 } },
  'shadow-pants': { shortName: 'Shadow Pants', accent: '#777E86', type: 'bottom' },
  'men-s-ghost-shorts': { shortName: 'Ghost Shorts', accent: '#777E86', type: 'bottom' },

  // Right wall: hoodies.
  'aerovista-shadow-pattern-hoodie': { shortName: 'Shadow Pattern Hoodie', accent: '#777E86', display: { stageScale: 1.38 } },
  'architect-built-different-hoodie-black': { shortName: 'Built Different Hoodie', accent: '#D0D2D4', display: { stageScale: 1.4 } },
  'aerovista-core-hoodie': { shortName: 'Core Hoodie', accent: '#00AEEF', display: { stageScale: 1.4 } },
  'aerovista-division-hoodie': { shortName: 'Division Hoodie', accent: '#00AEEF', display: { stageScale: 1.4 } },
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

  // Women's Studio exclusives. Shared unisex layers continue to use the
  // presentation records above, but are curated into this room separately.
  'aerovista-apex-pattern-print-swimsuit-one-piece': {
    shortName: 'Apex Pattern One-Piece', accent: '#B8A9C8', type: 'swim', collection: 'Studio',
    fallback: {
      name: 'AeroVista Apex Pattern Print Swimsuit — One-Piece',
      images: [
        '/products/aerovista-apex-pattern-print-swimsuit-one-piece/01-hero.webp',
        '/products/aerovista-apex-pattern-print-swimsuit-one-piece/swimsuit.png',
        '/products/aerovista-apex-pattern-print-swimsuit-one-piece/10-front-01.webp',
      ],
    },
  },
  'aerovista-apex-pattern-skater-dress': {
    shortName: 'Apex Pattern Dress', accent: '#B8A9C8', type: 'dress', collection: 'Studio',
    fallback: {
      name: 'AeroVista Apex Pattern Skater Dress',
      images: [
        '/products/aerovista-apex-pattern-skater-dress/01-hero.webp',
        '/products/aerovista-apex-pattern-skater-dress/10-front-01.webp',
        '/products/aerovista-apex-pattern-skater-dress/20-back-01.webp',
      ],
    },
  },
  'aerovista-wave-mark-full-zip-hoodie-white': {
    shortName: 'Wave Mark Zip Hoodie', accent: '#D8DADD', type: 'hoodie', collection: 'Studio',
    fallback: {
      name: 'AeroVista Wave Mark Full-Zip Hoodie — White',
      images: [
        '/products/aerovista-wave-mark-full-zip-hoodie-white/01-hero.webp',
        '/products/aerovista-wave-mark-full-zip-hoodie-white/10-front-01.webp',
        '/products/aerovista-wave-mark-full-zip-hoodie-white/20-back-01.webp',
      ],
    },
  },
  'vespra-moonscript-hoodie': {
    shortName: 'Vespera Moonscript', accent: '#C7B0CF', type: 'hoodie', collection: 'Studio',
    fallback: {
      name: 'Vespera Moonscript Hoodie',
      images: [
        '/products/vespra-moonscript-hoodie/01-hero.webp',
        '/products/vespra-moonscript-hoodie/10-front-06.webp',
        '/products/vespra-moonscript-hoodie/20-back-08.webp',
      ],
    },
  },
  'aerovista-ridgeline-tee': { shortName: 'Ridgeline Tee', accent: '#8FB7C9', collection: 'Place', fallback: { name: 'Ridgeline Tee', images: ['/products/aerovista-ridgeline-tee/01-hero.webp'] } },
  'aerovista-idaho-after-dark-tee': { shortName: 'Idaho After Dark', accent: '#1C3A5A', collection: 'Place', fallback: { name: 'Idaho After Dark Tee', images: ['/products/aerovista-idaho-after-dark-tee/01-hero.webp'] } },
  'aerovista-blue-divide-tee': { shortName: 'Blue Divide Tee', accent: '#2E6F9E', collection: 'Place', fallback: { name: 'Blue Divide Tee', images: ['/products/aerovista-blue-divide-tee/01-hero.webp'] } },
  'aerovista-source-code-tee': { shortName: 'Source Code Tee', accent: '#7D8C9A', collection: 'Place', fallback: { name: 'Source Code Tee', images: ['/products/aerovista-source-code-tee/01-hero.webp'] } },
  'aerovista-moonline-tee': { shortName: 'MoonLine Tee', accent: '#C9D4DE', collection: 'Place', fallback: { name: 'MoonLine Tee', images: ['/products/aerovista-moonline-tee/01-hero.webp'] } },
  'aerovista-powderline-tee': { shortName: 'Powderline Tee', accent: '#D7E3EA', collection: 'Place', fallback: { name: 'Powderline Tee', images: ['/products/aerovista-powderline-tee/01-hero.webp'] } },
  'aerovista-built-behind-the-scenes-tee': { shortName: 'Behind the Scenes Tee', accent: '#C4B8A5', collection: 'Place', fallback: { name: 'Built Behind the Scenes Tee', images: ['/products/aerovista-built-behind-the-scenes-tee/01-hero.webp'] } },
  'aerovista-moonline-hat': { shortName: 'MoonLine Hat', accent: '#C9D4DE', type: 'hat', collection: 'Place', fallback: { name: 'MoonLine Hat', images: ['/products/aerovista-moonline-hat/01-hero.webp'] } },
  'aerovista-built-behind-the-scenes-hat': { shortName: 'Behind the Scenes Hat', accent: '#C4B8A5', type: 'hat', collection: 'Place', fallback: { name: 'Built Behind the Scenes Hat', images: ['/products/aerovista-built-behind-the-scenes-hat/01-hero.webp'] } },
  'aerovista-blue-divide-sticker': { shortName: 'Blue Divide Sticker', accent: '#2E6F9E', type: 'sticker', collection: 'Place', fallback: { name: 'Blue Divide Sticker', images: ['/products/aerovista-blue-divide-sticker/01-hero.webp'] } },

  'aerovista-apex-flexfit-structured-cap-black': { shortName: 'Apex Flexfit Cap', accent: '#C0C0C0', type: 'hat', fallback: { name: 'AeroVista Apex Flexfit Structured Cap — Black', images: ['/products/aerovista-apex-flexfit-structured-cap-black/01-hero.webp'] } },
  'aerovista-apex-glitch-premium-pullover-hoodie-black': { shortName: 'Apex Glitch Hoodie', accent: '#00AEEF', fallback: { name: 'AeroVista Apex Glitch Premium Pullover Hoodie — Black', images: ['/products/aerovista-apex-glitch-premium-pullover-hoodie-black/01-hero.webp'] } },
  'aerovista-apex-signal-sweatshirt': { shortName: 'Apex Signal Sweatshirt', accent: '#AEB4BA', fallback: { name: 'AeroVista Apex Signal Sweatshirt', images: ['/products/aerovista-apex-signal-sweatshirt/01-hero.webp'] } },
  'architect-field-issue-tee-ash': { shortName: 'Field Issue Tee Ash', accent: '#D5D7DA', fallback: { name: 'Architect Field Issue Tee — Ash', images: ['/products/architect-field-issue-tee-ash/01-hero.webp'] } },
  'drafted-a-premium-sweatshirt': { shortName: 'Drafted Sweatshirt', accent: '#AEB4BA', fallback: { name: 'Drafted A Premium Sweatshirt', images: ['/products/drafted-a-premium-sweatshirt/01-hero.webp'] } },
  'aerovista-apex-pattern-hoodie': { shortName: 'Apex Pattern Hoodie', accent: '#00AEEF', fallback: { name: 'AeroVista Apex Pattern Hoodie', images: ['/products/aerovista-apex-pattern-hoodie/01-hero.webp'] } },
  'powder-peaks-v2-premium-pullover-hoodie-black': { shortName: 'Powder Peaks Hoodie', accent: '#8AA0B2', fallback: { name: 'Powder Peaks V2 Premium Pullover Hoodie — Black', images: ['/products/powder-peaks-v2-premium-pullover-hoodie-black/01-hero.webp'] } },

  'night-ranger-bear-pullover-hoodie': {
    shortName: 'Night Ranger Bear', accent: '#8BB5C2', type: 'hoodie', collection: 'Studio',
    fallback: {
      name: 'Night Ranger Bear Pullover Hoodie',
      images: [
        '/products/night-ranger-bear-pullover-hoodie/01-hero.webp',
        '/products/night-ranger-bear-pullover-hoodie/10-front-03.webp',
        '/products/night-ranger-bear-pullover-hoodie/20-back-01.webp',
      ],
    },
  },
})

const womenExclusiveProductIds = new Set([
  'aerovista-apex-pattern-print-swimsuit-one-piece',
  'aerovista-apex-pattern-skater-dress',
  'aerovista-wave-mark-full-zip-hoodie-white',
  'vespra-moonscript-hoodie',
  'night-ranger-bear-pullover-hoodie',
])

export const showroomProductIds = Object.freeze(Object.keys(productPresentation).filter(id => !womenExclusiveProductIds.has(id)))

export const womenStudioProductIds = Object.freeze([
  'aerovista-apex-pattern-skater-dress',
  'aerovista-apex-pattern-print-swimsuit-one-piece',
  'aerovista-wave-mark-full-zip-hoodie-white',
  'shadow-wear-tactical-bomber-jacket-summit-edition',
  'vespra-moonscript-hoodie',
  'night-ranger-bear-pullover-hoodie',
])

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
  {
    id: 'place-line',
    label: 'Place Line',
    note: 'Local place graphics that are visible in the October 4 Square catalog.',
    kind: 'wall',
    productIds: [
      'aerovista-ridgeline-tee',
      'aerovista-idaho-after-dark-tee',
      'aerovista-blue-divide-tee',
      'aerovista-source-code-tee',
      'aerovista-moonline-tee',
      'aerovista-powderline-tee',
      'aerovista-built-behind-the-scenes-tee',
      'aerovista-moonline-hat',
      'aerovista-built-behind-the-scenes-hat',
      'aerovista-blue-divide-sticker',
    ],
  },
  {
    id: 'further-edit',
    label: 'Further Edit',
    note: 'Photographed pieces already visible in Square, kept off the main floor.',
    kind: 'wall',
    productIds: [
      'aerovista-apex-flexfit-structured-cap-black',
      'aerovista-apex-glitch-premium-pullover-hoodie-black',
      'aerovista-apex-signal-sweatshirt',
      'architect-field-issue-tee-ash',
      'drafted-a-premium-sweatshirt',
      'aerovista-apex-pattern-hoodie',
      'powder-peaks-v2-premium-pullover-hoodie-black',
    ],
  },
])
