// Affiché instantanément au clic sur un onglet pendant le chargement des
// données (et préchargé par les liens de la barre latérale).
export default function AppLoading() {
  return (
    <div className="mx-auto w-full max-w-6xl animate-pulse space-y-6 px-4 py-8 sm:px-6 lg:px-10 lg:py-12" aria-busy="true" aria-label="Chargement">
      <div className="h-8 w-56 rounded-lg bg-ink-200/50" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 rounded-2xl bg-ink-200/40" />
        ))}
      </div>
      <div className="h-72 rounded-2xl bg-ink-200/40" />
    </div>
  );
}
