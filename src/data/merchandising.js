// Spatial merchandising only.
// Every ID below is a canonical product ID from AeroVista's commerce catalog.
// This file decides WHERE a real product appears, never WHAT the product is.

export const productPresentation = Object.freeze({
  'aerovista-apex-vintage-tee': { shortName: 'Apex Vintage Tee', accent: '#00AEEF' },
  'aerovista-apex-signal-sweatshirt': { shortName: 'Signal Sweatshirt', accent: '#00AEEF' },
  'aerovista-apex-glitch-tee-black': { shortName: 'Apex Glitch Tee', accent: '#00AEEF' },
  'aerovista-shadow-pattern-hoodie': { shortName: 'Shadow Pattern Hoodie', accent: '#777E86' },
  'aerovista-shadow-pattern-long-sleeve-tee': { shortName: 'Shadow Long Sleeve', accent: '#777E86' },
  'shadow-wear-ghost-ridge': { shortName: 'Ghost Ridge', accent: '#777E86' },
  'aerovista-apex-pattern-bomber-jacket': { shortName: 'Apex Pattern Bomber', accent: '#777E86' },

  'architect-field-issue-tee-black': { shortName: 'Field Issue Tee', accent: '#D5D7DA' },
  'architect-field-issue-tee-ash': { shortName: 'Field Issue Tee — Ash', accent: '#C9C3B7' },
  'architect-built-different-hoodie-black': { shortName: 'Built Different Hoodie', accent: '#D0D2D4' },
  'drafted-a-premium-sweatshirt': { shortName: 'Drafted A Sweatshirt', accent: '#D0D2D4' },
  'aerovista-core-hoodie': { shortName: 'Core Hoodie', accent: '#00AEEF' },
  'aerovista-division-hoodie': { shortName: 'Division Hoodie', accent: '#00AEEF' },
  'aerovista-the-blue-witness-urban-hoodie-black': { shortName: 'Blue Witness Hoodie', accent: '#00AEEF' },

  'aerovista-premium-embroidered-hat-black-cap-with-signature-apex-mark': { shortName: 'Apex Hat', accent: '#C0C0C0' },
  'aerovista-apex-camo-flexfit-hat': { shortName: 'Apex Camo Hat', accent: '#8A9187' },
  'glitch-orbit-logo-black': { shortName: 'Glitch Orbit Cap', accent: '#AEB4BA' },
  'aerovista-apex-mesh-trucker-cap': { shortName: 'Apex Mesh Cap', accent: '#D0D2D4' },
  'docklife-drip-osprey-rope-cap': { shortName: 'Docklife Osprey Cap', accent: '#8FBDB7' },

  'aerovista-apex-relic-playing-cards': { shortName: 'Apex Relic Deck', accent: '#00AEEF' },
})

export const showroomProductIds = Object.freeze(Object.keys(productPresentation))

export const retailZones = Object.freeze([
  {
    id: 'apex-wall',
    label: 'Apex Wall',
    note: 'Apex, Glitch and Shadow pieces hung full-length against the dark wall.',
    kind: 'wall',
    productIds: [
      'aerovista-apex-vintage-tee',
      'aerovista-apex-signal-sweatshirt',
      'aerovista-apex-glitch-tee-black',
      'aerovista-shadow-pattern-hoodie',
      'aerovista-shadow-pattern-long-sleeve-tee',
      'shadow-wear-ghost-ridge',
      'aerovista-apex-pattern-bomber-jacket',
    ],
  },
  {
    id: 'architect-wall',
    label: 'Architect Wall',
    note: 'Field Issue and Built Different pieces presented as one working collection.',
    kind: 'wall',
    productIds: [
      'architect-field-issue-tee-black',
      'architect-field-issue-tee-ash',
      'architect-built-different-hoodie-black',
      'drafted-a-premium-sweatshirt',
    ],
  },
  {
    id: 'studio-wall',
    label: 'Studio Wall',
    note: 'Core and signal pieces occupy the lower studio rail.',
    kind: 'wall',
    productIds: [
      'aerovista-core-hoodie',
      'aerovista-division-hoodie',
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
    productIds: ['aerovista-apex-relic-playing-cards'],
  },
])