import { createClient } from "@/lib/supabase/server";

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

type PayslipRow = {
  id: string;
  period: string | null;
  original_filename: string | null;
  gross_pay: number | null;
  net_pay: number | null;
  status: string;
  uploaded_at: string;
  anomalies: { count: number }[] | null;
};

export default async function HistoriquePage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("payslips")
    .select("id, period, original_filename, gross_pay, net_pay, status, uploaded_at, anomalies(count)")
    .order("uploaded_at", { ascending: false });

  const payslips = (data as PayslipRow[] | null) ?? [];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-ink-900">Historique</h1>
      <p className="mt-1 text-sm text-ink-500">
        Retrouvez ici toutes les fiches de paie importées et contrôlées.
      </p>

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
                <th className="px-6 py-3">Fichier</th>
                <th className="px-6 py-3">Période</th>
                <th className="px-6 py-3">Brut</th>
                <th className="px-6 py-3">Net</th>
                <th className="px-6 py-3">Anomalies</th>
                <th className="px-6 py-3">Statut</th>
                <th className="px-6 py-3">Importée le</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-beige-100">
              {payslips.map((payslip) => {
                const anomaliesCount = payslip.anomalies?.[0]?.count ?? 0;
                const statusInfo = STATUS_LABELS[payslip.status] ?? STATUS_LABELS.pending;
                return (
                  <tr key={payslip.id}>
                    <td className="px-6 py-4 font-medium text-ink-900">
                      {payslip.original_filename || "Fiche de paie"}
                    </td>
                    <td className="px-6 py-4 text-ink-700">{formatPeriod(payslip.period)}</td>
                    <td className="px-6 py-4 text-ink-700">{formatAmount(payslip.gross_pay)}</td>
                    <td className="px-6 py-4 text-ink-700">{formatAmount(payslip.net_pay)}</td>
                    <td className="px-6 py-4 text-ink-700">
                      {anomaliesCount > 0 ? (
                        <span className="font-semibold text-red-600">{anomaliesCount}</span>
                      ) : (
                        "0"
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusInfo.className}`}>
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-ink-500">
                      {new Date(payslip.uploaded_at).toLocaleDateString("fr-FR")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
