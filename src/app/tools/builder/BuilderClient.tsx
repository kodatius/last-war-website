'use client';

import FormationAnalysis from '@/components/tools/FormationAnalysis';
import FormationGrid from '@/components/tools/FormationGrid';
import HeroPicker from '@/components/tools/HeroPicker';
import SavedFormations from '@/components/tools/SavedFormations';
import Sheet from '@/components/ui/Sheet';
import { useState } from 'react';

const emptySlots: Array<string | null> = [null, null, null, null, null];

export default function BuilderClient() {
  const [slots, setSlots] = useState<Array<string | null>>(emptySlots);
  const [activeSlot, setActiveSlot] = useState<number | null>(null);

  const openPicker = (slotIndex: number) => setActiveSlot(slotIndex);

  const applyHero = (heroId: string | null) => {
    if (activeSlot === null) return;
    setSlots((current) => current.map((value, index) => (index === activeSlot ? heroId : value)));
    setActiveSlot(null);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <FormationGrid slots={slots} onSelectSlot={openPicker} activeSlot={activeSlot} />
        <FormationAnalysis slots={slots} />
      </div>

      <SavedFormations slots={slots} onLoad={setSlots} />

      <Sheet open={activeSlot !== null} onClose={() => setActiveSlot(null)} title="Pick Hero">
        <HeroPicker onPick={applyHero} />
      </Sheet>
    </div>
  );
}
