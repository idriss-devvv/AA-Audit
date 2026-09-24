import { PageHeaderSkeleton, Skeleton } from "@/components/ui/skeleton";

export default function ParametresLoading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12" aria-busy="true" aria-label="Chargement des paramètres">
      <PageHeaderSkeleton />
      {[4, 6, 3, 3].map((rows, i) => (
        <div key={i} className="card mt-6 max-w-2xl p-6 sm:p-7">
          <Skeleton className="h-3 w-36" />
          <div className="mt-5 space-y-3">
            {Array.from({ length: rows }).map((_, j) => (
              <Skeleton key={j} className="h-4 w-full" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
