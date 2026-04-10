'use client';

import GlassCard from '@/components/ui/GlassCard';
import { counterPickerOptions, getCounterPick } from '@/data/counters-data';
import { FormationArchetype } from '@/data/raw/counters-data';
import { motion } from 'framer-motion';
import { ShieldCheck, Swords } from 'lucide-react';
import { useMemo, useState } from 'react';

function effectivenessClass(effectiveness: string): string {
  if (effectiveness === 'Hard Counter') return 'border-emerald-400/40 bg-emerald-500/10 text-emerald-300';
  if (effectiveness === 'Soft Counter') return 'border-sky-400/40 bg-sky-500/10 text-sky-300';
  return 'border-amber-400/40 bg-amber-500/10 text-amber-300';
}

export default function CounterPicker() {
  const [selectedArchetype, setSelectedArchetype] = useState<FormationArchetype>(counterPickerOptions[0].archetype);

  const counter = useMemo(() => getCounterPick(selectedArchetype), [selectedArchetype]);

  return (
    <GlassCard>
      <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-accent">
        <Swords size={14} />
        Counter Picker
      </p>
      <h3 className="mt-2 text-xl font-semibold">Enemy is running...</h3>

      <select
        value={selectedArchetype}
        onChange={(event) => setSelectedArchetype(event.target.value as FormationArchetype)}
        className="mt-3 w-full rounded-lg border border-border bg-bg-secondary px-3 py-2 text-sm outline-none transition focus:border-accent"
      >
        {counterPickerOptions.map((option) => (
          <option key={option.archetype} value={option.archetype}>
            {option.name}
          </option>
        ))}
      </select>

      {counter ? (
        <motion.div
          key={counter.counterFormationId}
          className="mt-4 rounded-xl border border-border bg-bg-tertiary/70 p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-xs uppercase tracking-[0.12em] text-text-secondary">Recommended Counter</p>
          <p className="mt-1 inline-flex items-center gap-2 text-lg font-semibold">
            <ShieldCheck size={18} className="text-accent" />
            {counter.counterFormationName}
          </p>
          <span className={`mt-2 inline-block rounded-full border px-2 py-0.5 text-xs ${effectivenessClass(counter.effectiveness)}`}>
            {counter.effectiveness}
          </span>
          <p className="mt-3 text-sm text-text-secondary">{counter.explanation}</p>
          <ul className="mt-3 space-y-1 text-sm text-text-secondary">
            {counter.tips.slice(0, 2).map((tip) => (
              <li key={tip}>• {tip}</li>
            ))}
          </ul>
        </motion.div>
      ) : (
        <p className="mt-4 text-sm text-text-secondary">No counter recommendation available for this archetype yet.</p>
      )}
    </GlassCard>
  );
}
