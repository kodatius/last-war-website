import type { Metadata } from 'next';
import HeroesClient from './HeroesClient';

export const metadata: Metadata = {
  title: 'Heroes',
  description: 'Comprehensive 23-hero tier list for Last War: Survival with builds, hero pairings, synergies, and tactical usage tips for all event types.',
};

export default function HeroesPage() {
  return <HeroesClient />;
}
