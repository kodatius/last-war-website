'use client';

import Badge from '@/components/ui/Badge';
import { quizCategoryNames } from '@/data/quiz-data';
import type { QuizCategory, QuizMode } from '@/types';

interface QuizModeSelectProps {
  hardMode: boolean;
  selectedCategory: QuizCategory;
  onHardModeChange: (value: boolean) => void;
  onCategoryChange: (value: QuizCategory) => void;
  onStart: (mode: QuizMode) => void;
}

const modeCards: Array<{ mode: QuizMode; title: string; description: string; points: string }> = [
  {
    mode: 'quick',
    title: 'Quick Play',
    description: '10 mixed questions, fastest route to practice and warm-up.',
    points: 'Base points',
  },
  {
    mode: 'daily',
    title: 'Daily Challenge',
    description: 'Shared daily seed so everyone gets the same question set.',
    points: 'Leaderboard eligible',
  },
  {
    mode: 'category',
    title: 'Category Challenge',
    description: 'Focus one category to drill weak knowledge areas.',
    points: 'Category bonus',
  },
];

export default function QuizModeSelect({
  hardMode,
  selectedCategory,
  onHardModeChange,
  onCategoryChange,
  onStart,
}: QuizModeSelectProps) {
  return (
    <section className="space-y-5 rounded-xl border border-border bg-bg-secondary/80 p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold">Select Quiz Mode</h2>
          <p className="text-sm text-text-secondary">Choose your mission profile, then launch.</p>
        </div>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm">
          <input type="checkbox" checked={hardMode} onChange={(event) => onHardModeChange(event.target.checked)} />
          <span>Hard Mode (+50% points)</span>
        </label>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {modeCards.map((card) => (
          <button
            key={card.mode}
            type="button"
            onClick={() => onStart(card.mode)}
            className="group rounded-xl border border-border bg-bg-primary/40 p-4 text-left transition-colors hover:border-accent/50 hover:bg-accent/10"
          >
            <p className="text-lg font-semibold text-text-primary group-hover:text-accent">{card.title}</p>
            <p className="mt-2 text-sm text-text-secondary">{card.description}</p>
            <Badge className="mt-3" tone="accent">
              {card.points}
            </Badge>
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-bg-primary/30 p-4">
        <p className="mb-2 text-sm font-semibold text-accent">Category Challenge Selection</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {Object.entries(quizCategoryNames).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => onCategoryChange(key as QuizCategory)}
              className={`rounded-lg border px-2 py-1.5 text-xs transition-colors ${
                selectedCategory === key
                  ? 'border-accent bg-accent/20 text-accent'
                  : 'border-border bg-bg-secondary text-text-secondary hover:border-accent/40 hover:text-text-primary'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
