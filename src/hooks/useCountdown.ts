'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

interface CountdownConfig {
  targetHourUtc: number;
  targetMinuteUtc?: number;
  activeDurationMinutes?: number;
}

interface CountdownState {
  hours: string;
  minutes: string;
  seconds: string;
  totalSeconds: number;
  isUrgent: boolean;
  isActive: boolean;
}

function getCountdownState(config: CountdownConfig): CountdownState {
  const now = new Date();

  const startToday = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      config.targetHourUtc,
      config.targetMinuteUtc ?? 0,
      0,
      0
    )
  );

  const activeDurationMs = (config.activeDurationMinutes ?? 30) * 60 * 1000;
  const activeEndsAt = startToday.getTime() + activeDurationMs;
  const nowMs = now.getTime();

  if (nowMs >= startToday.getTime() && nowMs < activeEndsAt) {
    return {
      hours: '00',
      minutes: '00',
      seconds: '00',
      totalSeconds: 0,
      isUrgent: false,
      isActive: true,
    };
  }

  const nextStart =
    nowMs < startToday.getTime() ? startToday : new Date(startToday.getTime() + 24 * 60 * 60 * 1000);

  const totalSeconds = Math.max(0, Math.floor((nextStart.getTime() - nowMs) / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
    totalSeconds,
    isUrgent: totalSeconds > 0 && totalSeconds < 3600,
    isActive: false,
  };
}

export function useCountdown(config: CountdownConfig): CountdownState {
  const configValue = useMemo(
    () => ({
      targetHourUtc: config.targetHourUtc,
      targetMinuteUtc: config.targetMinuteUtc ?? 0,
      activeDurationMinutes: config.activeDurationMinutes ?? 30,
    }),
    [config.activeDurationMinutes, config.targetHourUtc, config.targetMinuteUtc]
  );

  const [state, setState] = useState<CountdownState>(() => getCountdownState(configValue));
  const frameRef = useRef<number | null>(null);
  const lastSecondRef = useRef<number>(-1);

  useEffect(() => {
    const tick = () => {
      const nowSecond = Math.floor(Date.now() / 1000);
      if (nowSecond !== lastSecondRef.current) {
        lastSecondRef.current = nowSecond;
        setState(getCountdownState(configValue));
      }
      frameRef.current = window.requestAnimationFrame(tick);
    };

    frameRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [configValue]);

  return state;
}
