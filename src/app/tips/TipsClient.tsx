'use client';

import TipCard from '@/components/tips/TipCard';
import FilterBar from '@/components/ui/FilterBar';
import SearchInput from '@/components/ui/SearchInput';
import SectionHeading from '@/components/ui/SectionHeading';
import { tipCategories, tips } from '@/data/tips-data';
import { normalize } from '@/lib/utils';
import { useMemo, useState } from 'react';

const categoryOptions = tipCategories.map((category) => `${category.emoji} ${category.label}`);

export default function TipsClient() {
  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const filteredTips = useMemo(
    () =>
      tips.filter((tip) => {
        const bySearch = normalize(tip.text).includes(normalize(query));
        const tipCategoryLabel = `${tip.emoji} ${tip.category}`;
        const byCategory = selectedCategories.length === 0 || selectedCategories.includes(tipCategoryLabel);
        return bySearch && byCategory;
      }),
    [query, selectedCategories]
  );

  return (
    <div className="container-shell py-16 sm:py-24">
      <SectionHeading title={`${tips.length} Pro Tips`} subtitle="Search and filter by category." />
      <SearchInput value={query} onChange={setQuery} placeholder="Search tips..." />
      <div className="mt-4">
        <FilterBar options={categoryOptions} selected={selectedCategories} onChange={setSelectedCategories} />
      </div>
      <p className="mt-4 text-sm text-text-secondary">Showing {filteredTips.length} tips</p>
      {filteredTips.length === 0 ? (
        <div className="mt-8 rounded-lg border border-border bg-bg-secondary p-6 text-center">
          <p className="text-text-secondary">No tips match your search.</p>
          <button
            className="mt-3 rounded-lg bg-accent px-4 py-2 font-semibold text-black"
            onClick={() => {
              setQuery('');
              setSelectedCategories([]);
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
          {filteredTips.map((tip) => (
            <TipCard key={tip.id} tip={tip} />
          ))}
        </div>
      )}
    </div>
  );
}
