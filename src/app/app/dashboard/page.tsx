import { PayslipUploadButton } from "@/components/upload/payslip-upload-button";

const stats = [
  { label: "Fiches contrôlées", value: "0" },
  { label: "Anomalies détectées", value: "0" },
  { label: "Employés suivis", value: "0" },
];

export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-ink-900">Tableau de bord</h1>
      <p className="mt-1 text-sm text-ink-500">
        Vue d&apos;ensemble des fiches de paie analysées et des anomalies
        détectées.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-beige-200 bg-white p-6 shadow-soft"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-ink-500">
              {stat.label}
            </p>
            <p className="mt-2 text-3xl font-extrabold text-blue-600">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-beige-300 bg-beige-100 p-10 text-center">
        <h2 className="text-lg font-semibold text-ink-900">
          Importer une fiche de paie
        </h2>
        <p className="max-w-md text-sm text-ink-500">
          Déposez un fichier PDF ou une photo de fiche de paie : PayAudit la
          réceptionne immédiatement et prépare l&apos;analyse d&apos;anomalies.
        </p>
        <PayslipUploadButton />
      </div>
    </div>
  );
}
