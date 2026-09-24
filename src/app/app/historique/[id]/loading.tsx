import { Skeleton } from "@/components/ui/skeleton";

export default function RapportLoading() {
  return (
    <div className="mx-auto max-w-3xl p-8" aria-busy="true" aria-label="Chargement du rapport">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-10 w-52 rounded-full" />
      </div>
      <div className="card mt-6 rounded-3xl p-6 sm:p-10">
        <Skeleton className="h-7 w-32" />
        <Skeleton className="mt-6 h-9 w-3/4 rounded-xl" />
        <Skeleton className="mt-3 h-4 w-1/2" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="h-3 w-24" />
              <Skeleton className="mt-2 h-4 w-40" />
            </div>
          ))}
        </div>
        <Skeleton className="mt-8 h-24 w-full rounded-2xl" />
        <div className="mt-8 space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
