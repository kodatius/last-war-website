import Badge from '@/components/ui/Badge';
import LocalImage from '@/components/ui/LocalImage';
import { img } from '@/lib/prefix';
import type { Hero } from '@/types';

interface ComparisonViewProps {
  heroes: Hero[];
}

const statKeys: Array<keyof Hero['stats']> = ['attack', 'defense', 'hp', 'command'];

export default function ComparisonView({ heroes }: ComparisonViewProps) {
  if (heroes.length < 2) {
    return <p className="text-sm text-text-secondary">Select at least 2 heroes to compare.</p>;
  }

  const statExtremes = statKeys.reduce<Record<string, { min: number; max: number }>>((acc, key) => {
    const values = heroes.map((hero) => hero.stats[key]);
    acc[key] = { min: Math.min(...values), max: Math.max(...values) };
    return acc;
  }, {});

  return (
    <section className="overflow-hidden rounded-xl border border-border bg-bg-secondary/80">
      <div className="grid gap-px bg-border md:grid-cols-2 xl:grid-cols-4">
        {heroes.map((hero) => (
          <article key={hero.id} className="space-y-3 bg-bg-secondary p-4">
            <div className="flex items-center gap-3">
              <LocalImage
                src={img(`/images/heroes/${hero.id}.png`)}
                alt={`${hero.name} portrait`}
                width={56}
                height={56}
                containerClassName="h-14 w-14 overflow-hidden rounded-md border border-border bg-bg-primary"
                className="h-full w-full object-cover"
                fallbackText={hero.name.slice(0, 2).toUpperCase()}
              />
              <div>
                <p className="font-semibold">{hero.name}</p>
                <p className="text-xs text-text-secondary">{hero.role}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              <Badge>{hero.type}</Badge>
              <Badge tone="accent">{hero.rarity}</Badge>
              <Badge>{hero.tier}</Badge>
            </div>

            <div className="space-y-1 text-sm">
              {statKeys.map((key) => {
                const value = hero.stats[key];
                const extreme = statExtremes[key];
                const tone = value === extreme.max ? 'text-emerald-300' : value === extreme.min ? 'text-red-300' : 'text-text-primary';
                return (
                  <p key={key} className="flex items-center justify-between rounded-md border border-border bg-bg-primary/35 px-2 py-1">
                    <span className="capitalize text-text-secondary">{key}</span>
                    <span className={tone}>{value}</span>
                  </p>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
