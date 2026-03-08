import SectionHeading from '@/components/ui/SectionHeading';
import { img } from '@/lib/prefix';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const SeasonClient = dynamic(() => import('@/app/season/SeasonClient'));

export const metadata: Metadata = {
  title: 'Season Hub',
  description: 'Season 5 week-by-week map, events, and tactical focus.',
  openGraph: {
    title: 'Season Hub | [ViKF] Alliance',
    description: 'Season planning hub with timeline, week details, and key mechanics.',
    images: [img('/images/banners/season-map.jpg')],
  },
};

export default function SeasonPage() {
  return (
    <div className="container-shell py-16 sm:py-24">
      <SectionHeading title="Season Hub" subtitle="Track each week, prepare objective timing, and avoid resource waste." />
      <SeasonClient />
    </div>
  );
}
