'use client';

import { searchIndex } from '@/data/search-index';
import { normalize } from '@/lib/utils';
import type { SearchItem } from '@/types';
import { useEffect, useMemo, useState } from 'react';

function scoreItem(item: SearchItem, query: string): number {
  const q = normalize(query);
  if (!q) return 0;

  const haystack = normalize(`${item.title} ${item.description} ${(item.tags ?? []).join(' ')}`);
  if (haystack.startsWith(q)) return 120;
  if (normalize(item.title).includes(q)) return 90;
  if ((item.tags ?? []).some((tag) => normalize(tag).includes(q))) return 70;

  let score = 0;
  let cursor = 0;
  for (const char of q) {
    const idx = haystack.indexOf(char, cursor);
    if (idx < 0) return 0;
    score += idx === cursor ? 5 : 2;
    cursor = idx + 1;
  }

  return score;
}

export function useSearch(query: string, delay = 120) {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQuery(query), delay);
    return () => window.clearTimeout(timer);
  }, [delay, query]);

  const results = useMemo(() => {
    const clean = debouncedQuery.trim();
    if (!clean) return [];

    return searchIndex
      .map((item) => ({ item, score: scoreItem(item, clean) }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 30)
      .map((entry) => entry.item);
  }, [debouncedQuery]);

  const grouped = useMemo(() => {
    return results.reduce<Record<string, SearchItem[]>>((acc, result) => {
      const key = result.category;
      acc[key] = [...(acc[key] ?? []), result];
      return acc;
    }, {});
  }, [results]);

  return { query: debouncedQuery, results, grouped };
}
