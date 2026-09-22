import Link from "next/link";
import { PayslipUploadButton } from "@/components/upload/payslip-upload-button";
import { createClient } from "@/lib/supabase/server";

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  processed: { label: "Analysée", className: "bg-green-100 text-green-700" },
  pending: { label: "En attente", className: "bg-amber-100 text-amber-700" },
  error: { label: "Erreur", className: "bg-red-100 text-red-700" },
};

const SEVERITY_META: Record<string, { label: string; barClassName: string; textClassName: string }> = {
  critical: { label: "Critiques", barClassName: "bg-red-500", textClassName: "text-red-700" },
  warning: { label: "Avertissements", barClassName: "bg-amber-500", textClassName: "text-amber-700" },
  info: { label: "Infos", barClassName: "bg-blue-500", textClassName: "text-blue-700" },
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
    supabase.from("payslips").select("*", { count: "exact", head: true }),
    supabase.from("anomalies").select("*", { count: "exact", head: true }),
    supabase.from("employees").select("*", { count: "exact", head: true }),
    supabase.from("anomalies").select("*", { count: "exact", head: true }).eq("severity", "critical"),
    supabase.from("anomalies").select("*", { count: "exact", head: true }).eq("severity", "warning"),
    supabase.from("anomalies").select("*", { count: "exact", head: true }).eq("severity", "info"),
    supabase
      .from("payslips")
      .select("*", { count: "exact", head: true })
      .gte("uploaded_at", startOfCurrentMonthIso()),
    supabase
      .from("payslips")
      .select("id, period, original_filename, status, uploaded_at")
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
    <div className="p-8">
      <h1 className="text-2xl font-bold text-ink-900">Tableau de bord</h1>
      <p className="mt-1 text-sm text-ink-500">
        Vue d&apos;ensemble des fiches de paie analysées et des anomalies
        détectées.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-beige-200 bg-white p-6 shadow-soft"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-ink-500">
              {stat.label}
            </p>
            <p className="mt-2 text-3xl font-extrabold text-blue-600">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Répartition des anomalies par gravité */}
        <div className="rounded-2xl border border-beige-200 bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">
              Anomalies par gravité
            </h2>
            <Link href="/app/anomalies" className="text-xs font-semibold text-blue-600 hover:text-blue-700">
              Voir tout
            </Link>
          </div>

          {severityTotal === 0 ? (
            <p className="mt-6 text-sm text-ink-500">
              Aucune anomalie détectée pour le moment.
            </p>
          ) : (
            <div className="mt-5 space-y-4">
              {severityBreakdown.map(({ key, count }) => {
                const meta = SEVERITY_META[key];
                const percent = severityTotal > 0 ? Math.round((count / severityTotal) * 100) : 0;
                return (
                  <div key={key}>
                    <div className="flex items-center justify-between text-sm">
                      <span className={`font-medium ${meta.textClassName}`}>{meta.label}</span>
                      <span className="text-ink-500">{count}</span>
                    </div>
                    <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-beige-100">
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
            <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {criticalCount} anomalie{(criticalCount ?? 0) > 1 ? "s" : ""} critique
              {(criticalCount ?? 0) > 1 ? "s" : ""} à traiter en priorité.
            </p>
          )}
        </div>

        {/* Dernières fiches importées */}
        <div className="rounded-2xl border border-beige-200 bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">
              Dernières fiches importées
            </h2>
            <Link href="/app/historique" className="text-xs font-semibold text-blue-600 hover:text-blue-700">
              Voir l&apos;historique
            </Link>
          </div>

          {recentPayslips.length === 0 ? (
            <p className="mt-6 text-sm text-ink-500">
              Aucune fiche importée pour le moment.
            </p>
          ) : (
            <ul className="mt-5 divide-y divide-beige-100">
              {recentPayslips.map((payslip) => {
                const statusInfo = STATUS_LABELS[payslip.status] ?? STATUS_LABELS.pending;
                return (
                  <li key={payslip.id} className="flex items-center justify-between gap-3 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-ink-900">
                        {payslip.original_filename || "Fiche de paie"}
                      </p>
                      <p className="text-xs text-ink-500">
                        {new Date(payslip.uploaded_at).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                    <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${statusInfo.className}`}>
                      {statusInfo.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-beige-300 bg-beige-100 p-10 text-center">
        <h2 className="text-lg font-semibold text-ink-900">
          Importer une fiche de paie
        </h2>
        <p className="max-w-md text-sm text-ink-500">
          Déposez un fichier PDF ou une photo de fiche de paie : PayAudit la
          réceptionne immédiatement et prépare l&apos;analyse d&apos;anomalies.
        </p>
        <PayslipUploadButton />
      </div>
    </div>
  );
}
