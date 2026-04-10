import FormationCard from '@/components/squads/FormationCard';
import PositionGrid from '@/components/squads/PositionGrid';
import TypeTriangle from '@/components/squads/TypeTriangle';
import SectionHeading from '@/components/ui/SectionHeading';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Squads',
  description: 'Squad formation builder with detailed positioning logic, type matchup counters, and recommended hero formations for Tank, Aircraft, and Missile squads.',
};

const formations = [
  {
    name: 'F2P Tank',
    heroes: ['Murphy', 'Williams', 'Kimberly', 'Mason', 'Marshall'],
    description: 'Stable frontline with core tank synergies and consistent event performance.',
  },
  {
    name: 'Aircraft Meta',
    heroes: ['Carlie', 'Lucius', 'DVA', 'Morrison', 'Schuyler'],
    description: 'High burst and control package built for top-tier PvP pressure.',
  },
  {
    name: 'Missile',
    heroes: ['Adam', 'McGregor', 'Tesla', 'Fiona', 'Swift'],
    description: 'Strong boss and wave clear setup with missile-focused damage scaling.',
  },
];

export default function SquadsPage() {
  return (
    <div className="container-shell py-16 sm:py-24">
      <SectionHeading title="Squad Builder" subtitle="Positioning logic, type counters, and recommended formations." />
      <div className="grid gap-6 lg:grid-cols-2">
        <PositionGrid />
        <TypeTriangle />
      </div>
      <div className="mt-6 rounded-lg border border-border bg-bg-secondary p-4 text-sm text-text-secondary sm:p-6">
        Front Left, Rear Left, and Rear Center usually pressure the enemy Front Left. Use this to collapse the main tank and open their backline.
      </div>
      <div className="mt-8 grid gap-4 sm:gap-6">
        {formations.map((formation) => (
          <FormationCard key={formation.name} name={formation.name} heroes={formation.heroes} description={formation.description} />
        ))}
      </div>
    </div>
  );
}
