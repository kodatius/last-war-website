import GlassCard from '@/components/ui/GlassCard';
import LocalImage from '@/components/ui/LocalImage';
import { heroes } from '@/data/heroes-data';
import { img } from '@/lib/prefix';
import { Crown } from 'lucide-react';
import Link from 'next/link';

function getSpotlightHero() {
  const ssTier = heroes.filter((hero) => hero.tier === 'SS');
  if (ssTier.length === 0) return heroes[0];
  const daySeed = new Date().getDate();
  return ssTier[daySeed % ssTier.length];
}

export default function HeroSpotlight() {
  const hero = getSpotlightHero();

  return (
    <GlassCard className="h-full">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Hero Spotlight</p>
        <Crown size={16} className="text-accent" />
      </div>
      <div className="mt-4 flex gap-4">
        <LocalImage
          src={img(`/images/heroes/${hero.id}.png`)}
          alt={hero.name}
          width={88}
          height={88}
          containerClassName="h-22 w-22 shrink-0 overflow-hidden rounded-lg border border-border/80 bg-bg-tertiary"
          className="h-full w-full object-cover"
          fallbackText={hero.name.slice(0, 2)}
        />
        <div className="min-w-0">
          <h3 className="font-hero text-2xl font-bold leading-none">{hero.name}</h3>
          <p className="mt-1 text-xs uppercase tracking-[0.14em] text-text-secondary">
            {hero.tier} Tier {hero.type}
          </p>
          <p className="mt-3 line-clamp-3 text-sm text-text-secondary">{hero.whyGood}</p>
        </div>
      </div>
      <Link href="/heroes" className="mt-5 inline-flex text-sm text-neon-blue hover:text-neon-green">
        View full database -&gt;
      </Link>
    </GlassCard>
  );
}
