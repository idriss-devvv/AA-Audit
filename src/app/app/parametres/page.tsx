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
  active: { label: "Actif", className: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
  trialing: { label: "Essai en cours", className: "bg-blue-50 text-blue-700 ring-blue-200" },
  inactive: { label: "Inactif", className: "bg-beige-100 text-ink-600 ring-ink-200" },
  canceled: { label: "Résilié", className: "bg-rose-50 text-rose-700 ring-rose-200" },
  past_due: { label: "Paiement en retard", className: "bg-amber-50 text-amber-700 ring-amber-200" },
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
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      <h1 className="heading-display text-4xl md:text-[2.75rem]">Paramètres</h1>
      <p className="mt-3 max-w-2xl text-sm text-ink-500">
        Gérez les informations de votre compte et de votre entreprise.
      </p>

      <div className="mt-8 card max-w-2xl p-6 sm:p-7">
        <h2 className="card-title">
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

      <div className="mt-6 card max-w-2xl p-6 sm:p-7">
        <h2 className="card-title">
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

        <div className="mt-6 border-t border-ink-100 pt-5">
          <h3 className="card-title">
            Taux de cotisations attendus (% du brut)
          </h3>
          <p className="mt-1 text-xs text-ink-500">
            Utilisé pour contrôler les cotisations détectées sur les fiches (AT/MP, mutuelle,
            prévoyance, sécurité sociale...) — un libellé par cotisation à vérifier.
          </p>
          <ContributionRatesManager rates={paySettings.contributionRates} />
        </div>
      </div>

      <div className="mt-6 card max-w-2xl p-6 sm:p-7">
        <h2 className="card-title">
          Sécurité
        </h2>
        <p className="mt-1 text-xs text-ink-500">
          Choisissez un nouveau mot de passe pour votre compte.
        </p>
        <ChangePasswordForm />
      </div>

      <div className="mt-6 card max-w-2xl p-6 sm:p-7">
        <h2 className="card-title">
          Abonnement
        </h2>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-500">Plan actuel</p>
            <p className="mt-1 font-display text-3xl leading-none text-ink-900">{planLabel}</p>
          </div>
          <span className={`badge ${statusInfo.className}`}>
            {statusInfo.label}
          </span>
        </div>
        <div className="mt-5">
          <ManageSubscriptionButton />
        </div>
      </div>

      <div className="mt-6 max-w-2xl rounded-2xl border border-dashed border-ink-200 bg-beige-100/50 p-6 text-center">
        <p className="text-sm text-ink-500">
          Gestion des utilisateurs et des notifications à venir.
        </p>
      </div>
    </div>
  );
}
