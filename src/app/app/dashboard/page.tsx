import Link from "next/link";
import { PayslipUploadButton } from "@/components/upload/payslip-upload-button";
import { createClient } from "@/lib/supabase/server";
import { getActiveCompanyContext } from "@/lib/active-company";

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  processed: { label: "Analysée", className: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
  pending: { label: "En attente", className: "bg-amber-50 text-amber-700 ring-amber-200" },
  error: { label: "Erreur", className: "bg-rose-50 text-rose-700 ring-rose-200" },
};

const SEVERITY_META: Record<string, { label: string; barClassName: string; textClassName: string }> = {
  critical: { label: "Critiques", barClassName: "bg-rose-500", textClassName: "text-rose-700" },
  warning: { label: "Avertissements", barClassName: "bg-amber-400", textClassName: "text-amber-700" },
  info: { label: "Infos", barClassName: "bg-blue-400", textClassName: "text-blue-700" },
};

type RecentPayslip = {
  id: string;
  period: string | null;
  original_filename: string | null;
  status: string;
  uploaded_at: string;
};

function startOfCurrentMonthIso() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const { activeCompanyId } = await getActiveCompanyContext();

  // Sans entreprise active (profil incomplet), on affiche un tableau de bord
  // vide plutôt que de planter — les policies RLS renverraient de toute
  // façon zéro ligne pour un company_id inexistant.
  const companyId = activeCompanyId ?? "";

  const [
    { count: payslipsCount },
    { count: anomaliesCount },
    { count: employeesCount },
    { count: criticalCount },
    { count: warningCount },
    { count: infoCount },
    { count: payslipsThisMonth },
    { data: recentPayslipsData },
  ] = await Promise.all([
    supabase.from("payslips").select("*", { count: "exact", head: true }).eq("company_id", companyId),
    supabase
      .from("anomalies")
      .select("id, payslips!inner(company_id)", { count: "exact", head: true })
      .eq("payslips.company_id", companyId),
    supabase.from("employees").select("*", { count: "exact", head: true }).eq("company_id", companyId),
    supabase
      .from("anomalies")
      .select("id, payslips!inner(company_id)", { count: "exact", head: true })
      .eq("payslips.company_id", companyId)
      .eq("severity", "critical"),
    supabase
      .from("anomalies")
      .select("id, payslips!inner(company_id)", { count: "exact", head: true })
      .eq("payslips.company_id", companyId)
      .eq("severity", "warning"),
    supabase
      .from("anomalies")
      .select("id, payslips!inner(company_id)", { count: "exact", head: true })
      .eq("payslips.company_id", companyId)
      .eq("severity", "info"),
    supabase
      .from("payslips")
      .select("*", { count: "exact", head: true })
      .eq("company_id", companyId)
      .gte("uploaded_at", startOfCurrentMonthIso()),
    supabase
      .from("payslips")
      .select("id, period, original_filename, status, uploaded_at")
      .eq("company_id", companyId)
      .order("uploaded_at", { ascending: false })
      .limit(5),
  ]);

  const stats = [
    { label: "Fiches contrôlées", value: String(payslipsCount ?? 0) },
    { label: "Anomalies détectées", value: String(anomaliesCount ?? 0) },
    { label: "Employés suivis", value: String(employeesCount ?? 0) },
    { label: "Fiches importées ce mois-ci", value: String(payslipsThisMonth ?? 0) },
  ];

  const severityBreakdown = [
    { key: "critical", count: criticalCount ?? 0 },
    { key: "warning", count: warningCount ?? 0 },
    { key: "info", count: infoCount ?? 0 },
  ];
  const severityTotal = severityBreakdown.reduce((sum, s) => sum + s.count, 0);

  const recentPayslips = (recentPayslipsData as RecentPayslip[] | null) ?? [];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      <h1 className="heading-display text-4xl md:text-[2.75rem]">Tableau de bord</h1>
      <p className="mt-3 max-w-2xl text-sm text-ink-500">
        Vue d&apos;ensemble des fiches de paie analysées et des anomalies
        détectées.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={
              i === 0
                ? "relative overflow-hidden rounded-2xl bg-blue-800 p-6 text-beige-50 shadow-lift"
                : "card p-6"
            }
          >
            {i === 0 && (
              <div aria-hidden className="bg-grid-light mask-fade-b pointer-events-none absolute inset-0" />
            )}
            <p className={`relative text-[11px] font-semibold uppercase tracking-[0.14em] ${i === 0 ? "text-blue-200" : "text-ink-500"}`}>
              {stat.label}
            </p>
            <p className={`relative mt-4 font-display text-5xl leading-none tabular-nums ${i === 0 ? "text-beige-50" : "text-ink-900"}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Répartition des anomalies par gravité */}
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <h2 className="card-title">
              Anomalies par gravité
            </h2>
            <Link href="/app/anomalies" className="text-xs font-semibold text-blue-600 transition hover:text-blue-800">
              Voir tout
            </Link>
          </div>

          {severityTotal === 0 ? (
            <p className="mt-6 text-sm text-ink-500">
              Aucune anomalie détectée pour le moment.
            </p>
          ) : (
            <div className="mt-6 space-y-5">
              {severityBreakdown.map(({ key, count }) => {
                const meta = SEVERITY_META[key];
                const percent = severityTotal > 0 ? Math.round((count / severityTotal) * 100) : 0;
                return (
                  <div key={key}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 font-medium text-ink-700">
                        <span className={`h-2 w-2 rounded-full ${meta.barClassName}`} />
                        {meta.label}
                      </span>
                      <span className="tabular-nums text-ink-500">
                        {count} <span className="text-ink-300">· {percent}%</span>
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-beige-100">
                      <div
                        className={`h-full rounded-full ${meta.barClassName}`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {(criticalCount ?? 0) > 0 && (
            <p className="mt-6 flex items-center gap-2 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 ring-1 ring-inset ring-rose-200">
              {criticalCount} anomalie{(criticalCount ?? 0) > 1 ? "s" : ""} critique
              {(criticalCount ?? 0) > 1 ? "s" : ""} à traiter en priorité.
            </p>
          )}
        </div>

        {/* Dernières fiches importées */}
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <h2 className="card-title">
              Dernières fiches importées
            </h2>
            <Link href="/app/historique" className="text-xs font-semibold text-blue-600 transition hover:text-blue-800">
              Voir l&apos;historique
            </Link>
          </div>

          {recentPayslips.length === 0 ? (
            <p className="mt-6 text-sm text-ink-500">
              Aucune fiche importée pour le moment.
            </p>
          ) : (
            <ul className="mt-5 divide-y divide-ink-100">
              {recentPayslips.map((payslip) => {
                const statusInfo = STATUS_LABELS[payslip.status] ?? STATUS_LABELS.pending;
                return (
                  <li key={payslip.id} className="flex items-center justify-between gap-3 py-3">
                    <div className="flex min-w-0 items-center gap-3">
                    <span aria-hidden className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-ink-200/70 bg-beige-50 text-ink-400">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7l-4-4Z" />
                        <path d="M14 3v4h4M9 13h6M9 17h4" />
                      </svg>
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-ink-900">
                        {payslip.original_filename || "Fiche de paie"}
                      </p>
                      <p className="text-xs text-ink-500">
                        {new Date(payslip.uploaded_at).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                    </div>
                    <span className={`shrink-0 badge ${statusInfo.className}`}>
                      {statusInfo.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      <div className="relative mt-6 flex flex-col items-center gap-4 overflow-hidden rounded-3xl border border-dashed border-ink-300/70 bg-white p-10 text-center md:p-14">
        <div aria-hidden className="bg-grid mask-radial pointer-events-none absolute inset-0 opacity-70" />
        <h2 className="relative font-display text-3xl text-ink-900">
          Importer une fiche de paie
        </h2>
        <p className="relative max-w-md text-sm text-ink-500">
          Déposez un fichier PDF ou une photo de fiche de paie : PayAudit la
          réceptionne immédiatement et prépare l&apos;analyse d&apos;anomalies.
        </p>
        <div className="relative mt-2">
          <PayslipUploadButton />
        </div>
      </div>
    </div>
  );
}
