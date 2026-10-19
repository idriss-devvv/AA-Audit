import { FichesExplorer, type FicheItem } from "@/components/payslips/fiches-explorer";
import { PayslipUploadButton } from "@/components/upload/payslip-upload-button";
import { DEMO_EMPLOYEES, demoEmployeeName, demoPayslipsByUploadDate } from "@/lib/demo-data";

/**
 * Page unique « Fiches de paie » : liste, filtres (salarié, période, gravité,
 * statut), aperçu du fichier, anomalies et actions au même endroit.
 * Version de démonstration : affiche les fiches d'exemple.
 */
export default function FichesPage({ searchParams }: { searchParams: { gravite?: string; salarie?: string } }) {
  const items: FicheItem[] = demoPayslipsByUploadDate().map((p) => {
    const employee = DEMO_EMPLOYEES.find((e) => e.id === p.employeeId)!;
    return {
      id: p.id,
      period: p.period,
      fileName: p.fileName,
      grossPay: p.grossPay,
      netPay: p.netPay,
      status: "processed",
      mimeType: "application/pdf",
      errorMessage: null,
      uploadedAt: p.uploadedAt,
      uploadedByMe: true,
      employeeId: employee.id,
      employeeName: demoEmployeeName(employee),
      position: p.extracted.position,
      agreement: p.extracted.collectiveAgreementName ?? null,
      agreementIdcc: p.extracted.collectiveAgreementIdcc ?? null,
      agreementAvailable: p.extracted.collectiveAgreementAvailable ?? null,
      anomalies: p.anomalies,
    };
  });

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
        locked={false}
        initialSeverity={searchParams.gravite ?? "all"}
        initialEmployee={searchParams.salarie ?? "all"}
      />
    </div>
  );
}
