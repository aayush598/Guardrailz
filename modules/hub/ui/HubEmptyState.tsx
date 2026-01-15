export function HubEmptyState() {
  return (
    <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50/50 py-16 text-center">
      <div className="max-w-md px-4">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
          <svg
            className="h-8 w-8 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-lg font-semibold text-slate-900">No results found</h3>
        <p className="text-sm leading-relaxed text-slate-600">
          Try adjusting your search or filters to find what you`&apos;`re looking for.
        </p>
      </div>
    </div>
  );
}
