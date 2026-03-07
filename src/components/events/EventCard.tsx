'use client';

import LocalImage from '@/components/ui/LocalImage';
import ExpandableCard from '@/components/ui/ExpandableCard';
import FrequencyBadge from '@/components/ui/FrequencyBadge';
import { GameEvent } from '@/types';
import EventDetail from './EventDetail';

interface EventCardProps {
  event: GameEvent;
}

function getEventIconPath(event: GameEvent): string {
  if (event.id.includes('zombie') || event.id.includes('doom')) return '/images/ui/damage.png';
  if (event.id.includes('alliance') || event.id.includes('arms') || event.id.includes('warzone')) return '/images/ui/tank-role.png';
  if (event.id.includes('wanted') || event.id.includes('trial') || event.id.includes('campaign')) return '/images/ui/buff.png';
  return '/images/ui/coin.png';
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <ExpandableCard
      header={
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <LocalImage
              src={getEventIconPath(event)}
              alt={`${event.name} icon`}
              width={26}
              height={26}
              containerClassName="mt-0.5 h-[26px] w-[26px] shrink-0"
              className="h-full w-full object-contain"
              fallbackText="EV"
            />
            <div>
              <p className="text-lg font-semibold">
                {event.icon} {event.name}
              </p>
              <p className="mt-1 text-sm text-text-secondary">{event.description}</p>
            </div>
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
