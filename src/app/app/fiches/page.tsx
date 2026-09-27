import { createClient, getCurrentUser } from "@/lib/supabase/server";
import { getActiveCompanyContext } from "@/lib/active-company";
import { areResultsLocked } from "@/lib/account";
import { FichesExplorer, type FicheItem } from "@/components/payslips/fiches-explorer";
import { PayslipUploadButton } from "@/components/upload/payslip-upload-button";
import { employeeDisplayName } from "@/lib/payslips";
import type { PayslipData } from "@/types/payslip";

type Record = {
  id: string;
  period: string | null;
  original_filename: string | null;
  gross_pay: number | null;
  net_pay: number | null;
  status: string;
  mime_type: string | null;
  error_message: string | null;
  uploaded_at: string;
  uploaded_by: string;
  extracted_data: PayslipData | null;
  employee: { id: string; first_name: string | null; last_name: string | null; employee_ref: string | null } | null;
  anomalies: { id: string; rule_id: string; severity: string; message: string }[] | null;
};

/**
 * Page unique « Fiches de paie » : liste, filtres (salarié, période, gravité,
 * statut), aperçu du fichier, anomalies et actions au même endroit.
 * Remplace les anciens onglets Historique et Anomalies.
 */
export default async function FichesPage({ searchParams }: { searchParams: { gravite?: string; salarie?: string } }) {
  const supabase = await createClient();
  const [{ activeCompanyId }, user] = await Promise.all([getActiveCompanyContext(), getCurrentUser()]);

  const [{ data }, locked] = await Promise.all([
    supabase
      .from("payslips")
      .select(
        "id, period, original_filename, gross_pay, net_pay, status, mime_type, error_message, uploaded_at, uploaded_by, extracted_data, employee:employees(id, first_name, last_name, employee_ref), anomalies(id, rule_id, severity, message)"
      )
      .eq("company_id", activeCompanyId ?? "")
      .is("deleted_at", null)
      .order("uploaded_at", { ascending: false }),
    areResultsLocked(activeCompanyId),
  ]);

  const items: FicheItem[] = ((data as unknown as Record[] | null) ?? []).map((r) => ({
    id: r.id,
    period: r.period,
    fileName: r.original_filename || "Fiche de paie",
    grossPay: r.gross_pay,
    netPay: r.net_pay,
    status: r.status,
    mimeType: r.mime_type,
    errorMessage: r.error_message,
    uploadedAt: r.uploaded_at,
    uploadedByMe: r.uploaded_by === user?.id,
    employeeId: r.employee?.id ?? null,
    employeeName: employeeDisplayName(r.employee, r.extracted_data?.employeeName),
    position: r.extracted_data?.position ?? null,
    agreement: r.extracted_data?.collectiveAgreementName || r.extracted_data?.collectiveAgreement || null,
    agreementIdcc: r.extracted_data?.collectiveAgreementIdcc ?? null,
    agreementAvailable: r.extracted_data?.collectiveAgreementAvailable ?? null,
    anomalies: r.anomalies ?? [],
  }));

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="heading-display text-4xl md:text-[2.75rem]">Fiches de paie</h1>
          <p className="mt-3 max-w-2xl text-sm text-ink-500">
            Toutes les fiches importées, leurs anomalies et le fichier d&apos;origine, au même endroit.
          </p>
        </div>
        <PayslipUploadButton variant="compact" />
      </div>

      <FichesExplorer
        items={items}
        locked={locked}
        initialSeverity={searchParams.gravite ?? "all"}
        initialEmployee={searchParams.salarie ?? "all"}
      />
    </div>
  );
}
