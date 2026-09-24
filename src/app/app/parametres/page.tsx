import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getActiveCompanyContext } from "@/lib/active-company";
import { getCompanyPaySettings } from "@/lib/pay-settings";
import { ChangePasswordForm } from "@/components/auth/change-password-form";
import { ManageSubscriptionButton } from "@/components/app/manage-subscription-button";
import { PaySettingsForm } from "@/components/app/pay-settings-form";
import { ContributionRatesManager } from "@/components/app/contribution-rates-manager";
import { SettingsTabs, resolveSettingsTab } from "@/components/app/settings-tabs";
import { CONVENTION_GRIDS } from "@/lib/rules/referentiels/grilles-conventionnelles";

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

/** Contrôles déjà automatiques — rien à saisir pour eux. */
const AUTOMATIC_CONTROLS = [
  "Taux de cotisations salariales URSSAF et Agirc-Arrco (2025-2026)",
  "Plafond mensuel de la Sécurité sociale (PMSS)",
  "SMIC en vigueur à la date de la fiche",
  "Convention collective détectée sur chaque fiche (IDCC ou libellé)",
  `Salaires minimaux conventionnels de ${CONVENTION_GRIDS.length} conventions`,
  "Heures supplémentaires, mentions obligatoires, net à payer, congés payés",
];

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-ink-100 py-3 last:border-0">
      <dt className="text-ink-500">{label}</dt>
      <dd className="text-right font-medium text-ink-900">{value}</dd>
    </div>
  );
}

export default async function ParametresPage({
  searchParams,
}: {
  searchParams: { onglet?: string | string[] };
}) {
  const tab = resolveSettingsTab(searchParams.onglet);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { isCabinet, ownCompanyName, clients, activeCompanyId, activeCompanyName } =
    await getActiveCompanyContext();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      <h1 className="heading-display text-4xl md:text-[2.75rem]">Paramètres</h1>
      <p className="mt-3 max-w-2xl text-sm text-ink-500">
        Gérez les informations de votre compte et de votre entreprise.
      </p>

      <SettingsTabs active={tab} />

      {tab === "compte" && (
        <div className="mt-6 grid max-w-2xl gap-6">
          <section className="card p-6 sm:p-7">
            <h2 className="card-title">Informations du compte</h2>
            <dl className="mt-3 text-sm">
              <InfoRow label="Email" value={user?.email} />
              <InfoRow
                label={isCabinet ? "Cabinet" : "Entreprise"}
                value={ownCompanyName || (user?.user_metadata?.company_name as string) || "—"}
              />
              <InfoRow label="Type de compte" value={isCabinet ? "Cabinet comptable" : "Entreprise"} />
              {isCabinet && <InfoRow label="Clients gérés" value={clients.length} />}
            </dl>
          </section>

          <section className="card p-6 sm:p-7">
            <h2 className="card-title">Sécurité</h2>
            <p className="mt-1 text-xs text-ink-500">Choisissez un nouveau mot de passe pour votre compte.</p>
            <ChangePasswordForm />
          </section>

          <div className="rounded-2xl border border-dashed border-ink-200 bg-beige-100/50 p-6 text-center">
            <p className="text-sm text-ink-500">Gestion des utilisateurs et des notifications à venir.</p>
          </div>
        </div>
      )}

      {tab === "abonnement" && <SubscriptionTab userId={user?.id ?? null} />}

      {tab === "baremes" && <BaremesTab companyId={activeCompanyId} companyName={activeCompanyName} />}
    </div>
  );
}

async function SubscriptionTab({ userId }: { userId: string | null }) {
  const supabase = await createClient();
  const { data: profile } = userId
    ? await supabase.from("profiles").select("company_id").eq("id", userId).single()
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
  const statusInfo = STATUS_LABELS[status] ?? STATUS_LABELS.inactive;
  const periodEnd = subscription?.current_period_end
    ? new Date(subscription.current_period_end).toLocaleDateString("fr-FR")
    : null;

  return (
    <div className="mt-6 grid max-w-2xl gap-6">
      <section className="card p-6 sm:p-7">
        <h2 className="card-title">Votre abonnement</h2>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-ink-500">Plan actuel</p>
            <p className="mt-1 font-display text-4xl leading-none text-ink-900">{PLAN_LABELS[plan] ?? plan}</p>
          </div>
          <span className={`badge ${statusInfo.className}`}>{statusInfo.label}</span>
        </div>
        {periodEnd && (
          <dl className="mt-5 text-sm">
            <InfoRow label={status === "canceled" ? "Accès jusqu'au" : "Prochain renouvellement"} value={periodEnd} />
          </dl>
        )}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <ManageSubscriptionButton />
          <Link href="/#tarifs" className="text-xs font-semibold text-blue-600 transition hover:text-blue-800">
            Comparer les formules
          </Link>
        </div>
      </section>
    </div>
  );
}

async function BaremesTab({ companyId, companyName }: { companyId: string | null; companyName: string | null }) {
  const paySettings = companyId
    ? await getCompanyPaySettings(companyId)
    : { csgCrdsNonDeductiblePercent: null, salaireMinimumConventionnel: null, contributionRates: [] };

  return (
    <div className="mt-6 grid max-w-2xl gap-6">
      <section className="rounded-2xl border border-blue-100 bg-blue-50/60 p-6 sm:p-7">
        <h2 className="card-title text-blue-700">Contrôlé automatiquement</h2>
        <p className="mt-1 text-xs text-ink-500">
          Ces valeurs sont intégrées à PayAudit à partir des sources officielles : rien à saisir.
        </p>
        <ul className="mt-4 grid gap-2 text-sm text-ink-700">
          {AUTOMATIC_CONTROLS.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <svg viewBox="0 0 20 20" fill="none" className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" aria-hidden>
                <path d="m5 10.5 3 3 7-7" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="card p-6 sm:p-7">
        <h2 className="card-title">Barèmes propres à l&apos;entreprise</h2>
        <p className="mt-1 text-xs text-ink-500">
          {companyName || "Cette entreprise"} — ces valeurs ne sont jamais préremplies : renseignez-les
          vous-même (ou via votre expert-comptable). Tant qu&apos;un champ est vide, le contrôle
          correspondant reste inactif.
        </p>
        <PaySettingsForm
          initialCsgCrds={paySettings.csgCrdsNonDeductiblePercent}
          initialSalaireMinimum={paySettings.salaireMinimumConventionnel}
        />
      </section>

      <section className="card p-6 sm:p-7">
        <h2 className="card-title">Taux de cotisations attendus (% du brut)</h2>
        <p className="mt-1 text-xs text-ink-500">
          Pour les taux propres à votre entreprise : accident du travail (AT/MP, notifié par la
          CARSAT), mutuelle, prévoyance, versement mobilité… — un libellé par cotisation à vérifier.
        </p>
        <ContributionRatesManager rates={paySettings.contributionRates} />
      </section>
    </div>
  );
}
