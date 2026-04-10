'use client';

import LocalImage from '@/components/ui/LocalImage';
import { img } from '@/lib/prefix';
import type { Hero } from '@/types';

interface HeroSelectorProps {
  heroes: Hero[];
  value: string;
  onChange: (heroId: string) => void;
  label: string;
}

export default function HeroSelector({ heroes, value, onChange, label }: HeroSelectorProps) {
  const activeHero = heroes.find((hero) => hero.id === value);

  return (
    <label className="space-y-2 text-sm text-text-secondary">
      {label}
      <div className="flex items-center gap-3 rounded-lg border border-border bg-bg-primary/35 p-2">
        <LocalImage
          src={img(`/images/heroes/${activeHero?.id ?? heroes[0]?.id}.png`)}
          alt={`${activeHero?.name ?? 'Hero'} portrait`}
          width={52}
          height={52}
          containerClassName="h-12 w-12 overflow-hidden rounded-md border border-border bg-bg-secondary"
          className="h-full w-full object-cover"
          fallbackText="H"
        />
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-lg border border-border bg-bg-secondary px-3 py-2 text-text-primary outline-none"
        >
          {heroes.map((hero) => (
            <option key={hero.id} value={hero.id}>
              {hero.name}
            </option>
          ))}
        </select>
      </div>
    </label>
  );
}
