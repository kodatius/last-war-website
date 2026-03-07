'use client';

import ExpandableCard from '@/components/ui/ExpandableCard';
import FrequencyBadge from '@/components/ui/FrequencyBadge';
import { GameEvent } from '@/types';
import EventDetail from './EventDetail';

interface EventCardProps {
  event: GameEvent;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <ExpandableCard
      header={
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-lg font-semibold">
              {event.icon} {event.name}
            </p>
            <p className="mt-1 text-sm text-text-secondary">{event.description}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <FrequencyBadge frequency={event.frequency} />
            <span className="text-xs text-text-secondary">{event.strategies.length} strategies</span>
          </div>
        </div>
      }
    >
      <EventDetail strategies={event.strategies} />
    </ExpandableCard>
  );
}
