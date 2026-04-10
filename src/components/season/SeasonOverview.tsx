import Badge from '@/components/ui/Badge';
import type { SeasonOverviewData } from '@/types';

interface SeasonOverviewProps {
  season: SeasonOverviewData;
}

export default function SeasonOverview({ season }: SeasonOverviewProps) {
  return (
    <section className="rounded-xl border border-border bg-bg-secondary/80 p-5 sm:p-6">
      <p className="text-sm uppercase tracking-widest text-accent">Season {season.seasonNumber}</p>
      <h2 className="mt-1 text-2xl font-semibold">{season.name}</h2>
      <p className="mt-2 text-sm text-text-secondary">{season.tagline}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge tone="accent">{season.theme}</Badge>
        <Badge>{season.startDate}</Badge>
        <Badge>{season.endDate}</Badge>
        <Badge>{season.durationWeeks} Weeks</Badge>
      </div>
      <p className="mt-4 text-sm text-text-secondary">{season.lore}</p>

      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        {season.newFeatures.slice(0, 8).map((feature) => (
          <div key={feature} className="rounded-lg border border-border bg-bg-primary/40 px-3 py-2 text-sm">
            {feature}
          </div>
        ))}
      </div>
    </section>
  );
}
