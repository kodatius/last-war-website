import { events } from '@/data/events-data';
import { heroes } from '@/data/heroes-data';
import { quizCategoryNames } from '@/data/quiz-data';
import { seasonWeeks } from '@/data/season-data';
import { terms } from '@/data/terms-data';
import { tips } from '@/data/tips-data';
import { ROUTES } from '@/lib/constants';
import type { SearchItem } from '@/types';

const heroItems: SearchItem[] = heroes.map((hero) => ({
  id: `hero-${hero.id}`,
  title: hero.name,
  description: `${hero.rarity} ${hero.type} ${hero.role}`,
  category: 'hero',
  href: `${ROUTES.heroes}#${hero.id}`,
  tags: [hero.type, hero.rarity, hero.tier, hero.role, ...hero.tags],
}));

const eventItems: SearchItem[] = events.map((event) => ({
  id: `event-${event.id}`,
  title: event.name,
  description: event.description,
  category: 'event',
  href: `${ROUTES.events}#${event.id}`,
  tags: [event.frequency, ...(event.daysActive ?? [])],
}));

const tipItems: SearchItem[] = tips.map((tip) => ({
  id: `tip-${tip.id}`,
  title: `${tip.emoji} ${tip.category}`,
  description: tip.text,
  category: 'tip',
  href: `${ROUTES.tips}#tip-${tip.id}`,
  tags: [tip.category],
}));

const termItems: SearchItem[] = terms.map((term) => ({
  id: `term-${term.term.toLowerCase()}`,
  title: term.term,
  description: term.definition,
  category: 'term',
  href: `${ROUTES.glossary}#term-${term.term.toLowerCase()}`,
  tags: [...term.aliases, term.category],
}));

const seasonItems: SearchItem[] = seasonWeeks.map((week) => ({
  id: `season-week-${week.week}`,
  title: `Week ${week.week}: ${week.title}`,
  description: week.primaryFocus,
  category: 'season',
  href: `${ROUTES.season}?week=${week.week}`,
  tags: [week.phase, ...(week.featuredMechanic ? [week.featuredMechanic] : [])],
}));

const toolItems: SearchItem[] = [
  {
    id: 'tool-calculators',
    title: 'Calculators',
    description: 'Arms Race and resource planning calculators.',
    category: 'tool',
    href: ROUTES.calculators,
    tags: ['arms race', 'resources', 'optimizer'],
  },
  {
    id: 'tool-compare',
    title: 'Hero Compare',
    description: 'Compare 2-4 heroes side by side.',
    category: 'tool',
    href: ROUTES.compare,
    tags: ['stats', 'comparison'],
  },
  {
    id: 'tool-builder',
    title: 'Formation Builder',
    description: 'Build, analyze, and save squad formations.',
    category: 'tool',
    href: ROUTES.builder,
    tags: ['formation', 'synergy'],
  },
  {
    id: 'quiz-quick',
    title: 'Quick Play Quiz',
    description: 'Rapid 10-question quiz mode.',
    category: 'quiz',
    href: ROUTES.quiz,
    tags: ['quiz', 'quick'],
  },
  {
    id: 'quiz-daily',
    title: 'Daily Challenge Quiz',
    description: 'Daily shared challenge with leaderboard.',
    category: 'quiz',
    href: ROUTES.quiz,
    tags: ['quiz', 'daily'],
  },
  {
    id: 'tool-hub',
    title: 'Tools Hub',
    description: 'Entry point for all alliance tools.',
    category: 'tool',
    href: ROUTES.tools,
    tags: ['tools'],
  },
];

const quizCategoryItems: SearchItem[] = Object.entries(quizCategoryNames).map(([key, label]) => ({
  id: `quiz-category-${key}`,
  title: `${label} Quiz`,
  description: `Practice questions for ${label.toLowerCase()}.`,
  category: 'quiz',
  href: `${ROUTES.quiz}?category=${key}`,
  tags: [key, 'quiz'],
}));

export const searchIndex: SearchItem[] = [
  ...heroItems,
  ...eventItems,
  ...tipItems,
  ...termItems,
  ...seasonItems,
  ...toolItems,
  ...quizCategoryItems,
];
