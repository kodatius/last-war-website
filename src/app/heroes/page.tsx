import type { Metadata } from 'next';
import HeroesClient from './HeroesClient';

export const metadata: Metadata = {
  title: 'Heroes',
  description: 'Hero Database with filters, table view, and detailed role breakdowns.',
};

export default function HeroesPage() {
  return <HeroesClient />;
}
