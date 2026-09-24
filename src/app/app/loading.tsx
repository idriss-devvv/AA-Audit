import { PageHeaderSkeleton, Skeleton } from "@/components/ui/skeleton";

// Chargement générique des pages de l'application (la barre latérale reste affichée).
export default function AppLoading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12" aria-busy="true" aria-label="Chargement">
      <PageHeaderSkeleton />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-2xl" />
        ))}
      </div>
      <Skeleton className="mt-6 h-64 rounded-2xl" />
    </div>
  );
}
