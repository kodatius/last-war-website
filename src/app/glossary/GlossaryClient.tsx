'use client';

import TermCard from '@/components/glossary/TermCard';
import FilterBar from '@/components/ui/FilterBar';
import SearchInput from '@/components/ui/SearchInput';
import SectionHeading from '@/components/ui/SectionHeading';
import { terms } from '@/data/terms-data';
import { TermCategory } from '@/types';
import { useMemo, useState } from 'react';

const categories: TermCategory[] = ['abbreviation', 'slang', 'mechanic'];

export default function GlossaryClient() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  const filteredTerms = useMemo(() => {
    const normalized = query.toLowerCase();
    return [...terms]
      .sort((a, b) => a.term.localeCompare(b.term))
      .filter((term) => {
        const searchMatch =
          term.term.toLowerCase().includes(normalized) ||
          term.aliases.some((alias) => alias.toLowerCase().includes(normalized)) ||
          term.definition.toLowerCase().includes(normalized);
        const categoryMatch = selected.length === 0 || selected.includes(term.category);
        return searchMatch && categoryMatch;
      });
  }, [query, selected]);

  return (
    <div className="container-shell py-16 sm:py-24">
      <SectionHeading title="Glossary" subtitle="Alliance terms, slang, and mechanics." />
      <SearchInput value={query} onChange={setQuery} placeholder="Search terms, aliases, definitions..." />
      <div className="mt-4">
        <FilterBar options={categories} selected={selected} onChange={setSelected} />
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
        {filteredTerms.map((term) => (
          <TermCard key={term.term} term={term} />
        ))}
      </div>
    </div>
  );
}
