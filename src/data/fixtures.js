// Physical retail plan for the desktop room.
// Apparel belongs on wall rails. Headwear belongs on shelves. Objects belong on display surfaces.
export const fixtures = [
  {
    id: 'left-wall-rack',
    type: 'wall-rack',
    label: 'Apex Wall',
    position: { x: 6.5, y: 25, w: 31, h: 39 },
    slots: [
      { productId: 'core-tee-black', x: 11, y: 44, scale: .88, tilt: -2 },
      { productId: 'apex-vintage-tee', x: 30, y: 43, scale: .91, tilt: 1 },
      { productId: 'apex-signal-sweatshirt', x: 50, y: 43, scale: .96, tilt: -1 },
      { productId: 'apex-shadow-long-sleeve', x: 70, y: 44, scale: .92, tilt: 1 },
      { productId: 'apex-glitch-tee-black', x: 89, y: 43, scale: .89, tilt: -1 },
    ],
  },
  {
    id: 'back-wall-rack',
    type: 'wall-rack',
    label: 'Feature Wall',
    position: { x: 37.5, y: 22, w: 27, h: 36 },
    slots: [
      { productId: 'apex-pattern-hoodie', x: 17, y: 45, scale: 1.02, tilt: -1 },
      { productId: 'aerovista-divisions-hoodie', x: 39, y: 45, scale: .97, tilt: 1 },
      { productId: 'architect-built-different-hoodie', x: 62, y: 45, scale: .98, tilt: -1 },
      { productId: 'drafted-a-premium-sweatshirt', x: 84, y: 45, scale: .94, tilt: 1 },
    ],
  },
  {
    id: 'right-wall-rack',
    type: 'wall-rack',
    label: 'Studio Wall',
    position: { x: 68.5, y: 25, w: 30, h: 40 },
    slots: [
      { productId: 'architect-field-issue-tee-black', x: 10, y: 44, scale: .88, tilt: 1 },
      { productId: 'architect-field-issue-tee-ash', x: 29, y: 44, scale: .89, tilt: -1 },
      { productId: 'vespera-moonscript-hoodie', x: 49, y: 44, scale: .98, tilt: 1 },
      { productId: 'soundgoat-hoodie', x: 69, y: 44, scale: .98, tilt: -1 },
      { productId: 'powder-peaks-v2', x: 89, y: 44, scale: .96, tilt: 1 },
    ],
  },
  {
    id: 'hat-shelf',
    type: 'hat-shelf',
    label: 'Headwear',
    position: { x: 5, y: 64, w: 25, h: 19 },
    slots: [
      { productId: 'apex-embroidered-hat-black', x: 10, y: 42, scale: .78, tilt: -3 },
      { productId: 'apex-camo-flexfit-hat', x: 30, y: 41, scale: .78, tilt: 2 },
      { productId: 'glitch-orbit-cap-black', x: 50, y: 42, scale: .78, tilt: -1 },
      { productId: 'glitch-orbit-cap-gray', x: 70, y: 41, scale: .78, tilt: 2 },
      { productId: 'drafted-a-snapback', x: 90, y: 42, scale: .78, tilt: -2 },
    ],
  },
  {
    id: 'objects-case',
    type: 'accessories-case',
    label: 'Objects & Editions',
    position: { x: 73, y: 64, w: 20, h: 21 },
    slots: [
      { productId: 'apex-relic-deck', x: 50, y: 42, scale: .88, tilt: -3 },
    ],
  },
]
