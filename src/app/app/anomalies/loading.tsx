import { PageHeaderSkeleton, Skeleton } from "@/components/ui/skeleton";

export default function AnomaliesLoading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12" aria-busy="true" aria-label="Chargement des anomalies">
      <PageHeaderSkeleton />
      <div className="mt-8 flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="card p-5 pl-6">
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-32 rounded-full" />
            </div>
            <Skeleton className="mt-4 h-4 w-full max-w-2xl" />
            <Skeleton className="mt-2 h-3 w-48" />
          </div>
        ))}
      </div>
    </div>
  );
}
