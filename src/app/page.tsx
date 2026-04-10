import HeroBanner from '@/components/home/HeroBanner';
import NavCards from '@/components/home/NavCards';
import StatsBar from '@/components/home/StatsBar';
import TipOfTheDay from '@/components/home/TipOfTheDay';
import LocalImage from '@/components/ui/LocalImage';
import { img } from '@/lib/prefix';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Strategic command center for [ViKF] alliance on Last War: Survival Server #2058. Access hero guides, event strategies, squad formations, tips, and quizzes.',
};

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <StatsBar />
      <section className="container-shell py-10 sm:py-14">
        <div className="overflow-hidden rounded-xl border border-border bg-bg-secondary">
          <LocalImage
            src={img('/images/banners/map.png')}
            alt="World map tactical view"
            width={1024}
            height={558}
            containerClassName="h-[220px] sm:h-[320px]"
            className="h-full w-full object-cover"
            fallbackText="World map"
          />
        </div>
      </section>
      <NavCards />
      <TipOfTheDay />
    </>
  );
}
