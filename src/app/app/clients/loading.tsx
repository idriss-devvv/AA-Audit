import { PageHeaderSkeleton, Skeleton } from "@/components/ui/skeleton";

export default function ClientsLoading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12" aria-busy="true" aria-label="Chargement des clients">
      <PageHeaderSkeleton />
      <div className="card mt-8 max-w-2xl p-6 sm:p-7">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="mt-5 h-11 w-full rounded-xl" />
      </div>
      <div className="mt-6 flex max-w-2xl flex-col gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="card flex items-center justify-between p-5">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-8 w-36 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
