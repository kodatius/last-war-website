import HeroBanner from '@/components/home/HeroBanner';
import NavCards from '@/components/home/NavCards';
import StatsBar from '@/components/home/StatsBar';
import TipOfTheDay from '@/components/home/TipOfTheDay';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Alliance strategy portal for [ViKF] members.',
};

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <StatsBar />
      <NavCards />
      <TipOfTheDay />
    </>
  );
}
