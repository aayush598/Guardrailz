import { HubClient } from '@/modules/hub/ui/HubClient';

export default function HubPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8 lg:py-10">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">Hub</h1>
          <p className="text-base text-slate-600">
            Discover and explore guardrails and profiles for your projects
          </p>
        </div>
        <HubClient />
      </div>
    </div>
  );
}
