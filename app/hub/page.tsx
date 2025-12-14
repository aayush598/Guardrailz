'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { GUARDRAILS } from '@/lib/hub/guardrails';
import { PROFILES } from '@/lib/hub/profiles';
import { HUB_TAGS } from '@/lib/hub/tags';
import {
  Eye,
  Heart,
  Share2,
  Filter,
  Search,
} from 'lucide-react';

type SortBy = 'views' | 'likes' | 'shares' | 'name';

export default function HubPage() {
  const [query, setQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortBy>('views');

  const items = useMemo(() => {
    const combined = [
      ...GUARDRAILS.map(g => ({ ...g, type: 'guardrail' })),
      ...PROFILES.map(p => ({ ...p, type: 'profile' })),
    ];

    return combined
      .filter(item => {
        const matchesQuery = item.name
          .toLowerCase()
          .includes(query.toLowerCase());

        const matchesTags =
          selectedTags.length === 0 ||
          selectedTags.every(tag => item.tags.includes(tag));

        return matchesQuery && matchesTags;
      })
      .sort((a, b) => {
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        return b.stats[sortBy] - a.stats[sortBy];
      });
  }, [query, selectedTags, sortBy]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-10 flex gap-8">

        {/* SIDEBAR */}
        <aside className="w-64 shrink-0 hidden md:block">
          <div className="sticky top-24">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter by Tags
            </h3>

            <div className="space-y-2">
              {HUB_TAGS.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                    selectedTags.includes(tag)
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white hover:bg-slate-100'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 space-y-6">

          {/* TOP BAR */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                className="w-full pl-9 pr-4 py-2 border rounded-lg"
                placeholder="Search guardrails or profiles..."
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </div>

            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as SortBy)}
              className="border rounded-lg px-3 py-2 text-sm"
            >
              <option value="views">Most Views</option>
              <option value="likes">Most Likes</option>
              <option value="shares">Most Shares</option>
              <option value="name">Name (A–Z)</option>
            </select>
          </div>

          {/* GRID */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(item => (
              <Link
                key={item.id}
                href={`/hub/${item.type}s/${item.slug}`}
                className="group bg-white rounded-2xl border p-5 hover:shadow-lg transition"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="h-10 w-10"
                  />
                  <div>
                    <h3 className="font-semibold text-lg group-hover:text-indigo-600 transition">
                      {item.name}
                    </h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        item.stage === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : item.stage === 'development'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {item.stage}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs bg-slate-100 px-2 py-1 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" /> {item.stats.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="h-3 w-3" /> {item.stats.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Share2 className="h-3 w-3" /> {item.stats.shares}
                    </span>
                  </div>
                  <span className="capitalize">{item.type}</span>
                </div>
              </Link>
            ))}
          </div>

          {items.length === 0 && (
            <div className="text-center py-20 text-slate-500">
              No guardrails or profiles match your filters.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
