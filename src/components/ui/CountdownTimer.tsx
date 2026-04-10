'use client';

import { ALLIANCE_DUEL_ACTIVE_MINUTES, ALLIANCE_DUEL_TIME_UTC } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useCountdown } from '@/hooks/useCountdown';

interface CountdownTimerProps {
  className?: string;
}

export default function CountdownTimer({ className }: CountdownTimerProps) {
  const { hours, minutes, seconds, isActive, isUrgent } = useCountdown({
    targetHourUtc: ALLIANCE_DUEL_TIME_UTC.hour,
    targetMinuteUtc: ALLIANCE_DUEL_TIME_UTC.minute,
    activeDurationMinutes: ALLIANCE_DUEL_ACTIVE_MINUTES,
  });

  return (
    <div className={cn('font-mono', className)}>
      <p className="mb-1 text-xs uppercase tracking-[0.16em] text-text-secondary">Alliance Duel</p>
      {isActive ? (
        <p className="animate-pulse text-base font-semibold text-status-danger">DUEL ACTIVE</p>
      ) : (
        <p className={cn('text-xl font-semibold tabular-nums text-text-primary', isUrgent && 'animate-pulse text-neon-green')}>
          {hours}:{minutes}:{seconds}
        </p>
      )}
    </div>
  );
}
