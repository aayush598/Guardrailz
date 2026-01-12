export default function GuardrailLoading() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto max-w-5xl space-y-6 px-4 py-12">
        <Skeleton className="h-64 rounded-2xl" />
        <Skeleton className="h-28 rounded-xl" />
        <Skeleton className="h-40 rounded-xl" />
      </div>
    </div>
  );
}

function Skeleton({ className }: { className: string }) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 ${className}`}
    />
  );
}
