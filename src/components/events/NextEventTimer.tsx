'use client';

import { GameEvent } from '@/types';
import { Clock3 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

interface NextEventTimerProps {
  event: GameEvent;
}

const dayIndexMap: Record<string, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

function nextWeeklyOccurrence(targetDayName?: string, periodDays = 7): Date {
  const now = new Date();
  if (!targetDayName) {
    const fallback = new Date(now);
    fallback.setDate(fallback.getDate() + periodDays);
    return fallback;
  }

  const targetDay = dayIndexMap[targetDayName];
  const next = new Date(now);
  next.setHours(0, 0, 0, 0);

  const distance = (targetDay - now.getDay() + 7) % 7;
  const daysUntil = distance === 0 ? periodDays : distance;
  next.setDate(next.getDate() + daysUntil);
  return next;
}

function nextMonthlyOccurrence(): Date {
  const now = new Date();
  const next = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  next.setHours(0, 0, 0, 0);
  return next;
}

function formatRemaining(ms: number): string {
  const totalMinutes = Math.floor(ms / 60000);
  const days = Math.floor(totalMinutes / (24 * 60));
  const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
  const minutes = totalMinutes % 60;

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

export default function NextEventTimer({ event }: NextEventTimerProps) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 60000);
    return () => window.clearInterval(timer);
  }, []);

  const nextTime = useMemo(() => {
    if (event.frequency === 'weekly') return nextWeeklyOccurrence(event.daysActive?.[0], 7);
    if (event.frequency === 'biweekly') return nextWeeklyOccurrence(event.daysActive?.[0], 14);
    if (event.frequency === 'monthly') return nextMonthlyOccurrence();
    return null;
  }, [event.daysActive, event.frequency]);

  if (!nextTime) return null;

  const remaining = Math.max(nextTime.getTime() - now, 0);

  return (
    <p className="inline-flex items-center gap-1.5 text-xs text-neon-blue">
      <Clock3 size={12} />
      Next in {formatRemaining(remaining)}
    </p>
  );
}
