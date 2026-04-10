import SectionHeading from '@/components/ui/SectionHeading';
import { img } from '@/lib/prefix';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const CalculatorsClient = dynamic(() => import('@/app/tools/calculators/CalculatorsClient'));

export const metadata: Metadata = {
  title: 'Calculators',
  description: 'Arms Race and resource optimization calculators for alliance planning.',
  openGraph: {
    title: 'Calculators | [FATE] Alliance',
    description: 'Point estimates, milestone planning, and resource timelines.',
    images: [img('/images/banners/map.png')],
  },
};

export default function CalculatorsPage() {
  return (
    <div className="container-shell py-16 sm:py-24">
      <SectionHeading title="Calculators" subtitle="Run point and resource simulations before event windows." />
      <CalculatorsClient />
    </div>
  );
}
