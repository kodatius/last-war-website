import {
  Formation as RawFormation,
  FormationArchetype,
  formations as rawFormations,
} from './raw/counters-data';

export type FormationCategory = 'tank' | 'aircraft' | 'missile' | 'mixed';

export interface SquadFormation {
  id: string;
  archetype: FormationArchetype;
  name: string;
  category: FormationCategory;
  heroes: [string, string, string, string, string];
  description: string;
  tags: string[];
  synergyNotes: string;
}

export interface FormationCategoryGroup {
  key: FormationCategory;
  label: string;
  formations: SquadFormation[];
}

const heroNameOverrides: Record<string, string> = {
  dva: 'DVA',
  mcgregor: 'McGregor',
};

const slotOrder = ['front-left', 'front-right', 'rear-left', 'center', 'rear-right'] as const;

const categoryLabelMap: Record<FormationCategory, string> = {
  tank: 'Tank Squads',
  aircraft: 'Aircraft Squads',
  missile: 'Missile Squads',
  mixed: 'Mixed Squads',
};

function toTitleCase(value: string): string {
  return value
    .split('-')
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(' ');
}

function heroIdToName(heroId: string): string {
  return heroNameOverrides[heroId] ?? toTitleCase(heroId);
}

function detectTags(formation: RawFormation): string[] {
  const tags = new Set<string>();
  tags.add(formation.costTier);
  tags.add(formation.difficulty);

  if (formation.costTier === 'F2P' || formation.costTier === 'Low-spend') {
    tags.add('F2P Friendly');
  }
  if (formation.description.toLowerCase().includes('meta')) {
    tags.add('Meta');
  }
  if (formation.weaknesses.some((item) => item.toLowerCase().includes('aircraft'))) {
    tags.add('Anti-Aircraft');
  }
  if (formation.strengths.some((item) => item.toLowerCase().includes('burst'))) {
    tags.add('Burst');
  }
  if (formation.strengths.some((item) => item.toLowerCase().includes('durable'))) {
    tags.add('Durable');
  }

  return [...tags];
}

function toCategory(primaryType: RawFormation['primaryType']): FormationCategory {
  if (primaryType === 'Tank') return 'tank';
  if (primaryType === 'Aircraft') return 'aircraft';
  if (primaryType === 'Missile') return 'missile';
  return 'mixed';
}

function toSlotArray(formation: RawFormation): [string, string, string, string, string] {
  const slots = slotOrder.map((position) => {
    const slot = formation.slots.find((entry) => entry.position === position);
    return heroIdToName(slot?.heroId ?? 'unknown');
  });

  return slots as [string, string, string, string, string];
}

export const formations: SquadFormation[] = rawFormations.map((formation) => ({
  id: formation.archetype.toLowerCase(),
  archetype: formation.archetype,
  name: formation.name,
  category: toCategory(formation.primaryType),
  heroes: toSlotArray(formation),
  description: formation.description,
  tags: detectTags(formation),
  synergyNotes: formation.strengths[0] ?? 'Flexible formation with balanced damage and survivability.',
}));

export const formationCategories: FormationCategoryGroup[] = (['tank', 'aircraft', 'missile', 'mixed'] as const).map((key) => ({
  key,
  label: categoryLabelMap[key],
  formations: formations.filter((formation) => formation.category === key),
}));
