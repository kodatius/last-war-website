'use client';

import GlassCard from '@/components/ui/GlassCard';
import { GameEvent } from '@/types';
import { CalendarDays } from 'lucide-react';
import { useEffect, useMemo, useRef } from 'react';

interface WeeklyCalendarProps {
  events: GameEvent[];
  selectedDay: string | null;
  onSelectDay: (day: string | null) => void;
}

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function getTodayName(): string {
  const day = new Date().getDay();
  const mondayFirstIndex = day === 0 ? 6 : day - 1;
  return days[mondayFirstIndex];
}

export default function WeeklyCalendar({ events, selectedDay, onSelectDay }: WeeklyCalendarProps) {
  const today = getTodayName();
  const todayRef = useRef<HTMLButtonElement | null>(null);

  const eventsByDay = useMemo(
    () =>
      days.map((day) => ({
        day,
        events: events.filter((event) => event.frequency === 'daily' || event.daysActive?.includes(day)),
      })),
    [events]
  );

  useEffect(() => {
    if (todayRef.current) {
      todayRef.current.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, []);

  return (
    <GlassCard className="px-3 py-3 sm:px-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-accent">
          <CalendarDays size={14} />
          Weekly Calendar
        </p>
        {selectedDay ? (
          <button
            type="button"
            className="text-xs text-text-secondary underline underline-offset-2 transition hover:text-text-primary"
            onClick={() => onSelectDay(null)}
          >
            Show all days
          </button>
        ) : null}
      </div>
      <div className="overflow-x-auto pb-1">
        <div className="grid min-w-[680px] grid-cols-7 gap-2">
          {eventsByDay.map(({ day, events: dayEvents }) => {
            const isToday = day === today;
            const isActive = selectedDay === day;
            return (
              <button
                key={day}
                ref={isToday ? todayRef : null}
                type="button"
                onClick={() => onSelectDay(isActive ? null : day)}
                className={`rounded-xl border p-2 text-left transition sm:p-3 ${
                  isActive
                    ? 'border-accent bg-accent/10 shadow-[0_0_20px_rgba(212,160,23,0.16)]'
                    : isToday
                      ? 'border-accent/80 bg-bg-tertiary/70'
                      : 'border-border bg-bg-secondary hover:border-accent/50'
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary">{day.slice(0, 3)}</p>
                {isToday ? (
                  <span className="mt-1 inline-block rounded-full border border-accent/60 bg-accent/15 px-1.5 py-0.5 text-[10px] font-semibold text-accent">
                    TODAY
                  </span>
                ) : null}
                <div className="mt-2 flex min-h-12 flex-wrap gap-1.5">
                  {dayEvents.length === 0 ? (
                    <span className="text-[11px] text-text-secondary">No weekly events</span>
                  ) : (
                    <>
                      {dayEvents.slice(0, 4).map((event) => (
                        <span
                          key={event.id}
                          title={event.name}
                          className="flex h-6 w-6 items-center justify-center rounded-md border border-border bg-bg-tertiary text-sm"
                        >
                          {event.icon}
                        </span>
                      ))}
                      {dayEvents.length > 4 ? (
                        <span className="flex h-6 min-w-6 items-center justify-center rounded-md border border-border bg-bg-tertiary px-1 text-[10px] text-text-secondary">
                          +{dayEvents.length - 4}
                        </span>
                      ) : null}
                    </>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </GlassCard>
  );
}
