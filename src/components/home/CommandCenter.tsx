'use client';

import { getTodayVsDay, CATEGORY_STYLES } from '@/lib/vs-cycle';
import { getRecommendation } from '@/data/vs-recommendations';
import { cn } from '@/lib/utils';
import { AlertTriangle, CheckCircle, Crosshair } from 'lucide-react';

export default function CommandCenter() {
  const today = getTodayVsDay();
  const rec = getRecommendation(today.label);
  const style = CATEGORY_STYLES[today.category];

  return (
    <section className="container-shell py-6 sm:py-10">
      <div className="mb-4 flex items-center gap-3">
        <span className={cn('inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-semibold uppercase tracking-wider', style.bg, style.text, style.border)}>
          VS Day {today.day}
        </span>
        <span className="text-xs text-text-secondary">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </span>
      </div>

      <h2 className="font-hero text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
        <Crosshair className="mr-2 inline-block text-accent" size={28} />
        {today.label}
      </h2>
      <p className="mt-1 text-sm text-text-secondary">Today&apos;s focus for Server #2058</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 sm:p-5">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-emerald-400">
            <CheckCircle size={16} />
            What to do today
          </div>
          <ul className="space-y-2">
            {rec.actions.map((action, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-text-primary">
                <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                {action}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 sm:p-5">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-red-400">
            <AlertTriangle size={16} />
            What NOT to do
          </div>
          <ul className="space-y-2">
            {rec.avoid.map((warning, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-text-primary">
                <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                {warning}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
