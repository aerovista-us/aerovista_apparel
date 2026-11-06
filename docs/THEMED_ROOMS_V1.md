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
