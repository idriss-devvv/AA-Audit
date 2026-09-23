import { createClient } from "@/lib/supabase/server";
import { getActiveCompanyContext } from "@/lib/active-company";
import { getCompanyPaySettings, listCollectiveAgreements } from "@/lib/pay-settings";
import { ChangePasswordForm } from "@/components/auth/change-password-form";
import { ManageSubscriptionButton } from "@/components/app/manage-subscription-button";
import { PaySettingsForm } from "@/components/app/pay-settings-form";
import { ContributionRatesManager } from "@/components/app/contribution-rates-manager";

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

  const { isCabinet, ownCompanyName, clients, activeCompanyId, activeCompanyName } =
    await getActiveCompanyContext();

  const [paySettings, agreements] = await Promise.all([
    activeCompanyId
      ? getCompanyPaySettings(activeCompanyId)
      : Promise.resolve({
          csgCrdsNonDeductiblePercent: null,
          salaireMinimumConventionnel: null,
          contributionRates: [],
          collectiveAgreementIdcc: null,
          collectiveAgreementCustomName: null,
        }),
    listCollectiveAgreements(),
  ]);
  const agreementsLastVerified = agreements[0]?.verified_at ?? null;

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
            <dt className="text-ink-500">{isCabinet ? "Cabinet" : "Entreprise"}</dt>
            <dd className="font-medium text-ink-900">
              {ownCompanyName || (user?.user_metadata?.company_name as string) || "—"}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-ink-500">Type de compte</dt>
            <dd className="font-medium text-ink-900">
              {isCabinet ? "Cabinet comptable" : "Entreprise"}
            </dd>
          </div>
          {isCabinet && (
            <div className="flex items-center justify-between">
              <dt className="text-ink-500">Clients gérés</dt>
              <dd className="font-medium text-ink-900">{clients.length}</dd>
            </div>
          )}
        </dl>
      </div>

      <div className="mt-6 max-w-2xl rounded-2xl border border-beige-200 bg-white p-6 shadow-soft">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">
          Barèmes de contrôle
        </h2>
        <p className="mt-1 text-xs text-ink-500">
          {activeCompanyName || "Cette entreprise"} — ces valeurs ne sont jamais préremplies :
          renseignez-les vous-même (ou via votre expert-comptable) selon la convention collective
          et les taux réellement applicables. Tant qu&apos;un champ est vide, le contrôle
          correspondant reste inactif.
        </p>
        {agreementsLastVerified && (
          <p className="mt-2 text-xs text-ink-400">
            Liste des conventions collectives vérifiée le{" "}
            {new Date(agreementsLastVerified).toLocaleDateString("fr-FR")} (source : DARES / base
            KALI) — à recontrôler périodiquement, non exhaustive.
          </p>
        )}
        <PaySettingsForm
          initialCsgCrds={paySettings.csgCrdsNonDeductiblePercent}
          initialSalaireMinimum={paySettings.salaireMinimumConventionnel}
          agreements={agreements}
          initialCollectiveAgreementIdcc={paySettings.collectiveAgreementIdcc}
          initialCollectiveAgreementCustomName={paySettings.collectiveAgreementCustomName}
        />

        <div className="mt-6 border-t border-beige-100 pt-5">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-500">
            Taux de cotisations attendus (% du brut)
          </h3>
          <p className="mt-1 text-xs text-ink-500">
            Utilisé pour contrôler les cotisations détectées sur les fiches (AT/MP, mutuelle,
            prévoyance, sécurité sociale...) — un libellé par cotisation à vérifier.
          </p>
          <ContributionRatesManager rates={paySettings.contributionRates} />
        </div>
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
