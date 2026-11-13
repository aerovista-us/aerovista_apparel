# AeroVista Apparel — verified Square checkout returns

## Contract

A browser return URL is not evidence of payment. Canonical Apparel hosted checkout now supplies a random checkout reference created by the NXCore backend and stored hashed alongside the original Square payment link and order. The Square-hosted page redirects back to Apparel with this reference after processing the payment. The browser calls a read-only NXCore endpoint for verification; the backend fetches Square's original payment link, order, and completed tender payments before returning confirmed.

- Confirmed: backend has verified Square order and completed payments totaling the Square order amount. Display verified confirmation. Clear the bag only if the same session's pending checkout reference and exact original cart lines match the current bag.
- Pending: order exists but not fully paid. Preserve the bag and allow manual status recheck.
- Unavailable: Square or backend lookup failed. Preserve the bag and allow manual status recheck.
- Unverified: unknown/expired/altered reference or old success URL; preserve the bag. Never claim payment.
- Cancel: preserve the bag and do not claim that an order was paid or unpaid based on the URL alone.
- Fulfillment remains governed by Square webhooks and the Printful queue, not by browser redirects.

## Files

- src/commerce/checkoutReturn.js: session-only pending checkout fingerprint; no prices, buyer identifiers, card data, or payment IDs stored.
- src/commerce/client.js: backend verification GET and checkout reference received at link creation.
- src/main.jsx: read-only return status check, safe banner, retry, selective clear only after verified completion.
- Backend PR #8 in aerovista-commerce-api. Production overlay image: av-store-api:apparel-verified-return-20261112. Additive Postgres table: apparel_checkout_intents (SHA-256 token hash, Square link ID/order ID, timestamp).

## Acceptance evidence

- Frontend unit tests: checkoutReturn and existing cartPersistence (14 total).
- Browser return simulation in 1440px: old success URL, cancel URL, pending, confirmed, modified-cart confirmed, Square unavailable. Only the matching-cart confirmed case cleared; other cases preserved the cart and had no uncaught page errors.
- Backend: 10 tests inside the commerce container; a real unpaid Square payment link was created for an approved Apparel variation, verified as pending, then deleted without placing a payment. Square Payments READ scope returned 200.
- Existing SKU mappings remained at 240; sticker bundle and Gear checkout were unchanged.

## Limitations

No actual paid-card acceptance test was performed. A complete successful payment must still be witnessed in production with a genuine purchase and checked against the Square order/webhook/Printful pipeline before certification of the entire paid-to-fulfillment lifecycle. The simulated completed payment verifies code branches only, not Square's live capture behavior.

## Follow-up: delayed response / bag mutation

A delayed verified response must not clear a bag changed while network validation was in progress. The verified-success branch and the manual Check Again path now evaluate `mayClearPaidBag` against the latest cart inside a React functional state update, rather than against a captured stale render. Browser testing at 1440px and 390px intercepted checkout verification and held the provider response while a shopper increased the Idaho After Dark tee quantity from one to two. The simulated completed response arrived afterward; the bag correctly retained quantity two, with no JavaScript errors.

Backend verification also rejects canceled Square orders and any refunded amount on an otherwise COMPLETED payment. The Square payment object retains COMPLETED status after refund; payment status alone is insufficient. Commerce API PR #9 contains the pure tests and four no-payment checkout regression cases for Apparel hoodie, three-sticker bundle, Gear legacy checkout, and bundle isolation.
