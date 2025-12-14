import { GUARDRAILS } from '@/lib/hub/guardrails';

export default function GuardrailPage({ params }: { params: { slug: string } }) {
  const guardrail = GUARDRAILS.find(g => g.slug === params.slug);
  if (!guardrail) return null;

  return (
    <div className="container mx-auto py-12">
      <div className="flex items-center gap-4 mb-6">
        <img src={guardrail.icon} className="h-14 w-14" />
        <div>
          <h1 className="text-3xl font-bold">{guardrail.name}</h1>
          <p className="text-slate-600">{guardrail.description}</p>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <span>Status: <strong>{guardrail.stage}</strong></span>
        <span>Views: {guardrail.stats.views}</span>
        <span>Likes: {guardrail.stats.likes}</span>
      </div>

      <div className="flex gap-2">
        {guardrail.tags.map(tag => (
          <span key={tag} className="bg-slate-100 px-3 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
