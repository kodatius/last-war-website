import ExpandableCard from '@/components/ui/ExpandableCard';
import LocalImage from '@/components/ui/LocalImage';
import { SquadFormation } from '@/data/formations-data';
import { img } from '@/lib/prefix';
import { CircleHelp } from 'lucide-react';

interface FormationCardProps {
  formation: SquadFormation;
}

const slotLabels = ['Front Left', 'Front Right', 'Rear Left', 'Rear Center', 'Rear Right'];

function heroNameToId(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '');
}

export default function FormationCard({ formation }: FormationCardProps) {
  return (
    <ExpandableCard
      header={
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-semibold">{formation.name}</h3>
            <span className="rounded-full border border-accent/35 bg-accent/10 px-2 py-0.5 text-[11px] uppercase tracking-[0.1em] text-accent">
              {formation.category}
            </span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {formation.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="rounded-full border border-border bg-bg-tertiary px-2 py-0.5 text-[11px] text-text-secondary">
                {tag}
              </span>
            ))}
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-5">
        {formation.heroes.map((hero, index) => (
          <div key={`${hero}-${index}`} className="rounded-md border border-border bg-bg-tertiary p-2 text-center">
            <p className="text-[10px] uppercase text-text-secondary">{slotLabels[index]}</p>
            <LocalImage
              src={img(`/images/heroes/${heroNameToId(hero)}.png`)}
              alt={hero}
              width={72}
              height={72}
              containerClassName="mx-auto mt-2 h-14 w-14 overflow-hidden rounded-md border border-border bg-bg-secondary"
              className="h-full w-full object-cover"
              fallbackText={hero.slice(0, 2).toUpperCase()}
            />
            <p className="mt-2 text-xs sm:text-sm">{hero}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm text-text-secondary">{formation.description}</p>
      <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-border bg-bg-tertiary px-3 py-2 text-xs text-text-secondary">
        <CircleHelp size={14} className="text-accent" />
        <span title={formation.synergyNotes}>Why this works: {formation.synergyNotes}</span>
      </div>
    </ExpandableCard>
  );
}
