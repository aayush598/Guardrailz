import { Card, CardContent } from '@/shared/ui/card';

export default function Loading() {
  return (
    <div className="container mx-auto grid gap-6 px-4 py-8 lg:grid-cols-2">
      {Array.from({ length: 2 }).map((_, i) => (
        <Card key={i} className="border-slate-200">
          <CardContent className="space-y-4 p-6">
            <div className="h-6 w-1/3 animate-pulse rounded bg-slate-200" />
            <div className="h-40 animate-pulse rounded bg-slate-100" />
            <div className="h-10 animate-pulse rounded bg-slate-100" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
