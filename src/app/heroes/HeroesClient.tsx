'use client';

import TierSection from '@/components/heroes/TierSection';
import FilterBar from '@/components/ui/FilterBar';
import SectionHeading from '@/components/ui/SectionHeading';
import { heroes } from '@/data/heroes-data';
import { HeroType, Tier } from '@/types';
import { useMemo, useState } from 'react';

const types: HeroType[] = ['Tank', 'Aircraft', 'Missile'];
const tiers: Tier[] = ['SS', 'S', 'A', 'B', 'C'];

export default function HeroesClient() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedTiers, setSelectedTiers] = useState<string[]>([]);

  const filtered = useMemo(
    () =>
      heroes.filter((hero) => {
        const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(hero.type);
        const tierMatch = selectedTiers.length === 0 || selectedTiers.includes(hero.tier);
        return typeMatch && tierMatch;
      }),
    [selectedTypes, selectedTiers]
  );

  return (
    <div className="container-shell py-16 sm:py-24">
      <SectionHeading title="Hero Tier List" subtitle="23 heroes grouped by tier, with builds and usage guidance." />
      <div className="space-y-4">
        <FilterBar options={types} selected={selectedTypes} onChange={setSelectedTypes} />
        <FilterBar options={tiers} selected={selectedTiers} onChange={setSelectedTiers} />
      </div>
      <div className="mt-8 space-y-10">
        {tiers.map((tier) => (
          <TierSection key={tier} tier={tier} heroes={filtered.filter((hero) => hero.tier === tier)} />
        ))}
      </div>
    </div>
  );
}
