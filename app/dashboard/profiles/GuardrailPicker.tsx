'use client';

import { useMemo, useState } from 'react';
import { Checkbox } from '@/shared/ui/checkbox';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

interface GuardrailPickerProps {
  guardrails: string[];
  selected: Record<string, boolean>;
  onToggle: (name: string) => void;
}

export function GuardrailPicker({ guardrails, selected, onToggle }: GuardrailPickerProps) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query) return guardrails;
    return guardrails.filter((g) => g.toLowerCase().includes(query.toLowerCase()));
  }, [guardrails, query]);

  return (
    <div className="space-y-3">
      <div>
        <Label>Search guardrails</Label>
        <Input
          placeholder="Search by name (e.g. input, pii, nsfw)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="max-h-64 space-y-2 overflow-y-auto rounded-md border p-3">
        {filtered.length === 0 && (
          <p className="text-sm text-slate-500">No guardrails match your search</p>
        )}

        {filtered.map((g) => (
          <div key={g} className="flex items-center gap-2">
            <Checkbox checked={!!selected[g]} onCheckedChange={() => onToggle(g)} />
            <span className="font-mono text-sm">{g}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
