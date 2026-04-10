import { events } from '@/data/events-data';
import { img } from '@/lib/prefix';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const DynamicEventsClient = dynamic(() => import('./EventsClient'));

export const metadata: Metadata = {
  title: 'Events',
  description: 'Weekly and monthly event guidance for [FATE].',
  openGraph: {
    title: 'Events | [FATE] Alliance',
    description: 'Weekly and monthly event guidance for [FATE].',
    images: [img('/images/banners/map.png')],
  },
};

export default function EventsPage() {
  return <DynamicEventsClient events={events} />;
}
