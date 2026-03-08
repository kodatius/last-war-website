export type HeroType = 'Tank' | 'Aircraft' | 'Missile';
export type Rarity = 'UR' | 'SSR' | 'SR';
export type Tier = 'SS' | 'S' | 'A' | 'B' | 'C';
export type HeroRole = 'Attacker' | 'Defender' | 'Support';

export interface HeroSkill {
  name: string;
  description: string;
  type: 'active' | 'passive';
}

export interface HeroStats {
  attack: number;
  defense: number;
  hp: number;
  command: number;
}

export interface Hero {
  id: string;
  name: string;
  title: string;
  type: HeroType;
  rarity: Rarity;
  tier: Tier;
  role: HeroRole;
  isMeta: boolean;
  whyGood: string;
  bestPairings: string[];
  usageTips: {
    pvp: string;
    pve: string;
    events: string;
  };
  recommendedGear: {
    weapon: string;
    armor: string;
    accessory: string;
  };
  skills: HeroSkill[];
  stats: HeroStats;
  strongAgainst: string[];
  weakAgainst: string[];
  tags: string[];
  obtainMethod: string;
  exclusiveWeapon: string | null;
}

export interface SearchItem {
  id: string;
  title: string;
  description: string;
  category: 'hero' | 'event' | 'tip' | 'term' | 'tool' | 'season' | 'quiz';
  href: string;
  tags?: string[];
}

export interface QuizScore {
  id: string;
  player: string;
  date: string;
  mode: 'quick' | 'daily' | 'category';
  score: number;
  total: number;
}

export interface Formation {
  id: string;
  name: string;
  slots: Array<string | null>;
  tags: string[];
  notes?: string;
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
export type QuizMode = 'quick' | 'daily' | 'category';
export type QuizCategory =
  | 'heroes'
  | 'mechanics'
  | 'events'
  | 'strategy'
  | 'resources'
  | 'alliance'
  | 'base'
  | 'gear'
  | 'drone';

export interface QuizQuestion {
  id: number;
  key: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: Difficulty;
  points: number;
  category: QuizCategory;
  imageSrc?: string;
  imageAlt?: string;
}

export interface SeasonWeek {
  week: number;
  title: string;
  phase: 'Foundation' | 'Development' | 'Conflict' | 'Finals';
  dateRange: string;
  keyEvents: string[];
  primaryFocus: string;
  tips: string[];
  featuredMechanic: string | null;
}

export interface SeasonOverviewData {
  seasonNumber: number;
  name: string;
  theme: string;
  tagline: string;
  startDate: string;
  endDate: string;
  durationWeeks: number;
  lore: string;
  newFeatures: string[];
  mechanics: Array<{
    name: string;
    description: string;
    howToUse: string;
    tips: string[];
  }>;
  weekSummaries: SeasonWeek[];
  generalTips: string[];
}
