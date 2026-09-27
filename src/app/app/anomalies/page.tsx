import { createClient } from "@/lib/supabase/server";
import { getActiveCompanyContext } from "@/lib/active-company";
import { CATEGORY_LABELS, categoryFromRuleId } from "@/lib/rules/anomaly-rules";
import { areResultsLocked } from "@/lib/account";
import { LockedAnomaly } from "@/components/app/locked-anomaly";
import { UpgradeNotice } from "@/components/app/upgrade-notice";

const SEVERITY_LABELS: Record<string, { label: string; className: string; accentClassName: string }> = {
  critical: { label: "Critique", className: "bg-rose-50 text-rose-700 ring-rose-200", accentClassName: "bg-rose-500" },
  warning: { label: "Avertissement", className: "bg-amber-50 text-amber-700 ring-amber-200", accentClassName: "bg-amber-400" },
  info: { label: "Info", className: "bg-blue-50 text-blue-700 ring-blue-200", accentClassName: "bg-blue-400" },
};

type AnomalyRow = {
  id: string;
  rule_id: string;
  severity: string;
  message: string;
  detected_at: string;
  payslip: { period: string | null; original_filename: string | null } | null;
};

export default async function AnomaliesPage() {
  const supabase = await createClient();
  const { activeCompanyId } = await getActiveCompanyContext();
  const [{ data }, locked] = await Promise.all([
    supabase
      .from("anomalies")
      .select(
        "id, rule_id, severity, message, detected_at, payslip:payslips!inner(period, original_filename, company_id)"
      )
      .eq("payslip.company_id", activeCompanyId ?? "")
      .order("detected_at", { ascending: false }),
    // Formule Free : seule la première anomalie est montrée en clair.
    areResultsLocked(activeCompanyId),
  ]);

  const anomalies = (data as unknown as AnomalyRow[] | null) ?? [];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="heading-display text-4xl md:text-[2.75rem]">Anomalies</h1>
          <p className="mt-3 max-w-2xl text-sm text-ink-500">
            Liste des anomalies détectées sur l&apos;ensemble de vos fiches de
            paie, triées par date.
          </p>
        </div>
        {anomalies.length > 0 && !locked && (
          <a
            href="/api/export/anomalies"
            className="btn-secondary shrink-0 px-4 py-2"
          >
            Exporter en Excel
          </a>
        )}
      </div>

      {anomalies.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-ink-200 bg-beige-100/50 p-10 text-center">
          <p className="text-sm text-ink-500">
            Aucune anomalie détectée pour le moment. Elles apparaîtront ici dès
            qu&apos;une fiche de paie contrôlée présentera un écart.
          </p>
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-3">
          {anomalies.map((anomaly, index) => {
            const severityInfo = SEVERITY_LABELS[anomaly.severity] ?? SEVERITY_LABELS.info;
            if (locked && index > 0) {
              return (
                <LockedAnomaly key={anomaly.id} severityLabel={severityInfo.label} severityClassName={severityInfo.className} />
              );
            }
            const category = categoryFromRuleId(anomaly.rule_id);
            const categoryLabel = category ? CATEGORY_LABELS[category] : null;
            return (
              <div
                key={anomaly.id}
                className="card relative overflow-hidden p-5 pl-6 transition duration-200 hover:shadow-lift"
              >
                <span aria-hidden className={`absolute inset-y-0 left-0 w-1 ${severityInfo.accentClassName}`} />
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`badge ${severityInfo.className}`}>
                      {severityInfo.label}
                    </span>
                    {categoryLabel && (
                      <span className="badge bg-beige-100 font-medium text-ink-600 ring-ink-200/70">
                        {categoryLabel}
                      </span>
                    )}
                  </div>
                  <span className="text-xs tabular-nums text-ink-400">
                    {new Date(anomaly.detected_at).toLocaleDateString("fr-FR")}
                  </span>
                </div>
                <p className="mt-3 text-[15px] font-medium leading-snug text-ink-900">{anomaly.message}</p>
                <p className="mt-1.5 text-xs text-ink-400">
                  {anomaly.payslip?.original_filename || "Fiche de paie"}
                  {anomaly.payslip?.period ? ` · ${anomaly.payslip.period}` : ""}
                </p>
              </div>
            );
          })}
          {locked && anomalies.length > 1 && (
            <div className="mt-3">
              <UpgradeNotice
                compact
                title={`${anomalies.length - 1} anomalie${anomalies.length > 2 ? "s" : ""} masquée${anomalies.length > 2 ? "s" : ""}`}
                text="La formule Free montre la première anomalie. Choisissez une formule pour afficher le détail de toutes les anomalies, leurs montants et leurs sources."
                requiredPlan="starter"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
