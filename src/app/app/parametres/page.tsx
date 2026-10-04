import Link from "next/link";
import { createClient, getCurrentUser } from "@/lib/supabase/server";
import { getActiveCompanyContext } from "@/lib/active-company";
import { getCompanyPaySettings } from "@/lib/pay-settings";
import { ChangePasswordForm } from "@/components/auth/change-password-form";
import { ManageSubscriptionButton } from "@/components/app/manage-subscription-button";
import { TolerancesForm } from "@/components/app/tolerances-form";
import { PaySettingsForm } from "@/components/app/pay-settings-form";
import { ContributionRatesManager } from "@/components/app/contribution-rates-manager";
import { SettingsTabs, resolveSettingsTab } from "@/components/app/settings-tabs";
import { ConventionsTab } from "@/components/app/conventions-tab";
import { CONVENTION_GRIDS } from "@/lib/rules/referentiels/grilles-conventionnelles";
import { getAccountContext, getQuotaUsage } from "@/lib/account";
import { PLANS, PLAN_ORDER, ROLE_LABELS, quotaLabel } from "@/lib/plans";
import { SubscribeButton } from "@/components/pricing/subscribe-button";

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
  "Réduction générale des cotisations patronales (RGDU 2026)",
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

  const [user, { isCabinet, ownCompanyId, ownCompanyName, clients, activeCompanyId, activeCompanyName }, account] =
    await Promise.all([getCurrentUser(), getActiveCompanyContext(), getAccountContext()]);

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
                label={isCabinet ? "Cabinet" : "Nom du compte"}
                value={ownCompanyName || (user?.user_metadata?.company_name as string) || "—"}
              />
              <InfoRow label="Formule" value={account.plan.label} />
              {account.role !== "client" && <InfoRow label="Rôle" value={ROLE_LABELS[account.role]} />}
              {clients.length > 0 && <InfoRow label={isCabinet ? "Clients gérés" : "Sociétés rattachées"} value={clients.length} />}
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

      {tab === "abonnement" && <SubscriptionTab companyId={ownCompanyId} />}

      {tab === "baremes" && <BaremesTab companyId={activeCompanyId} companyName={activeCompanyName} />}

      {tab === "conventions" && <ConventionsTab />}
    </div>
  );
}

async function SubscriptionTab({ companyId }: { companyId: string | null }) {
  const supabase = await createClient();
  const [account, { data: subscription }] = await Promise.all([
    getAccountContext(),
    companyId
      ? supabase.from("subscriptions").select("status, current_period_end").eq("company_id", companyId).maybeSingle()
      : Promise.resolve({ data: null }),
  ]);
  const plan = account.plan;
  const used = companyId ? await getQuotaUsage(companyId, plan) : 0;
  const status = subscription?.status ?? "inactive";
  const statusInfo = plan.id === "free" ? null : STATUS_LABELS[status] ?? STATUS_LABELS.inactive;
  const periodEnd = subscription?.current_period_end
    ? new Date(subscription.current_period_end).toLocaleDateString("fr-FR")
    : null;
  const quota = account.quota;
  const percent = quota ? Math.min(100, Math.round((used / quota) * 100)) : 0;

  return (
    <div className="mt-6 grid gap-6">
      <section className="card max-w-2xl p-6 sm:p-7">
        <h2 className="card-title">Votre formule</h2>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <p className="font-display text-4xl leading-none text-ink-900">{plan.label}</p>
            <p className="mt-2 text-sm text-ink-500">
              {plan.price > 0 ? `${plan.price} € / mois · ` : ""}
              {quotaLabel(plan, quota)}
            </p>
          </div>
          {statusInfo && <span className={`badge ${statusInfo.className}`}>{statusInfo.label}</span>}
        </div>

        {quota !== null && (
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-500">
                {plan.id === "free" ? "Fiches d'essai utilisées" : "Fiches importées ce mois-ci"}
              </span>
              <span className="font-semibold tabular-nums text-ink-900">
                {used} / {quota}
              </span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-beige-100">
              <div
                style={{ width: `${percent}%` }}
                className={`h-full rounded-full ${percent >= 100 ? "bg-rose-500" : percent >= 80 ? "bg-amber-400" : "bg-blue-500"}`}
              />
            </div>
            {percent >= 100 && (
              <p className="mt-2 text-xs font-medium text-rose-600">
                Limite atteinte : passez à la formule supérieure pour importer d&apos;autres fiches.
              </p>
            )}
          </div>
        )}

        {periodEnd && (
          <dl className="mt-5 text-sm">
            <InfoRow label={status === "canceled" ? "Accès jusqu'au" : "Prochain renouvellement"} value={periodEnd} />
          </dl>
        )}
        {plan.id !== "free" && (
          <div className="mt-6">
            <ManageSubscriptionButton />
          </div>
        )}
      </section>

      <section>
        <h2 className="card-title">Changer de formule</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {PLAN_ORDER.map((id) => {
            const option = PLANS[id];
            const current = option.id === plan.id;
            return (
              <div
                key={id}
                className={`flex flex-col rounded-2xl border p-5 ${
                  current ? "border-blue-600 bg-blue-50/60 ring-1 ring-blue-600" : "border-ink-200/70 bg-white"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-ink-500">{option.label}</p>
                  {current && <span className="badge bg-blue-600 text-beige-50 ring-blue-600">Actuelle</span>}
                </div>
                <p className="mt-3 font-display text-4xl leading-none text-ink-900">
                  {option.price} €<span className="ml-1 font-sans text-sm text-ink-500">/ mois</span>
                </p>
                <ul className="mt-4 flex-1 space-y-2 text-sm text-ink-600">
                  {option.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="mt-0.5 text-blue-500">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-5">
                  {current ? (
                    <p className="text-center text-xs font-medium text-ink-400">Votre formule actuelle</p>
                  ) : option.stripePriceEnv ? (
                    <SubscribeButton plan={option.id} label={`Passer à ${option.label}`} variant="outline" />
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-xs text-ink-400">
          Prix HT. Au-delà de 300 fiches par mois, l&apos;offre Entreprise est établie sur devis :{" "}
          <Link href="/contact-entreprise" className="font-semibold text-blue-600 hover:text-blue-800">
            nous contacter
          </Link>
          .
        </p>
      </section>
    </div>
  );
}

async function BaremesTab({ companyId, companyName }: { companyId: string | null; companyName: string | null }) {
  const paySettings = companyId
    ? await getCompanyPaySettings(companyId)
    : { csgCrdsNonDeductiblePercent: null, salaireMinimumConventionnel: null, contributionRates: [], tolerances: {}, atMpRatePercent: null, fnalRatePercent: null };

  return (
    <div className="mt-6 grid max-w-2xl gap-6">
      <section className="rounded-2xl border border-blue-100 bg-blue-50/60 p-6 sm:p-7">
        <h2 className="card-title text-blue-700">Contrôlé automatiquement</h2>
        <p className="mt-1 text-xs text-ink-500">
          Ces valeurs sont intégrées à A&A Audit à partir des sources officielles : rien à saisir.
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
          initialAtMp={paySettings.atMpRatePercent}
          initialFnal={paySettings.fnalRatePercent}
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

      <section className="card p-6 sm:p-7">
        <h2 className="card-title">Seuils de tolérance</h2>
        <p className="mt-1 text-xs text-ink-500">
          Écarts en dessous desquels aucune anomalie n&apos;est signalée. Laissez un champ vide pour garder la
          valeur par défaut.
        </p>
        <TolerancesForm initial={paySettings.tolerances} />
      </section>
    </div>
  );
}
