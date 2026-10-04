# Cindy regression — not started

AeroVista flagship is the store platform. Cindy is a downstream reference store and the compatibility test. This pass does not migrate Cindy and does not open a Cindy workstream.

Cindy's live path stays: storefront, then `api.aerovista.us`, then the server SKU and Square mapping, then Square checkout, then Printful. Five products and 36 variants at $68, including shipping and tax, remain the current Cindy offer.

Ask these four questions again before any Cindy cutover:

1. Can Cindy's approved promotion run on the flagship promotions engine without a private stack? The rule is $25 off each distinct qualifying style, one order only, maximum $125, no stacking. The server decides eligibility. Square records the discount. Creating checkout does not consume it. Redemption is final only after verified payment.
2. Can Cindy checkout through the flagship payload of product, variant, and quantity, with the server owning the $68 price?
3. Can Cindy use the required Apparel identity path — `identity.describe()`, `identity.can()`, and logout — without a second user database? That path is required and is not yet proven on `apparel.aerovista.us`.
4. Can Cindy wait for shared Commerce v1 instead of treating today's direct Square checkout as the future order ledger?

Migration starts only after those answers are yes and the shared contracts are stable. Until then, Cindy does not define a second platform.
