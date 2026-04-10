import DiscordButton from '@/components/ui/DiscordButton';
import LocalImage from '@/components/ui/LocalImage';
import SectionHeading from '@/components/ui/SectionHeading';
import { img } from '@/lib/prefix';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'About the [FATE] alliance knowledge base and leadership team.',
  openGraph: {
    title: 'About | [FATE] Alliance',
    description: 'About the [FATE] alliance knowledge base and leadership team.',
    images: [img('/images/banners/map.png')],
  },
};

const aboutHeroIds = [
  'adam',
  'carlie',
  'dva',
  'fiona',
  'kimberly',
  'lucius',
  'marshall',
  'mason',
  'mcgregor',
  'monica',
  'morrison',
  'murphy',
  'richard',
  'sarah',
  'scarlett',
  'schuyler',
  'stetmann',
  'swift',
  'tesla',
  'venom',
  'violet',
  'williams',
] as const;

export default function AboutPage() {
  return (
    <div className="container-shell py-16 sm:py-24">
      <SectionHeading title="About [FATE]" subtitle="Private strategy base for Server #2058." />
      <div className="mb-6 overflow-hidden rounded-xl border border-border bg-bg-secondary shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
        <LocalImage
          src={img('/images/banners/map.png')}
          alt="Server strategy map"
          width={1024}
          height={558}
          loading="eager"
          containerClassName="h-[180px] sm:h-[260px]"
          className="h-full w-full object-cover"
          fallbackText="Strategy map"
        />
      </div>
      <div className="glass-card space-y-6 rounded-xl border border-glass-border p-6 text-text-secondary">
        <div className="inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-md border border-border bg-bg-tertiary">
          <LocalImage
            src={img('/images/ui/logo.png')}
            alt="Last War logo"
            width={56}
            height={56}
            loading="eager"
            className="h-full w-full object-cover"
            containerClassName="h-full w-full"
            fallbackText="LW"
          />
        </div>
        <p>
          [FATE] is an alliance built on disciplined event execution, data-driven hero investment, and strong member coordination. This site consolidates our playbook into one source of truth.
        </p>
        <p>Server: #2058</p>
        <p>Built by Toxzin and the [FATE] leadership team.</p>
        <p>Powered by Next.js static export, deployed on GitHub Pages.</p>
        <DiscordButton className="w-full sm:w-auto" />
      </div>
      <div className="glass-card mt-8 rounded-xl border border-glass-border p-4 sm:p-6">
        <h2 className="text-xl font-semibold">Hero Roster</h2>
        <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-8">
          {aboutHeroIds.map((heroId) => (
            <LocalImage
              key={heroId}
              src={img(`/images/heroes/${heroId}.png`)}
              alt={`${heroId} portrait`}
              width={80}
              height={80}
              containerClassName="aspect-square overflow-hidden rounded-md border border-border bg-bg-tertiary"
              className="h-full w-full object-cover"
              fallbackText={heroId.slice(0, 2).toUpperCase()}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
