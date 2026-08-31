// Physical retail plan for the desktop room.
// Coordinates are calibrated to public/store/interior.svg (1672 x 941).
// Product IDs are canonical IDs from square_products_latest.json.
// Commerce fields never live here: this file only places real catalog products in space.
export const fixtures = [
  {
    id: 'left-wall-rack',
    type: 'wall-rack',
    label: 'Apex Wall',
    position: { x: 4.5, y: 25.3, w: 23.9, h: 49.2 },
    slots: [
      // Upper rail: tees first. This row is the clearest read from the main aisle.
      { productId: 'aerovista-apex-vintage-tee', x: 14, y: 28.2, scale: 1.02, tilt: -1 },
      { productId: 'aerovista-apex-glitch-tee-black', x: 39, y: 28.2, scale: 1.02, tilt: 0 },
      { productId: 'architect-field-issue-tee-black', x: 64, y: 28.2, scale: 1.02, tilt: 0 },
      { productId: 'aerovista-core-tee', x: 89, y: 28.2, scale: 1.02, tilt: 1 },
      // Lower rail: heavier outerwear plus the two current Shadow Wear bottoms.
      { productId: 'shadow-wear-tactical-bomber-jacket-summit-edition', x: 24, y: 65.5, scale: 1, tilt: -1 },
      { productId: 'aerovista-apex-pattern-bomber-jacket', x: 45, y: 65.5, scale: 1, tilt: 0 },
      { productId: 'shadow-pants', x: 66, y: 65.5, scale: 1, tilt: 0 },
      { productId: 'men-s-ghost-shorts', x: 86, y: 65.5, scale: 1, tilt: 1 },
    ],
  },
  {
    id: 'right-wall-rack',
    type: 'wall-rack',
    label: 'Studio Wall',
    position: { x: 71.6, y: 25.3, w: 23.9, h: 49.2 },
    slots: [
      // Right wall is the hoodie wall: clean, layered and intentionally dense.
      { productId: 'aerovista-shadow-pattern-hoodie', x: 11, y: 28.2, scale: 1.02, tilt: -1 },
      { productId: 'architect-built-different-hoodie-black', x: 36, y: 28.2, scale: 1.02, tilt: 0 },
      { productId: 'aerovista-core-hoodie', x: 61, y: 28.2, scale: 1.02, tilt: 0 },
      { productId: 'aerovista-division-hoodie', x: 86, y: 28.2, scale: 1.02, tilt: 1 },
      { productId: 'aerovista-apex-draft-full-zip-hoodie-black', x: 15, y: 66.2, scale: 1.02, tilt: -1 },
      { productId: 'aerovista-apex-draft-pullover-hoodie-black', x: 45, y: 66.2, scale: 1.02, tilt: 0 },
      { productId: 'aerovista-the-blue-witness-urban-hoodie-black', x: 75, y: 66.2, scale: 1.02, tilt: 1 },
    ],
  },
  {
    id: 'hat-shelf',
    type: 'hat-shelf',
    label: 'Headwear',
    position: { x: 4.7, y: 66.0, w: 25.7, h: 18.5 },
    slots: [
      { productId: 'aerovista-premium-embroidered-hat-black-cap-with-signature-apex-mark', x: 9, y: 41, scale: .96, tilt: -2 },
      { productId: 'aerovista-apex-camo-flexfit-hat', x: 29, y: 41, scale: .96, tilt: 1 },
      { productId: 'glitch-orbit-logo-black', x: 49, y: 41, scale: .96, tilt: 0 },
      { productId: 'aerovista-apex-mesh-trucker-cap', x: 69, y: 41, scale: .96, tilt: 1 },
      { productId: 'docklife-drip-osprey-rope-cap', x: 89, y: 41, scale: .96, tilt: -1 },
    ],
  },
  {
    id: 'center-editions-table',
    type: 'table-stack',
    label: 'Objects & Editions',
    position: { x: 39.2, y: 64.1, w: 21.6, h: 22.2 },
    slots: [
      { productId: 'aerovista-apex-relic-playing-cards', x: 72, y: 17, scale: .82, tilt: -2 },
      { productId: 'can-cooler', x: 86, y: 23, scale: .86, tilt: 1 },
      { productId: 'aerovista-apex-mark-draft-series-s01-sticker', x: 27, y: 38, scale: .86, tilt: -12, spreads: [
        { x: 27, y: 38, tilt: -12 }, { x: 48, y: 42, tilt: 8 }, { x: 34, y: 48, tilt: -3 },
      ] },
      { productId: 'billygoat-sticker', x: 46, y: 45, scale: .88, tilt: 7, spreads: [
        { x: 46, y: 45, tilt: 7 }, { x: 25, y: 44, tilt: -8 }, { x: 55, y: 47, tilt: 11 },
      ] },
      { productId: 'holographic-stickers', x: 61, y: 42, scale: .9, tilt: -5, spreads: [
        { x: 61, y: 42, tilt: -5 }, { x: 36, y: 49, tilt: 12 }, { x: 23, y: 40, tilt: -10 },
      ] },
    ],
  },
]
