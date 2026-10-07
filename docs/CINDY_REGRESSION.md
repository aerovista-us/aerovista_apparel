# Cindy regression — not started

Apparel is the flagship being built. Gear remains the current production commerce reference. Cindy is a downstream regression store, not a second platform. This pass does not migrate Cindy.

Cindy's proven admission is checkout generation plus fulfillment mapping: 5 products, 36 variants, CORS, server SKU and Square variation mapping, Square-hosted checkout creation, and Printful mappings, at the $68 offer that includes shipping and tax. No purchase was required for that proof. A paid Cindy order through webhook to fulfillment has not been demonstrated. The $25 / one-order / $125 promotion is a requirement for a future shared engine. That engine has not redeemed it.

Ask these four questions again before any Cindy cutover:

1. Can the Cindy promotion requirement run on a shared promotions engine without a private stack? The requirement is $25 off each distinct qualifying style, one order only, maximum $125, no stacking. That shared enforcement path is not live.
2. Can Cindy checkout through product, variant, and quantity, with the server reading the accepted Square price for the $68 offer rather than a browser price or a stale map?
3. Can Cindy use the required Apparel identity path — `identity.describe()`, `identity.can()`, and logout — without a second user database? That path is required and is not yet proven on `apparel.aerovista.us`.
4. Can Cindy move onto normalized Commerce v1 without pretending the legacy API has no orders, webhooks, or fulfillment workers today?

Migration starts only after those answers are yes and the shared contracts are stable. Until then, Cindy does not define a second platform.
