# Showroom promotion — 2026-10-13

The verified showroom is on `main` at `8a3d209` and Vercel production accepted that deployment. It includes the men's gallery rooms, NorthLine and Further Edit plates, the footwear shelf, the sticker box on the table, From-prices, and the Women's Studio scale and Vespera name. Inbox masters, loose place-line PNGs, and off-floor galleries stay unpublished. Mugs, Future's Past hoodies, the duffle, phone cases, denim, and resort canvases stay off the floor. The phone grid in Women's Studio uses the same niche shots as the desktop bays.

# Women's Studio — 2026-10-13

All six Women's Studio pieces and the center swim editorial load from local galleries. The dress, Vespera hoodie, swimsuit, and Summit bomber are scaled up inside their niches so the square source shots fill more of the bay. The customer name is Vespera Moonscript Hoodie.

# Store audit corrections — 2026-10-13

The Further Edit Ash tee and the Glitch Orbit cap now use their local WebP heroes instead of a Gear PNG and a loose PNG. Wall and shelf tags say "From" when sellable sizes differ by a dollar or more. The selected size in the product drawer still shows that size's price. Further Edit copy no longer mentions Square.

# Table objects — 2026-10-12

The sticker box, Apex Relic deck, and can cooler sit on the men's gallery table. The deck no longer has a frame around it. The box, the deck, and the cooler each have a visible edge so they stand off the tabletop.

# Shoe shelf — 2026-10-12

The men's footwear shelf now uses a side view for each shoe. Midnight Alpine uses the single-shoe side, `40-right-01.webp`. Shadow Sneaks uses `50-side.webp`, the side shoe from `45-right-front-01.webp` with the second sole removed. The product drawer still opens on the hero.

# Sticker box — 2026-10-12

The sticker box is an open tray over the men's gallery. The lid sits behind the cardboard shell, and the stickers rest in the well. Grabbing one lifts it and nudges the pile. A toss slides it and shoves whatever it hits. A tap still opens the product drawer, and the sticker shows its name and price while it is held. The miniature on the men's gallery table uses the same tray.

# Catalog console image paths — 2026-10-11

Products that had a real image file but no `/store/products/{id}/` path now use that gallery path in the hosted catalog console at https://store-console.aerocoreos.com/. Twenty flat-filename products were linked, and the glossy mug, five Future's Past hoodies, and the NorthLine heroes are on the console store mount. Thirty catalog rows still have no image because no source file exists. The API catalog was not replaced. These products were not added to the apparel floor.

# Product images — 2026-10-11

NorthLine heroes now use the mockups from [aerovista-us/northline assets/products](https://github.com/aerovista-us/northline/tree/main/assets/products): Ridgeline, Idaho After Dark, Blue Divide, Source Code, MoonLine, and Powderline tees, plus the MoonLine and Behind the Scenes hats. The Behind the Scenes tee and the Blue Divide sticker were not in that folder, so their current heroes stay. New inbox art is filed as galleries: `Black Aerovista Glossy Mug.zip` is `black-aerovista-glossy-mug` (11 oz front is the hero, plus the 15 oz front and both handle views). `time-circet.zip` is the five Future's Past black hoodies: Biff, Doc, Flux, Parradox, and Marty. Those products stay off the apparel floor. The source zips stay in `public/products/_inbox/`.

# Look and feel pass — 2026-10-10

The local flagship room pass is on `feature/entry-gallery`. Men's main floor, tee wall, and hoodie wall share `interior.svg`. NorthLine, Further Edit, and Objects each have their own room plate. Wall rows rise from the front of the rail toward the back. NorthLine and Further Edit hats sit on shelves, and the phone layout uses the same shelf and table zones. The Glitch Orbit cap uses the cap fixture so it sits with the other headwear. The NorthLine shelf is dropped just enough that the front tee clears the hats. The men's gallery has a second shelf under the hoodie wall, opposite the headwear. Shadow Sneaks and Midnight Alpine sit on that shelf. Mugs and the duffle stay off the floor. Raw masters and `public/products/_inbox/` stay unpublished.

# Store Console identity plan — 2026-10-10

The catalog console now starts at the existing `catalog-console` AeroCore handoff. Opening https://store-console.aerocoreos.com/ redirects to AVCC sign-in. The operator password remains only at `?breakglass=1`. The plan is `aerovista-store/docs/STORE_CONSOLE_IDENTITY_INTEGRATION_PLAN.md`. Account proves authentication, Identity grants capability, and App Adapter only transports that result.

# Catalog console — 2026-10-10

The hosted catalog console at https://store-console.aerocoreos.com/ now opens the October 8 projection: 115 products, with image paths for Laced Kitty, Holographic Kitty, Shadow Sneaks, Midnight Alpine Woodcut Repeat, and the Shadow camo duffle. The previous console catalog was backed up on NXCore. The API catalog that apparel checkout reads was not replaced.

# Inbox galleries — 2026-10-08

Five new inbox zips are filed under their Square product ids. `Laced Kitty.zip` is `laced-kitty` (black and blue 15 oz mugs). `Holographic Kitty.zip` is `holographic-kitty`. `Shadow Sneaks.zip` is `shadow-sneaks`. `Midnight Alpine Woodcut Repeat.zip` is `midnight-alpine-woodcut-repeat` (athletic shoes). `duff.zip` is `shadow-camo-duffle-bag`. Each gallery uses `01-hero.webp` plus the numbered front, back, side, and angle views. These products stay off the apparel floor. The zips remain in `public/products/_inbox/`.

# Catalog projection — 2026-10-08

The October 8 Square export `1149XBNG8C8ZE_catalog-2026-10-08-2105.xlsx` was projected into the Gear catalog. NorthLine tees stay at $32.99 and the embroidered hats stay at $38.99, with the second Behind the Scenes hat variation still at $42.00. No placeholder row was published. NorthLine tee mockups are not attached yet. This projection is local until it is deployed through Gear.

# Room themes — 2026-10-08

NorthLine, Further Edit, and Objects & Editions no longer share the men's gallery shell. NorthLine uses a night ridgeline room (`public/store/northline-room.svg`), Further Edit uses a warm quiet wall (`further-edit-room.svg`), and Objects uses a lit editions table (`objects-room.svg`). The men's main floor, tee wall, and hoodie wall stay on `interior.svg` because those cameras are one room. Women's Studio, the entry gallery, and the exterior already had their own plates. Wall and table geometry is unchanged, so the clothes stay on the same rails.

# Room placement — 2026-10-08

Wall rows rise slightly from the front of the rail toward the back, matching the room perspective. The men's left wall now hangs on two rails, lower on the dark panel. NorthLine is the customer name for the former Place Line. Its tees use the left wall, its hats and the Blue Divide sticker use the shelf, and the camera is centered on that wall. Further Edit uses the right wall. Objects & Editions keeps the table camera, now centered with the room plane. The directory board is wider and its type is 13–15px so the notes stay readable in a narrower window.

# Production checkout acceptance — 2026-10-07

The flagship checkout gate is accepted. The Gear API proxy now admits `https://apparel.aerovista.us` and the production Worker is deployed through the Store repo's explicit Cloudflare version flow. Store main `34351d81b83928896f6287a8951f851f1b70fab0` produced Worker version `be777901-d1be-4d24-b747-8225ea527106`, promoted at 100% traffic. The GitHub-hosted runner is denied by Cloudflare edge policy with HTTP 403 during the public probe, so CI records that specific condition as a warning; NXCore remains the accepted edge-admitted live probe.

NXCore production acceptance proved:
- `OPTIONS https://gear.aerovista.us/api/square/checkout` from Origin `https://apparel.aerovista.us` returns HTTP 204 with the exact `Access-Control-Allow-Origin` header plus checkout CORS methods/headers.
- `GET https://gear.aerovista.us/api/square/bootstrap` returns HTTP 200 with the exact Apparel origin admitted.
- Ridgeline Tee size S maps through `Default__S` to Square variation `CYMAIUALBD5E65AY64AE33CS` at 3299 cents; live checkout creation returned HTTP 200, Apparel CORS, `ok: true`, and a Square-hosted checkout URL.
- Shadow Pants size M maps through `Default__M` to Square variation `AADW36VFWTN37URWPN6EHEXT` at 5200 cents; live checkout creation returned HTTP 200, Apparel CORS, `ok: true`, and a Square-hosted checkout URL.
- No payment was submitted and no fulfillment was triggered during these smokes.

The October 4 stale-price hold and the October 7 browser-CORS blocker are both closed. Square remains authoritative for catalog existence and base price; the curated JSON remains the storefront projection, not authority. The next platform phase is the Apparel Identity/App Adapter proof, followed by Commerce v1 normalization. Cindy remains a regression/reference surface and is not being migrated in this phase.

# Checkpoint status — 2026-10-07

The price hold is lifted. The mounted API catalog and `sku_map.generated.json` on NXCore were replaced from the October 4 Gear projection and `av-store-api` was restarted. The previous files were kept beside them as `*.bak-20261007`. The API prices Shadow Pants M (`AADW36VFWTN37URWPN6EHEXT`) at 5200 cents. The cart key `Default__M` is shared by many products and is not a price. This revision is published on `main` as `1a072a6` and is what `https://apparel.aerovista.us/` is serving. Raw masters and `public/products/_inbox/` stay unpublished. Cindy has not been migrated. Apparel identity proof and Commerce v1 remain the next platform phase.

Production acceptance on 2026-10-07 walked the entrance, directory, Men's Gallery, Place Line, and Women's Studio, including about 820px and about 390px. Place Line shows connected prices, and Ridgeline size S can be added to the bag at $32.99. Browser checkout from `apparel.aerovista.us` to `gear.aerovista.us/api/square/checkout` failed with "Failed to fetch" because the Gear API proxy allowlist did not include the flagship origin. The allowlist change is `b3fc6dd` on the store repo. The GitHub worker deploy skipped because `CLOUDFLARE_API_TOKEN` is not set, so the live proxy has not picked up that origin yet.

# Checkpoint status — 2026-10-04

Flagship UX/catalog audit: implemented locally on `feature/entry-gallery` and not yet pushed. Local responsive QA passed on desktop, about 820px, and about 390px. The October 4 Gear catalog is published at `https://gear.aerovista.us/square_products_latest.json` (`926d1cf`). Place Line variation ids, sizes, and prices resolve there. A Gear checkout smoke test created Square payment links without sending a browser price. Ridgeline Tee, size S, opened at $32.99. Shadow Pants, size M, opened at $46.00 while the accepted Square catalog says $52.00. The legacy API map is the stale projection. Square wins, and the storefront is not rewritten to match the map. The production flagship deploy stays held until the server price equals the accepted Square price. Cindy migration has not started. Apparel identity proof and Commerce v1 order reconciliation remain the next platform phase.

# Published revision — 2026-10-04

Fetched `origin/main` on 2026-10-04. GitHub `main` is `b9f186aa73603783d344b6debfdbef6e50e3fdbc` (“Exclude source artwork from Vercel build context”). That commit adds `.vercelignore` and `docs/VERCEL_DEPLOYMENT_SIZE_AUDIT_2026-09-24.md` on top of storefront `a8e76f4b409b1dc11808a91102cd50462b052919` (“Improve bright-room visibility”). Production `https://apparel.aerovista.us/` is that Vercel deploy. Local `feature/entry-gallery` remains the storefront commit. Untracked `public/img/*` masters and `public/products/_inbox/` stay off the published site. `NorthLine.png` has no Square item.

The October 4 Square export (`1149XBNG8C8ZE_catalog-2026-10-04-1828.xlsx`) is the item authority. It has 620 variation rows, 118 item names, and 106 visible items that are not archived. The apparel room does not read that workbook. `F:\aerovista-store\scripts\project-october-catalog.py` projects it into `store/square_products_latest.json`, keeps curated ids and galleries on a match, and uses column B Token as `variation_id`.

On the floor: the original men's room (tees, bombers, bottoms, hoodie wall, headwear, objects table), the women's nocturne edit, a Place Line camera for ten local graphics, and a Further Edit camera for seven photographed Square-visible pieces. Utility, phone cases, mugs, resort canvases, the cotton skater dress, and the duplicate Wave Mark listing stay off the apparel floor. Place Line pieces render as Preview until their Square variations are what production Gear serves. Apparel production still reads the remote Gear catalog until that JSON is deployed.

# Session Notes — 2026-08-30

These notes preserve the implementation details and decisions that are most likely to matter in future AeroVista Apparel work.

## Repository and deployment

- This repository is the prototype and intended future replacement for `gear.aerovista.us`.
- Canonical repository: `https://github.com/aerovista-us/aerovista_apparel`.
- Local checkout: `F:\aerovista_apparel`.
- Production branch: `main`.
- The `feature/canonical-product-galleries` branch was fast-forwarded to the same revision as `main` at the end of this work.
- Public production storefront: `https://apparel.aerovista.us`.
- Vercel deploys automatically from GitHub. Preview deployments may be protected by Vercel authentication; the custom production domain is public.

## Product and image authority

- Product commerce identity remains catalog-first. Canonical IDs, variation IDs, prices and availability come from the Gear catalog; spatial files only decide presentation and placement.
- Canonical product galleries live under `public/products/<canonical-product-id>/` in this repository.
- Catalog image paths beginning with `/store/products/` are rebased to the local `public/products/` galleries by `src/commerce/catalog.js`.
- `src/data/merchandising.js` selects the showroom assortment and contains presentation-only overrides.
- `src/data/fixtures.js` is the desktop spatial placement plan.
- The latest store export used during this work was `F:\aerovista-store\store\square_products_latest.json`.
- The deployed Gear catalog did not yet contain three sticker products that were present in the latest local store export. Explicit presentation-only fallbacks were added for those products so their committed galleries can appear in the showroom. These fallbacks deliberately contain no Square identity, variation or checkout capability and remain unavailable until the live catalog reconnects them.
- Manually approved editorial photographs that are not yet in the Gear export are registered in `productGalleryAdditions` within `src/data/merchandising.js`. This keeps gallery additions separate from the current-room assortment.
- When duplicate image files are deleted, remove their entries from the corresponding `manifest.json`; otherwise the manifest will advertise broken gallery assets. The deployment audit checks that every manifest entry resolves to a file.

## Current showroom

- The flagship currently displays 25 pieces:
  - eight tees, outerwear and bottoms
  - seven hoodies
  - five hats
  - five Objects & Editions products
- Wall apparel and hats now use normalized fixture scales to avoid unintended size gradients across a row.
- The center table contains the Apex Relic playing cards, the pattern can cooler, and a sticker-box board. Apex Draft, BillyGoat, Holographic Goat, and the Blue Divide sticker open on that board.

## Spatial calibration

- Exterior and interior environment art use a registered `1672 × 941` design plane.
- The exterior logo is a child of `.exterior-image`, not a viewport overlay. This keeps it attached to the upper wall through responsive crops and the entrance transition.
- The upper sign occupies the wall band at approximately `left: 14.23%`, `top: 17.11%`, `width: 71.53%`, `height: 12.97%`.
- Merchandise, architecture and camera transforms must continue to share the same scene plane. Viewport-fixed product placement breaks the physical-location illusion during resizing and camera moves.
- Dark product photography benefits from restrained brightness/contact-shadow adjustments, but items should retain believable differences in physical size.
- Equal fixture dimensions do not guarantee equal visible garment size: square exports with internal padding render much smaller than tightly cropped portrait exports. Desktop wall products use a presentation-only `stageScale` to normalize the optical garment bounds while leaving product-detail images untouched.

## Commerce host routing

- `gear.aerovista.us` hosts the legacy catalog and commerce API.
- `apparel.aerovista.us` hosts the prototype room and should not probe same-origin Gear API paths.
- `src/commerce/client.js` therefore uses first-party catalog/bootstrap paths only on the Gear hostname. The prototype reads the public Gear catalog and skips protected bootstrap requests unless an explicit commerce API base is configured.
- Checkout remains fail-closed: a product without a verified live variation cannot be placed in the bag for checkout.

## Verification completed

- Production Vite build passes.
- Desktop verification found one mounted exterior logo, 25 room products and five products on the center table.
- The sticker shuffle changes the authored table positions.
- Product detail galleries open for presentation-only sticker items and correctly show them as unavailable.
- Final production verification at `https://apparel.aerovista.us` returned HTTP 200 with no failed network requests, console errors or page errors.
- Existing Vite build warnings concern legacy non-module/layered CSS loading and unresolved public asset URLs at build time; the assets are intentionally resolved from `public/` at runtime.

## Design backlog

1. Add a dedicated Women's room after the catalog has enough products to make it feel intentionally merchandised.
2. Prefer one wall per major line before creating a separate room for every line.
3. Consider a third, higher headwear row only after its room perspective and mobile equivalent are designed together.
4. The sticker box opened this. Stickers drag and toss on a canvas over the men's gallery, and a tap still buys through the product drawer.
5. Continue adding rooms or rotating walls as inventory grows instead of shrinking merchandise into a dense catalog grid.

## Entry Gallery addition — 2026-08-31

- A new `feature/entry-gallery` branch adds the orientation room between the storefront and the merchandise showroom.
- The space sequence is now `Outside → Entry Gallery → Men's Gallery`. Leaving the Men's Gallery returns to the Entry Gallery; leaving the Entry Gallery returns outside.
- The former general showroom is now identified as the Men's Gallery. Its catalog, fixtures, product drawers, bag and checkout behavior are unchanged.
- The physical directory names four destinations:
  - Men's Gallery — open and interactive
  - Women's Studio — opening soon
  - Collections Hall — opening soon
  - Objects & Editions — on view inside the current gallery
- The right-hand architectural threshold and the Men's Gallery directory row both open the current showroom. Unfinished rooms are visible but deliberately non-interactive.
- `public/store/entry-gallery-v1.webp` is a new project-owned raster environment generated from the existing showroom's visual language. It contains the architecture, lighting and mannequins only; directory copy and room statuses remain accessible HTML.
- `src/entry-gallery.css` calibrates the interface to the new scene and provides a compact mobile directory treatment.
- Future room work should extend the `space` state rather than adding more booleans. Dedicated URL/history routing becomes worthwhile when a second merchandise room opens.

## Women's Studio addition — 2026-08-31

- The foyer's left doorway and directory listing now open a complete Women's Studio; both Women's and Men's rooms return to the shared Entry Gallery.
- The opening assortment contains six catalog-backed products: the Apex Pattern Skater Dress, Apex Pattern one-piece swimsuit, white Wave Mark zip hoodie, women-modeled Summit bomber, Shadow pants and Shadow Pattern hoodie.
- Women-specific items remain out of the Men's Gallery. `womenStudioProductIds` defines the separate room assortment while shared unisex product records continue to use the same commerce identity.
- `buildCatalogProducts()` now returns `womenStudioProducts` alongside `showroomProducts`, preserving live variation, price, availability, bag and checkout behavior in both rooms.
- `public/store/womens-studio-v1.webp` is the studio's generated architectural shell. The six empty display bays, central editorial frame and room perspective are registered to the same `1672 × 941` scene plane used throughout the store.
- The central editorial frame uses the approved local swimsuit model image, while every sellable display bay remains a real product button with accessible product details.
- Desktop visitors approach merchandise in the room; mobile visitors receive a compact architectural view followed by a touch-sized two-column opening edit.
- Screenshot calibration replaced the near-bay dress and swimsuit hero images with transparent product-focused exports. This removes the swimsuit's rectangular black backdrop and keeps all six pieces visually seated inside their illuminated niches.
- The Nocturne refinement replaces the central rectangular swimsuit poster with two transparent catalog model layers, allowing the illuminated back-wall frame to remain visible around the figures.
- Vespera Moonscript and Night Ranger Bear now anchor the Studio's darker apparel story in place of the generic Shadow pants and Shadow Pattern hoodie displays. A restrained violet-and-champagne light treatment warms the existing architectural shell without changing it.
- The six bay products now use a mirrored depth scale: near, middle and far fixtures share matching dimensions across both walls. Vespera uses its full-front hoodie hero rather than a folded-detail image, and the two transparent editorial models are enlarged and bottom-anchored so their source-image crop terminates at the frame edge instead of floating above it.
- Bright-room accessibility pass: the storefront, Entry Gallery, Men's Gallery and Women's Studio architectural layers now use raised midtones and softer edge/floor shading. Product layers and interface chrome remain dark and high-contrast, preserving the gallery mood while making walls, bays and floor geometry easier to perceive in daylight.
