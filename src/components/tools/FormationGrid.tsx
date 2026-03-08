'use client';

import LocalImage from '@/components/ui/LocalImage';
import { heroes } from '@/data/heroes-data';
import { img } from '@/lib/prefix';
import { cn } from '@/lib/utils';

interface FormationGridProps {
  slots: Array<string | null>;
  onSelectSlot: (index: number) => void;
  activeSlot: number | null;
}

const labels = ['Front Left', 'Front Right', 'Rear Left', 'Rear Center', 'Rear Right'];

export default function FormationGrid({ slots, onSelectSlot, activeSlot }: FormationGridProps) {
  const getHero = (id: string | null) => heroes.find((hero) => hero.id === id);

  return (
    <section className="rounded-xl border border-border bg-bg-secondary/80 p-4">
      <h3 className="mb-3 text-lg font-semibold">Formation Grid</h3>

      <div className="grid grid-cols-2 gap-3">
        {[0, 1].map((index) => {
          const hero = getHero(slots[index]);
          return (
            <button
              key={labels[index]}
              type="button"
              onClick={() => onSelectSlot(index)}
              className={cn(
                'rounded-lg border p-3 text-left',
                activeSlot === index ? 'border-accent bg-accent/10' : 'border-border bg-bg-primary/35 hover:border-accent/40'
              )}
            >
              <p className="mb-2 text-xs text-text-secondary">{labels[index]}</p>
              {hero ? (
                <div className="flex items-center gap-2">
                  <LocalImage
                    src={img(`/images/heroes/${hero.id}.png`)}
                    alt={`${hero.name} portrait`}
                    width={36}
                    height={36}
                    containerClassName="h-9 w-9 overflow-hidden rounded-md border border-border bg-bg-secondary"
                    className="h-full w-full object-cover"
                    fallbackText={hero.name.slice(0, 2).toUpperCase()}
                  />
                  <span className="text-sm">{hero.name}</span>
                </div>
              ) : (
                <span className="text-sm text-text-secondary">Tap to assign</span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-3 grid grid-cols-3 gap-3">
        {[2, 3, 4].map((index) => {
          const hero = getHero(slots[index]);
          return (
            <button
              key={labels[index]}
              type="button"
              onClick={() => onSelectSlot(index)}
              className={cn(
                'rounded-lg border p-3 text-left',
                activeSlot === index ? 'border-accent bg-accent/10' : 'border-border bg-bg-primary/35 hover:border-accent/40'
              )}
            >
              <p className="mb-2 text-xs text-text-secondary">{labels[index]}</p>
              {hero ? (
                <div className="flex items-center gap-2">
                  <LocalImage
                    src={img(`/images/heroes/${hero.id}.png`)}
                    alt={`${hero.name} portrait`}
                    width={34}
                    height={34}
                    containerClassName="h-8 w-8 overflow-hidden rounded-md border border-border bg-bg-secondary"
                    className="h-full w-full object-cover"
                    fallbackText={hero.name.slice(0, 2).toUpperCase()}
                  />
                  <span className="text-xs leading-tight">{hero.name}</span>
                </div>
              ) : (
                <span className="text-xs text-text-secondary">Assign</span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
