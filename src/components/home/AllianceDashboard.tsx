'use client';

import CountdownTimer from '@/components/ui/CountdownTimer';
import GlassCard from '@/components/ui/GlassCard';
import { events } from '@/data/events-data';
import { heroes } from '@/data/heroes-data';
import { terms } from '@/data/terms-data';
import { tips } from '@/data/tips-data';
import { ALLIANCE_INFO } from '@/lib/constants';
import { motion } from 'framer-motion';
import { Activity, CalendarDays, Database, ShieldCheck, Users } from 'lucide-react';

function getTodayEvents() {
  const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());
  return events.filter((event) => event.frequency === 'daily' || event.daysActive?.includes(dayName));
}

export default function AllianceDashboard() {
  const todayEvents = getTodayEvents();

  return (
    <section id="alliance-dashboard" className="py-10 sm:py-14">
      <motion.div
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } },
        }}
      >
        <motion.div variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}>
          <GlassCard className="h-full">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.2em] text-accent">Server Info</p>
              <ShieldCheck size={16} className="text-accent" />
            </div>
            <h3 className="mt-3 font-hero text-2xl font-bold">{ALLIANCE_INFO.server}</h3>
            <p className="text-sm text-text-secondary">Alliance {ALLIANCE_INFO.name}</p>
          </GlassCard>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}>
          <GlassCard className="h-full border-accent/45 shadow-[0_0_28px_rgba(212,160,23,0.2)]">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.2em] text-accent">Duel Countdown</p>
              <Activity size={16} className="text-accent" />
            </div>
            <div className="mt-3">
              <CountdownTimer className="text-3xl" />
            </div>
          </GlassCard>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}>
          <GlassCard className="h-full">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.2em] text-accent">Today&apos;s Events</p>
              <CalendarDays size={16} className="text-accent" />
            </div>
            <div className="mt-3 space-y-2 text-sm">
              {todayEvents.slice(0, 4).map((event) => (
                <div key={event.id} className="flex items-center justify-between rounded-lg border border-border/60 bg-bg-tertiary/40 px-3 py-2">
                  <span>
                    {event.icon} {event.name}
                  </span>
                  <span className="text-xs uppercase tracking-wide text-text-secondary">{event.frequency}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}>
          <GlassCard className="h-full">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.2em] text-accent">Quick Stats</p>
              <Database size={16} className="text-accent" />
            </div>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex items-center justify-between rounded-lg border border-border/60 bg-bg-tertiary/40 px-3 py-2">
                <span>Heroes Catalogued</span>
                <span className="font-mono text-neon-blue">{heroes.length}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border/60 bg-bg-tertiary/40 px-3 py-2">
                <span>Events Covered</span>
                <span className="font-mono text-neon-green">{events.length}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border/60 bg-bg-tertiary/40 px-3 py-2">
                <span>Tips Available</span>
                <span className="font-mono text-accent">{tips.length}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border/60 bg-bg-tertiary/40 px-3 py-2">
                <span>Terms Defined</span>
                <span className="font-mono text-fuchsia-300">{terms.length}</span>
              </div>
            </div>
            <div className="mt-4 inline-flex items-center gap-2 text-xs text-text-secondary">
              <Users size={13} className="text-accent" />
              Guide data refreshed as heroes and event coverage expand
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </section>
  );
}
