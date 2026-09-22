const stats = [
  { label: "Fiches contrôlées", value: "0" },
  { label: "Anomalies détectées", value: "0" },
  { label: "Employés suivis", value: "0" },
];

export default function DashboardPage() {
  return (
    <div className="container-page py-10">
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

      <div className="mt-10 rounded-2xl border border-dashed border-beige-300 bg-beige-100 p-10 text-center">
        <p className="text-sm text-ink-500">
          Aucune fiche de paie importée pour le moment. Branchez
          l&apos;upload (<code>/api/payslips/upload</code>) et l&apos;analyse
          (<code>/api/analyze</code>) pour commencer à alimenter ce
          tableau de bord.
        </p>
      </div>
    </div>
  );
}
