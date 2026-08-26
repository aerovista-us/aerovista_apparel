// Physical merchandising plan.
// Fixtures own WHERE products live in the room. Products own WHAT they are.
// Coordinates are percentages inside each fixture.
export const fixtures = [
  {
    id: 'left-wall-rack',
    type: 'wall-rack',
    label: 'Left Wall Rack',
    position: { x: 7.5, y: 26, w: 29, h: 37 },
    slots: [
      { productId: 'core-tee-black', x: 15, y: 44, scale: .92, tilt: -2 },
      { productId: 'apex-vintage-tee', x: 39, y: 43, scale: .96, tilt: 1 },
      { productId: 'apex-signal-sweatshirt', x: 63, y: 43, scale: 1.02, tilt: -1 },
      { productId: 'apex-shadow-long-sleeve', x: 86, y: 45, scale: .96, tilt: 2 },
    ],
  },
  {
    id: 'right-wall-rack',
    type: 'wall-rack',
    label: 'Right Wall Rack',
    position: { x: 70.5, y: 26, w: 27, h: 39 },
    slots: [
      { productId: 'apex-glitch-tee-black', x: 14, y: 43, scale: .94, tilt: 1 },
      { productId: 'architect-field-issue-tee-black', x: 38, y: 43, scale: .96, tilt: -1 },
      { productId: 'vespera-moonscript-hoodie', x: 64, y: 44, scale: 1.02, tilt: 1 },
      { productId: 'soundgoat-hoodie', x: 87, y: 44, scale: 1.02, tilt: -2 },
    ],
  },
  {
    id: 'hero-mannequin',
    type: 'hero-mannequin',
    label: 'Hero Mannequin',
    position: { x: 58.5, y: 21.5, w: 13.5, h: 46 },
    slots: [
      { productId: 'apex-pattern-hoodie', x: 50, y: 46, scale: 1.55, tilt: 0 },
    ],
  },
  {
    id: 'center-table',
    type: 'table-stack',
    label: 'Center Table',
    position: { x: 40, y: 55, w: 20, h: 28 },
    slots: [
      { productId: 'aerovista-divisions-hoodie', x: 22, y: 49, scale: .80, tilt: -6 },
      { productId: 'architect-built-different-hoodie', x: 51, y: 47, scale: .80, tilt: 3 },
      { productId: 'apex-relic-deck', x: 78, y: 39, scale: .70, tilt: 6 },
    ],
  },
  {
    id: 'hat-shelf',
    type: 'hat-shelf',
    label: 'Headwear Shelf',
    position: { x: 5, y: 62, w: 22, h: 22 },
    slots: [
      { productId: 'apex-embroidered-hat-black', x: 16, y: 42, scale: .82, tilt: -3 },
      { productId: 'apex-camo-flexfit-hat', x: 39, y: 40, scale: .82, tilt: 2 },
      { productId: 'glitch-orbit-cap-black', x: 63, y: 42, scale: .82, tilt: -1 },
      { productId: 'drafted-a-snapback', x: 85, y: 41, scale: .82, tilt: 3 },
    ],
  },
  {
    id: 'objects-case',
    type: 'accessories-case',
    label: 'Objects Case',
    position: { x: 73, y: 63, w: 20, h: 22 },
    slots: [
      { productId: 'apex-relic-deck', x: 31, y: 43, scale: .78, tilt: -4 },
      { productId: 'glitch-orbit-cap-gray', x: 69, y: 43, scale: .82, tilt: 3 },
    ],
  },
]
