import SectionHeading from '@/components/ui/SectionHeading';
import SpeedupClient from './SpeedupClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Speedup Calculator',
  description: 'Calculate your total speedup time across all categories. Plan when to burn speedups for maximum VS and event impact.',
};

export default function SpeedupsPage() {
  return (
    <div className="container-shell py-16 sm:py-24">
      <SectionHeading title="Speedup Calculator" subtitle="Enter your speedups by category. Know exactly what you have before you burn them." />
      <SpeedupClient />
    </div>
  );
}
