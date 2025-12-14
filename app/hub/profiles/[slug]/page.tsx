import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PROFILES } from '@/lib/hub/profiles';
import { GUARDRAILS } from '@/lib/hub/guardrails';
import { Eye, Heart, Share2, Shield } from 'lucide-react';

export default function ProfileDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const profile = PROFILES.find(p => p.slug === params.slug);

  if (!profile) {
    notFound();
  }

  const guardrails = profile.guardrails
    .map(id => GUARDRAILS.find(g => g.id === id))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-12">

        {/* HEADER */}
        <div className="bg-white rounded-2xl border p-6 mb-8">
          <div className="flex items-start gap-5">
            <img
              src={profile.icon}
              alt={profile.name}
              className="h-16 w-16"
            />

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{profile.name}</h1>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    profile.stage === 'completed'
                      ? 'bg-green-100 text-green-700'
                      : profile.stage === 'development'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {profile.stage}
                </span>
              </div>

              <p className="text-slate-600 max-w-2xl">
                {profile.description}
              </p>

              {/* TAGS */}
              <div className="flex flex-wrap gap-2 mt-4">
                {profile.tags.map(tag => (
                  <span
                    key={tag}
                    className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* STATS */}
              <div className="flex items-center gap-6 mt-6 text-sm text-slate-600">
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {profile.stats.views} views
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  {profile.stats.likes} likes
                </span>
                <span className="flex items-center gap-1">
                  <Share2 className="h-4 w-4" />
                  {profile.stats.shares} shares
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* INCLUDED GUARDRAILS */}
        <div className="mb-6 flex items-center gap-2">
          <Shield className="h-5 w-5 text-indigo-600" />
          <h2 className="text-2xl font-bold">
            Included Guardrails ({guardrails.length})
          </h2>
        </div>

        {guardrails.length === 0 ? (
          <div className="bg-white border rounded-xl p-6 text-slate-600">
            No guardrails are finalized for this profile yet.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {guardrails.map(guardrail => (
              <Link
                key={guardrail!.id}
                href={`/hub/guardrails/${guardrail!.slug}`}
                className="bg-white border rounded-xl p-5 hover:shadow-md transition"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={guardrail!.icon}
                    className="h-8 w-8"
                  />
                  <h3 className="font-semibold">
                    {guardrail!.name}
                  </h3>
                </div>

                <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                  {guardrail!.description}
                </p>

                <div className="flex items-center justify-between text-xs">
                  <span
                    className={`px-2 py-0.5 rounded-full ${
                      guardrail!.stage === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : guardrail!.stage === 'development'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {guardrail!.stage}
                  </span>

                  <span className="text-slate-500">
                    {guardrail!.stats.views} views
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
