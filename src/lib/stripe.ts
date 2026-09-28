import Stripe from "stripe";
import { PLANS, PLAN_ORDER, type PlanId } from "@/lib/plans";

/** Client Stripe, ou null tant que STRIPE_SECRET_KEY n'est pas configurée. */
export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  return key ? new Stripe(key) : null;
}

/**
 * Identifiant de prix Stripe d'une formule, lu dans les variables
 * d'environnement (STRIPE_PRICE_STARTER, STRIPE_PRICE_PRO,
 * STRIPE_PRICE_ENTREPRISE) : les prix se créent dans le Dashboard Stripe.
 */
export function priceIdFor(plan: PlanId): string | null {
  const env = PLANS[plan].stripePriceEnv;
  return env ? process.env[env]?.trim() || null : null;
}

/** Formule correspondant à un prix Stripe (webhook). */
export function planForPrice(priceId: string | null | undefined): PlanId | null {
  if (!priceId) return null;
  return PLAN_ORDER.find((plan) => priceIdFor(plan) === priceId) ?? null;
}

/** Statut Stripe → statut de la table subscriptions. */
export function toSubscriptionStatus(status: Stripe.Subscription.Status): "active" | "trialing" | "past_due" | "canceled" | "inactive" {
  switch (status) {
    case "active":
      return "active";
    case "trialing":
      return "trialing";
    case "past_due":
    case "unpaid":
      return "past_due";
    case "canceled":
    case "incomplete_expired":
      return "canceled";
    default:
      return "inactive";
  }
}
