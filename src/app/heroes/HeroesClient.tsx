'use client';

import HeroCard from '@/components/heroes/HeroCard';
import HeroDetailDrawer from '@/components/heroes/HeroDetailDrawer';
import HeroFilters from '@/components/heroes/HeroFilters';
import HeroTableView from '@/components/heroes/HeroTableView';
import { heroes } from '@/data/heroes-data';
import { Hero, HeroType, Rarity, Tier } from '@/types';
import { motion } from 'framer-motion';
import { Database, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';

const tierOrder: Record<Tier, number> = { SS: 0, S: 1, A: 2, B: 3, C: 4 };

function sortHeroes(items: Hero[], sortBy: 'tier' | 'name' | 'type', sortDir: 'asc' | 'desc') {
  const sorted = [...items].sort((a, b) => {
    if (sortBy === 'tier') {
      return tierOrder[a.tier] - tierOrder[b.tier] || a.name.localeCompare(b.name);
    }
    if (sortBy === 'type') {
      return a.type.localeCompare(b.type) || a.name.localeCompare(b.name);
    }
    return a.name.localeCompare(b.name);
  });

  return sortDir === 'asc' ? sorted : sorted.reverse();
}

export default function HeroesClient() {
  const [search, setSearch] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<HeroType[]>([]);
  const [selectedRarities, setSelectedRarities] = useState<Rarity[]>([]);
  const [selectedTiers, setSelectedTiers] = useState<Tier[]>([]);
  const [metaOnly, setMetaOnly] = useState(false);
  const [view, setView] = useState<'grid' | 'table'>('grid');
  const [sortBy, setSortBy] = useState<'tier' | 'name' | 'type'>('tier');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filteredItems = heroes.filter((hero) => {
      const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(hero.type);
      const rarityMatch = selectedRarities.length === 0 || selectedRarities.includes(hero.rarity);
      const tierMatch = selectedTiers.length === 0 || selectedTiers.includes(hero.tier);
      const metaMatch = !metaOnly || hero.isMeta;
      const searchMatch =
        query.length === 0 ||
        hero.name.toLowerCase().includes(query) ||
        hero.tags.some((tag) => tag.includes(query)) ||
        hero.strongAgainst.some((id) => id.includes(query)) ||
        hero.weakAgainst.some((id) => id.includes(query));

      return typeMatch && rarityMatch && tierMatch && metaMatch && searchMatch;
    });

    return sortHeroes(filteredItems, sortBy, sortDir);
  }, [search, selectedTypes, selectedRarities, selectedTiers, metaOnly, sortBy, sortDir]);

  const handleSort = (column: 'tier' | 'name' | 'type') => {
    if (column === sortBy) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      return;
    }

    setSortBy(column);
    setSortDir('asc');
  };

  return (
    <div className="py-10 sm:py-14">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent">
            <Database size={14} />
            Hero Hub
          </p>
          <h1 className="mt-2 font-hero text-4xl font-bold sm:text-5xl">Hero Database</h1>
          <p className="mt-2 text-sm text-text-secondary sm:text-base">
            {filtered.length} of {heroes.length} heroes shown
          </p>
        </div>
        <p className="inline-flex items-center gap-2 text-xs text-neon-blue">
          <Sparkles size={14} />
          Grid default with instant search and filters
        </p>
      </div>

      <HeroFilters
        search={search}
        onSearchChange={setSearch}
        selectedTypes={selectedTypes}
        onTypesChange={setSelectedTypes}
        selectedRarities={selectedRarities}
        onRaritiesChange={setSelectedRarities}
        selectedTiers={selectedTiers}
        onTiersChange={setSelectedTiers}
        metaOnly={metaOnly}
        onMetaOnlyChange={setMetaOnly}
        view={view}
        onViewChange={setView}
        sortBy={sortBy}
        onSortByChange={setSortBy}
      />

      <div className="mt-6">
        {view === 'grid' ? (
          <motion.div
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
          >
            {filtered.map((hero) => (
              <motion.div key={hero.id} variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}>
                <HeroCard hero={hero} onOpen={setSelectedHero} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <HeroTableView heroes={filtered} onSelect={setSelectedHero} sortBy={sortBy} sortDir={sortDir} onSort={handleSort} />
        )}
      </div>

      <HeroDetailDrawer hero={selectedHero} onClose={() => setSelectedHero(null)} />
    </div>
  );
}
