import { PageHeaderSkeleton, Skeleton } from "@/components/ui/skeleton";

export default function HistoriqueLoading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12" aria-busy="true" aria-label="Chargement de l'historique">
      <PageHeaderSkeleton />
      <div className="card mt-10 overflow-hidden">
        <div className="border-b border-ink-200/70 bg-beige-50 px-6 py-4">
          <Skeleton className="h-3 w-2/3" />
        </div>
        <div className="divide-y divide-ink-100">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-6 px-6 py-4">
              <Skeleton className="h-7 w-7 shrink-0" />
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="hidden h-4 w-24 sm:block" />
              <Skeleton className="hidden h-4 w-20 md:block" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
