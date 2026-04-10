'use client';

import { getTodayVsDay, getTomorrowVsDay, CATEGORY_STYLES } from '@/lib/vs-cycle';
import { getRecommendation } from '@/data/vs-recommendations';
import { cn } from '@/lib/utils';
import { ArrowRight, Clock } from 'lucide-react';

export default function TomorrowPrep() {
  const todayVs = getTodayVsDay();
  const tomorrowVs = getTomorrowVsDay();
  const todayRec = getRecommendation(todayVs.label);
  const tomorrowStyle = CATEGORY_STYLES[tomorrowVs.category];

  return (
    <section className="container-shell pb-6 sm:pb-10">
      <div className="rounded-xl border border-border bg-bg-secondary/60 p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-text-secondary">
            <Clock size={16} className="text-accent" />
            Prep for Tomorrow
          </div>
          <span className={cn('inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium', tomorrowStyle.bg, tomorrowStyle.text, tomorrowStyle.border)}>
            <ArrowRight size={12} />
            {tomorrowVs.label}
          </span>
        </div>
        <ul className="mt-4 space-y-2">
          {todayRec.prepForNext.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-text-primary">
              <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
