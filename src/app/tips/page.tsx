import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { img } from '@/lib/prefix';

const TipsClient = dynamic(() => import('./TipsClient'));

export const metadata: Metadata = {
  title: 'Tips',
  description: '108+ practical tips covering heroes, events, resources, and progression.',
  openGraph: {
    title: 'Tips | [ViKF] Alliance',
    description: 'Practical tips covering heroes, events, resources, and progression.',
    images: [img('/images/banners/game.jpg')],
  },
};

export default function TipsPage() {
  return <TipsClient />;
}
