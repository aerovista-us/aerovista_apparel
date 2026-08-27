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
      { productId: 'aerovista-apex-vintage-tee', x: 14, y: 43.6, scale: 1.17, tilt: -1 },
      { productId: 'aerovista-apex-signal-sweatshirt', x: 39, y: 40.3, scale: 1.09, tilt: 0 },
      { productId: 'aerovista-apex-glitch-tee-black', x: 64, y: 37.0, scale: 1.01, tilt: 0 },
      { productId: 'aerovista-shadow-pattern-hoodie', x: 89, y: 33.8, scale: .93, tilt: 1 },
      { productId: 'aerovista-shadow-pattern-long-sleeve-tee', x: 45, y: 70.2, scale: 1.03, tilt: -1 },
      { productId: 'shadow-wear-ghost-ridge', x: 65, y: 64.4, scale: .98, tilt: 0 },
      { productId: 'aerovista-apex-pattern-bomber-jacket', x: 85, y: 58.7, scale: .93, tilt: 1 },
    ],
  },
  {
    id: 'right-wall-rack',
    type: 'wall-rack',
    label: 'Studio Wall',
    position: { x: 71.6, y: 25.3, w: 23.9, h: 49.2 },
    slots: [
      { productId: 'architect-field-issue-tee-black', x: 11, y: 33.8, scale: .93, tilt: -1 },
      { productId: 'architect-field-issue-tee-ash', x: 36, y: 37.0, scale: 1.01, tilt: 0 },
      { productId: 'architect-built-different-hoodie-black', x: 61, y: 40.3, scale: 1.09, tilt: 0 },
      { productId: 'drafted-a-premium-sweatshirt', x: 86, y: 43.6, scale: 1.17, tilt: 1 },
      { productId: 'aerovista-core-hoodie', x: 15, y: 58.7, scale: .93, tilt: -1 },
      { productId: 'aerovista-division-hoodie', x: 45, y: 67.2, scale: 1.03, tilt: 0 },
      { productId: 'aerovista-the-blue-witness-urban-hoodie-black', x: 75, y: 75.7, scale: 1.13, tilt: 1 },
    ],
  },
  {
    id: 'hat-shelf',
    type: 'hat-shelf',
    label: 'Headwear',
    position: { x: 4.7, y: 66.0, w: 25.7, h: 18.5 },
    slots: [
      { productId: 'aerovista-premium-embroidered-hat-black-cap-with-signature-apex-mark', x: 9, y: 41, scale: 1.04, tilt: -2 },
      { productId: 'aerovista-apex-camo-flexfit-hat', x: 29, y: 41, scale: .99, tilt: 1 },
      { productId: 'glitch-orbit-logo-black', x: 49, y: 41, scale: .95, tilt: 0 },
      { productId: 'aerovista-apex-mesh-trucker-cap', x: 69, y: 41, scale: .91, tilt: 1 },
      { productId: 'docklife-drip-osprey-rope-cap', x: 89, y: 41, scale: .87, tilt: -1 },
    ],
  },
  {
    id: 'center-editions-table',
    type: 'table-stack',
    label: 'Objects & Editions',
    position: { x: 39.2, y: 64.1, w: 21.6, h: 22.2 },
    slots: [
      { productId: 'aerovista-apex-relic-playing-cards', x: 50, y: 29, scale: 1.18, tilt: -2 },
    ],
  },
]
