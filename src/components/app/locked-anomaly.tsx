/**
 * Anomalie masquée (formule Free) : la gravité reste visible, le détail est
 * remplacé par un texte factice flouté. Le vrai message n'est jamais envoyé
 * au navigateur.
 */
export function LockedAnomaly({
  severityLabel,
  severityClassName,
  compact = false,
}: {
  severityLabel: string;
  severityClassName: string;
  compact?: boolean;
}) {
  return (
    <div className={`card relative overflow-hidden ${compact ? "rounded-xl p-4 pl-5" : "p-5 pl-6"}`} aria-label="Anomalie masquée">
      <div className="flex flex-wrap items-center gap-2">
        <span className={`badge ${severityClassName}`}>{severityLabel}</span>
        <span className="badge bg-beige-100 text-ink-500 ring-ink-200/70">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3 w-3" aria-hidden>
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
          Détail masqué
        </span>
      </div>
      <p aria-hidden className="mt-3 select-none text-[15px] font-medium text-ink-900 blur-[5px]">
        Écart constaté sur une ligne du bulletin, montant attendu et source officielle.
      </p>
      <p aria-hidden className="mt-1.5 select-none text-xs text-ink-400 blur-[4px]">Fiche de paie · période</p>
    </div>
  );
}
