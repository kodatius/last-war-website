import DiscordButton from '@/components/ui/DiscordButton';
import SectionHeading from '@/components/ui/SectionHeading';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'About the [ViKF] alliance knowledge base and leadership team.',
};

export default function AboutPage() {
  return (
    <div className="container-shell py-16 sm:py-24">
      <SectionHeading title="About [ViKF]" subtitle="Private strategy base for Server #2058." />
      <div className="space-y-6 rounded-lg border border-border bg-bg-secondary p-6 text-text-secondary">
        <p>
          [ViKF] is an alliance built on disciplined event execution, data-driven hero investment, and strong member coordination. This site consolidates our playbook into one source of truth.
        </p>
        <p>Server: #2058</p>
        <p>Built by Toxzin and the [ViKF] leadership team.</p>
        <p>Powered by Next.js, deployed on Vercel.</p>
        <DiscordButton className="w-full sm:w-auto" />
      </div>
    </div>
  );
}
