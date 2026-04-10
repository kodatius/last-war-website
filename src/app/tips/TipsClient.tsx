'use client';

import TipCard from '@/components/tips/TipCard';
import GlassCard from '@/components/ui/GlassCard';
import SearchInput from '@/components/ui/SearchInput';
import SectionHeading from '@/components/ui/SectionHeading';
import { tipCategories, tips } from '@/data/tips-data';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { normalize } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Bookmark, Shuffle } from 'lucide-react';
import { useMemo, useState } from 'react';

export default function TipsClient() {
  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['all']);
  const [bookmarked, setBookmarked] = useLocalStorage<number[]>('fate_bookmarked_tips', []);
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);
  const [randomPulseId, setRandomPulseId] = useState<number | null>(null);

  const categoryCounts = useMemo(
    () =>
      tipCategories.reduce<Record<string, number>>((acc, category) => {
        acc[category.label] = tips.filter((tip) => tip.category === category.label).length;
        return acc;
      }, {}),
    []
  );

  const filteredTips = useMemo(
    () =>
      tips.filter((tip) => {
        const bySearch = normalize(tip.text).includes(normalize(query));
        const byCategory = selectedCategories.includes('all') || selectedCategories.includes(tip.category);
        const byBookmark = !bookmarkedOnly || bookmarked.includes(tip.id);
        return bySearch && byCategory && byBookmark;
      }),
    [bookmarked, bookmarkedOnly, query, selectedCategories]
  );

  const toggleCategory = (value: string) => {
    if (value === 'all') {
      setSelectedCategories(['all']);
      return;
    }

    const next = selectedCategories.includes(value)
      ? selectedCategories.filter((item) => item !== value && item !== 'all')
      : [...selectedCategories.filter((item) => item !== 'all'), value];

    setSelectedCategories(next.length === 0 ? ['all'] : next);
  };

  const toggleBookmark = (id: number) => {
    setBookmarked((prev) => (prev.includes(id) ? prev.filter((entry) => entry !== id) : [...prev, id]));
  };

  const showRandomTip = () => {
    if (filteredTips.length === 0) return;
    const random = filteredTips[Math.floor(Math.random() * filteredTips.length)];
    setRandomPulseId(random.id);
    window.setTimeout(() => setRandomPulseId(null), 600);
  };

  return (
    <div className="container-shell py-16 sm:py-24">
      <SectionHeading title={`${tips.length} Pro Tips`} subtitle="Search and filter by category." />
      <SearchInput value={query} onChange={setQuery} placeholder="Search tips..." />

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => toggleCategory('all')}
          className={`rounded-full border px-3 py-1.5 text-sm transition ${
            selectedCategories.includes('all')
              ? 'border-accent bg-accent text-black'
              : 'border-border bg-bg-secondary text-text-secondary hover:border-accent/60 hover:text-text-primary'
          }`}
        >
          All ({tips.length})
        </button>
        {tipCategories.map((category) => {
          const selected = selectedCategories.includes(category.label);
          return (
            <button
              key={category.key}
              type="button"
              onClick={() => toggleCategory(category.label)}
              className={`rounded-full border px-3 py-1.5 text-sm transition ${
                selected
                  ? 'border-accent bg-accent text-black'
                  : 'border-border bg-bg-secondary text-text-secondary hover:border-accent/60 hover:text-text-primary'
              }`}
            >
              {category.emoji} {category.label} ({categoryCounts[category.label] ?? 0})
            </button>
          );
        })}
      </div>

      <GlassCard className="mt-4 flex flex-wrap items-center gap-2 sm:justify-between">
        <p className="text-sm text-text-secondary">Showing {filteredTips.length} tips</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setBookmarkedOnly((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm transition ${
              bookmarkedOnly
                ? 'border-accent bg-accent/10 text-accent'
                : 'border-border text-text-secondary hover:border-accent/50 hover:text-text-primary'
            }`}
          >
            <Bookmark size={14} />
            {bookmarkedOnly ? 'Showing Bookmarked' : `Bookmarked (${bookmarked.length})`}
          </button>
          <button
            type="button"
            onClick={showRandomTip}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm text-text-secondary transition hover:border-accent/50 hover:text-text-primary"
          >
            <Shuffle size={14} />
            Random Tip
          </button>
        </div>
      </GlassCard>

      {filteredTips.length === 0 ? (
        <div className="mt-8 rounded-lg border border-border bg-bg-secondary p-6 text-center">
          <p className="text-text-secondary">No tips match your search.</p>
          <button
            className="mt-3 rounded-lg bg-accent px-4 py-2 font-semibold text-black"
            onClick={() => {
              setQuery('');
              setSelectedCategories(['all']);
              setBookmarkedOnly(false);
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <motion.div
          className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
        >
          {filteredTips.map((tip) => (
            <motion.div
              key={tip.id}
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              animate={tip.id === randomPulseId ? { scale: [1, 1.03, 1] } : {}}
              transition={{ duration: 0.35 }}
            >
              <TipCard tip={tip} bookmarked={bookmarked.includes(tip.id)} onToggleBookmark={toggleBookmark} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
