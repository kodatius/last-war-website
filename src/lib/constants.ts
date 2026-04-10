import { Difficulty, EventFrequency, HeroType, Rarity, Tier } from '@/types';
import { img } from '@/lib/prefix';
import type { LucideIcon } from 'lucide-react';
import {
  BookOpen,
  CalendarDays,
  FlaskConical,
  Hammer,
  HelpCircle,
  Home,
  Layers3,
  Menu,
  Swords,
  Trophy,
  Users,
  Wrench,
} from 'lucide-react';

export const ALLIANCE_INFO = {
  name: '[FATE]',
  server: '#2058',
  tagline: 'Strategy wins wars, but preparation wins servers.',
  password: '5955',
  cookieName: 'fate_access',
  cookieValue: 'verified',
  cookieDays: 30,
} as const;

export const LINKS = {
  discord: 'https://discord.gg/S4m3mmzuKZ',
  heroImageBase: img('/images/heroes'),
} as const;

export const ROUTES = {
  home: '/',
  heroes: '/heroes',
  events: '/events',
  squads: '/squads',
  tips: '/tips',
  glossary: '/glossary',
  quiz: '/quiz',
  season: '/season',
  tools: '/tools',
  calculators: '/tools/calculators',
  compare: '/tools/compare',
  builder: '/tools/builder',
  about: '/about',
} as const;

export const ALLIANCE_DUEL_TIME_UTC = {
  hour: 2,
  minute: 0,
} as const;

export const ALLIANCE_DUEL_ACTIVE_MINUTES = 30;

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface NavGroup {
  id: string;
  icon: LucideIcon;
  title: string;
  items: NavItem[];
}

interface BottomNavItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  sheetId?: string;
}

export const NAV_GROUPS: NavGroup[] = [
  {
    id: 'events',
    icon: CalendarDays,
    title: 'Events',
    items: [{ href: ROUTES.events, label: 'Events', icon: CalendarDays }],
  },
  {
    id: 'heroes',
    icon: Users,
    title: 'Heroes',
    items: [
      { href: ROUTES.heroes, label: 'Heroes', icon: Users },
      { href: ROUTES.quiz, label: 'Quiz', icon: Trophy },
    ],
  },
  {
    id: 'tools',
    icon: Wrench,
    title: 'Tools',
    items: [
      { href: ROUTES.tools, label: 'Tools Hub', icon: Wrench },
      { href: ROUTES.calculators, label: 'Calculators', icon: FlaskConical },
      { href: ROUTES.compare, label: 'Compare', icon: HelpCircle },
      { href: ROUTES.builder, label: 'Builder', icon: Hammer },
    ],
  },
  {
    id: 'squad',
    icon: Swords,
    title: 'Squad',
    items: [
      { href: ROUTES.squads, label: 'Squads', icon: Swords },
      { href: ROUTES.tips, label: 'Tips', icon: BookOpen },
    ],
  },
  {
    id: 'season',
    icon: Layers3,
    title: 'Season',
    items: [{ href: ROUTES.season, label: 'Season', icon: Layers3 }],
  },
];

export const BOTTOM_NAV_ITEMS: BottomNavItem[] = [
  { id: 'home', label: 'Home', href: ROUTES.home, icon: Home },
  { id: 'heroes', label: 'Heroes', href: ROUTES.heroes, icon: Users },
  { id: 'events', label: 'Events', href: ROUTES.events, icon: CalendarDays },
  { id: 'tools', label: 'Tools', href: ROUTES.tools, icon: Wrench },
  { id: 'more', label: 'More', href: ROUTES.squads, icon: Menu, sheetId: 'more' },
];

export const BOTTOM_SHEET_GROUPS = [
  {
    id: 'more',
    title: 'More',
    items: [
      { href: ROUTES.squads, label: 'Squads', icon: Swords },
      { href: ROUTES.season, label: 'Season', icon: Layers3 },
      { href: ROUTES.quiz, label: 'Quiz', icon: Trophy },
      { href: ROUTES.tips, label: 'Tips', icon: BookOpen },
    ],
  },
] as const;

export const NAV_LINKS = NAV_GROUPS.flatMap((group) => group.items).map(({ href, label }) => ({ href, label }));

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
