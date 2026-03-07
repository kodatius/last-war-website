'use client';

import GlassCard from '@/components/ui/GlassCard';
import LocalImage from '@/components/ui/LocalImage';
import { img } from '@/lib/prefix';
import { motion } from 'framer-motion';
import { BookOpen, Brain, CalendarClock, Layers3, Map, ShieldAlert, Swords, Wrench } from 'lucide-react';
import Link from 'next/link';

const cards = [
  { href: '/heroes', title: 'Heroes', description: 'Tier list, counters, and skill drilldown.', icon: ShieldAlert, heroId: 'kimberly' },
  { href: '/events', title: 'Events', description: 'Live weekly cadence and strategy sheets.', icon: CalendarClock, heroId: 'marshall' },
  { href: '/squads', title: 'Squads', description: 'Formations, positions, and counter picks.', icon: Layers3, heroId: 'murphy' },
  { href: '/tips', title: 'Tips', description: 'Practical optimization for everyday play.', icon: Swords, heroId: 'dva' },
  { href: '/glossary', title: 'Glossary', description: 'Terms decoded for cleaner comms.', icon: BookOpen, heroId: 'tesla' },
  { href: '/quiz', title: 'Quiz', description: 'Battle IQ checks and daily challenge.', icon: Brain, heroId: 'williams' },
  { href: '/season', title: 'Season Guide', description: 'Week-by-week tactical progression.', icon: Map, heroId: 'morrison' },
  { href: '/tools', title: 'War Tools', description: 'Calculators, compare, and builders.', icon: Wrench, heroId: 'schuyler' },
];

export default function NavCards() {
  return (
    <section className="py-10 sm:py-14">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <motion.div key={card.href} whileHover={{ scale: 1.02 }} transition={{ duration: 0.18 }}>
              <Link href={card.href} className="block h-full">
                <GlassCard className="group relative h-full overflow-hidden">
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-neon-blue/0 transition duration-300 group-hover:from-accent/12 group-hover:to-neon-blue/12" />
                  <div className="relative z-10 flex items-center justify-between gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-accent/35 bg-accent/10">
                      <Icon className="text-accent" size={18} />
                    </div>
                    <LocalImage
                      src={img(`/images/heroes/${card.heroId}.png`)}
                      alt={`${card.title} featured hero`}
                      width={56}
                      height={56}
                      containerClassName="h-14 w-14 overflow-hidden rounded-lg border border-border/80 bg-bg-tertiary"
                      className="h-full w-full object-cover"
                      fallbackText="Hero"
                    />
                  </div>
                  <h3 className="relative z-10 mt-4 font-hero text-2xl font-bold leading-none">{card.title}</h3>
                  <p className="relative z-10 mt-3 text-sm text-text-secondary">{card.description}</p>
                </GlassCard>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
