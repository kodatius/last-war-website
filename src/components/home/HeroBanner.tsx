import { ALLIANCE_INFO } from '@/lib/constants';
import { ChevronDown } from 'lucide-react';
import DiscordButton from '../ui/DiscordButton';

export default function HeroBanner() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden border-b border-border pt-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,160,23,0.18),transparent_50%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg-primary" />

      <div className="container-shell relative z-10 w-full py-20 text-center">
        <p className="font-mono text-sm text-text-secondary">Server {ALLIANCE_INFO.server}</p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight text-accent sm:text-7xl">{ALLIANCE_INFO.name}</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-text-primary sm:text-xl">{ALLIANCE_INFO.tagline}</p>
        <DiscordButton className="mt-8" />
      </div>

      <ChevronDown className="absolute bottom-6 left-1/2 -translate-x-1/2 text-accent" />
    </section>
  );
}
