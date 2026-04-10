import Badge from '@/components/ui/Badge';
import { heroes } from '@/data/heroes-data';

interface FormationAnalysisProps {
  slots: Array<string | null>;
}

export default function FormationAnalysis({ slots }: FormationAnalysisProps) {
  const selected = slots
    .map((id) => heroes.find((hero) => hero.id === id))
    .filter((hero): hero is (typeof heroes)[number] => Boolean(hero));

  const typeCounts = selected.reduce<Record<string, number>>((acc, hero) => {
    acc[hero.type] = (acc[hero.type] ?? 0) + 1;
    return acc;
  }, {});

  const roleCounts = selected.reduce<Record<string, number>>((acc, hero) => {
    acc[hero.role] = (acc[hero.role] ?? 0) + 1;
    return acc;
  }, {});

  const bonuses: string[] = [];
  if (Object.values(typeCounts).some((count) => count >= 3)) bonuses.push('Type synergy active: 3+ same-type heroes.');
  if ((roleCounts.Defender ?? 0) >= 2) bonuses.push('Frontline stability: 2+ defenders.');
  if ((roleCounts.Support ?? 0) >= 1) bonuses.push('Support utility online.');

  const warnings: string[] = [];
  if (selected.length < 5) warnings.push('Formation incomplete: assign all 5 slots.');
  if ((roleCounts.Defender ?? 0) === 0) warnings.push('No defender selected. Frontline may collapse early.');
  if ((roleCounts.Attacker ?? 0) < 2) warnings.push('Low burst profile: consider adding attackers.');

  return (
    <section className="space-y-3 rounded-xl border border-border bg-bg-secondary/80 p-4">
      <h3 className="text-lg font-semibold">Formation Analysis</h3>

      <div className="flex flex-wrap gap-2">
        {Object.entries(typeCounts).map(([type, count]) => (
          <Badge key={type}>{type}: {count}</Badge>
        ))}
      </div>

      <div>
        <p className="text-sm font-semibold text-accent">Bonuses</p>
        <ul className="mt-1 space-y-1 text-sm text-text-secondary">
          {(bonuses.length ? bonuses : ['No major bonuses yet.']).map((entry) => (
            <li key={entry} className="rounded-md border border-border bg-bg-primary/35 px-3 py-2">{entry}</li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-sm font-semibold text-amber-200">Warnings</p>
        <ul className="mt-1 space-y-1 text-sm text-text-secondary">
          {(warnings.length ? warnings : ['No major warnings detected.']).map((entry) => (
            <li key={entry} className="rounded-md border border-border bg-bg-primary/35 px-3 py-2">{entry}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
