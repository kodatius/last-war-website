'use client';

import ProgressBar from '@/components/ui/ProgressBar';
import { useMemo, useState } from 'react';

export default function ResourceOptimizer() {
  const [current, setCurrent] = useState(12000000);
  const [target, setTarget] = useState(30000000);
  const [dailyGain, setDailyGain] = useState(3500000);

  const { daysUntil, progressPercent } = useMemo(() => {
    const remaining = Math.max(0, target - current);
    const days = dailyGain > 0 ? Math.ceil(remaining / dailyGain) : Infinity;
    const progress = target > 0 ? Math.min(100, (current / target) * 100) : 0;

    return {
      daysUntil: Number.isFinite(days) ? days : 0,
      progressPercent: progress,
    };
  }, [current, dailyGain, target]);

  return (
    <section className="space-y-4 rounded-xl border border-border bg-bg-secondary/80 p-5">
      <h3 className="text-lg font-semibold">Resource Optimizer</h3>

      <div className="grid gap-3 sm:grid-cols-3">
        <label className="space-y-1 text-sm text-text-secondary">
          Current Resources
          <input
            type="number"
            min={0}
            value={current}
            onChange={(event) => setCurrent(Number(event.target.value) || 0)}
            className="w-full rounded-lg border border-border bg-bg-primary px-3 py-2 text-text-primary outline-none"
          />
        </label>

        <label className="space-y-1 text-sm text-text-secondary">
          Target Resources
          <input
            type="number"
            min={0}
            value={target}
            onChange={(event) => setTarget(Number(event.target.value) || 0)}
            className="w-full rounded-lg border border-border bg-bg-primary px-3 py-2 text-text-primary outline-none"
          />
        </label>

        <label className="space-y-1 text-sm text-text-secondary">
          Daily Net Gain
          <input
            type="number"
            min={1}
            value={dailyGain}
            onChange={(event) => setDailyGain(Number(event.target.value) || 1)}
            className="w-full rounded-lg border border-border bg-bg-primary px-3 py-2 text-text-primary outline-none"
          />
        </label>
      </div>

      <div className="rounded-lg border border-border bg-bg-primary/35 p-4">
        <p className="text-sm text-text-secondary">Days until target</p>
        <p className="text-2xl font-semibold text-accent">{daysUntil} days</p>
        <ProgressBar className="mt-3" value={progressPercent} max={100} label={`Progress ${progressPercent.toFixed(1)}%`} />
      </div>
    </section>
  );
}
