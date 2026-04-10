'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { RotateCcw } from 'lucide-react';

interface SpeedupTier {
  minutes: number;
  label: string;
}

const SPEEDUP_TIERS: SpeedupTier[] = [
  { minutes: 1, label: '1 min' },
  { minutes: 5, label: '5 min' },
  { minutes: 15, label: '15 min' },
  { minutes: 30, label: '30 min' },
  { minutes: 60, label: '1 hour' },
  { minutes: 240, label: '4 hour' },
  { minutes: 480, label: '8 hour' },
  { minutes: 1440, label: '1 day' },
  { minutes: 2880, label: '2 day' },
  { minutes: 5760, label: '5 day' },
  { minutes: 10080, label: '7 day' },
  { minutes: 21600, label: '15 day' },
  { minutes: 43200, label: '30 day' },
];

type Category = 'general' | 'research' | 'building' | 'training' | 'healing';

interface CategoryState {
  [key: string]: number;
}

interface State {
  general: CategoryState;
  research: CategoryState;
  building: CategoryState;
  training: CategoryState;
  healing: CategoryState;
}

function formatTime(totalMinutes: number): string {
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;

  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);

  return parts.length > 0 ? parts.join(' ') : '0m';
}

function calculateCategoryTotal(state: CategoryState): number {
  return Object.entries(state).reduce((sum, [tierLabel, qty]) => {
    const tier = SPEEDUP_TIERS.find(t => t.label === tierLabel);
    return sum + (tier ? tier.minutes * qty : 0);
  }, 0);
}

export default function SpeedupClient() {
  const [state, setState] = useState<State>({
    general: {},
    research: {},
    building: {},
    training: {},
    healing: {},
  });

  const categories: { key: Category; label: string; color: string }[] = [
    { key: 'general', label: 'General', color: 'blue' },
    { key: 'research', label: 'Research', color: 'purple' },
    { key: 'building', label: 'Building', color: 'emerald' },
    { key: 'training', label: 'Training', color: 'orange' },
    { key: 'healing', label: 'Healing', color: 'red' },
  ];

  const handleInputChange = (cat: Category, tier: string, value: string) => {
    const num = Math.max(0, parseInt(value) || 0);
    setState(prev => ({
      ...prev,
      [cat]: {
        ...prev[cat],
        [tier]: num > 0 ? num : undefined,
      },
    }));
  };

  const handleReset = () => {
    setState({
      general: {},
      research: {},
      building: {},
      training: {},
      healing: {},
    });
  };

  const categoryTotals = Object.fromEntries(
    categories.map(c => [c.key, calculateCategoryTotal(state[c.key])])
  ) as Record<Category, number>;

  const grandTotal = Object.values(categoryTotals).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between rounded-lg border border-border bg-bg-secondary/60 p-4 sm:p-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-text-secondary">Total Time</p>
          <p className="mt-1 font-mono text-3xl font-bold text-accent">{formatTime(grandTotal)}</p>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 rounded-lg border border-border bg-bg-tertiary px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-border hover:text-text-primary"
        >
          <RotateCcw size={16} />
          Reset
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map(cat => {
          const catTotal = categoryTotals[cat.key];
          const bgColor = cat.color === 'blue' ? 'bg-blue-500/5' : cat.color === 'purple' ? 'bg-purple-500/5' : cat.color === 'emerald' ? 'bg-emerald-500/5' : cat.color === 'orange' ? 'bg-orange-500/5' : 'bg-red-500/5';
          const borderColor = cat.color === 'blue' ? 'border-blue-500/20' : cat.color === 'purple' ? 'border-purple-500/20' : cat.color === 'emerald' ? 'border-emerald-500/20' : cat.color === 'orange' ? 'border-orange-500/20' : 'border-red-500/20';
          const textColor = cat.color === 'blue' ? 'text-blue-300' : cat.color === 'purple' ? 'text-purple-300' : cat.color === 'emerald' ? 'text-emerald-300' : cat.color === 'orange' ? 'text-orange-300' : 'text-red-300';

          return (
            <div key={cat.key} className={cn('rounded-xl border p-4 sm:p-5', borderColor, bgColor)}>
              <div className="mb-4 flex items-center justify-between">
                <h3 className={cn('text-sm font-semibold uppercase tracking-wider', textColor)}>{cat.label}</h3>
                {catTotal > 0 && (
                  <span className={cn('font-mono text-sm font-bold', textColor)}>{formatTime(catTotal)}</span>
                )}
              </div>

              <div className="space-y-2">
                {SPEEDUP_TIERS.map(tier => {
                  const qty = state[cat.key][tier.label] || 0;
                  const hasValue = qty > 0;

                  return (
                    <div
                      key={tier.label}
                      className={cn('flex items-center gap-2 rounded-lg border p-2 transition-colors', hasValue ? 'border-accent/40 bg-accent/10' : 'border-border bg-bg-tertiary')}
                    >
                      <label className="flex-1 text-xs font-medium text-text-secondary">{tier.label}</label>
                      <input
                        type="number"
                        min="0"
                        value={qty}
                        onChange={e => handleInputChange(cat.key, tier.label, e.target.value)}
                        className="w-12 rounded border border-border bg-bg-primary px-2 py-1 text-right text-xs font-medium text-text-primary placeholder-text-secondary outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/30"
                        placeholder="0"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-lg border border-border bg-bg-secondary p-4 sm:p-6">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-text-secondary mb-3">Summary</h3>
        <div className="space-y-2">
          {categories.map(cat => {
            const catTotal = categoryTotals[cat.key];
            const textColor = cat.color === 'blue' ? 'text-blue-300' : cat.color === 'purple' ? 'text-purple-300' : cat.color === 'emerald' ? 'text-emerald-300' : cat.color === 'orange' ? 'text-orange-300' : 'text-red-300';
            return (
              <div key={cat.key} className="flex items-center justify-between text-sm">
                <span className="text-text-primary">{cat.label}</span>
                <span className={cn('font-mono font-bold', catTotal > 0 ? textColor : 'text-text-secondary')}>{formatTime(catTotal)}</span>
              </div>
            );
          })}
          <div className="border-t border-border pt-2 mt-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-text-primary">Grand Total</span>
              <span className="font-mono text-lg font-bold text-accent">{formatTime(grandTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
