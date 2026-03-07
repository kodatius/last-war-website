import type { Hero } from '@/types';
import { heroesEnhanced as rawHeroes } from './raw/heroes-enhanced';

export const heroes: Hero[] = rawHeroes.map((hero) => ({
  id: hero.id,
  name: hero.name,
  title: hero.title,
  type: hero.type,
  rarity: hero.rarity,
  tier: hero.tier,
  role: hero.role,
  isMeta: hero.isMeta,
  whyGood: hero.whyGood,
  bestPairings: hero.bestSquadWith,
  usageTips: {
    pvp: hero.pvpTips,
    pve: hero.pveTips,
    events: `Best in ${hero.type} event rotations. Prioritize when running ${hero.tags.includes('meta') ? 'meta' : 'specialized'} squads.`,
  },
  recommendedGear: {
    weapon: hero.role === 'Defender' ? 'Armor-first defensive weapon setup' : 'Cannon-first damage setup',
    armor: hero.role === 'Defender' ? 'Armor to 5★ before accessories' : 'Armor after weapon core upgrades',
    accessory: 'Chip + Radar with role-tuned substats',
  },
  skills: hero.skills,
  stats: hero.stats,
  strongAgainst: hero.strongAgainst,
  weakAgainst: hero.weakAgainst,
  tags: hero.tags,
  obtainMethod: hero.obtainMethod,
  exclusiveWeapon: hero.exclusiveWeapon,
}));

export const heroTypes = ['Tank', 'Aircraft', 'Missile'] as const;
export const heroRarities = ['UR', 'SSR', 'SR'] as const;
export const heroTiers = ['SS', 'S', 'A', 'B', 'C'] as const;
