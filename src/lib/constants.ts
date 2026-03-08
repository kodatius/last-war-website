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
  Info,
  Layers3,
  LibraryBig,
  Menu,
  Shield,
  Swords,
  Trophy,
  Users,
  Wrench,
} from 'lucide-react';

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
    id: 'primary',
    icon: Shield,
    title: 'Primary',
    items: [
      { href: ROUTES.home, label: 'Home', icon: Home },
      { href: ROUTES.heroes, label: 'Heroes', icon: Users },
      { href: ROUTES.events, label: 'Events', icon: CalendarDays },
      { href: ROUTES.squads, label: 'Squads', icon: Swords },
      { href: ROUTES.tips, label: 'Tips', icon: BookOpen },
      { href: ROUTES.glossary, label: 'Glossary', icon: LibraryBig },
      { href: ROUTES.quiz, label: 'Quiz', icon: Trophy },
      { href: ROUTES.season, label: 'Season', icon: Layers3 },
      { href: ROUTES.about, label: 'About', icon: Info },
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
];

export const BOTTOM_NAV_ITEMS: BottomNavItem[] = [
  { id: 'home', label: 'Home', href: ROUTES.home, icon: Home },
  { id: 'heroes', label: 'Heroes', href: ROUTES.heroes, icon: Users },
  { id: 'tools', label: 'Tools', href: ROUTES.tools, icon: Wrench, sheetId: 'tools' },
  { id: 'tips', label: 'Tips', href: ROUTES.tips, icon: BookOpen, sheetId: 'tips' },
  { id: 'more', label: 'More', href: ROUTES.about, icon: Menu, sheetId: 'more' },
];

export const BOTTOM_SHEET_GROUPS = [
  {
    id: 'tools',
    title: 'Tools',
    items: [
      { href: ROUTES.calculators, label: 'Calculators', icon: FlaskConical },
      { href: ROUTES.compare, label: 'Hero Compare', icon: HelpCircle },
      { href: ROUTES.builder, label: 'Formation Builder', icon: Hammer },
      { href: ROUTES.events, label: 'Events', icon: CalendarDays },
      { href: ROUTES.squads, label: 'Squads', icon: Swords },
    ],
  },
  {
    id: 'tips',
    title: 'Tips',
    items: [
      { href: ROUTES.tips, label: 'Tips', icon: BookOpen },
      { href: ROUTES.glossary, label: 'Glossary', icon: LibraryBig },
      { href: ROUTES.season, label: 'Season', icon: Layers3 },
    ],
  },
  {
    id: 'more',
    title: 'More',
    items: [
      { href: ROUTES.quiz, label: 'Quiz', icon: Trophy },
      { href: ROUTES.about, label: 'About', icon: Info },
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
