'use client';

import TermCard from '@/components/glossary/TermCard';
import FilterBar from '@/components/ui/FilterBar';
import GlassCard from '@/components/ui/GlassCard';
import SearchInput from '@/components/ui/SearchInput';
import SectionHeading from '@/components/ui/SectionHeading';
import { useToast } from '@/components/ui/Toast';
import { terms } from '@/data/terms-data';
import { TermCategory } from '@/types';
import { motion } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';

const categories: TermCategory[] = ['abbreviation', 'slang', 'mechanic'];

export default function GlossaryClient() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const { showToast } = useToast();
  const letterRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const termRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const termLabels = useMemo(() => terms.map((term) => term.term.toLowerCase()), []);
  const letters = useMemo(
    () => [...new Set(terms.map((term) => term.term.charAt(0).toUpperCase()))].sort((a, b) => a.localeCompare(b)),
    []
  );

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

  const relatedTermsByTerm = useMemo(
    () =>
      terms.reduce<Record<string, string[]>>((acc, current) => {
        const tokens = current.definition.toLowerCase().split(/[^a-z0-9%]+/);
        acc[current.term] = termLabels.filter(
          (label) => label !== current.term.toLowerCase() && tokens.includes(label.toLowerCase())
        );
        return acc;
      }, {}),
    [termLabels]
  );

  const scrollToLetter = (letter: string) => {
    letterRefs.current[letter]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const copyDefinition = async (term: (typeof terms)[number]) => {
    const text = `${term.term}: ${term.definition}`;
    try {
      await navigator.clipboard.writeText(text);
      showToast({ message: `${term.term} copied`, variant: 'success' });
    } catch {
      showToast({ message: 'Copy failed on this device', variant: 'error' });
    }
  };

  const jumpToTerm = (termLabel: string) => {
    const found = terms.find((entry) => entry.term.toLowerCase() === termLabel.toLowerCase());
    if (!found) return;
    setQuery(found.term);
    setSelected([]);
    termRefs.current[found.term]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="container-shell py-16 sm:py-24">
      <SectionHeading title="Glossary" subtitle="Alliance terms, slang, and mechanics." />
      <SearchInput value={query} onChange={setQuery} placeholder="Search terms, aliases, definitions..." />
      <div className="mt-4">
        <FilterBar options={categories} selected={selected} onChange={setSelected} />
      </div>

      <GlassCard className="mt-4">
        <p className="mb-2 text-xs uppercase tracking-[0.14em] text-accent">Jump to Letter</p>
        <div className="flex flex-wrap gap-1.5">
          {letters.map((letter) => (
            <button
              key={letter}
              type="button"
              onClick={() => scrollToLetter(letter)}
              className="rounded-md border border-border bg-bg-secondary px-2 py-1 text-xs transition hover:border-accent/60 hover:text-accent"
            >
              {letter}
            </button>
          ))}
        </div>
      </GlassCard>

      <motion.div
        className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
      >
        {filteredTerms.map((term) => (
          <motion.div
            key={term.term}
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
            ref={(node) => {
              const letter = term.term.charAt(0).toUpperCase();
              if (!letterRefs.current[letter]) {
                letterRefs.current[letter] = node;
              }
              termRefs.current[term.term] = node;
            }}
          >
            <TermCard
              term={term}
              query={query}
              relatedTerms={relatedTermsByTerm[term.term] ?? []}
              onCopy={copyDefinition}
              onRelatedTermClick={jumpToTerm}
            />
          </motion.div>
        ))}
      </motion.div>

      {filteredTerms.length === 0 ? (
        <div className="mt-8 rounded-lg border border-border bg-bg-secondary p-6 text-center text-sm text-text-secondary">
          No glossary terms match your filters.
        </div>
      ) : null}
    </div>
  );
}
