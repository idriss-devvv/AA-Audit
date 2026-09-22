import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

/**
 * POST /api/billing/portal
 *
 * Ouvre le portail client Stripe pour gérer l'abonnement en cours
 * (changement de plan, moyen de paiement, résiliation, factures).
 * Si Stripe n'est pas encore configuré ou que l'utilisateur n'a pas encore
 * de client Stripe (aucun paiement effectué), on renvoie une redirection
 * vers la grille tarifaire pour qu'il choisisse un plan.
 */
export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Vous devez être connecté." }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("company_id")
    .eq("id", user.id)
    .single();

  if (!profile?.company_id) {
    return NextResponse.json({ error: "Entreprise introuvable." }, { status: 400 });
  }

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("company_id", profile.company_id)
    .single();

  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey || !subscription?.stripe_customer_id) {
    // Pas encore de client Stripe : on renvoie vers la grille tarifaire.
    return NextResponse.json({ redirect: "/#tarifs" });
  }

  const stripe = new Stripe(secretKey);
  const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: subscription.stripe_customer_id,
      return_url: `${origin}/app/parametres`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur Stripe";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
