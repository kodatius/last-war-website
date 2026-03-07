import { ALLIANCE_INFO } from '@/lib/constants';
import LocalImage from '@/components/ui/LocalImage';
import { img } from '@/lib/prefix';
import { ChevronDown } from 'lucide-react';
import DiscordButton from '../ui/DiscordButton';

export default function HeroBanner() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden border-b border-border pt-16">
      <LocalImage
        src={img('/images/banners/map.png')}
        alt="Last War world map"
        width={1024}
        height={558}
        loading="eager"
        containerClassName="absolute inset-0"
        className="h-full w-full object-cover opacity-25"
        fallbackClassName="opacity-30"
        fallbackText="World map"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,160,23,0.18),transparent_50%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/20 to-bg-primary" />

      <div className="container-shell relative z-10 w-full py-20 text-center">
        <p className="font-mono text-sm text-text-secondary">Server {ALLIANCE_INFO.server}</p>
        <div className="mx-auto mt-4 h-20 w-20 overflow-hidden rounded-xl border border-border bg-bg-tertiary sm:h-24 sm:w-24">
          <LocalImage
            src={img('/images/ui/logo.png')}
            alt="Last War Survival logo"
            width={96}
            height={96}
            loading="eager"
            className="h-full w-full object-cover"
            containerClassName="h-full w-full"
            fallbackText="LW"
          />
        </div>
        <h1 className="mt-4 text-5xl font-bold tracking-tight text-accent sm:text-7xl">{ALLIANCE_INFO.name}</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-text-primary sm:text-xl">{ALLIANCE_INFO.tagline}</p>
        <DiscordButton className="mt-8" />
      </div>

      <ChevronDown className="absolute bottom-6 left-1/2 -translate-x-1/2 text-accent" />
    </section>
  );
}
