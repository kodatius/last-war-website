'use client';

import EventCard from '@/components/events/EventCard';
import WeeklyCalendar from '@/components/events/WeeklyCalendar';
import CountdownTimer from '@/components/ui/CountdownTimer';
import GlassCard from '@/components/ui/GlassCard';
import LocalImage from '@/components/ui/LocalImage';
import SectionHeading from '@/components/ui/SectionHeading';
import { ROUTES } from '@/lib/constants';
import { img } from '@/lib/prefix';
import { GameEvent } from '@/types';
import { motion } from 'framer-motion';
import { ArrowRight, Calculator } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

interface EventsClientProps {
  events: GameEvent[];
}

export default function EventsClient({ events }: EventsClientProps) {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const filteredEvents = useMemo(() => {
    if (!selectedDay) return events;
    return events.filter((event) => event.frequency === 'daily' || event.daysActive?.includes(selectedDay));
  }, [events, selectedDay]);

  return (
    <div className="container-shell py-16 sm:py-24">
      <div className="mb-8 overflow-hidden rounded-xl border border-border bg-bg-secondary">
        <LocalImage
          src={img('/images/banners/map.png')}
          alt="Event war map"
          width={1024}
          height={558}
          loading="eager"
          containerClassName="h-[180px] sm:h-[280px]"
          className="h-full w-full object-cover"
          fallbackText="Events map"
        />
      </div>

      <SectionHeading title="Event Guides" subtitle="11 core events, schedules, and strategy breakdowns." />

      <div className="mb-6 grid gap-4 md:grid-cols-[1.5fr_1fr]">
        <WeeklyCalendar events={events} selectedDay={selectedDay} onSelectDay={setSelectedDay} />
        <GlassCard className="flex h-full flex-col justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-accent">Alliance Window</p>
            <p className="mt-2 text-sm text-text-secondary">Live duel countdown in your local time.</p>
          </div>
          <CountdownTimer className="mt-4" />
        </GlassCard>
      </div>

      <p className="mb-4 text-sm text-text-secondary">
        Showing {filteredEvents.length} event{filteredEvents.length === 1 ? '' : 's'}
        {selectedDay ? ` for ${selectedDay}` : ''}
      </p>

      <motion.div
        className="space-y-4"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
      >
        {filteredEvents.map((event) => (
          <motion.div key={event.id} variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
            <EventCard event={event} />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Link href={ROUTES.calculators}>
          <GlassCard className="group border-accent/40 bg-[linear-gradient(120deg,rgba(212,160,23,0.12),rgba(0,212,255,0.08))]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-accent">
                  <Calculator size={14} />
                  Tools
                </p>
                <h2 className="mt-2 text-xl font-semibold">Open Event Calculators</h2>
                <p className="mt-1 text-sm text-text-secondary">
                  Calculate points, optimize upgrades, and prep before weekly race windows.
                </p>
              </div>
              <ArrowRight className="shrink-0 text-accent transition group-hover:translate-x-1" size={22} />
            </div>
          </GlassCard>
        </Link>
      </motion.div>
    </div>
  );
}
