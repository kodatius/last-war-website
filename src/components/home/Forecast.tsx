'use client';

import { getForecast, getDateLabel, CATEGORY_STYLES } from '@/lib/vs-cycle';
import { cn } from '@/lib/utils';
import { Calendar } from 'lucide-react';

export default function Forecast() {
  const days = getForecast(7);

  return (
    <section className="container-shell pb-8 sm:pb-14">
      <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-text-secondary">
        <Calendar size={16} className="text-accent" />
        7-Day Forecast
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 sm:grid sm:grid-cols-7 sm:gap-3 sm:overflow-visible sm:pb-0">
        {days.map((day, i) => {
          const style = CATEGORY_STYLES[day.category];
          const isToday = i === 0;
          return (
            <div key={i} className={cn('flex min-w-[100px] shrink-0 flex-col rounded-lg border p-3 text-center transition-colors sm:min-w-0', isToday ? 'border-accent/40 bg-accent/10' : 'border-border bg-bg-secondary/40')}>
              <span className={cn('text-[10px] font-semibold uppercase tracking-wider', isToday ? 'text-accent' : 'text-text-secondary')}>{getDateLabel(i)}</span>
              <span className="mt-1.5 text-xs font-medium text-text-primary leading-tight">{day.label}</span>
              <span className={cn('mt-2 inline-block self-center rounded-full px-2 py-0.5 text-[10px] font-medium capitalize', style.bg, style.text)}>{day.category}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
