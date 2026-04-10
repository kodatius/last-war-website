'use client';

import GlassCard from '@/components/ui/GlassCard';
import { HeroType, Rarity, Tier } from '@/types';
import { motion } from 'framer-motion';
import { LayoutGrid, Plane, Rocket, Search, Shield, Table2 } from 'lucide-react';

interface HeroFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedTypes: HeroType[];
  onTypesChange: (values: HeroType[]) => void;
  selectedRarities: Rarity[];
  onRaritiesChange: (values: Rarity[]) => void;
  selectedTiers: Tier[];
  onTiersChange: (values: Tier[]) => void;
  metaOnly: boolean;
  onMetaOnlyChange: (value: boolean) => void;
  view: 'grid' | 'table';
  onViewChange: (value: 'grid' | 'table') => void;
  sortBy: 'tier' | 'name' | 'type';
  onSortByChange: (value: 'tier' | 'name' | 'type') => void;
}

const typeItems: Array<{ label: HeroType; icon: typeof Shield }> = [
  { label: 'Tank', icon: Shield },
  { label: 'Aircraft', icon: Plane },
  { label: 'Missile', icon: Rocket },
];

const rarityItems: Rarity[] = ['UR', 'SSR', 'SR'];
const tierItems: Tier[] = ['SS', 'S', 'A', 'B', 'C'];

function toggleArrayItem<T extends string>(arr: T[], value: T): T[] {
  return arr.includes(value) ? arr.filter((item) => item !== value) : [...arr, value];
}

function pillClass(active: boolean) {
  return active
    ? 'border-accent/70 bg-accent/20 text-accent'
    : 'border-border/70 bg-bg-tertiary/45 text-text-secondary hover:border-accent/35 hover:text-text-primary';
}

export default function HeroFilters({
  search,
  onSearchChange,
  selectedTypes,
  onTypesChange,
  selectedRarities,
  onRaritiesChange,
  selectedTiers,
  onTiersChange,
  metaOnly,
  onMetaOnlyChange,
  view,
  onViewChange,
  sortBy,
  onSortByChange,
}: HeroFiltersProps) {
  return (
    <GlassCard className="space-y-4">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search hero name, tag, or matchup..."
          className="h-11 w-full rounded-lg border border-border/70 bg-bg-tertiary/55 pl-10 pr-4 text-sm outline-none transition focus:border-accent/60 focus:ring-2 focus:ring-accent/25"
          aria-label="Search heroes"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {typeItems.map((item) => {
          const Icon = item.icon;
          const active = selectedTypes.includes(item.label);
          return (
            <motion.button
              type="button"
              key={item.label}
              whileTap={{ scale: 0.97 }}
              onClick={() => onTypesChange(toggleArrayItem(selectedTypes, item.label))}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${pillClass(active)}`}
            >
              <Icon size={13} />
              {item.label}
            </motion.button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2">
        {rarityItems.map((item) => {
          const active = selectedRarities.includes(item);
          return (
            <motion.button
              type="button"
              key={item}
              whileTap={{ scale: 0.97 }}
              onClick={() => onRaritiesChange(toggleArrayItem(selectedRarities, item))}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${pillClass(active)}`}
            >
              {item}
            </motion.button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2">
        {tierItems.map((item) => {
          const active = selectedTiers.includes(item);
          return (
            <motion.button
              type="button"
              key={item}
              whileTap={{ scale: 0.97 }}
              onClick={() => onTiersChange(toggleArrayItem(selectedTiers, item))}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${pillClass(active)}`}
            >
              {item}
            </motion.button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => onMetaOnlyChange(!metaOnly)}
          className={`rounded-full border px-3 py-1.5 text-xs font-medium ${pillClass(metaOnly)}`}
        >
          Meta Only: {metaOnly ? 'On' : 'Off'}
        </button>

        <div className="inline-flex rounded-lg border border-border/70 bg-bg-tertiary/45 p-1">
          <button
            type="button"
            onClick={() => onViewChange('grid')}
            className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs ${view === 'grid' ? 'bg-accent text-black' : 'text-text-secondary'}`}
            aria-label="Grid view"
          >
            <LayoutGrid size={13} /> Grid
          </button>
          <button
            type="button"
            onClick={() => onViewChange('table')}
            className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs ${view === 'table' ? 'bg-accent text-black' : 'text-text-secondary'}`}
            aria-label="Table view"
          >
            <Table2 size={13} /> Table
          </button>
        </div>

        <label className="inline-flex items-center gap-2 text-xs text-text-secondary">
          Sort
          <select
            value={sortBy}
            onChange={(event) => onSortByChange(event.target.value as 'tier' | 'name' | 'type')}
            className="h-8 rounded-md border border-border/70 bg-bg-tertiary/60 px-2 text-xs text-text-primary outline-none focus:border-accent/60"
          >
            <option value="tier">Tier</option>
            <option value="name">Name</option>
            <option value="type">Type</option>
          </select>
        </label>
      </div>
    </GlassCard>
  );
}
