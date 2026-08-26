// Physical retail plan for the desktop room.
// Coordinates are calibrated to public/store/interior.svg (1672 x 941).
// Side-wall product scale intentionally changes with depth: merchandise nearer the
// customer is larger; merchandise nearer the back wall is smaller.
export const fixtures = [
  {
    id: 'left-wall-rack',
    type: 'wall-rack',
    label: 'Apex Wall',
    // Matches the left architectural merchandise bay.
    position: { x: 4.3, y: 25.3, w: 23.9, h: 49.2 },
    slots: [
      { productId: 'core-tee-black', x: 8,  y: 35.0, scale: 1.12, tilt: -1 },
      { productId: 'apex-vintage-tee', x: 25, y: 35.8, scale: 1.08, tilt: 0 },
      { productId: 'apex-signal-sweatshirt', x: 42, y: 36.7, scale: 1.03, tilt: 0 },
      { productId: 'apex-shadow-long-sleeve', x: 59, y: 37.7, scale: .98, tilt: 0 },
      { productId: 'apex-glitch-tee-black', x: 76, y: 38.7, scale: .93, tilt: 0 },
      { productId: 'apex-pattern-hoodie', x: 92, y: 39.6, scale: .88, tilt: 1 },
    ],
  },
  {
    id: 'right-wall-rack',
    type: 'wall-rack',
    label: 'Studio Wall',
    // Mirror of the right architectural merchandise bay.
    position: { x: 71.8, y: 25.3, w: 23.9, h: 49.2 },
    slots: [
      { productId: 'architect-field-issue-tee-black', x: 8,  y: 39.6, scale: .88, tilt: -1 },
      { productId: 'architect-field-issue-tee-ash', x: 24, y: 38.7, scale: .93, tilt: 0 },
      { productId: 'vespera-moonscript-hoodie', x: 41, y: 37.7, scale: .98, tilt: 0 },
      { productId: 'soundgoat-hoodie', x: 58, y: 36.7, scale: 1.03, tilt: 0 },
      { productId: 'powder-peaks-v2', x: 75, y: 35.8, scale: 1.08, tilt: 0 },
      { productId: 'architect-built-different-hoodie', x: 92, y: 35.0, scale: 1.12, tilt: 1 },
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
    // The playing cards now occupy the real center plinth instead of floating
    // against the right wall.
    position: { x: 39.2, y: 64.1, w: 21.6, h: 22.2 },
    slots: [
      { productId: 'apex-relic-deck', x: 50, y: 29, scale: 1.18, tilt: -2 },
    ],
  },
]
