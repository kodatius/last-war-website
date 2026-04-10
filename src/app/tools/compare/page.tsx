import SectionHeading from '@/components/ui/SectionHeading';
import { img } from '@/lib/prefix';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const CompareClient = dynamic(() => import('@/app/tools/compare/CompareClient'));

export const metadata: Metadata = {
  title: 'Hero Compare',
  description: 'Compare hero stats side-by-side and identify role gaps.',
  openGraph: {
    title: 'Hero Compare | [ViKF] Alliance',
    description: 'Analyze up to 4 heroes with highlighted stat differences.',
    images: [img('/images/heroes/kimberly.png')],
  },
};

export default function ComparePage() {
  return (
    <div className="container-shell py-16 sm:py-24">
      <SectionHeading title="Hero Compare" subtitle="Compare 2-4 heroes and pick stronger lineups by role and stat profile." />
      <CompareClient />
    </div>
  );
}
