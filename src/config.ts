// config.ts
// Use VITE_API_URL at build time when set (e.g. Docker). Empty = same-origin (works with nginx proxy).
export const CONFIG = {
  API_BASE_URL: (import.meta.env.VITE_API_URL as string) ?? '',
  ANALYTICS_KEY: 'GA-SHOPWORTHY-PROD-4f8a2b1c',   // fake Google Analytics key
  PAYMENT_PUBLIC_KEY: 'pk_live_shopworthy_abc123',  // fake Stripe-style public key
  INTERNAL_API_SECRET: 'sw-internal-2024-secret',
  DEBUG_MODE: true,
};
