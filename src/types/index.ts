export type HeroType = 'Tank' | 'Aircraft' | 'Missile';
export type Rarity = 'UR' | 'SSR' | 'SR';
export type Tier = 'SS' | 'S' | 'A' | 'B' | 'C';

export interface Hero {
  id: string;
  name: string;
  type: HeroType;
  rarity: Rarity;
  tier: Tier;
  whyGood: string;
  bestPairings: string[];
  usageTips: {
    pvp: string;
    pve: string;
    events: string;
  };
  recommendedGear: string;
}

export type EventFrequency = 'daily' | 'weekly' | 'biweekly' | 'monthly';

export interface EventStrategy {
  title: string;
  description: string;
}

export interface GameEvent {
  id: string;
  name: string;
  icon: string;
  frequency: EventFrequency;
  description: string;
  strategies: EventStrategy[];
  daysActive?: string[];
}

export interface Tip {
  id: number;
  category: string;
  emoji: string;
  text: string;
}

export type TermCategory = 'abbreviation' | 'slang' | 'mechanic';

export interface Term {
  term: string;
  aliases: string[];
  definition: string;
  category: TermCategory;
}

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: Difficulty;
  points: number;
  imageSrc?: string;
  imageAlt?: string;
}
