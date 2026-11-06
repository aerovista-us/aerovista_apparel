# Themed Rooms v1 — Apparel flagship

## Ownership

- Existing Men's Gallery, Women's Nocturne Studio and Objects & Editions remain intact.
- Entrance / foyer is the store's top-level directory.
- NorthLine is a standalone destination, linked from the foyer and the Men's Gallery's former NorthLine camera button.
- Drops Corridor is a top-level destination with independent Shadow Wear, EchoVerse and Architect/Nexus rooms.
- A legacy deep link `?space=mens&view=place` remains readable for backward compatibility.
- Room configurations are in `src/data/themedRooms.js`; architecture and responsive layout in `src/themed-rooms.css`. Rendering/routing is in `src/main.jsx`.
- Each theme chooses its own composition and collection edit; reusable product records remain canonical.

## Routes

| Route | Theme | Current edit |
|---|---|---|
| `?space=foyer` | Directory | Men's, Women's, NorthLine, Objects, Drops |
| `?space=northline` | Alpine | Ridgeline, Blue Divide, MoonLine, Powder |
| `?space=drops` | Corridor | Links to three themed rooms |
| `?space=shadow` | Industrial vault | Ghost Ridge, Shadow Wear, utility |
| `?space=echoverse` | Signal chamber | Frost Circuit / Signal Dial |
| `?space=architect` | Blueprint lab | Architect and Nexus |
| `?space=womens` | Nocturne | Existing authored Women's Studio |
| `?space=mens&view=room` | Existing main room | Existing physical fixtures |

## Commerce invariants

Room configuration is **presentation-only**. Every `productId` resolves against the normalized canonical catalog returned by `buildCatalogProducts()`. A drop is a curated view, not a separate Square item, product, or cart. A product may appear in multiple themed rooms with exactly the same canonical ID/variation and availability. The product drawer, identity, saved-item state, shopping bag, sticker pricing, and Square checkout are shared across rooms.

Only items present in the catalog can be clicked; absent IDs are omitted without fake buy buttons. The Ghost Ridge collection's 18 variants should stay mapped to the two Printful sync products; do not merge fulfillment identities.

## QA / operational acceptance

- Build: `npm run build`.
- Desktop 1440px / mobile 390px: direct routes for foyer, men, women, all four themes, drops, plus sticker box; no document overflow or uncaught errors.
- Navigate foyer → Drops → Shadow → other drops → Architect → foyer; verify URL updates and browser back/forward.
- Open a product in a themed room, add to cart, navigate to another room, and verify bag persists.
- Product identity and Square checkout flow must remain unchanged; do **not** place paid transactions merely for visual testing.
- Confirm images load once scrolled into view; lazy images below the fold may initially report not-loaded.
- Publishing involves PR CI, merge to `main`, Vercel READY, then canonical live-host browser acceptance.

## Future extension

Add rooms by appending a themed-room configuration, keyed by a unique URL-safe ID. Customize `theme-<art>` CSS and `layout` markup only when a bespoke interaction is justified. Put new sales products through the catalog/checkout audit before adding them to a live themed room. A drop can evolve independently without changing permanent floors.

## Spatial fixtures v2 — desktop physical-room display

The Desktop spatial layer (viewport width >900px) is a true authored **2.5D spatial illusion**, not a row of merchandise cards and not a WebGL world. Inspired by the Men's Gallery, it separates architectural background, fixed-position physical fixture shells, and clickable merchandise items.

- `src/data/roomFixtures.js`: per-room rack, shelf, table/plinth, and mannequin coordinates (percentages of the scene stage), and which indexed curated products appear on them.
- `src/room-spatial.css`: painted ceiling, back wall, side walls, perspective floor, rail structures, mannequin form, surfaces and lighting, with material treatments for NorthLine, Shadow, EchoVerse and Architect.
- `ThemedSpatialScene` and `RoomFixture` in `src/main.jsx`: canonical product resolution and physical placement. The item uses the existing `ProductImage`, existing product drawer, bag, checkout and saved-items paths.
- Desktop stage images are eagerly loaded to avoid apparent empty racks while moving through a room. Mobile retains the previous themed card grid and editorial header. Only one display model is visible per breakpoint.
- All visual geometry is CSS and regular accessible buttons: keyboard, product names, and standard browser controls work without WebGL.
- The catalog may gain additional products; to include them in the desktop scene, deliberately allocate a physical slot (and expand the fixture layout where necessary). Do not silently dump the full catalog into one room.

### QA acceptance

At 1440×900, all four room stages rendered and all 29 (10+9+3+7) preview-host merchandise slots loaded images, with zero detected merchandise rectangle collisions, horizontal overflow, or runtime errors. Clicking a product in each physical fixture opened the canonical product drawer with a live selectable variation. At 390×900 the physical stage is hidden and the mobile edit is visible with no overflow. NorthLine's Mount Sled supplementary item is intentionally host-gated during localhost testing; it appears on the canonical Apparel hostname when the backend sticker contract is enabled.
