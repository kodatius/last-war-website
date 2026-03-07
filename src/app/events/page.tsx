import EventCard from '@/components/events/EventCard';
import LocalImage from '@/components/ui/LocalImage';
import WeeklyCalendar from '@/components/events/WeeklyCalendar';
import SectionHeading from '@/components/ui/SectionHeading';
import { events } from '@/data/events-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events',
  description: 'Weekly and monthly event guidance for [ViKF].',
};

export default function EventsPage() {
  return (
    <div className="container-shell py-16 sm:py-24">
      <div className="mb-8 overflow-hidden rounded-xl border border-border bg-bg-secondary">
        <LocalImage
          src="/last-war-website/images/banners/map.png"
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
      <WeeklyCalendar events={events} />
      <div className="mt-8 space-y-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
