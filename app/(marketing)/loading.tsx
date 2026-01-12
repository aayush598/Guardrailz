export default function MarketingLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Decorative blobs (match landing page) */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-96 w-96 animate-pulse rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute right-1/4 top-1/3 h-96 w-96 animate-pulse rounded-full bg-purple-200/30 blur-3xl delay-1000" />
        <div className="delay-2000 absolute bottom-1/4 left-1/3 h-96 w-96 animate-pulse rounded-full bg-pink-200/20 blur-3xl" />
      </div>

      {/* Page skeleton */}
      <div className="relative">
        <HeroSkeleton />
        <SectionSkeleton />
        <SectionSkeleton />
        <SectionSkeleton />
      </div>
    </div>
  );
}

/* ---------- Skeleton Components ---------- */

function HeroSkeleton() {
  return (
    <section className="py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Skeleton className="h-8 w-56 rounded-full" />
          <Skeleton className="h-14 w-full max-w-xl" />
          <Skeleton className="h-14 w-5/6" />
          <Skeleton className="h-6 w-4/5" />

          <div className="flex gap-4 pt-4">
            <Skeleton className="h-14 w-44 rounded-xl" />
            <Skeleton className="h-14 w-44 rounded-xl" />
          </div>
        </div>

        <Skeleton className="h-[420px] rounded-3xl" />
      </div>
    </section>
  );
}

function SectionSkeleton() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 space-y-4 text-center">
          <Skeleton className="mx-auto h-6 w-40 rounded-full" />
          <Skeleton className="mx-auto h-10 w-2/3" />
          <Skeleton className="mx-auto h-6 w-1/2" />
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-2xl" />
          ))}
        </div>
      </div>
    </section>
  );
}

function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 ${className}`}
    />
  );
}
