import SectionHeading from '@/components/ui/SectionHeading';
import { img } from '@/lib/prefix';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const BuilderClient = dynamic(() => import('@/app/tools/builder/BuilderClient'));

export const metadata: Metadata = {
  title: 'Formation Builder',
  description: 'Build and analyze lineups with type balance and synergy checks.',
  openGraph: {
    title: 'Formation Builder | [ViKF] Alliance',
    description: 'Interactive 2+3 slot formation planner with local saves.',
    images: [img('/images/banners/map.png')],
  },
};

export default function BuilderPage() {
  return (
    <div className="container-shell py-16 sm:py-24">
      <SectionHeading title="Formation Builder" subtitle="Build a five-slot lineup, evaluate synergy, and save your best comps." />
      <BuilderClient />
    </div>
  );
}
