import EventsClient from './EventsClient';
import { events } from '@/data/events-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events',
  description: 'Weekly and monthly event guidance for [ViKF].',
};

export default function EventsPage() {
  return <EventsClient events={events} />;
}
