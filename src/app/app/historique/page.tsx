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
  processed: { label: "Analysée", className: "bg-green-100 text-green-700" },
  pending: { label: "En attente", className: "bg-amber-100 text-amber-700" },
  error: { label: "Erreur", className: "bg-red-100 text-red-700" },
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
    <div className="p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">Historique</h1>
          <p className="mt-1 text-sm text-ink-500">
            Retrouvez ici toutes les fiches de paie importées et contrôlées.
          </p>
        </div>
        {payslips.length > 0 && (
          <a
            href="/api/export/payslips"
            className="shrink-0 rounded-full border border-beige-300 bg-white px-4 py-2 text-sm font-semibold text-ink-900 transition hover:border-blue-400 hover:text-blue-600"
          >
            Exporter en Excel
          </a>
        )}
      </div>

      {payslips.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-beige-300 bg-beige-100 p-10 text-center">
          <p className="text-sm text-ink-500">
            Aucune fiche de paie dans l&apos;historique pour le moment. Les
            fiches importées depuis le tableau de bord apparaîtront ici.
          </p>
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-2xl border border-beige-200 bg-white shadow-soft">
          <table className="w-full text-left text-sm">
            <thead className="bg-beige-100 text-xs font-semibold uppercase tracking-wide text-ink-500">
              <tr>
                <th className="px-3 py-3" aria-label="Détails" />
                <th className="px-6 py-3">Fichier</th>
                <th className="px-6 py-3">Période</th>
                <th className="px-6 py-3">Brut</th>
                <th className="px-6 py-3">Net</th>
                <th className="px-6 py-3">Anomalies</th>
                <th className="px-6 py-3">Statut</th>
                <th className="px-6 py-3">Importée le</th>
                <th className="px-6 py-3" aria-label="Rapport" />
              </tr>
            </thead>
            <tbody className="divide-y divide-beige-100">
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
