'use client';

import LocalImage from '@/components/ui/LocalImage';
import { img } from '@/lib/prefix';
import { Hero } from '@/types';
import { ArrowDownUp } from 'lucide-react';

interface HeroTableViewProps {
  heroes: Hero[];
  onSelect: (hero: Hero) => void;
  sortBy: 'tier' | 'name' | 'type';
  sortDir: 'asc' | 'desc';
  onSort: (sortBy: 'tier' | 'name' | 'type') => void;
}

const tierRank: Record<Hero['tier'], number> = { SS: 0, S: 1, A: 2, B: 3, C: 4 };

function sortHeroes(heroes: Hero[], sortBy: 'tier' | 'name' | 'type', sortDir: 'asc' | 'desc') {
  const sorted = [...heroes].sort((a, b) => {
    if (sortBy === 'tier') {
      return tierRank[a.tier] - tierRank[b.tier] || a.name.localeCompare(b.name);
    }
    if (sortBy === 'type') {
      return a.type.localeCompare(b.type) || a.name.localeCompare(b.name);
    }
    return a.name.localeCompare(b.name);
  });

  return sortDir === 'asc' ? sorted : sorted.reverse();
}

export default function HeroTableView({ heroes, onSelect, sortBy, sortDir, onSort }: HeroTableViewProps) {
  const sortedHeroes = sortHeroes(heroes, sortBy, sortDir);

  return (
    <div className="glass-card overflow-hidden rounded-xl border">
      <div className="max-h-[70vh] overflow-auto">
        <table className="w-full text-left text-sm">
          <thead className="sticky top-0 z-10 bg-bg-secondary/95 backdrop-blur">
            <tr className="border-b border-border/70 text-xs uppercase tracking-wider text-text-secondary">
              <th className="px-3 py-3">Hero</th>
              <th className="px-3 py-3">
                <button type="button" className="inline-flex items-center gap-1" onClick={() => onSort('name')}>
                  Name
                  <ArrowDownUp size={12} />
                </button>
              </th>
              <th className="px-3 py-3">
                <button type="button" className="inline-flex items-center gap-1" onClick={() => onSort('type')}>
                  Type
                  <ArrowDownUp size={12} />
                </button>
              </th>
              <th className="px-3 py-3">Rarity</th>
              <th className="px-3 py-3">
                <button type="button" className="inline-flex items-center gap-1" onClick={() => onSort('tier')}>
                  Tier
                  <ArrowDownUp size={12} />
                </button>
              </th>
              <th className="px-3 py-3">Meta</th>
            </tr>
          </thead>
          <tbody>
            {sortedHeroes.map((hero) => (
              <tr
                key={hero.id}
                className="cursor-pointer border-b border-border/45 transition hover:bg-bg-tertiary/35"
                onClick={() => onSelect(hero)}
              >
                <td className="px-3 py-2">
                  <LocalImage
                    src={img(`/images/heroes/${hero.id}.png`)}
                    alt={hero.name}
                    width={40}
                    height={40}
                    containerClassName="h-10 w-10 overflow-hidden rounded-md border border-border/70 bg-bg-tertiary"
                    className="h-full w-full object-cover"
                    fallbackText={hero.name.slice(0, 2)}
                  />
                </td>
                <td className="px-3 py-2 font-medium">{hero.name}</td>
                <td className="px-3 py-2">{hero.type}</td>
                <td className="px-3 py-2">{hero.rarity}</td>
                <td className="px-3 py-2">
                  <span className="rounded-full border border-accent/45 bg-accent/15 px-2 py-1 text-xs">{hero.tier}</span>
                </td>
                <td className="px-3 py-2">{hero.isMeta ? <span className="text-neon-green">●</span> : <span className="text-text-secondary">○</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-border/60 px-3 py-2 text-xs text-text-secondary">
        Sorted by {sortBy} ({sortDir})
      </div>
    </div>
  );
}
