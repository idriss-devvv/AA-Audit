import { createClient } from "@/lib/supabase/server";
import { getActiveCompanyContext } from "@/lib/active-company";
import { PayslipRow, type PayslipRowData } from "@/components/historique/payslip-row";
import type { PayslipData } from "@/types/payslip";

const MONTHS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

function formatPeriod(period: string | null) {
  if (!period) return "—";
  const [year, month] = period.split("-");
  const label = MONTHS[Number(month) - 1];
  return label ? `${label} ${year}` : period;
}

function formatAmount(value: number | null) {
  if (value === null || value === undefined) return "—";
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(value);
}

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  processed: { label: "Analysée", className: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
  pending: { label: "En attente", className: "bg-amber-50 text-amber-700 ring-amber-200" },
  error: { label: "Erreur", className: "bg-rose-50 text-rose-700 ring-rose-200" },
};

type PayslipRecord = {
  id: string;
  period: string | null;
  original_filename: string | null;
  gross_pay: number | null;
  net_pay: number | null;
  status: string;
  uploaded_at: string;
  extracted_data: PayslipData | null;
  anomalies: { count: number }[] | null;
};

export default async function HistoriquePage() {
  const supabase = await createClient();
  const { activeCompanyId } = await getActiveCompanyContext();
  const { data } = await supabase
    .from("payslips")
    .select(
      "id, period, original_filename, gross_pay, net_pay, status, uploaded_at, extracted_data, anomalies(count)"
    )
    .eq("company_id", activeCompanyId ?? "")
    .order("uploaded_at", { ascending: false });

  const records = (data as unknown as PayslipRecord[] | null) ?? [];

  const payslips: PayslipRowData[] = records.map((record) => ({
    id: record.id,
    fileName: record.original_filename || "Fiche de paie",
    periodLabel: formatPeriod(record.period),
    grossLabel: formatAmount(record.gross_pay),
    netLabel: formatAmount(record.net_pay),
    anomaliesCount: record.anomalies?.[0]?.count ?? 0,
    statusInfo: STATUS_LABELS[record.status] ?? STATUS_LABELS.pending,
    dateLabel: new Date(record.uploaded_at).toLocaleDateString("fr-FR"),
    extracted: record.extracted_data,
  }));

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="heading-display text-4xl md:text-[2.75rem]">Historique</h1>
          <p className="mt-3 max-w-2xl text-sm text-ink-500">
            Retrouvez ici toutes les fiches de paie importées et contrôlées.
          </p>
        </div>
        {payslips.length > 0 && (
          <a
            href="/api/export/payslips"
            className="btn-secondary shrink-0 px-4 py-2"
          >
            Exporter en Excel
          </a>
        )}
      </div>

      {payslips.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-ink-200 bg-beige-100/50 p-10 text-center">
          <p className="text-sm text-ink-500">
            Aucune fiche de paie dans l&apos;historique pour le moment. Les
            fiches importées depuis le tableau de bord apparaîtront ici.
          </p>
        </div>
      ) : (
        <div className="card mt-10 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink-200/70 bg-beige-50 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-400">
              <tr>
                <th className="px-3 py-3" aria-label="Détails" />
                <th className="whitespace-nowrap px-6 py-3.5">Fichier</th>
                <th className="whitespace-nowrap px-6 py-3.5">Période</th>
                <th className="whitespace-nowrap px-6 py-3.5">Brut</th>
                <th className="whitespace-nowrap px-6 py-3.5">Net</th>
                <th className="whitespace-nowrap px-6 py-3.5">Anomalies</th>
                <th className="whitespace-nowrap px-6 py-3.5">Statut</th>
                <th className="whitespace-nowrap px-6 py-3.5">Importée le</th>
                <th className="px-6 py-3" aria-label="Rapport" />
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {payslips.map((payslip) => (
                <PayslipRow key={payslip.id} payslip={payslip} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
