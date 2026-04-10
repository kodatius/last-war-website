import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { img } from '@/lib/prefix';

const HeroesClient = dynamic(() => import('./HeroesClient'));

export const metadata: Metadata = {
  title: 'Heroes',
  description: 'Hero Database with filters, table view, and detailed role breakdowns.',
  openGraph: {
    title: 'Heroes | [FATE] Alliance',
    description: 'Hero database with filters and role breakdowns.',
    images: [img('/images/heroes/kimberly.png')],
  },
};

export default function HeroesPage() {
  return <HeroesClient />;
}
