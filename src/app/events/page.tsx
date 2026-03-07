import EventCard from '@/components/events/EventCard';
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
