// Flagship promotions engine.
// Eligibility is calculated here for display and for a future server port.
// Creating a checkout does not redeem a promotion. Redemption is final only
// after verified payment. The browser never sends the discount as authority.

export const cindyConnectHoodies = Object.freeze({
  id: 'cindy-connect-hoodies',
  storeId: 'cindy-santi',
  label: 'Cindy Connect Hoodies',
  amountOffPerStyle: 25,
  maxDiscount: 125,
  oneOrder: true,
  noStacking: true,
  standing: 'approved-downstream-promotion',
})

function qualifyingStyles(lines) {
  const styles = new Set()
  for (const line of lines || []) {
    const style = String(line.styleId || line.productId || '').trim()
    if (style) styles.add(style)
  }
  return [...styles]
}

export function quoteCindyConnect(lines) {
  const styles = qualifyingStyles(lines).slice(0, cindyConnectHoodies.maxDiscount / cindyConnectHoodies.amountOffPerStyle)
  const discount = Math.min(styles.length * cindyConnectHoodies.amountOffPerStyle, cindyConnectHoodies.maxDiscount)
  return {
    promotionId: cindyConnectHoodies.id,
    status: 'display-only',
    redeemed: false,
    discount,
    styles,
    note: 'Square records the discount. This quote does not consume the promotion.',
  }
}

export function checkoutPayload(lines) {
  return (lines || []).map((line) => ({
    productId: line.productId,
    variantId: line.variantId,
    quantity: line.quantity,
  }))
}
