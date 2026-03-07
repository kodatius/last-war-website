import TierBadge from '@/components/ui/TierBadge';
import { Hero, Tier } from '@/types';
import HeroCard from './HeroCard';

interface TierSectionProps {
  tier: Tier;
  heroes: Hero[];
}

export default function TierSection({ tier, heroes }: TierSectionProps) {
  if (heroes.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <TierBadge tier={tier} />
        <h2 className="text-2xl font-semibold">{tier} Tier</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {heroes.map((hero) => (
          <HeroCard key={hero.id} hero={hero} />
        ))}
      </div>
    </section>
  );
}
