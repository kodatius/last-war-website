'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface BuildingCost {
  level: number;
  food: number;
  iron: number;
  coin: number;
}

// Cost data for each building (levels 15-30)
const BUILDING_COSTS: Record<string, BuildingCost[]> = {
  hq: [
    { level: 15, food: 85000, iron: 85000, coin: 170000 },
    { level: 16, food: 102000, iron: 102000, coin: 204000 },
    { level: 17, food: 122400, iron: 122400, coin: 244800 },
    { level: 18, food: 146880, iron: 146880, coin: 293760 },
    { level: 19, food: 176256, iron: 176256, coin: 352512 },
    { level: 20, food: 211507, iron: 211507, coin: 423014 },
    { level: 21, food: 253808, iron: 253808, coin: 507616 },
    { level: 22, food: 304570, iron: 304570, coin: 609140 },
    { level: 23, food: 365484, iron: 365484, coin: 730968 },
    { level: 24, food: 438581, iron: 438581, coin: 877162 },
    { level: 25, food: 526297, iron: 526297, coin: 1052594 },
    { level: 26, food: 631557, iron: 631557, coin: 1263114 },
    { level: 27, food: 757868, iron: 757868, coin: 1515736 },
    { level: 28, food: 909442, iron: 909442, coin: 1818883 },
    { level: 29, food: 1091330, iron: 1091330, coin: 2182660 },
    { level: 30, food: 1309596, iron: 1309596, coin: 2619192 },
  ],
  barracks: [
    { level: 15, food: 42500, iron: 42500, coin: 85000 },
    { level: 16, food: 51000, iron: 51000, coin: 102000 },
    { level: 17, food: 61200, iron: 61200, coin: 122400 },
    { level: 18, food: 73440, iron: 73440, coin: 146880 },
    { level: 19, food: 88128, iron: 88128, coin: 176256 },
    { level: 20, food: 105753, iron: 105753, coin: 211507 },
  ],
  hospital: [
    { level: 15, food: 42500, iron: 42500, coin: 85000 },
    { level: 16, food: 51000, iron: 51000, coin: 102000 },
    { level: 17, food: 61200, iron: 61200, coin: 122400 },
    { level: 18, food: 73440, iron: 73440, coin: 146880 },
    { level: 19, food: 88128, iron: 88128, coin: 176256 },
    { level: 20, food: 105753, iron: 105753, coin: 211507 },
  ],
  farm: [
    { level: 15, food: 42500, iron: 42500, coin: 85000 },
    { level: 16, food: 51000, iron: 51000, coin: 102000 },
    { level: 17, food: 61200, iron: 61200, coin: 122400 },
    { level: 18, food: 73440, iron: 73440, coin: 146880 },
    { level: 19, food: 88128, iron: 88128, coin: 176256 },
    { level: 20, food: 105753, iron: 105753, coin: 211507 },
  ],
};

function formatNum(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
  return num.toString();
}

type Building = 'hq' | 'barracks' | 'hospital' | 'farm';

export default function ResourceClient() {
  const [building, setBuilding] = useState<Building>('hq');
  const [fromLevel, setFromLevel] = useState(15);
  const [toLevel, setToLevel] = useState(20);

  const costs = BUILDING_COSTS[building];
  const maxLevel = costs[costs.length - 1].level;
  const minLevel = costs[0].level;

  const actualFrom = Math.max(minLevel, fromLevel);
  const actualTo = Math.min(maxLevel, Math.max(fromLevel, toLevel));

  const selectedCosts = costs.filter(c => c.level >= actualFrom && c.level <= actualTo);

  const totalFood = selectedCosts.reduce((sum, c) => sum + c.food, 0);
  const totalIron = selectedCosts.reduce((sum, c) => sum + c.iron, 0);
  const totalCoin = selectedCosts.reduce((sum, c) => sum + c.coin, 0);

  const buildingLabels: Record<Building, string> = {
    hq: 'HQ',
    barracks: 'Barracks',
    hospital: 'Hospital',
    farm: 'Farm',
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">Building</label>
          <select
            value={building}
            onChange={e => setBuilding(e.target.value as Building)}
            className="w-full rounded-lg border border-border bg-bg-secondary px-3 py-2 text-sm font-medium text-text-primary outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/30"
          >
            {(Object.keys(BUILDING_COSTS) as Building[]).map(b => (
              <option key={b} value={b}>
                {buildingLabels[b]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">From Level</label>
          <select
            value={fromLevel}
            onChange={e => setFromLevel(parseInt(e.target.value))}
            className="w-full rounded-lg border border-border bg-bg-secondary px-3 py-2 text-sm font-medium text-text-primary outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/30"
          >
            {costs.map(c => (
              <option key={c.level} value={c.level}>
                Level {c.level}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">To Level</label>
          <select
            value={toLevel}
            onChange={e => setToLevel(parseInt(e.target.value))}
            className="w-full rounded-lg border border-border bg-bg-secondary px-3 py-2 text-sm font-medium text-text-primary outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/30"
          >
            {costs.map(c => (
              <option key={c.level} value={c.level}>
                Level {c.level}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">Food</p>
          <p className="font-mono text-2xl font-bold text-emerald-300">{formatNum(totalFood)}</p>
        </div>

        <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-orange-400 mb-2">Iron</p>
          <p className="font-mono text-2xl font-bold text-orange-300">{formatNum(totalIron)}</p>
        </div>

        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">Coin</p>
          <p className="font-mono text-2xl font-bold text-amber-300">{formatNum(totalCoin)}</p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border bg-bg-secondary">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-bg-tertiary">
              <th className="px-4 py-3 text-left font-semibold text-text-primary">Level</th>
              <th className="px-4 py-3 text-right font-semibold text-emerald-300">Food</th>
              <th className="px-4 py-3 text-right font-semibold text-orange-300">Iron</th>
              <th className="px-4 py-3 text-right font-semibold text-amber-300">Coin</th>
            </tr>
          </thead>
          <tbody>
            {costs.map((cost, idx) => {
              const isSelected = cost.level >= actualFrom && cost.level <= actualTo;
              return (
                <tr
                  key={cost.level}
                  className={cn(
                    'border-b border-border last:border-b-0 transition-colors',
                    isSelected ? 'bg-accent/10' : idx % 2 === 0 ? 'bg-transparent' : 'bg-bg-tertiary/40'
                  )}
                >
                  <td className="px-4 py-3 font-medium text-text-primary">Level {cost.level}</td>
                  <td className="px-4 py-3 text-right font-mono text-emerald-300">{formatNum(cost.food)}</td>
                  <td className="px-4 py-3 text-right font-mono text-orange-300">{formatNum(cost.iron)}</td>
                  <td className="px-4 py-3 text-right font-mono text-amber-300">{formatNum(cost.coin)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
