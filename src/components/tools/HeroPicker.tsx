'use client';

import LocalImage from '@/components/ui/LocalImage';
import { heroes } from '@/data/heroes-data';
import { img } from '@/lib/prefix';
import { normalize } from '@/lib/utils';
import type { HeroType } from '@/types';
import { useMemo, useState } from 'react';

interface HeroPickerProps {
  onPick: (heroId: string | null) => void;
}

export default function HeroPicker({ onPick }: HeroPickerProps) {
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | HeroType>('all');

  const filtered = useMemo(
    () =>
      heroes.filter((hero) => {
        const matchesType = typeFilter === 'all' || hero.type === typeFilter;
        const q = normalize(query);
        const matchesQuery = !q || normalize(`${hero.name} ${hero.role} ${hero.type}`).includes(q);
        return matchesType && matchesQuery;
      }),
    [query, typeFilter]
  );

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search heroes"
          className="w-full rounded-lg border border-border bg-bg-primary px-3 py-2 text-sm outline-none"
        />
        <select
          value={typeFilter}
          onChange={(event) => setTypeFilter(event.target.value as 'all' | HeroType)}
          className="rounded-lg border border-border bg-bg-primary px-2 py-2 text-sm"
        >
          <option value="all">All</option>
          <option value="Tank">Tank</option>
          <option value="Aircraft">Aircraft</option>
          <option value="Missile">Missile</option>
        </select>
      </div>

      <div className="max-h-[50vh] space-y-1 overflow-y-auto pr-1">
        <button
          type="button"
          onClick={() => onPick(null)}
          className="w-full rounded-lg border border-border bg-bg-primary/35 px-3 py-2 text-left text-sm text-text-secondary hover:border-accent hover:text-accent"
        >
          Clear slot
        </button>
        {filtered.map((hero) => (
          <button
            key={hero.id}
            type="button"
            onClick={() => onPick(hero.id)}
            className="flex w-full items-center gap-2 rounded-lg border border-border bg-bg-primary/35 px-3 py-2 text-left hover:border-accent/50"
          >
            <LocalImage
              src={img(`/images/heroes/${hero.id}.png`)}
              alt={`${hero.name} portrait`}
              width={32}
              height={32}
              containerClassName="h-8 w-8 overflow-hidden rounded-md border border-border bg-bg-secondary"
              className="h-full w-full object-cover"
              fallbackText={hero.name.slice(0, 2).toUpperCase()}
            />
            <span className="text-sm">{hero.name}</span>
            <span className="ml-auto text-xs text-text-secondary">{hero.type}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
