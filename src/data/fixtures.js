// Physical merchandising plan.
// Fixtures own WHERE products live in the room. Products own WHAT they are.
// Coordinates are percentages inside the interior scene / fixture.
export const fixtures = [
  {
    id: 'left-wall-rack',
    type: 'wall-rack',
    label: 'Left Wall Rack',
    position: { x: 8.5, y: 27, w: 26, h: 36 },
    slots: [
      { productId: 'core-hoodie', x: 29, y: 42, scale: 1.18, tilt: -2 },
      { productId: 'signal-tee', x: 68, y: 43, scale: 1.08, tilt: 2 },
    ],
  },
  {
    id: 'right-wall-rack',
    type: 'wall-rack',
    label: 'Right Wall Rack',
    position: { x: 72, y: 27, w: 25, h: 38 },
    slots: [
      { productId: 'shadow-bomber', x: 32, y: 42, scale: 1.24, tilt: 1 },
      { productId: 'core-hoodie', x: 70, y: 44, scale: 1.02, tilt: -2 },
    ],
  },
  {
    id: 'hero-mannequin',
    type: 'hero-mannequin',
    label: 'Hero Mannequin',
    position: { x: 59, y: 23, w: 13, h: 44 },
    slots: [
      { productId: 'shadow-bomber', x: 50, y: 45, scale: 1.48, tilt: 0 },
    ],
  },
  {
    id: 'center-table',
    type: 'table-stack',
    label: 'Center Table',
    position: { x: 41, y: 55, w: 18, h: 27 },
    slots: [
      { productId: 'operator-jogger', x: 34, y: 48, scale: .92, tilt: -4 },
      { productId: 'apex-relic-deck', x: 69, y: 38, scale: .72, tilt: 5 },
    ],
  },
  {
    id: 'hat-shelf',
    type: 'hat-shelf',
    label: 'Hat Shelf',
    position: { x: 6, y: 62, w: 19, h: 21 },
    slots: [
      { productId: 'docklife-cap', x: 57, y: 41, scale: 1.15, tilt: -3 },
    ],
  },
  {
    id: 'objects-case',
    type: 'accessories-case',
    label: 'Objects Case',
    position: { x: 73, y: 63, w: 20, h: 22 },
    slots: [
      { productId: 'apex-relic-deck', x: 50, y: 42, scale: .82, tilt: -4 },
    ],
  },
]
