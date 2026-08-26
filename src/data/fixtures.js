// Physical retail plan for the desktop room.
// Coordinates are calibrated to public/store/interior.svg (1672 x 941).
// Apparel anchors follow the perspective-correct upper and lower wall rails.
// Scale changes with depth: pieces nearer the customer are larger.
export const fixtures = [
  {
    id: 'left-wall-rack',
    type: 'wall-rack',
    label: 'Apex Wall',
    // A tiny inward correction keeps the two side walls visually balanced on wide screens.
    position: { x: 4.5, y: 25.3, w: 23.9, h: 49.2 },
    slots: [
      // Upper rail — raised slightly, with a modest scale increase.
      { productId: 'core-tee-black', x: 14, y: 47.5, scale: 1.17, tilt: -1 },
      { productId: 'apex-vintage-tee', x: 39, y: 44.2, scale: 1.09, tilt: 0 },
      { productId: 'apex-signal-sweatshirt', x: 64, y: 40.9, scale: 1.01, tilt: 0 },
      { productId: 'apex-pattern-hoodie', x: 89, y: 37.7, scale: .93, tilt: 1 },
      // Lower rail — raised more so it separates cleanly from Headwear.
      { productId: 'aerovista-divisions-hoodie', x: 45, y: 72.8, scale: 1.03, tilt: -1 },
      { productId: 'apex-glitch-tee-black', x: 65, y: 67.0, scale: .98, tilt: 0 },
      { productId: 'apex-shadow-long-sleeve', x: 85, y: 61.3, scale: .93, tilt: 1 },
    ],
  },
  {
    id: 'right-wall-rack',
    type: 'wall-rack',
    label: 'Studio Wall',
    position: { x: 71.6, y: 25.3, w: 23.9, h: 49.2 },
    slots: [
      // Upper rail — mirrored depth progression.
      { productId: 'architect-field-issue-tee-black', x: 11, y: 37.7, scale: .93, tilt: -1 },
      { productId: 'architect-field-issue-tee-ash', x: 36, y: 40.9, scale: 1.01, tilt: 0 },
      { productId: 'vespera-moonscript-hoodie', x: 61, y: 44.2, scale: 1.09, tilt: 0 },
      { productId: 'soundgoat-hoodie', x: 86, y: 47.5, scale: 1.17, tilt: 1 },
      // Lower rail.
      { productId: 'architect-built-different-hoodie', x: 15, y: 61.3, scale: .93, tilt: -1 },
      { productId: 'drafted-a-premium-sweatshirt', x: 45, y: 69.8, scale: 1.03, tilt: 0 },
      { productId: 'powder-peaks-v2', x: 75, y: 78.3, scale: 1.13, tilt: 1 },
    ],
  },
  {
    id: 'hat-shelf',
    type: 'hat-shelf',
    label: 'Headwear',
    position: { x: 4.7, y: 66.0, w: 25.7, h: 18.5 },
    slots: [
      { productId: 'apex-embroidered-hat-black', x: 9,  y: 41, scale: 1.04, tilt: -2 },
      { productId: 'apex-camo-flexfit-hat', x: 29, y: 41, scale: .99, tilt: 1 },
      { productId: 'glitch-orbit-cap-black', x: 49, y: 41, scale: .95, tilt: 0 },
      { productId: 'glitch-orbit-cap-gray', x: 69, y: 41, scale: .91, tilt: 1 },
      { productId: 'drafted-a-snapback', x: 89, y: 41, scale: .87, tilt: -1 },
    ],
  },
  {
    id: 'center-editions-table',
    type: 'table-stack',
    label: 'Objects & Editions',
    position: { x: 39.2, y: 64.1, w: 21.6, h: 22.2 },
    slots: [
      { productId: 'apex-relic-deck', x: 50, y: 29, scale: 1.18, tilt: -2 },
    ],
  },
]
