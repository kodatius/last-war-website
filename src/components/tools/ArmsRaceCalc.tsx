'use client';

import ProgressBar from '@/components/ui/ProgressBar';
import {
  armsRacePhases,
  calculateSpeedUpPoints,
  calculateTrainingPoints,
  getNextThreshold,
  getThresholdAtPoints,
} from '@/data/calculator-formulas';
import { useMemo, useState } from 'react';

export default function ArmsRaceCalc() {
  const [phase, setPhase] = useState<string>(armsRacePhases[0]?.phase ?? 'Construction');
  const [speedUpHours, setSpeedUpHours] = useState(8);
  const [troops, setTroops] = useState(20000);
  const [tier, setTier] = useState<1 | 2 | 3 | 4 | 5>(4);

  const totalPoints = useMemo(() => {
    const speedPoints = calculateSpeedUpPoints(speedUpHours * 60);
    const trainingPoints = calculateTrainingPoints(troops, tier);
    return Math.round(speedPoints + trainingPoints);
  }, [speedUpHours, tier, troops]);

  const currentMilestone = getThresholdAtPoints(totalPoints);
  const nextMilestone = getNextThreshold(totalPoints);
  const gap = nextMilestone ? Math.max(0, nextMilestone.pointsRequired - totalPoints) : 0;

  return (
    <section className="space-y-4 rounded-xl border border-border bg-bg-secondary/80 p-5">
      <h3 className="text-lg font-semibold">Arms Race Calculator</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="space-y-1 text-sm text-text-secondary">
          Phase
          <select
            value={phase}
            onChange={(event) => setPhase(event.target.value)}
            className="w-full rounded-lg border border-border bg-bg-primary px-3 py-2 text-text-primary outline-none"
          >
            {armsRacePhases.map((entry) => (
              <option key={entry.phase} value={entry.phase}>
                {entry.phase}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-1 text-sm text-text-secondary">
          Speed-up Hours Used
          <input
            type="number"
            min={0}
            value={speedUpHours}
            onChange={(event) => setSpeedUpHours(Number(event.target.value) || 0)}
            className="w-full rounded-lg border border-border bg-bg-primary px-3 py-2 text-text-primary outline-none"
          />
        </label>

        <label className="space-y-1 text-sm text-text-secondary">
          Troops Trained
          <input
            type="number"
            min={0}
            value={troops}
            onChange={(event) => setTroops(Number(event.target.value) || 0)}
            className="w-full rounded-lg border border-border bg-bg-primary px-3 py-2 text-text-primary outline-none"
          />
        </label>

        <label className="space-y-1 text-sm text-text-secondary">
          Troop Tier
          <select
            value={tier}
            onChange={(event) => setTier(Number(event.target.value) as 1 | 2 | 3 | 4 | 5)}
            className="w-full rounded-lg border border-border bg-bg-primary px-3 py-2 text-text-primary outline-none"
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>
                T{value}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="rounded-lg border border-border bg-bg-primary/35 p-4">
        <p className="text-xs uppercase tracking-wider text-text-secondary">Estimated Points ({phase})</p>
        <p className="mt-1 text-2xl font-semibold text-accent">{totalPoints.toLocaleString()}</p>
        <p className="text-sm text-text-secondary">Current milestone: {currentMilestone.label}</p>
        <p className="text-sm text-text-secondary">{nextMilestone ? `Next: ${nextMilestone.label} in ${gap.toLocaleString()} points` : 'Top milestone reached.'}</p>
        {nextMilestone ? (
          <ProgressBar
            className="mt-3"
            value={Math.min(totalPoints - currentMilestone.pointsRequired, gap ? nextMilestone.pointsRequired - currentMilestone.pointsRequired - gap : 0)}
            max={Math.max(1, nextMilestone.pointsRequired - currentMilestone.pointsRequired)}
            label="Milestone progress"
          />
        ) : null}
      </div>
    </section>
  );
}
