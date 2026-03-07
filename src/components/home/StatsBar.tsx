'use client';

import GlassCard from '@/components/ui/GlassCard';
import { ALLIANCE_INFO } from '@/lib/constants';
import { motion } from 'framer-motion';
import { Signal, Users, Zap } from 'lucide-react';

const stats = [
  { label: 'Alliance', value: ALLIANCE_INFO.name, icon: Users, tone: 'text-accent' },
  { label: 'Server', value: ALLIANCE_INFO.server, icon: Signal, tone: 'text-neon-blue' },
  { label: 'Members', value: '97 / 100', icon: Users, tone: 'text-neon-green' },
  { label: 'Active At Reset', value: '34 online', icon: Zap, tone: 'text-fuchsia-300' },
];

export default function StatsBar() {
  return (
    <section className="py-6 sm:py-8">
      <motion.div
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
      >
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div key={item.label} variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
              <GlassCard className="px-4 py-3 sm:px-4 sm:py-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs uppercase tracking-[0.16em] text-text-secondary">{item.label}</p>
                  <Icon size={14} className="text-accent" />
                </div>
                <p className={`mt-1 font-mono text-lg ${item.tone}`}>{item.value}</p>
              </GlassCard>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
