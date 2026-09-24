import { PageHeaderSkeleton, Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12" aria-busy="true" aria-label="Chargement du tableau de bord">
      <PageHeaderSkeleton />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="card p-6">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="mt-5 h-10 w-16 rounded-xl" />
          </div>
        ))}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="card p-6">
            <Skeleton className="h-3 w-40" />
            <div className="mt-6 space-y-5">
              {Array.from({ length: 3 }).map((__, j) => (
                <div key={j}>
                  <Skeleton className="h-3 w-full max-w-[14rem]" />
                  <Skeleton className="mt-2 h-1.5 w-full rounded-full" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Skeleton className="mt-6 h-56 rounded-3xl" />
    </div>
  );
}
