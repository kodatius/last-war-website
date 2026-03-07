import AllianceDashboard from '@/components/home/AllianceDashboard';
import HeroBanner from '@/components/home/HeroBanner';
import HeroSpotlight from '@/components/home/HeroSpotlight';
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
    <div className="space-y-6">
      <HeroBanner />
      <StatsBar />
      <AllianceDashboard />
      <NavCards />
      <section className="grid gap-4 pb-12 sm:pb-16 lg:grid-cols-2">
        <TipOfTheDay />
        <HeroSpotlight />
      </section>
    </div>
  );
}
