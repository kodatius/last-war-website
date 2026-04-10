'use client';

import ComparisonView from '@/components/tools/ComparisonView';
import HeroSelector from '@/components/tools/HeroSelector';
import { heroes } from '@/data/heroes-data';
import { useMemo, useState } from 'react';

export default function CompareClient() {
  const [selectedIds, setSelectedIds] = useState<string[]>(heroes.slice(0, 2).map((hero) => hero.id));

  const selectedHeroes = useMemo(
    () =>
      selectedIds
        .map((id) => heroes.find((hero) => hero.id === id))
        .filter((hero): hero is (typeof heroes)[number] => Boolean(hero)),
    [selectedIds]
  );

  const updateSelection = (index: number, heroId: string) => {
    setSelectedIds((current) => current.map((id, idx) => (idx === index ? heroId : id)));
  };

  const addSelector = () => {
    if (selectedIds.length >= 4) return;
    const fallback = heroes.find((hero) => !selectedIds.includes(hero.id))?.id ?? heroes[0].id;
    setSelectedIds((current) => [...current, fallback]);
  };

  const removeSelector = (index: number) => {
    if (selectedIds.length <= 2) return;
    setSelectedIds((current) => current.filter((_, idx) => idx !== index));
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        {selectedIds.map((heroId, index) => (
          <div key={`${heroId}-${index}`} className="space-y-2 rounded-xl border border-border bg-bg-secondary/80 p-4">
            <HeroSelector heroes={heroes} value={heroId} onChange={(nextId) => updateSelection(index, nextId)} label={`Slot ${index + 1}`} />
            <button
              type="button"
              onClick={() => removeSelector(index)}
              className="text-xs text-text-secondary underline decoration-border hover:text-accent disabled:no-underline"
              disabled={selectedIds.length <= 2}
            >
              Remove Slot
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addSelector}
        disabled={selectedIds.length >= 4}
        className="rounded-lg border border-border px-3 py-2 text-sm text-text-secondary hover:border-accent hover:text-accent disabled:opacity-50"
      >
        Add Hero Slot ({selectedIds.length}/4)
      </button>

      <ComparisonView heroes={selectedHeroes} />
    </div>
  );
}
