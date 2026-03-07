import type { Metadata } from 'next';
import HeroesClient from './HeroesClient';

export const metadata: Metadata = {
  title: 'Heroes',
  description: '23-hero tier list with builds, pairings, and usage tips.',
};

export default function HeroesPage() {
  return <HeroesClient />;
}
