'use client';

import ArmsRaceCalc from '@/components/tools/ArmsRaceCalc';
import ResourceOptimizer from '@/components/tools/ResourceOptimizer';
import Tabs from '@/components/ui/Tabs';
import { armsRaceFormulaNotes } from '@/data/calculator-formulas';
import { useState } from 'react';

type TabKey = 'arms-race' | 'resources' | 'formulas';

export default function CalculatorsClient() {
  const [activeTab, setActiveTab] = useState<TabKey>('arms-race');

  return (
    <div className="space-y-4">
      <Tabs<TabKey>
        value={activeTab}
        onChange={setActiveTab}
        options={[
          { key: 'arms-race', label: 'Arms Race' },
          { key: 'resources', label: 'Resource Optimizer' },
          { key: 'formulas', label: 'Formulas' },
        ]}
      />

      {activeTab === 'arms-race' ? <ArmsRaceCalc /> : null}
      {activeTab === 'resources' ? <ResourceOptimizer /> : null}
      {activeTab === 'formulas' ? (
        <section className="space-y-3 rounded-xl border border-border bg-bg-secondary/80 p-5">
          {armsRaceFormulaNotes.map((formula) => (
            <article key={formula.name} className="rounded-lg border border-border bg-bg-primary/35 p-3">
              <h3 className="text-sm font-semibold text-accent">{formula.name}</h3>
              <p className="mt-1 text-xs text-text-secondary">{formula.formula}</p>
              <p className="mt-2 text-xs text-text-secondary">{formula.example}</p>
            </article>
          ))}
        </section>
      ) : null}
    </div>
  );
}
