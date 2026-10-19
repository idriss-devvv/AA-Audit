import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getActiveCompanyContext } from "@/lib/active-company";
import { getAccountContext } from "@/lib/account";
import { employeeDisplayName } from "@/lib/payslips";
import { PayslipUploadButton } from "@/components/upload/payslip-upload-button";
import { DEMO_EMPLOYEES, DEMO_PAYSLIPS, demoCompany, demoEmployeeName } from "@/lib/demo-data";
import { AddEmployeeForm } from "@/components/app/add-employee-form";

type EmployeeRow = {
  id: string;
  first_name: string;
  last_name: string;
  payslips: { period: string | null; gross_pay: number | null; anomalies: { count: number }[] }[];
};

const MONTHS = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];

function formatPeriod(period: string | null) {
  if (!period) return "—";
  const [year, month] = period.split("-");
  const label = MONTHS[Number(month) - 1];
  return label ? `${label} ${year}` : period;
}

function formatAmount(value: number | null) {
  return value === null ? "—" : new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(value);
}

/** Onglet « Salariés » : suivi par salarié (formules Pro et Entreprise). */
export default async function SalariesPage() {
  const [account, { activeCompanyId, activeCompanyName }] = await Promise.all([
    getAccountContext(),
    getActiveCompanyContext(),
  ]);

  // Version de démonstration : les salariés d'exemple, suivis des salariés
  // ajoutés manuellement (formules Pro et Entreprise).
  type EmployeeSummary = {
    id: string;
    name: string;
    company: string | null;
    count: number;
    lastPeriod: string | null;
    lastGross: number | null;
    anomalies: number;
  };

  const demoEmployees: EmployeeSummary[] = DEMO_EMPLOYEES.map((employee) => {
    const payslips = DEMO_PAYSLIPS.filter((p) => p.employeeId === employee.id).sort((a, b) => b.period.localeCompare(a.period));
    return {
      id: employee.id,
      name: demoEmployeeName(employee),
      company: demoCompany(employee.companyId)?.name ?? null,
      count: payslips.length,
      lastPeriod: payslips[0]?.period ?? null,
      lastGross: payslips[0]?.grossPay ?? null,
      anomalies: payslips.reduce((sum, p) => sum + p.anomalies.length, 0),
    };
  });

  let ownEmployees: EmployeeSummary[] = [];
  if (account.canManageEmployees) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("employees")
      .select("id, first_name, last_name, payslips(period, gross_pay, deleted_at, anomalies(count))")
      .eq("company_id", activeCompanyId ?? "")
      .is("payslips.deleted_at", null)
      .order("last_name", { ascending: true });

    ownEmployees = ((data as unknown as EmployeeRow[] | null) ?? []).map((employee) => {
      const payslips = [...employee.payslips].sort((a, b) => (b.period ?? "").localeCompare(a.period ?? ""));
      return {
        id: employee.id,
        name: employeeDisplayName(employee),
        company: activeCompanyName,
        count: payslips.length,
        lastPeriod: payslips[0]?.period ?? null,
        lastGross: payslips[0]?.gross_pay ?? null,
        anomalies: payslips.reduce((sum, p) => sum + (p.anomalies?.[0]?.count ?? 0), 0),
      };
    });
  }

  const employees = [...demoEmployees, ...ownEmployees];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="heading-display text-4xl md:text-[2.75rem]">Salariés</h1>
          <p className="mt-3 max-w-2xl text-sm text-ink-500">
            Les salariés sont reconnus automatiquement
            grâce au nom imprimé sur chaque fiche importée.
          </p>
        </div>
        {account.canManageEmployees && <AddEmployeeForm />}
      </div>

      {employees.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-ink-200 bg-beige-100/50 p-10 text-center">
          <p className="text-sm text-ink-500">
            Aucun salarié pour le moment. Importez une fiche de paie : le salarié est créé
            automatiquement à partir du nom imprimé sur le bulletin.
          </p>
          <div className="mt-5 flex justify-center">
            <PayslipUploadButton variant="compact" />
          </div>
        </div>
      ) : (
        <div className="card mt-10 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink-200/70 bg-beige-50 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-400">
              <tr>
                <th className="px-6 py-3.5">Salarié</th>
                <th className="whitespace-nowrap px-6 py-3.5">Fiches</th>
                <th className="whitespace-nowrap px-6 py-3.5">Dernière période</th>
                <th className="whitespace-nowrap px-6 py-3.5">Dernier brut</th>
                <th className="whitespace-nowrap px-6 py-3.5">Anomalies</th>
                <th className="px-6 py-3.5" aria-label="Détail" />
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {employees.map((employee) => (
                <tr key={employee.id} className="transition-colors hover:bg-beige-50/70">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-700 ring-1 ring-inset ring-blue-100">
                        {employee.name
                          .split(" ")
                          .map((w) => w[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()}
                      </span>
                      <span>
                        <span className="block font-medium text-ink-900">{employee.name}</span>
                        {employee.company && <span className="block text-xs text-ink-500">{employee.company}</span>}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 tabular-nums text-ink-700">{employee.count}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-ink-700">{formatPeriod(employee.lastPeriod)}</td>
                  <td className="whitespace-nowrap px-6 py-4 tabular-nums text-ink-700">{formatAmount(employee.lastGross)}</td>
                  <td className="px-6 py-4">
                    {employee.anomalies > 0 ? (
                      <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-rose-50 px-2 text-xs font-semibold text-rose-700 ring-1 ring-inset ring-rose-200">
                        {employee.anomalies}
                      </span>
                    ) : (
                      <span className="badge bg-emerald-50 text-emerald-700 ring-emerald-200">Aucune</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/app/salaries/${employee.id}`} className="whitespace-nowrap text-sm font-semibold text-blue-600 transition hover:text-blue-800">
                      Voir le détail →
                    </Link>
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
