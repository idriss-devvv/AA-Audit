import { createClient } from "@/lib/supabase/server";
import { ChangePasswordForm } from "@/components/auth/change-password-form";
import { ManageSubscriptionButton } from "@/components/app/manage-subscription-button";

const PLAN_LABELS: Record<string, string> = {
  free: "Gratuit",
  starter: "Starter",
  pro: "Pro",
  entreprise: "Entreprise",
};

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  active: { label: "Actif", className: "bg-green-100 text-green-700" },
  trialing: { label: "Essai en cours", className: "bg-blue-100 text-blue-700" },
  inactive: { label: "Inactif", className: "bg-beige-200 text-ink-700" },
  canceled: { label: "Résilié", className: "bg-red-100 text-red-700" },
  past_due: { label: "Paiement en retard", className: "bg-amber-100 text-amber-700" },
};

export default async function ParametresPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = user
    ? await supabase.from("profiles").select("company_id").eq("id", user.id).single()
    : { data: null };

  const { data: subscription } = profile?.company_id
    ? await supabase
        .from("subscriptions")
        .select("plan, status, current_period_end")
        .eq("company_id", profile.company_id)
        .single()
    : { data: null };

  const plan = subscription?.plan ?? "free";
  const status = subscription?.status ?? "inactive";
  const planLabel = PLAN_LABELS[plan] ?? plan;
  const statusInfo = STATUS_LABELS[status] ?? STATUS_LABELS.inactive;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-ink-900">Paramètres</h1>
      <p className="mt-1 text-sm text-ink-500">
        Gérez les informations de votre compte et de votre entreprise.
      </p>

      <div className="mt-8 max-w-xl rounded-2xl border border-beige-200 bg-white p-6 shadow-soft">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">
          Compte
        </h2>
        <dl className="mt-4 flex flex-col gap-3 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-ink-500">Email</dt>
            <dd className="font-medium text-ink-900">{user?.email}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-ink-500">Entreprise</dt>
            <dd className="font-medium text-ink-900">
              {(user?.user_metadata?.company_name as string) || "—"}
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-6 max-w-xl rounded-2xl border border-beige-200 bg-white p-6 shadow-soft">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">
          Sécurité
        </h2>
        <p className="mt-1 text-xs text-ink-500">
          Choisissez un nouveau mot de passe pour votre compte.
        </p>
        <ChangePasswordForm />
      </div>

      <div className="mt-6 max-w-xl rounded-2xl border border-beige-200 bg-white p-6 shadow-soft">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">
          Abonnement
        </h2>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-500">Plan actuel</p>
            <p className="text-lg font-bold text-ink-900">{planLabel}</p>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusInfo.className}`}>
            {statusInfo.label}
          </span>
        </div>
        <div className="mt-5">
          <ManageSubscriptionButton />
        </div>
      </div>

      <div className="mt-6 max-w-xl rounded-2xl border border-dashed border-beige-300 bg-beige-100 p-6 text-center">
        <p className="text-sm text-ink-500">
          Gestion des utilisateurs et des notifications à venir.
        </p>
      </div>
    </div>
  );
}
