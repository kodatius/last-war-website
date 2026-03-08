import Badge from '@/components/ui/Badge';
import type { SeasonWeek } from '@/types';

interface WeekDetailProps {
  week: SeasonWeek;
}

export default function WeekDetail({ week }: WeekDetailProps) {
  return (
    <section className="rounded-xl border border-border bg-bg-secondary/80 p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="accent">Week {week.week}</Badge>
        <Badge>{week.phase}</Badge>
        <Badge>{week.dateRange}</Badge>
        {week.featuredMechanic ? <Badge tone="warning">{week.featuredMechanic}</Badge> : null}
      </div>

      <h3 className="mt-3 text-xl font-semibold">{week.title}</h3>
      <p className="mt-1 text-sm text-text-secondary">{week.primaryFocus}</p>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div>
          <h4 className="text-sm font-semibold text-accent">Key Events</h4>
          <ul className="mt-2 space-y-2 text-sm text-text-secondary">
            {week.keyEvents.map((item) => (
              <li key={item} className="rounded-md border border-border bg-bg-primary/35 px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-accent">Commander Tips</h4>
          <ul className="mt-2 space-y-2 text-sm text-text-secondary">
            {week.tips.map((tip) => (
              <li key={tip} className="rounded-md border border-border bg-bg-primary/35 px-3 py-2">
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
