import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { img } from '@/lib/prefix';

const SquadsClient = dynamic(() => import('./SquadsClient'));

export const metadata: Metadata = {
  title: 'Squads',
  description: 'Formation and matchup guidance for Tank, Aircraft, and Missile squads.',
  openGraph: {
    title: 'Squads | [ViKF] Alliance',
    description: 'Formation and matchup guidance for squad archetypes.',
    images: [img('/images/banners/map.png')],
  },
};

export default function SquadsPage() {
  return <SquadsClient />;
}
