# AeroVista Apparel: persistent bag + After Dark seasonal merchandising

## Cart persistence

The customer bag is now browser-local across page reloads, new tabs and browser restarts on the same browser/profile and origin.

Implementation:
- `src/commerce/cartPersistence.js` is a pure versioned serializer / validator / rehydrator.
- localStorage key: `aerovista-apparel.cart.v1`; retention: 30 days from last bag mutation.
- Persist only `productId`, exact Square `variationId`, `quantity`, and optional `bundleId`. Do not persist product descriptions, images, prices, checkout URLs, Square orders, session tokens, or any customer data.
- On reload, fetch the actual current catalog, then re-resolve each product and exact variation, replacing all stale price, size and availability values with current normalized catalog values.
- Invalid/deleted/unavailable records are dropped; incomplete sticker bundles are removed entirely rather than becoming invalid partial discounts. Original sticker pricing remains subject to NXCore's validated checkout contract.
- Storage failures are nonfatal; no network synchronization. An empty bag removes the storage key; this is per device/browser, not an account-synchronized shopping cart.
- Do not clear cart solely on a `checkout=success` URL. Only a verified Square payment could justify clearing it, and that verification is not part of this release.

## After Dark merchandise pass

Existing four signature products and price points remain unchanged:
- Midnight Signal hoodie, Neon Velocity hoodie, Haunted Mixtape hoodie ($58).
- Ghost Frequency beanie ($38).
- Signature floor plan: two mannequins, one central hoodie rail and one centered beanie shelf.

Add a separate Night Shift guest edit using already-published, validated Square catalog products:
- AeroVista Idaho After Dark Tee ($32.99).
- EchoVerse Frost Circuit Tee ($39.99).

Display guest tees on small, low side shelving/plinths, one left / one right. No additions to the central rack; no net new Square items or new Printful variants. Six total products in this themed room. Existing NorthLine and EchoVerse rooms continue to include the respective tees.

The Frost Circuit Tee's published Gear image is now stored as a stable local Apparel image at `public/products/echoverse-frost-circuit-tee/01-hero.webp`.

## Validation contract

- Pure cart tests: `node --test tests/cartPersistence.test.mjs` (7 cases, including invalid/expired data and restored sticker bundles).
- Production build: `npm run build`.
- Browser desktop/mobile: six After Dark products/images loaded, no horizontal overflow/page exceptions.
- Browser localStorage persistence: add Idaho After Dark Tee at current $32.99; refresh, bag retains one correct-price line; open another page on same browser origin, bag retains line. Only identity fields present in saved cart.
- No global Square price changes; no payment transaction, Printful order, new API credentials, or server-side session storage.
- On deployment, verify Vercel READY + live canonical hostname, including a fresh-site browser check.
