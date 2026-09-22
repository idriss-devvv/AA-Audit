import { createClient } from "@/lib/supabase/server";

const SEVERITY_LABELS: Record<string, { label: string; className: string }> = {
  critical: { label: "Critique", className: "border-red-300 bg-red-50 text-red-700" },
  warning: { label: "Avertissement", className: "border-amber-300 bg-amber-50 text-amber-700" },
  info: { label: "Info", className: "border-blue-300 bg-blue-50 text-blue-700" },
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
  const { data } = await supabase
    .from("anomalies")
    .select("id, rule_id, severity, message, detected_at, payslip:payslips(period, original_filename)")
    .order("detected_at", { ascending: false });

  const anomalies = (data as unknown as AnomalyRow[] | null) ?? [];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-ink-900">Anomalies</h1>
      <p className="mt-1 text-sm text-ink-500">
        Liste des anomalies détectées sur l&apos;ensemble de vos fiches de
        paie, triées par date.
      </p>

      {anomalies.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-beige-300 bg-beige-100 p-10 text-center">
          <p className="text-sm text-ink-500">
            Aucune anomalie détectée pour le moment. Elles apparaîtront ici dès
            qu&apos;une fiche de paie contrôlée présentera un écart.
          </p>
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-3">
          {anomalies.map((anomaly) => {
            const severityInfo = SEVERITY_LABELS[anomaly.severity] ?? SEVERITY_LABELS.info;
            return (
              <div
                key={anomaly.id}
                className={`rounded-2xl border p-5 shadow-soft ${severityInfo.className}`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                    {severityInfo.label}
                  </span>
                  <span className="text-xs text-ink-500">
                    {new Date(anomaly.detected_at).toLocaleDateString("fr-FR")}
                  </span>
                </div>
                <p className="mt-3 text-sm font-medium text-ink-900">{anomaly.message}</p>
                <p className="mt-1 text-xs text-ink-500">
                  {anomaly.payslip?.original_filename || "Fiche de paie"}
                  {anomaly.payslip?.period ? ` · ${anomaly.payslip.period}` : ""}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
