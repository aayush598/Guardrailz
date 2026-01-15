import { HUB_TAGS, HubTag } from '@/modules/hub/domain/hub-tags';
import { Badge } from '@/shared/ui/badge';

export function HubSidebar({
  selectedTags,
  onToggleTag,
  onClear,
  stats,
}: {
  selectedTags: HubTag[];
  onToggleTag: (tag: HubTag) => void;
  onClear: () => void;
  stats: { total: number; guardrails: number; profiles: number };
}) {
  return (
    <aside className="hidden w-64 shrink-0 space-y-5 lg:block">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900">Filters</h3>
          {selectedTags.length > 0 && (
            <button
              onClick={onClear}
              className="text-xs font-medium text-blue-600 transition-colors hover:text-blue-700"
            >
              Clear all
            </button>
          )}
        </div>

        {selectedTags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2 border-b border-slate-100 pb-4">
            {selectedTags.map((tag) => (
              <Badge
                key={tag}
                onClick={() => onToggleTag(tag)}
                className="cursor-pointer bg-blue-50 text-blue-700 hover:bg-blue-100"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="space-y-1">
          {HUB_TAGS.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => onToggleTag(tag)}
                className={`w-full rounded px-3 py-2 text-left text-sm font-medium transition-colors ${
                  isSelected ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                #{tag}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100/50 p-5 shadow-sm">
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-600">
          Statistics
        </h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Total Items</span>
            <span className="text-lg font-semibold text-slate-900">{stats.total}</span>
          </div>
          <div className="flex items-center justify-between border-t border-slate-200 pt-3">
            <span className="text-sm text-slate-600">Guardrails</span>
            <span className="text-base font-semibold text-slate-900">{stats.guardrails}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Profiles</span>
            <span className="text-base font-semibold text-slate-900">{stats.profiles}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
