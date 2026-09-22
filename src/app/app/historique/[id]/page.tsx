import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CATEGORY_LABELS, categoryFromRuleId } from "@/lib/rules/anomaly-rules";
import { PrintReportButton } from "@/components/app/print-report-button";
import type { PayslipData } from "@/types/payslip";

export const dynamic = "force-dynamic";

const MONTHS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

const SEVERITY_LABELS: Record<string, { label: string; className: string }> = {
  critical: { label: "Critique", className: "border-red-300 bg-red-50 text-red-700" },
  warning: { label: "Avertissement", className: "border-amber-300 bg-amber-50 text-amber-700" },
  info: { label: "Info", className: "border-blue-300 bg-blue-50 text-blue-700" },
};

function formatPeriod(period: string | null) {
  if (!period) return "—";
  const [year, month] = period.split("-");
  const label = MONTHS[Number(month) - 1];
  return label ? `${label} ${year}` : period;
}

function formatAmount(value: number | null) {
  if (value === null || value === undefined) return "Non détecté";
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(value);
}

function formatDays(value: number | null) {
  if (value === null || value === undefined) return "Non détecté";
  return `${value.toLocaleString("fr-FR")} j`;
}

type PayslipDetail = {
  id: string;
  period: string | null;
  original_filename: string | null;
  gross_pay: number | null;
  net_pay: number | null;
  status: string;
  uploaded_at: string;
  extracted_data: PayslipData | null;
  company: { name: string } | null;
};

type AnomalyDetail = {
  id: string;
  rule_id: string;
  severity: string;
  message: string;
  detected_at: string;
};

export default async function RapportControlePage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  // RLS restreint automatiquement l'accès à la fiche à l'entreprise (ou au
  // client du cabinet) autorisée — data === null si l'utilisateur n'y a pas
  // accès, ce qui se traduit ici par un 404 plutôt qu'une fuite d'info.
  const { data: payslipData } = await supabase
    .from("payslips")
    .select(
      "id, period, original_filename, gross_pay, net_pay, status, uploaded_at, extracted_data, company:companies(name)"
    )
    .eq("id", params.id)
    .single();

  const payslip = payslipData as unknown as PayslipDetail | null;
  if (!payslip) notFound();

  const { data: anomaliesData } = await supabase
    .from("anomalies")
    .select("id, rule_id, severity, message, detected_at")
    .eq("payslip_id", payslip.id)
    .order("detected_at", { ascending: false });

  const anomalies = (anomaliesData as unknown as AnomalyDetail[] | null) ?? [];
  const extracted = payslip.extracted_data;
  const generatedAt = new Date().toLocaleString("fr-FR");

  const severityCounts = anomalies.reduce(
    (acc, a) => {
      acc[a.severity] = (acc[a.severity] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="mx-auto max-w-3xl p-8 print:max-w-none print:p-0">
      <div className="flex items-center justify-between print:hidden">
        <a href="/app/historique" className="text-sm text-blue-600 hover:underline">
          ← Retour à l&apos;historique
        </a>
        <PrintReportButton />
      </div>

      <div className="mt-6 rounded-2xl border border-beige-200 bg-white p-8 shadow-soft print:mt-0 print:rounded-none print:border-0 print:shadow-none">
        <div className="flex items-start justify-between border-b border-beige-200 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-600 text-xs font-bold text-beige-50">
                PA
              </span>
              <span className="text-sm font-semibold text-ink-900">PayAudit</span>
            </div>
            <h1 className="mt-3 text-xl font-bold text-ink-900">
              Rapport de contrôle — Fiche de paie
            </h1>
            <p className="mt-1 text-sm text-ink-500">
              {payslip.company?.name || "Entreprise"} · {formatPeriod(payslip.period)}
            </p>
          </div>
          <p className="shrink-0 text-xs text-ink-400">Généré le {generatedAt}</p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">
              Fichier source
            </p>
            <p className="mt-0.5 text-sm text-ink-900">
              {payslip.original_filename || "Fiche de paie"}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">
              Salarié
            </p>
            <p className="mt-0.5 text-sm text-ink-900">
              {extracted?.employeeName || "Non détecté"}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">
              Poste
            </p>
            <p className="mt-0.5 text-sm text-ink-900">{extracted?.position || "Non détecté"}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">
              Convention collective
            </p>
            <p className="mt-0.5 text-sm text-ink-900">
              {extracted?.collectiveAgreement || "Non détectée"}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">
              Date d&apos;entrée
            </p>
            <p className="mt-0.5 text-sm text-ink-900">
              {extracted?.seniorityDate || "Non détectée"}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 rounded-xl bg-beige-50 p-5 sm:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">
              Salaire brut
            </p>
            <p className="mt-0.5 text-lg font-bold text-ink-900">
              {formatAmount(payslip.gross_pay)}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">
              Salaire net
            </p>
            <p className="mt-0.5 text-lg font-bold text-ink-900">
              {formatAmount(payslip.net_pay)}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">
              Anomalies détectées
            </p>
            <p className="mt-0.5 text-lg font-bold text-ink-900">{anomalies.length}</p>
          </div>
        </div>

        {extracted && extracted.contributions.length > 0 && (
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">
              Cotisations détectées
            </p>
            <ul className="mt-2 grid gap-x-6 gap-y-1 text-sm text-ink-700 sm:grid-cols-2">
              {extracted.contributions.map((c, i) => (
                <li key={i} className="flex items-center justify-between gap-4 border-b border-dashed border-beige-200 py-1">
                  <span className="truncate">{c.label}</span>
                  <span className="font-medium text-ink-900">{formatAmount(c.amount)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {extracted && (
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">
              Congés payés
            </p>
            <div className="mt-2 grid gap-4 sm:grid-cols-3">
              <p className="text-sm text-ink-700">
                Acquis : <span className="font-medium text-ink-900">{formatDays(extracted.paidLeave?.acquired ?? null)}</span>
              </p>
              <p className="text-sm text-ink-700">
                Pris : <span className="font-medium text-ink-900">{formatDays(extracted.paidLeave?.taken ?? null)}</span>
              </p>
              <p className="text-sm text-ink-700">
                Solde : <span className="font-medium text-ink-900">{formatDays(extracted.paidLeave?.balance ?? null)}</span>
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 border-t border-beige-200 pt-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-ink-900">
              Détail des anomalies ({anomalies.length})
            </p>
            {anomalies.length > 0 && (
              <p className="text-xs text-ink-500">
                {["critical", "warning", "info"]
                  .filter((s) => severityCounts[s])
                  .map((s) => `${severityCounts[s]} ${SEVERITY_LABELS[s].label.toLowerCase()}`)
                  .join(" · ")}
              </p>
            )}
          </div>

          {anomalies.length === 0 ? (
            <p className="mt-3 text-sm text-ink-500">
              Aucune anomalie détectée sur cette fiche de paie.
            </p>
          ) : (
            <div className="mt-4 flex flex-col gap-2">
              {anomalies.map((anomaly) => {
                const severityInfo = SEVERITY_LABELS[anomaly.severity] ?? SEVERITY_LABELS.info;
                const category = categoryFromRuleId(anomaly.rule_id);
                return (
                  <div
                    key={anomaly.id}
                    className={`rounded-xl border p-4 print:break-inside-avoid ${severityInfo.className}`}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-white/70 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide">
                        {severityInfo.label}
                      </span>
                      {category && (
                        <span className="rounded-full bg-white/40 px-2.5 py-0.5 text-xs font-medium">
                          {CATEGORY_LABELS[category]}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm font-medium text-ink-900">{anomaly.message}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-8 rounded-xl border border-dashed border-beige-300 bg-beige-50 p-4">
          <p className="text-xs text-ink-500">
            Ce rapport est généré automatiquement à partir de règles de
            contrôle structurelles et de cohérence. Il ne constitue pas un
            avis juridique ou d&apos;expert-comptable et ne remplace pas une
            vérification manuelle des taux, barèmes et dispositions
            conventionnelles applicables.
          </p>
        </div>
      </div>
    </div>
  );
}
