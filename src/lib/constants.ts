import { Difficulty, EventFrequency, HeroType, Rarity, Tier } from '@/types';

export const ALLIANCE_INFO = {
  name: '[ViKF]',
  server: '#2058',
  tagline: 'Strategy wins wars, but preparation wins servers.',
  password: '5955',
  cookieName: 'vikf_access',
  cookieValue: 'verified',
  cookieDays: 30,
} as const;

export const LINKS = {
  discord: 'https://discord.gg/S4m3mmzuKZ',
  heroImageBase: '/images/heroes',
} as const;

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/heroes', label: 'Heroes' },
  { href: '/events', label: 'Events' },
  { href: '/squads', label: 'Squads' },
  { href: '/tips', label: 'Tips' },
  { href: '/glossary', label: 'Glossary' },
  { href: '/quiz', label: 'Quiz' },
  { href: '/about', label: 'About' },
] as const;

export const TIER_COLORS: Record<Tier, string> = {
  SS: 'bg-tier-ss text-white',
  S: 'bg-tier-s text-black',
  A: 'bg-tier-a text-black',
  B: 'bg-tier-b text-black',
  C: 'bg-tier-c text-white',
};

export const FREQUENCY_COLORS: Record<EventFrequency, string> = {
  daily: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
  weekly: 'bg-blue-500/20 text-blue-300 border-blue-400/40',
  biweekly: 'bg-purple-500/20 text-purple-300 border-purple-400/40',
  monthly: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
};

export const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  easy: 'bg-green-600/20 text-green-300 border-green-400/40',
  medium: 'bg-yellow-600/20 text-yellow-300 border-yellow-400/40',
  hard: 'bg-red-600/20 text-red-300 border-red-400/40',
};

export const RARITY_COLORS: Record<Rarity, string> = {
  UR: 'bg-amber-500/20 text-amber-300 border-amber-400/40 shadow-[0_0_14px_rgba(212,160,23,0.25)]',
  SSR: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-400/40',
  SR: 'bg-sky-500/20 text-sky-300 border-sky-400/40',
};

export const TYPE_COLORS: Record<HeroType, string> = {
  Tank: 'text-type-tank',
  Aircraft: 'text-type-aircraft',
  Missile: 'text-type-missile',
};
