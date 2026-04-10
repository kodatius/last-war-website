import SectionHeading from '@/components/ui/SectionHeading';
import ResourceClient from './ResourceClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resource Calculator',
  description: 'Calculate resources needed for building upgrades in Last War: Survival.',
};

export default function ResourcesPage() {
  return (
    <div className="container-shell py-16 sm:py-24">
      <SectionHeading title="Resource Calculator" subtitle="Pick a building and level range. See exactly what it costs." />
      <ResourceClient />
    </div>
  );
}
