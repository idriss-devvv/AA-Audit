import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { PLAN_ORDER, type Billing, type PlanId } from "@/lib/plans";
import { getStripe, priceIdFor } from "@/lib/stripe";

/**
 * POST /api/checkout — { plan: "starter" | "pro" | "entreprise", billing?: "monthly" | "annual" }
 * Crée une session Stripe Checkout rattachée à l'entreprise de l'utilisateur
 * connecté (client_reference_id + métadonnées) : le webhook
 * /api/stripe/webhook active ensuite la formule. Visiteur non connecté :
 * renvoyé vers l'inscription.
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const plan = body?.plan as PlanId;
  const billing: Billing = body?.billing === "annual" ? "annual" : "monthly";
  if (!PLAN_ORDER.includes(plan) || plan === "free") {
    return NextResponse.json({ error: "Formule inconnue." }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ redirect: `/inscription?formule=${plan}` });

  const stripe = getStripe();
  const priceId = priceIdFor(plan, billing);
  if (!stripe || !priceId) {
    return NextResponse.json({ error: "Le paiement en ligne n'est pas encore activé. Contactez-nous pour souscrire." }, { status: 503 });
  }

  const { data: profile } = await supabase.from("profiles").select("company_id").eq("id", user.id).single();
  if (!profile?.company_id) return NextResponse.json({ error: "Entreprise introuvable." }, { status: 400 });

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("company_id", profile.company_id)
    .maybeSingle();

  const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const metadata = { company_id: profile.company_id, plan };

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      client_reference_id: profile.company_id,
      metadata,
      subscription_data: { metadata },
      ...(subscription?.stripe_customer_id ? { customer: subscription.stripe_customer_id } : { customer_email: user.email }),
      allow_promotion_codes: true,
      billing_address_collection: "required",
      locale: "fr",
      success_url: `${origin}/app/parametres?onglet=abonnement&paiement=ok`,
      cancel_url: `${origin}/app/parametres?onglet=abonnement&paiement=annule`,
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur Stripe";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
