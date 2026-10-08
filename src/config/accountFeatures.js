function readFlag(name, fallback = false) {
  const raw = import.meta.env?.[name];
  if (raw == null || raw === '') return fallback;

  return ['1', 'true', 'yes', 'on'].includes(String(raw).trim().toLowerCase());
}

export const accountFeatures = Object.freeze({
  hub: readFlag('VITE_APPAREL_ACCOUNT_HUB'),
  orders: readFlag('VITE_APPAREL_ACCOUNT_ORDERS'),
  saved: readFlag('VITE_APPAREL_ACCOUNT_SAVED'),
  fit: readFlag('VITE_APPAREL_ACCOUNT_FIT'),
  benefits: readFlag('VITE_APPAREL_ACCOUNT_BENEFITS'),
  restockAlerts: readFlag('VITE_APPAREL_RESTOCK_ALERTS'),
});

export function isAccountFeatureEnabled(feature) {
  return accountFeatures[feature] === true;
}
