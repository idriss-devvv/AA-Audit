import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CATEGORY_LABELS, categoryFromRuleId } from "@/lib/rules/anomaly-rules";
import { PrintReportButton } from "@/components/app/print-report-button";
import { Logo } from "@/components/ui/logo";
import { areResultsLocked } from "@/lib/account";
import { LockedAnomaly } from "@/components/app/locked-anomaly";
import { UpgradeNotice } from "@/components/app/upgrade-notice";
import type { PayslipData } from "@/types/payslip";
import { AGREEMENT_UNAVAILABLE_MESSAGE } from "@/lib/collective-agreement-detection";
import { employeeDisplayName, statusExplanation, statusInfo } from "@/lib/payslips";
import { PayslipFileFrame } from "@/components/payslips/payslip-preview";
import { DeletePayslipButton } from "@/components/payslips/delete-payslip-button";

export const dynamic = "force-dynamic";

const MONTHS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

const SEVERITY_LABELS: Record<string, { label: string; className: string; accentClassName: string }> = {
  critical: { label: "Critique", className: "bg-rose-50 text-rose-700 ring-rose-200", accentClassName: "bg-rose-500" },
  warning: { label: "Avertissement", className: "bg-amber-50 text-amber-700 ring-amber-200", accentClassName: "bg-amber-400" },
  info: { label: "Info", className: "bg-blue-50 text-blue-700 ring-blue-200", accentClassName: "bg-blue-400" },
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
  company_id: string;
  period: string | null;
  original_filename: string | null;
  gross_pay: number | null;
  net_pay: number | null;
  status: string;
  uploaded_at: string;
  extracted_data: PayslipData | null;
  mime_type: string | null;
  error_message: string | null;
  deleted_at: string | null;
  company: { name: string } | null;
  employee: { first_name: string | null; last_name: string | null; employee_ref: string | null } | null;
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
      "id, company_id, period, original_filename, gross_pay, net_pay, status, uploaded_at, extracted_data, mime_type, error_message, deleted_at, company:companies(name), employee:employees(first_name, last_name, employee_ref)"
    )
    .eq("id", params.id)
    .single();

  const payslip = payslipData as unknown as PayslipDetail | null;
  if (!payslip || payslip.deleted_at) notFound();

  const [{ data: anomaliesData }, locked] = await Promise.all([
    supabase
      .from("anomalies")
      .select("id, rule_id, severity, message, detected_at")
      .eq("payslip_id", payslip.id)
      .order("detected_at", { ascending: false }),
    // Formule Free : seule la première anomalie est montrée en clair.
    areResultsLocked(payslip.company_id),
  ]);

  const anomalies = (anomaliesData as unknown as AnomalyDetail[] | null) ?? [];
  const employeeName = employeeDisplayName(payslip.employee, payslip.extracted_data?.employeeName);
  const status = statusInfo(payslip.status, payslip.mime_type);
  const explanation = statusExplanation(payslip.status, payslip.mime_type, payslip.error_message);
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
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-10 print:max-w-none print:p-0">
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Link href="/app/fiches" className="text-sm font-medium text-ink-500 transition hover:text-ink-900">
          ← Fiches de paie
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <PrintReportButton />
          <DeletePayslipButton payslipId={payslip.id} label={`${employeeName} — ${formatPeriod(payslip.period)}`} redirectTo="/app/fiches" />
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2 print:mt-0 print:block">
      {/* Fiche d'origine, à côté du rapport pour vérifier chaque anomalie. */}
      <div className="card h-[75vh] overflow-hidden p-2 lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)] print:hidden">
        <PayslipFileFrame payslipId={payslip.id} mimeType={payslip.mime_type} title={`Fiche de paie — ${employeeName}`} />
      </div>

      <div className="card rounded-3xl p-6 sm:p-10 print:rounded-none print:border-0 print:shadow-none">
        <div className="flex flex-col-reverse items-start justify-between gap-3 border-b border-ink-200/70 pb-6 sm:flex-row">
          <div>
            <Logo size="sm" />
            <h1 className="heading-display mt-6 text-3xl md:text-4xl">
              Rapport de contrôle — Fiche de paie
            </h1>
            <p className="mt-2 text-sm text-ink-500">
              {payslip.company?.name || "Entreprise"} · {formatPeriod(payslip.period)}
            </p>
          </div>
          <p className="shrink-0 text-xs text-ink-400">Généré le {generatedAt}</p>
        </div>

        {explanation && (
          <p className={`mt-6 rounded-xl px-4 py-3 text-sm ring-1 ring-inset ${status.key === "error" ? "bg-rose-50 text-rose-800 ring-rose-200" : "bg-blue-50 text-blue-800 ring-blue-200"}`}>
            {explanation}
          </p>
        )}

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <div>
            <p className="card-title">
              Fichier source
            </p>
            <p className="mt-1 text-sm text-ink-900">
              {payslip.original_filename || "Fiche de paie"}
            </p>
          </div>
          <div>
            <p className="card-title">
              Salarié
            </p>
            <p className="mt-1 text-sm text-ink-900">
              {employeeName}
            </p>
          </div>
          <div>
            <p className="card-title">
              Poste
            </p>
            <p className="mt-1 text-sm text-ink-900">{extracted?.position || "Non détecté"}</p>
          </div>
          <div>
            <p className="card-title">
              Convention collective
            </p>
            <p className="mt-1 text-sm text-ink-900">
              {extracted?.collectiveAgreementName || extracted?.collectiveAgreement || "Non détectée"}
              {extracted?.collectiveAgreementIdcc ? ` · IDCC ${extracted.collectiveAgreementIdcc}` : ""}
            </p>
            {extracted?.collectiveAgreementAvailable === false && (
              <p className="mt-1 text-xs font-medium text-amber-700">{AGREEMENT_UNAVAILABLE_MESSAGE}</p>
            )}
          </div>
          <div>
            <p className="card-title">
              Date d&apos;entrée
            </p>
            <p className="mt-1 text-sm text-ink-900">
              {extracted?.seniorityDate || "Non détectée"}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 rounded-2xl border border-ink-200/70 bg-beige-50 p-6 sm:grid-cols-3">
          <div>
            <p className="card-title">
              Salaire brut
            </p>
            <p className="mt-2 font-display text-3xl leading-none tabular-nums text-ink-900">
              {formatAmount(payslip.gross_pay)}
            </p>
          </div>
          <div>
            <p className="card-title">
              Salaire net
            </p>
            <p className="mt-2 font-display text-3xl leading-none tabular-nums text-ink-900">
              {formatAmount(payslip.net_pay)}
            </p>
          </div>
          <div>
            <p className="card-title">
              Anomalies détectées
            </p>
            <p className="mt-2 font-display text-3xl leading-none tabular-nums text-ink-900">{anomalies.length}</p>
          </div>
        </div>

        {extracted && extracted.contributions.length > 0 && (
          <div className="mt-6">
            <p className="card-title">
              Cotisations détectées
            </p>
            <ul className="mt-2 grid gap-x-6 gap-y-1 text-sm text-ink-700 sm:grid-cols-2">
              {extracted.contributions.map((c, i) => (
                <li key={i} className="flex items-center justify-between gap-4 border-b border-dashed border-ink-200/70 py-1">
                  <span className="truncate">{c.label}</span>
                  <span className="font-medium text-ink-900">{formatAmount(c.amount)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {extracted && (
          <div className="mt-6">
            <p className="card-title">
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

        <div className="mt-8 border-t border-ink-200/70 pt-6">
          <div className="flex items-center justify-between">
            <p className="font-display text-2xl text-ink-900">
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
              {anomalies.map((anomaly, index) => {
                const severityInfo = SEVERITY_LABELS[anomaly.severity] ?? SEVERITY_LABELS.info;
                if (locked && index > 0) {
                  return (
                    <LockedAnomaly key={anomaly.id} compact severityLabel={severityInfo.label} severityClassName={severityInfo.className} />
                  );
                }
                const category = categoryFromRuleId(anomaly.rule_id);
                return (
                  <div
                    key={anomaly.id}
                    className="relative overflow-hidden rounded-xl border border-ink-200/70 bg-white p-4 pl-5 print:break-inside-avoid"
                  >
                    <span aria-hidden className={`absolute inset-y-0 left-0 w-1 ${severityInfo.accentClassName}`} />
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`badge ${severityInfo.className}`}>
                        {severityInfo.label}
                      </span>
                      {category && (
                        <span className="badge bg-beige-100 font-medium text-ink-600 ring-ink-200/70">
                          {CATEGORY_LABELS[category]}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm font-medium text-ink-900">{anomaly.message}</p>
                  </div>
                );
              })}
              {locked && anomalies.length > 1 && (
                <div className="mt-2 print:hidden">
                  <UpgradeNotice
                    compact
                    title="Débloquez le rapport complet"
                    text="Choisissez une formule pour afficher toutes les anomalies de cette fiche, avec les montants attendus et leurs sources."
                    requiredPlan="starter"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 rounded-xl border border-dashed border-ink-200 bg-beige-50 p-4">
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
    </div>
  );
}
