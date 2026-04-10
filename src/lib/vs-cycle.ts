// ── VS Cycle Engine ──────────────────────────────────────────────
// Pure date-math. No external APIs. Configurable anchor point.

export interface VsDayConfig {
  /** Day number within the cycle (1-based) */
  day: number;
  /** Short label shown in UI */
  label: string;
  /** Category tag for color-coding */
  category: 'build' | 'combat' | 'resource' | 'rest' | 'event';
}

export interface ServerConfig {
  serverNumber: number;
  /** A known date where the VS cycle day is known (YYYY-MM-DD) */
  anchorDate: string;
  /** Which VS day (1-based) was active on the anchor date */
  anchorVsDay: number;
}

export const SERVER_CONFIG: ServerConfig = {
  serverNumber: 2058,
  anchorDate: '2026-04-10',
  anchorVsDay: 1,
};

export const VS_CYCLE: VsDayConfig[] = [
  { day: 1, label: 'Troop Training', category: 'build' },
  { day: 2, label: 'Research', category: 'build' },
  { day: 3, label: 'Building', category: 'build' },
  { day: 4, label: 'Hero Development', category: 'resource' },
  { day: 5, label: 'Resource Gathering', category: 'resource' },
  { day: 6, label: 'Power Increase', category: 'build' },
  { day: 7, label: 'Alliance Duel', category: 'combat' },
  { day: 8, label: 'Troop Training', category: 'build' },
  { day: 9, label: 'Research', category: 'build' },
  { day: 10, label: 'Kill Event', category: 'combat' },
  { day: 11, label: 'Arms Race', category: 'event' },
  { day: 12, label: 'Arms Race', category: 'event' },
  { day: 13, label: 'Healing', category: 'rest' },
  { day: 14, label: 'Free Day', category: 'rest' },
];

function daysBetween(dateA: string, dateB: Date): number {
  const a = new Date(dateA + 'T00:00:00');
  const b = new Date(dateB.getFullYear(), dateB.getMonth(), dateB.getDate());
  return Math.floor((b.getTime() - a.getTime()) / 86_400_000);
}

export function getVsDayForOffset(offset: number): VsDayConfig {
  const target = new Date();
  target.setDate(target.getDate() + offset);
  const elapsed = daysBetween(SERVER_CONFIG.anchorDate, target);
  const cycleLen = VS_CYCLE.length;
  const rawIndex = ((SERVER_CONFIG.anchorVsDay - 1 + elapsed) % cycleLen + cycleLen) % cycleLen;
  return VS_CYCLE[rawIndex];
}

export function getTodayVsDay(): VsDayConfig {
  return getVsDayForOffset(0);
}

export function getTomorrowVsDay(): VsDayConfig {
  return getVsDayForOffset(1);
}

export function getForecast(days: number): VsDayConfig[] {
  return Array.from({ length: days }, (_, i) => getVsDayForOffset(i));
}

export function getDateLabel(offset: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  if (offset === 0) return 'Today';
  if (offset === 1) return 'Tomorrow';
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

export const CATEGORY_STYLES: Record<VsDayConfig['category'], { bg: string; text: string; border: string }> = {
  build: { bg: 'bg-blue-500/15', text: 'text-blue-300', border: 'border-blue-400/30' },
  combat: { bg: 'bg-red-500/15', text: 'text-red-300', border: 'border-red-400/30' },
  resource: { bg: 'bg-emerald-500/15', text: 'text-emerald-300', border: 'border-emerald-400/30' },
  rest: { bg: 'bg-purple-500/15', text: 'text-purple-300', border: 'border-purple-400/30' },
  event: { bg: 'bg-amber-500/15', text: 'text-amber-300', border: 'border-amber-400/30' },
};
