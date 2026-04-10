import { formations } from './formations-data';
import {
  counterRelations,
  FormationArchetype,
  getBestCounterFormation,
} from './raw/counters-data';

export interface CounterPickResult {
  enemyArchetype: FormationArchetype;
  counterFormationId: string;
  counterFormationName: string;
  effectiveness: 'Hard Counter' | 'Soft Counter' | 'Situational';
  explanation: string;
  mechanics: string[];
  tips: string[];
}

export const counterPickerOptions = formations.map((formation) => ({
  archetype: formation.archetype,
  name: formation.name,
}));

export const counterEntries: CounterPickResult[] = counterRelations.map((relation) => {
  const counter = formations.find((item) => item.archetype === relation.counterArchetype);
  return {
    enemyArchetype: relation.targetArchetype,
    counterFormationId: counter?.id ?? relation.counterArchetype.toLowerCase(),
    counterFormationName: counter?.name ?? relation.counterArchetype,
    effectiveness: relation.effectiveness,
    explanation: relation.whyItWorks,
    mechanics: relation.keyMechanics,
    tips: relation.tips,
  };
});

export function getCounterPick(archetype: FormationArchetype): CounterPickResult | null {
  const best = getBestCounterFormation(archetype);
  if (!best) return null;

  const counter = formations.find((item) => item.archetype === best.formation.archetype);
  return {
    enemyArchetype: archetype,
    counterFormationId: counter?.id ?? best.formation.archetype.toLowerCase(),
    counterFormationName: counter?.name ?? best.formation.name,
    effectiveness: best.relation.effectiveness,
    explanation: best.relation.whyItWorks,
    mechanics: best.relation.keyMechanics,
    tips: best.relation.tips,
  };
}
