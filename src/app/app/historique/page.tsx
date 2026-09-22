export default function HistoriquePage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-ink-900">Historique</h1>
      <p className="mt-1 text-sm text-ink-500">
        Retrouvez ici toutes les fiches de paie importées et contrôlées.
      </p>

      <div className="mt-10 rounded-2xl border border-dashed border-beige-300 bg-beige-100 p-10 text-center">
        <p className="text-sm text-ink-500">
          Aucune fiche de paie dans l&apos;historique pour le moment. Les
          fiches importées depuis le tableau de bord apparaîtront ici.
        </p>
      </div>
    </div>
  );
}
