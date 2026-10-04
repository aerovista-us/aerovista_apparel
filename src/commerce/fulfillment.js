// Fulfillment providers execute the order. Apparel does not.
// A browser return is not a payment event and does not release fulfillment.

export const fulfillmentNote = 'Fulfillment stays with the provider until a verified payment event. Returning to the store does not release it.'

export function fulfillmentBoundary() {
  return {
    authority: 'fulfillment-provider',
    release: 'after-verified-payment-only',
    returnUrlIsPayment: false,
    note: fulfillmentNote,
  }
}
