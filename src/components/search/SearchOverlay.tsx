'use client';

import { useSearch } from '@/hooks/useSearch';
import { cn } from '@/lib/utils';
import type { SearchItem } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

const categoryLabels: Record<SearchItem['category'], string> = {
  hero: 'Heroes',
  event: 'Events',
  tip: 'Tips',
  term: 'Glossary',
  tool: 'Tools',
  season: 'Season',
  quiz: 'Quiz',
};

export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const { results, grouped } = useSearch(query);

  useEffect(() => {
    if (!open) {
      setQuery('');
      setActiveIndex(0);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const entries = useMemo(() => results, [results]);

  useEffect(() => {
    if (!open) return;

    const onKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (!entries.length) return;

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setActiveIndex((prev) => (prev + 1) % entries.length);
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setActiveIndex((prev) => (prev - 1 + entries.length) % entries.length);
      }

      if (event.key === 'Enter') {
        event.preventDefault();
        const selected = entries[activeIndex];
        if (selected) {
          onClose();
          router.push(selected.href);
        }
      }
    };

    window.addEventListener('keydown', onKeydown);
    return () => window.removeEventListener('keydown', onKeydown);
  }, [activeIndex, entries, onClose, open, router]);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            className="fixed inset-0 z-[90] bg-black/80"
            onClick={onClose}
            aria-label="Close search"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.section
            className="fixed inset-0 z-[100] overflow-y-auto p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="Search"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
          >
            <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-bg-secondary/95 p-4 backdrop-blur-xl sm:p-6">
              <div className="flex items-center gap-3 rounded-xl border border-border bg-bg-primary/70 px-3 py-2">
                <Search size={18} className="text-text-secondary" />
                <input
                  autoFocus
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search heroes, events, tools, terms..."
                  className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-secondary"
                  aria-label="Search input"
                />
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md border border-border p-1 text-text-secondary hover:border-accent hover:text-accent"
                  aria-label="Close"
                >
                  <X size={14} />
                </button>
              </div>

              <p className="mt-2 text-xs text-text-secondary">Use Arrow keys to navigate. Press Enter to open result.</p>

              <div className="mt-4 space-y-4">
                {Object.entries(grouped).length ? (
                  Object.entries(grouped).map(([category, items]) => (
                    <div key={category}>
                      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">
                        {categoryLabels[category as SearchItem['category']]}
                      </h3>
                      <ul className="space-y-1">
                        {items.map((item) => {
                          const idx = entries.findIndex((entry) => entry.id === item.id);
                          const active = idx === activeIndex;

                          return (
                            <li key={item.id}>
                              <Link
                                href={item.href}
                                className={cn(
                                  'block rounded-lg border px-3 py-2 transition-colors',
                                  active
                                    ? 'border-accent/60 bg-accent/15'
                                    : 'border-border bg-bg-primary/30 hover:border-accent/40 hover:bg-accent/10'
                                )}
                                onMouseEnter={() => setActiveIndex(idx)}
                                onClick={onClose}
                              >
                                <p className="text-sm font-medium text-text-primary">{item.title}</p>
                                <p className="text-xs text-text-secondary">{item.description}</p>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))
                ) : (
                  <div className="rounded-lg border border-border bg-bg-primary/35 p-6 text-center text-sm text-text-secondary">
                    {query ? 'No matches found. Try hero names, event names, or glossary terms.' : 'Start typing to search the site.'}
                  </div>
                )}
              </div>
            </div>
          </motion.section>
        </>
      ) : null}
    </AnimatePresence>
  );
}
