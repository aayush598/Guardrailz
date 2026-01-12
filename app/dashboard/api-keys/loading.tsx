import { Card, CardContent } from '@/shared/ui/card';

export default function Loading() {
  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="space-y-3 pt-6">
              <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />
              <div className="h-8 w-1/3 animate-pulse rounded bg-slate-300" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="py-16 text-center">
          <div className="mx-auto h-6 w-48 animate-pulse rounded bg-slate-200" />
        </CardContent>
      </Card>
    </div>
  );
}
