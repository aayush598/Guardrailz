import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto animate-pulse px-4 py-8 sm:px-6">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="mb-6 h-6 w-40 rounded bg-slate-200" />

          <div className="flex items-center justify-between">
            <div>
              <div className="mb-3 h-10 w-72 rounded bg-slate-300" />
              <div className="h-4 w-80 rounded bg-slate-200" />
            </div>
            <div className="h-8 w-24 rounded-full bg-slate-300" />
          </div>
        </div>

        {/* Traffic Section */}
        <SectionSkeleton />
        <SectionSkeleton />
        <SectionSkeleton />

        {/* Latency Metrics */}
        <div className="mb-10">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-slate-300" />
            <div className="h-7 w-64 rounded bg-slate-300" />
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="space-y-3 pt-6 text-center">
                  <div className="mx-auto h-4 w-32 rounded bg-slate-200" />
                  <div className="mx-auto h-10 w-24 rounded bg-slate-300" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Skeleton Helpers ---------- */

function SectionSkeleton() {
  return (
    <section className="mb-10">
      <div className="mb-6 flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg bg-slate-300" />
        <div className="h-7 w-64 rounded bg-slate-300" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="mb-2 h-5 w-64 rounded bg-slate-300" />
              <div className="h-4 w-48 rounded bg-slate-200" />
            </CardHeader>
            <CardContent>
              <div className="h-[280px] w-full rounded-lg bg-slate-200" />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
