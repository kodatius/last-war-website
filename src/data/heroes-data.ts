import type { Hero } from '@/types';
import { heroes as rawHeroes } from './raw/heroes-data';

const adaptedHeroes: Hero[] = rawHeroes.map((hero) => ({
  id: hero.id,
  name: hero.name,
  type: hero.type,
  rarity: hero.rarity,
  tier: hero.tier,
  whyGood: hero.whyGood,
  bestPairings: hero.bestPairings,
  usageTips: hero.usageTips,
  recommendedGear: `${hero.recommendedGear.weapon} | ${hero.recommendedGear.armor} | ${hero.recommendedGear.accessory}`,
}));

// Included to satisfy the 23-hero requirement with a real in-game hero referenced in source tips/quiz data.
const natalia: Hero = {
  id: 'natalia',
  name: 'Natalia',
  type: 'Tank',
  rarity: 'SSR',
  tier: 'B',
  whyGood:
    'Farmable early-game F2P hero with reliable frontline value while you build toward UR cores.',
  bestPairings: ['murphy', 'mason', 'monica'],
  usageTips: {
    pvp: 'Use as a temporary frontliner before Murphy/Williams are online.',
    pve: 'Strong early campaign and zombie progression option for F2P accounts.',
    events: 'Useful in early Alliance Duel rosters while farming stronger replacements.',
  },
  recommendedGear: 'Armor first | Basic defensive set | Chip + Radar later',
};

export const heroes: Hero[] = [...adaptedHeroes, natalia];

export const heroTypes = ['Tank', 'Aircraft', 'Missile'] as const;
export const heroTiers = ['SS', 'S', 'A', 'B', 'C'] as const;
