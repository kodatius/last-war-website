'use client';

import GlassCard from '@/components/ui/GlassCard';
import { motion } from 'framer-motion';

const positions = [
  { slot: 'Front Left', target: 'Targets Rear Right', accent: 'border-accent/70 shadow-[0_0_24px_rgba(212,160,23,0.2)]' },
  { slot: 'Front Right', target: 'Targets Rear Left', accent: 'border-border' },
  { slot: 'Rear Left', target: 'Targets Front Left', accent: 'border-sky-400/70 shadow-[0_0_24px_rgba(59,130,246,0.2)]' },
  { slot: 'Rear Center', target: 'Targets Front Left', accent: 'border-border' },
  { slot: 'Rear Right', target: 'Targets Front Right', accent: 'border-border' },
];

function SlotCard({ slot, target, accent }: (typeof positions)[number]) {
  return (
    <div className={`rounded-lg border bg-bg-tertiary/70 p-3 text-center ${accent}`}>
      <p className="font-semibold">{slot}</p>
      <p className="text-xs text-text-secondary">{target}</p>
    </div>
  );
}

export default function PositionGrid() {
  return (
    <GlassCard className="relative overflow-hidden">
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d="M25 26 L80 78"
          stroke="rgba(212,160,23,0.5)"
          strokeWidth="1.4"
          strokeDasharray="4 3"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        />
        <motion.path
          d="M75 26 L22 78"
          stroke="rgba(0,212,255,0.5)"
          strokeWidth="1.4"
          strokeDasharray="4 3"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.08 }}
        />
      </svg>

      <div className="relative grid grid-cols-2 gap-3">
        {positions.slice(0, 2).map((position) => (
          <SlotCard key={position.slot} {...position} />
        ))}
      </div>
      <div className="relative mt-3 grid grid-cols-3 gap-3">
        {positions.slice(2).map((position) => (
          <SlotCard key={position.slot} {...position} />
        ))}
      </div>
    </GlassCard>
  );
}
