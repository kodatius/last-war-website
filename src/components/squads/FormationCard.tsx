import Card from '@/components/ui/Card';
import LocalImage from '@/components/ui/LocalImage';
import { img } from '@/lib/prefix';

interface FormationCardProps {
  name: string;
  heroes: string[];
  description: string;
}

const slotLabels = ['Front Left', 'Front Right', 'Rear Left', 'Rear Center', 'Rear Right'];

function heroNameToId(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '');
}

export default function FormationCard({ name, heroes, description }: FormationCardProps) {
  return (
    <Card>
      <h3 className="text-xl font-semibold">{name}</h3>
      <div className="mt-3 grid grid-cols-2 gap-2 text-sm sm:grid-cols-5">
        {heroes.map((hero, index) => (
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
      <p className="mt-3 text-sm text-text-secondary">{description}</p>
    </Card>
  );
}
