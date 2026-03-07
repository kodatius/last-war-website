import type { EventStrategy, GameEvent } from '@/types';
import { events as rawEvents } from './raw/events-data';

const dayMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function toStrategy(strategy: string, index: number): EventStrategy {
  const match = strategy.match(/^\*\*(.+?)\*\*:\s*(.+)$/);
  if (match) {
    return { title: match[1], description: match[2] };
  }

  return { title: `Strategy ${index + 1}`, description: strategy };
}

const adaptedEvents: GameEvent[] = rawEvents.map((event) => ({
  id: event.id,
  name: event.name,
  icon: event.icon,
  frequency: event.frequency,
  description: event.description,
  strategies: event.strategies.map(toStrategy),
  daysActive: typeof event.dayOfWeek === 'number' ? [dayMap[event.dayOfWeek]] : undefined,
}));

const doomWalkerEvent: GameEvent = {
  id: 'doom-walker',
  name: 'Doom Walker',
  icon: '👹',
  frequency: 'daily',
  description:
    'Daily boss rally event. High-value rewards and a core part of alliance coordination routines.',
  strategies: [
    { title: 'First Blood Daily', description: 'Run at least one rally daily to secure baseline rewards.' },
    { title: 'Sequential Rallying', description: 'Chain rallies with minimal downtime for better stamina efficiency.' },
    { title: 'One-Hero Carry', description: 'Low-power members can join with one hero to get carried safely.' },
    { title: 'Timing Discipline', description: 'Coordinate peak attendance windows for stronger rally participation.' },
  ],
};

export const events: GameEvent[] = [...adaptedEvents, doomWalkerEvent];
