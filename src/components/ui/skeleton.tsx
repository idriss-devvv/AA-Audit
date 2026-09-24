/** Bloc gris pulsé qui réserve la place d'un contenu en cours de chargement. */
export function Skeleton({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`animate-pulse rounded-lg bg-ink-200/60 ${className}`} />;
}

/** En-tête de page de l'application (titre + sous-titre) en chargement. */
export function PageHeaderSkeleton() {
  return (
    <div>
      <Skeleton className="h-10 w-64 rounded-xl" />
      <Skeleton className="mt-4 h-4 w-full max-w-md" />
    </div>
  );
}
