'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { GUARDRAILS } from '@/lib/hub/guardrails';
import { PROFILES } from '@/lib/hub/profiles';
import { HUB_TAGS, HubTag } from '@/lib/hub/tags';
import {
  Eye,
  Heart,
  Share2,
  Filter,
  Search,
  ArrowUpDown,
  X,
  Shield,
  Grid3x3,
  Package,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HubIcon } from './icon-map';

type SortBy = 'views' | 'likes' | 'shares' | 'name';

export default function HubClient() {
  const [query, setQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<HubTag[]>([]);
  const [sortBy, setSortBy] = useState<SortBy>('views');
  const [showFilters, setShowFilters] = useState(false);

  const items = useMemo(() => {
    const combined = [
      ...GUARDRAILS.map((g) => ({ ...g, type: 'guardrail' })),
      ...PROFILES.map((p) => ({ ...p, type: 'profile' })),
    ];

    return combined
      .filter((item) => {
        const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase());

        const matchesTags =
          selectedTags.length === 0 || selectedTags.every((tag) => item.tags.includes(tag));

        return matchesQuery && matchesTags;
      })
      .sort((a, b) => {
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        return b.stats[sortBy] - a.stats[sortBy];
      });
  }, [query, selectedTags, sortBy]);

  const toggleTag = (tag: HubTag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setQuery('');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* SIDEBAR - Desktop */}
          <aside className="hidden w-72 shrink-0 lg:block">
            <div className="sticky top-24 space-y-6">
              {/* Filter Header */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="flex items-center gap-2 font-semibold text-slate-900">
                    <Filter className="h-5 w-5 text-slate-600" />
                    Filters
                  </h3>
                  {(selectedTags.length > 0 || query) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-xs hover:bg-slate-100"
                    >
                      Clear all
                    </Button>
                  )}
                </div>

                {/* Active Filters */}
                {selectedTags.length > 0 && (
                  <div className="mb-4 border-b border-slate-200 pb-4">
                    <p className="mb-2 text-xs font-medium text-slate-600">Active Filters</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedTags.map((tag) => (
                        <Badge
                          key={tag}
                          className="cursor-pointer bg-slate-600 text-white hover:bg-slate-800"
                          onClick={() => toggleTag(tag)}
                        >
                          #{tag}
                          <X className="ml-1 h-3 w-3" />
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div>
                  <p className="mb-3 text-xs font-medium text-slate-600">Tags</p>
                  <div className="space-y-2">
                    {HUB_TAGS.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-all duration-200 ${
                          selectedTags.includes(tag)
                            ? 'bg-slate-600 text-white shadow-lg shadow-slate-900/20'
                            : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                        } `}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats Card */}
              <div className="rounded-xl bg-gradient-to-br from-slate-200 to-slate-100 p-6 text-slate-700">
                <h3 className="mb-4 flex items-center gap-2 font-semibold">
                  <Grid3x3 className="h-5 w-5" />
                  Hub Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Total Items</span>
                    <span className="text-lg font-bold">{items.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Guardrails</span>
                    <span className="text-lg font-bold">{GUARDRAILS.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Profiles</span>
                    <span className="text-lg font-bold">{PROFILES.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="flex-1 space-y-6">
            {/* Top Bar */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-slate-900"
                    placeholder="Search guardrails or profiles..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>

                {/* Sort */}
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="lg:hidden"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>

                  <div className="flex items-center gap-2">
                    <ArrowUpDown className="h-4 w-4 text-slate-600" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortBy)}
                      className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-900"
                    >
                      <option value="views">Most Views</option>
                      <option value="likes">Most Likes</option>
                      <option value="shares">Most Shares</option>
                      <option value="name">Name (A–Z)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Mobile Filters */}
              {showFilters && (
                <div className="mt-4 border-t border-slate-200 pt-4 lg:hidden">
                  <div className="flex flex-wrap gap-2">
                    {HUB_TAGS.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                          selectedTags.includes(tag)
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        } `}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">
                Showing <span className="font-semibold text-slate-900">{items.length}</span> results
              </p>
            </div>

            {/* GRID */}
            {items.length === 0 ? (
              <div className="rounded-xl border border-slate-200 bg-white p-16 text-center">
                <div className="mx-auto max-w-md">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                    <Search className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-slate-900">No results found</h3>
                  <p className="mb-6 text-slate-600">
                    No guardrails or profiles match your current filters.
                  </p>
                  <Button onClick={clearFilters} variant="outline">
                    Clear Filters
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {items.map((item) => (
                  <Link
                    key={item.id}
                    href={`/hub/${item.type}s/${item.slug}`}
                    className="group rounded-xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-slate-300 hover:shadow-xl"
                  >
                    {/* Header */}
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-slate-100 p-2 transition-transform group-hover:scale-110">
                          <HubIcon name={item.icon} className="h-8 w-8 text-slate-700" />
                        </div>
                        <Badge
                          className={`text-xs font-semibold ${
                            item.stage === 'completed'
                              ? 'border-green-200 bg-green-100 text-green-700'
                              : item.stage === 'development'
                                ? 'border-yellow-200 bg-yellow-100 text-yellow-700'
                                : 'border-blue-200 bg-blue-100 text-blue-700'
                          } `}
                        >
                          {item.stage}
                        </Badge>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {item.type}
                      </Badge>
                    </div>

                    {/* Content */}
                    <h3 className="mb-2 text-lg font-bold text-slate-900 transition-colors group-hover:text-slate-700">
                      {item.name}
                    </h3>
                    <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-600">
                      {item.description}
                    </p>

                    {/* Tags */}
                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {item.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600"
                        >
                          #{tag}
                        </span>
                      ))}
                      {item.tags.length > 3 && (
                        <span className="px-2 py-1 text-xs text-slate-400">
                          +{item.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Footer Stats */}
                    <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3.5 w-3.5" />
                          {item.stats.views.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="h-3.5 w-3.5" />
                          {item.stats.likes.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Share2 className="h-3.5 w-3.5" />
                          {item.stats.shares.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
