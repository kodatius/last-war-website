'use client';

import CounterPicker from '@/components/squads/CounterPicker';
import FormationCard from '@/components/squads/FormationCard';
import PositionGrid from '@/components/squads/PositionGrid';
import TypeTriangle from '@/components/squads/TypeTriangle';
import GlassCard from '@/components/ui/GlassCard';
import SectionHeading from '@/components/ui/SectionHeading';
import { formationCategories } from '@/data/formations-data';
import { motion } from 'framer-motion';

export default function SquadsClient() {
  return (
    <div className="container-shell py-16 sm:py-24">
      <SectionHeading title="Squad Builder" subtitle="Positioning logic, type counters, and recommended formations." />
      <div className="grid gap-6 lg:grid-cols-2">
        <PositionGrid />
        <TypeTriangle />
      </div>
      <GlassCard className="mt-6 text-sm text-text-secondary">
        Front Left, Rear Left, and Rear Center usually pressure the enemy Front Left. Use this to collapse the main tank and open their backline.
      </GlassCard>

      <div className="mt-8">
        <CounterPicker />
      </div>

      <motion.div
        className="mt-8 space-y-8"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      >
        {formationCategories.map((category) => (
          <motion.section key={category.key} variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
            <h2 className="text-2xl font-semibold">{category.label}</h2>
            <div className="mt-4 grid gap-4 sm:gap-6">
              {category.formations.map((formation) => (
                <FormationCard key={formation.id} formation={formation} />
              ))}
            </div>
          </motion.section>
        ))}
      </motion.div>
    </div>
  );
}
