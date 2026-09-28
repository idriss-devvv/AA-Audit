import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { getStripe, planForPrice, toSubscriptionStatus } from "@/lib/stripe";
import { PLAN_ORDER, type PlanId } from "@/lib/plans";

export const dynamic = "force-dynamic";

/**
 * POST /api/stripe/webhook — événements Stripe (signature vérifiée avec
 * STRIPE_WEBHOOK_SECRET). Tient à jour la table subscriptions :
 * - checkout.session.completed : client, abonnement et formule activés ;
 * - customer.subscription.created / updated / deleted : formule, statut, échéance ;
 * - invoice.payment_failed : statut « impayé » et alerte aux utilisateurs.
 * À déclarer dans le Dashboard Stripe (Développeurs › Webhooks).
 */
export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const admin = createAdminClient();
  if (!stripe || !secret || !admin) {
    return NextResponse.json({ error: "Webhook Stripe non configuré." }, { status: 503 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Signature manquante." }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(await req.text(), signature, secret);
  } catch {
    return NextResponse.json({ error: "Signature invalide." }, { status: 400 });
  }

  const companyIdOf = async (metadataCompany: string | undefined, customerId: string | null) => {
    if (metadataCompany) return metadataCompany;
    if (!customerId) return null;
    const { data } = await admin.from("subscriptions").select("company_id").eq("stripe_customer_id", customerId).maybeSingle();
    return (data?.company_id as string | undefined) ?? null;
  };

  const saveSubscription = async (companyId: string, sub: Stripe.Subscription) => {
    const item = sub.items.data[0];
    const metadataPlan = sub.metadata?.plan as PlanId | undefined;
    const plan = planForPrice(item?.price?.id) ?? (metadataPlan && PLAN_ORDER.includes(metadataPlan) ? metadataPlan : null);
    const status = toSubscriptionStatus(sub.status);
    // Échéance : sur l'abonnement (API < 2025) ou sur l'élément d'abonnement (API récente).
    const periodEnd = (sub as unknown as { current_period_end?: number }).current_period_end
      ?? (item as unknown as { current_period_end?: number })?.current_period_end
      ?? null;
    const values = {
      stripe_customer_id: typeof sub.customer === "string" ? sub.customer : sub.customer.id,
      stripe_subscription_id: sub.id,
      status,
      current_period_end: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
      ...(status === "canceled" ? { plan: "free" } : plan ? { plan } : {}),
    };
    const { data: updated } = await admin.from("subscriptions").update(values).eq("company_id", companyId).select("id");
    if (!updated?.length) await admin.from("subscriptions").insert({ company_id: companyId, plan: plan ?? "free", ...values });
  };

  const notify = async (companyId: string, title: string, body: string) => {
    const { data: users } = await admin
      .from("profiles")
      .select("id")
      .eq("company_id", companyId)
      .is("blocked_at", null);
    if (users?.length) {
      await admin.from("notifications").insert(
        users.map((u) => ({ user_id: u.id, company_id: companyId, kind: "info", severity: "warning", title, body, link: "/app/parametres?onglet=abonnement" }))
      );
    }
  };

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const companyId = session.client_reference_id ?? session.metadata?.company_id ?? null;
        if (!companyId || !session.subscription) break;
        const subscriptionId = typeof session.subscription === "string" ? session.subscription : session.subscription.id;
        await saveSubscription(companyId, await stripe.subscriptions.retrieve(subscriptionId));
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const companyId = await companyIdOf(sub.metadata?.company_id, typeof sub.customer === "string" ? sub.customer : sub.customer.id);
        if (companyId) await saveSubscription(companyId, sub);
        break;
      }
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id ?? null;
        const companyId = await companyIdOf(undefined, customerId);
        if (companyId) {
          await admin.from("subscriptions").update({ status: "past_due" }).eq("company_id", companyId);
          await notify(companyId, "Paiement de l'abonnement refusé", "Mettez à jour votre moyen de paiement pour conserver votre formule.");
        }
        break;
      }
    }
  } catch (err) {
    console.error("[stripe-webhook]", event.type, err);
    return NextResponse.json({ error: "Traitement impossible." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
