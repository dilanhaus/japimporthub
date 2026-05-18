import Stripe from "stripe";

/**
 * Stripe client for server-only usage (Route Handlers, Server Actions).
 * Returns null when STRIPE_SECRET_KEY is unset so the app can boot without Stripe in early dev.
 */
export function getStripeServer(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}
