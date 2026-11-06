// Desktop-only physical placement, modeled on the Men's Gallery's authored
// room/fixture/slot separation. Coordinates are percentages of the scene canvas.
// Slots refer to indices of each room's curated product list, never Square SKUs.
const rack = (id, x, y, w, h, indices, type = 'rack') => ({ id, type, x, y, w, h, indices })
export const roomFixtures = Object.freeze({
  northline: [
    rack('ridge-rail', 4, 30, 30, 28, [0, 1, 2], 'wall'),
    rack('powder-rail', 66, 27, 30, 32, [3, 4, 5], 'wall'),
    rack('summit-form', 45, 38, 13, 47, [6], 'mannequin'),
    rack('ridge-shelf', 10, 71, 25, 15, [7, 8], 'shelf'),
    rack('summit-plinth', 66, 74, 25, 15, [9, 10], 'table'),
  ],
  shadow: [
    rack('shadow-rail', 5, 30, 31, 31, [0, 1, 2], 'wall'),
    rack('tactical-rail', 67, 30, 28, 33, [4, 7], 'wall'),
    rack('ghost-form', 45, 39, 12, 47, [3], 'mannequin'),
    rack('utility-case', 7, 76, 27, 14, [5, 6, 8], 'table'),
  ],
  echoverse: [
    rack('frost-form', 17, 35, 19, 53, [0], 'mannequin'),
    rack('signal-form', 64, 37, 19, 52, [2], 'mannequin'),
    rack('frost-circuit-plinth', 41, 67, 18, 24, [1], 'table'),
  ],
  architect: [
    rack('field-rail', 5, 32, 31, 31, [1, 2], 'wall'),
    rack('systems-rail', 66, 29, 28, 32, [4, 5, 6], 'wall'),
    rack('architect-form', 45, 40, 12, 47, [0], 'mannequin'),
    rack('blueprint-plinth', 28, 73, 16, 18, [3], 'table'),
  ],
})
export function fixturesForRoom(id, products) {
  return (roomFixtures[id] || []).map(fixture => ({
    ...fixture,
    items: fixture.indices.map(index => products[index]).filter(Boolean),
  })).filter(fixture => fixture.items.length)
}
