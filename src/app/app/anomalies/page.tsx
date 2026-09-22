export default function AnomaliesPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-ink-900">Anomalies</h1>
      <p className="mt-1 text-sm text-ink-500">
        Liste des anomalies détectées sur l&apos;ensemble de vos fiches de
        paie, triées par gravité.
      </p>

      <div className="mt-10 rounded-2xl border border-dashed border-beige-300 bg-beige-100 p-10 text-center">
        <p className="text-sm text-ink-500">
          Aucune anomalie détectée pour le moment. Elles apparaîtront ici dès
          qu&apos;une fiche de paie contrôlée présentera un écart.
        </p>
      </div>
    </div>
  );
}
