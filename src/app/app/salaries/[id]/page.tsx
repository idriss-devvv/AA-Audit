import Link from "next/link";
import { PayslipPreviewButton } from "@/components/payslips/payslip-preview";
import { employeeDisplayName } from "@/lib/payslips";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getAccountContext } from "@/lib/account";

export const dynamic = "force-dynamic";

type EmployeeDetail = {
  id: string;
  first_name: string;
  last_name: string;
  payslips: {
    id: string;
    period: string | null;
    gross_pay: number | null;
    net_pay: number | null;
    status: string;
    mime_type: string | null;
    anomalies: { severity: string }[];
  }[];
};

const MONTHS = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

function formatPeriod(period: string | null) {
  if (!period) return "—";
  const [year, month] = period.split("-");
  const label = MONTHS[Number(month) - 1];
  return label ? `${label} ${year}` : period;
}

function formatAmount(value: number | null) {
  return value === null ? "—" : new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(value);
}

/** Détail d'un salarié : ses fiches de paie et leurs anomalies, par période. */
export default async function SalarieDetailPage({ params }: { params: { id: string } }) {
  const account = await getAccountContext();
  if (!account.canManageEmployees) redirect("/app/salaries");

  const supabase = await createClient();
  // RLS : le salarié n'est lisible que s'il appartient à une société accessible.
  const { data } = await supabase
    .from("employees")
    .select("id, first_name, last_name, payslips(id, period, gross_pay, net_pay, status, mime_type, deleted_at, anomalies(severity))")
    .eq("id", params.id)
    .is("payslips.deleted_at", null)
    .maybeSingle();

  const employee = data as unknown as EmployeeDetail | null;
  if (!employee) notFound();

  const name = employeeDisplayName(employee);
  const payslips = [...employee.payslips].sort((a, b) => (b.period ?? "").localeCompare(a.period ?? ""));
  const totalAnomalies = payslips.reduce((sum, p) => sum + p.anomalies.length, 0);
  const critical = payslips.reduce((sum, p) => sum + p.anomalies.filter((a) => a.severity === "critical").length, 0);

  const stats = [
    { label: "Fiches contrôlées", value: String(payslips.length) },
    { label: "Anomalies", value: String(totalAnomalies) },
    { label: "Dont critiques", value: String(critical) },
    { label: "Dernier brut", value: formatAmount(payslips[0]?.gross_pay ?? null) },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      <Link href="/app/salaries" className="text-sm font-medium text-ink-500 transition hover:text-ink-900">
        ← Tous les salariés
      </Link>
      <h1 className="heading-display mt-4 text-4xl md:text-[2.75rem]">{name}</h1>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={stat.label} className={i === 0 ? "rounded-2xl bg-blue-800 p-6 text-beige-50 shadow-lift" : "card p-6"}>
            <p className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${i === 0 ? "text-blue-200" : "text-ink-500"}`}>{stat.label}</p>
            <p className={`mt-4 font-display text-4xl leading-none tabular-nums ${i === 0 ? "text-beige-50" : "text-ink-900"}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {payslips.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-ink-200 bg-beige-100/50 p-10 text-center">
          <p className="text-sm text-ink-500">Aucune fiche de paie importée pour ce salarié.</p>
        </div>
      ) : (
        <div className="card mt-8 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink-200/70 bg-beige-50 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-400">
              <tr>
                <th className="px-6 py-3.5">Période</th>
                <th className="px-6 py-3.5">Brut</th>
                <th className="px-6 py-3.5">Net</th>
                <th className="px-6 py-3.5">Anomalies</th>
                <th className="px-6 py-3.5" aria-label="Rapport" />
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {payslips.map((payslip) => (
                <tr key={payslip.id} className="transition-colors hover:bg-beige-50/70">
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-ink-900">{formatPeriod(payslip.period)}</td>
                  <td className="whitespace-nowrap px-6 py-4 tabular-nums text-ink-700">{formatAmount(payslip.gross_pay)}</td>
                  <td className="whitespace-nowrap px-6 py-4 tabular-nums text-ink-700">{formatAmount(payslip.net_pay)}</td>
                  <td className="px-6 py-4">
                    {payslip.anomalies.length > 0 ? (
                      <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-rose-50 px-2 text-xs font-semibold text-rose-700 ring-1 ring-inset ring-rose-200">
                        {payslip.anomalies.length}
                      </span>
                    ) : (
                      <span className="badge bg-emerald-50 text-emerald-700 ring-emerald-200">Aucune</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-3">
                      <PayslipPreviewButton payslipId={payslip.id} mimeType={payslip.mime_type} title={`${name} — ${formatPeriod(payslip.period)}`} />
                      <Link href={`/app/historique/${payslip.id}`} className="whitespace-nowrap text-sm font-semibold text-blue-600 transition hover:text-blue-800">
                        Rapport →
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
