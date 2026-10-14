// Physical retail plan for the desktop room.
// Coordinates are calibrated to public/store/interior.svg (1672 x 941).
// Product IDs are canonical IDs from square_products_latest.json.
// Commerce fields never live here: this file only places real catalog products in space.
export const fixtures = [
  {
    id: 'left-wall-rack',
    type: 'wall-rack',
    label: 'Apex Wall',
    position: { x: 4.5, y: 30, w: 23.9, h: 36 },
    views: ['room', 'left'],
    slots: [
      // Front is the outer edge. Each rail rises slightly toward the back of the wall.
      { productId: 'aerovista-apex-vintage-tee', x: 16, y: 33, scale: 1.02, tilt: -1 },
      { productId: 'aerovista-apex-glitch-tee-black', x: 38, y: 31.5, scale: 1.02, tilt: 0 },
      { productId: 'architect-field-issue-tee-black', x: 60, y: 29.9, scale: 1.02, tilt: 0 },
      { productId: 'aerovista-core-tee', x: 82, y: 28.4, scale: 1.02, tilt: 1 },
      { productId: 'shadow-wear-tactical-bomber-jacket-summit-edition', x: 16, y: 104, scale: 1.02, tilt: -1 },
      { productId: 'aerovista-apex-pattern-bomber-jacket', x: 38, y: 95, scale: 1.02, tilt: 0 },
      { productId: 'shadow-pants', x: 60, y: 86, scale: 1.02, tilt: 0 },
      { productId: 'men-s-ghost-shorts', x: 82, y: 77, scale: 1.02, tilt: 1 },
    ],
  },
  {
    id: 'right-wall-rack',
    type: 'wall-rack',
    label: 'Studio Wall',
    position: { x: 71.6, y: 22, w: 23.9, h: 46 },
    views: ['room', 'right'],
    slots: [
      // Right wall is the hoodie wall: clean, layered and intentionally dense.
      { productId: 'aerovista-shadow-pattern-hoodie', x: 11, y: 39.2, scale: 1.02, tilt: -1 },
      { productId: 'architect-built-different-hoodie-black', x: 36, y: 40.4, scale: 1.02, tilt: 0 },
      { productId: 'aerovista-core-hoodie', x: 61, y: 41.7, scale: 1.02, tilt: 0 },
      { productId: 'aerovista-division-hoodie', x: 86, y: 42.9, scale: 1.02, tilt: 1 },
      { productId: 'aerovista-apex-draft-full-zip-hoodie-black', x: 15, y: 77.8, scale: 1.02, tilt: -1 },
      { productId: 'aerovista-apex-draft-pullover-hoodie-black', x: 45, y: 86.3, scale: 1.02, tilt: 0 },
      { productId: 'aerovista-the-blue-witness-urban-hoodie-black', x: 75, y: 94.8, scale: 1.02, tilt: 1 },
    ],
  },
  {
    id: 'hat-shelf',
    type: 'hat-shelf',
    label: 'Headwear',
    position: { x: 4.7, y: 74, w: 25.7, h: 18 },
    views: ['room', 'left'],
    slots: [
      { productId: 'aerovista-premium-embroidered-hat-black-cap-with-signature-apex-mark', x: 9, y: 41, scale: .96, tilt: -2 },
      { productId: 'aerovista-apex-camo-flexfit-hat', x: 29, y: 41, scale: .96, tilt: 1 },
      { productId: 'glitch-orbit-logo-black', x: 49, y: 41, scale: .96, tilt: 0 },
      { productId: 'aerovista-apex-mesh-trucker-cap', x: 69, y: 41, scale: .96, tilt: 1 },
      { productId: 'docklife-drip-osprey-rope-cap', x: 89, y: 41, scale: .96, tilt: -1 },
    ],
  },
  {
    id: 'shoe-shelf',
    type: 'hat-shelf',
    label: 'Footwear',
    position: { x: 69.6, y: 74, w: 25.7, h: 18 },
    views: ['room', 'right'],
    slots: [
      { productId: 'midnight-alpine-woodcut-repeat', x: 32, y: 40, scale: 1, tilt: -2 },
      { productId: 'shadow-sneaks', x: 68, y: 40, scale: 1, tilt: 2 },
    ],
  },
  {
    id: 'center-editions-table',
    type: 'table-stack',
    label: 'Objects & Editions',
    position: { x: 39.2, y: 62, w: 21.6, h: 24 },
    views: ['room', 'objects'],
    slots: [
      { productId: 'aerovista-apex-relic-playing-cards', x: 64, y: 44, scale: .9, tilt: -4 },
      { productId: 'can-cooler', x: 86, y: 36, scale: 1, tilt: 2 },
    ],
  },
  {
    id: 'place-line-wall',
    type: 'wall-rack',
    label: 'NorthLine',
    position: { x: 4.5, y: 30, w: 23.9, h: 36 },
    views: ['place'],
    slots: [
      { productId: 'aerovista-ridgeline-tee', x: 14, y: 30, scale: .86, tilt: -1 },
      { productId: 'aerovista-idaho-after-dark-tee', x: 38, y: 28.3, scale: .86, tilt: 0 },
      { productId: 'aerovista-blue-divide-tee', x: 62, y: 26.6, scale: .86, tilt: 0 },
      { productId: 'aerovista-source-code-tee', x: 86, y: 25, scale: .86, tilt: 1 },
      { productId: 'aerovista-moonline-tee', x: 20, y: 99, scale: .86, tilt: -1 },
      { productId: 'aerovista-powderline-tee', x: 50, y: 87, scale: .86, tilt: 0 },
      { productId: 'aerovista-built-behind-the-scenes-tee', x: 80, y: 75, scale: .86, tilt: 1 },
    ],
  },
  {
    id: 'place-line-shelf',
    type: 'hat-shelf',
    label: 'NorthLine Headwear',
    position: { x: 4.7, y: 70, w: 25.7, h: 18 },
    views: ['place'],
    slots: [
      { productId: 'aerovista-moonline-hat', x: 24, y: 41, scale: .96, tilt: -1 },
      { productId: 'aerovista-built-behind-the-scenes-hat', x: 50, y: 41, scale: .96, tilt: 1 },
      { productId: 'aerovista-blue-divide-sticker', x: 78, y: 48, scale: .72, tilt: -4 },
    ],
  },
  {
    id: 'further-edit-wall',
    type: 'wall-rack',
    label: 'Further Edit',
    position: { x: 71.6, y: 22, w: 23.9, h: 46 },
    views: ['more'],
    slots: [
      { productId: 'architect-field-issue-tee-ash', x: 18, y: 39, scale: 1.02, tilt: -1 },
      { productId: 'aerovista-apex-signal-sweatshirt', x: 46, y: 41, scale: 1.02, tilt: 0 },
      { productId: 'drafted-a-premium-sweatshirt', x: 74, y: 42, scale: 1.02, tilt: 1 },
      { productId: 'aerovista-apex-glitch-premium-pullover-hoodie-black', x: 18, y: 77, scale: 1.02, tilt: -1 },
      { productId: 'aerovista-apex-pattern-hoodie', x: 46, y: 86, scale: 1.02, tilt: 0 },
      { productId: 'powder-peaks-v2-premium-pullover-hoodie-black', x: 74, y: 95, scale: 1.02, tilt: 1 },
    ],
  },
  {
    id: 'further-edit-cap',
    type: 'hat-shelf',
    label: 'Further Edit Cap',
    position: { x: 71.6, y: 70, w: 18, h: 16 },
    views: ['more'],
    slots: [
      { productId: 'aerovista-apex-flexfit-structured-cap-black', x: 28, y: 42, scale: .96, tilt: 0 },
    ],
  },
]
