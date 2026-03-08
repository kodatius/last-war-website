'use client';

import { cn } from '@/lib/utils';
import type { SeasonWeek } from '@/types';

interface WeekTimelineProps {
  weeks: SeasonWeek[];
  selectedWeek: number;
  onSelectWeek: (week: number) => void;
}

export default function WeekTimeline({ weeks, selectedWeek, onSelectWeek }: WeekTimelineProps) {
  return (
    <section className="rounded-xl border border-border bg-bg-secondary/80 p-4 sm:p-5">
      <h3 className="mb-3 text-lg font-semibold">Week Timeline</h3>

      <div className="flex gap-2 overflow-x-auto pb-2 md:hidden">
        {weeks.map((week) => (
          <button
            key={week.week}
            type="button"
            onClick={() => onSelectWeek(week.week)}
            className={cn(
              'min-w-36 rounded-lg border px-3 py-2 text-left text-sm',
              selectedWeek === week.week ? 'border-accent bg-accent/15 text-accent' : 'border-border bg-bg-primary/35 text-text-secondary'
            )}
          >
            <p className="font-semibold">Week {week.week}</p>
            <p className="text-xs">{week.phase}</p>
          </button>
        ))}
      </div>

      <div className="hidden space-y-2 md:block">
        {weeks.map((week) => (
          <button
            key={week.week}
            type="button"
            onClick={() => onSelectWeek(week.week)}
            className={cn(
              'flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left',
              selectedWeek === week.week ? 'border-accent bg-accent/15 text-text-primary' : 'border-border bg-bg-primary/30 text-text-secondary hover:border-accent/50'
            )}
          >
            <span className="inline-grid h-7 w-7 place-content-center rounded-full border border-border text-xs">{week.week}</span>
            <span>
              <span className="block text-sm font-semibold">{week.title}</span>
              <span className="block text-xs">{week.phase}</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
