'use client';

import { useEffect, useState } from 'react';
import { createDocsSearch } from '../_search/search-client';
import { useDocsSearch } from '../_search/use-docs-search';
import type { DocsSearchDocument, DocsSearchResult } from '../_search/types';
import type MiniSearch from 'minisearch';
import type { SearchResult } from 'minisearch';

import Link from 'next/link';

export function DocsSearch() {
  const { open, setOpen } = useDocsSearch();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<DocsSearchResult[]>([]);
  const [search, setSearch] = useState<MiniSearch<DocsSearchDocument> | null>(null);

  useEffect(() => {
    createDocsSearch().then(setSearch);
  }, []);

  useEffect(() => {
    if (!search || !query) {
      setResults([]);
      return;
    }
    const rawResults = search.search(query, { prefix: true }).slice(0, 10);

    setResults(
      rawResults.map((r: SearchResult) => ({
        id: r.id as string,
        title: r.title as string,
        slug: r.slug as string,
        section: r.section as string,
      })),
    );
  }, [query, search]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm">
      <div className="mx-auto mt-32 max-w-lg rounded-lg bg-background p-4 shadow-lg">
        <input
          autoFocus
          placeholder="Search docs…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-md border px-3 py-2"
        />

        <ul className="mt-3 space-y-1">
          {results.map((r) => (
            <li key={r.id}>
              <Link
                href={`/docs/${r.slug}`}
                onClick={() => setOpen(false)}
                className="block rounded-md px-2 py-2 hover:bg-muted"
              >
                <div className="text-sm font-medium">{r.title}</div>
                <div className="text-xs text-muted-foreground">{r.section}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
