import { season5 as rawSeason5 } from './raw/season-data';
import type { SeasonOverviewData, SeasonWeek } from '@/types';

const extendedWeeks: SeasonWeek[] = [
  ...rawSeason5.weekSummaries,
  {
    week: 9,
    title: 'Dustline Escalation',
    phase: 'Conflict',
    dateRange: 'Week 9 of Season 5',
    keyEvents: [
      'Frontier Vault score multiplier activated',
      'Alliance Duel bonus round',
      'Arms Race: Gathering focus',
      'Cross-server scouting window',
    ],
    primaryFocus: 'Hold high-tier banks while preparing for final scoreboard swings.',
    tips: [
      'Run defensive rotations every 2 hours around your top banks.',
      'Use gathering boosts only inside Arms Race windows.',
      'Keep one rally slot reserved for emergency reinforcements.',
    ],
    featuredMechanic: 'Bank Strongholds',
  },
  {
    week: 10,
    title: 'Capital Pressure',
    phase: 'Finals',
    dateRange: 'Week 10 of Season 5',
    keyEvents: [
      'City Clash double-point checkpoints',
      'Frontier Capital overtime rules unlock',
      'Code Boss all-type rotation',
      'Exchange refresh with limited legendary bundles',
    ],
    primaryFocus: 'Secure capital checkpoints and convert stockpiled resources into points.',
    tips: [
      'Assign fixed city leads for each lane before start time.',
      'Pre-heal and stock stamina before Clash open.',
      'Spend CrystalGold only on power-positive upgrades.',
    ],
    featuredMechanic: 'City Clash',
  },
  {
    week: 11,
    title: 'Championship Push',
    phase: 'Finals',
    dateRange: 'Week 11 of Season 5',
    keyEvents: [
      'Final ranking snapshot #1',
      'Arms Race: Combined marathon',
      'Alliance Duel elimination ladder',
      'Season mission chain finale',
    ],
    primaryFocus: 'Optimize every event overlap and protect rank position.',
    tips: [
      'Double-dip events by syncing speed-ups with duel tasks.',
      'Avoid high-risk attacks unless rank swing is significant.',
      'Track alliance participation gaps and fill weak time zones.',
    ],
    featuredMechanic: 'CrystalGold',
  },
  {
    week: 12,
    title: 'Frontier Finale',
    phase: 'Finals',
    dateRange: 'Week 12 of Season 5',
    keyEvents: [
      'Last City Clash of season',
      'Final ranking lock and reward calculation',
      'Frontier Exchange closeout timer',
      'Season 6 migration prep checklist',
    ],
    primaryFocus: 'Close out spending, secure final rank, and prepare for transition.',
    tips: [
      'Spend all expiring currency before lock.',
      'Archive best formations and event logs for next season.',
      'Reduce unnecessary troop losses in the final 24 hours.',
    ],
    featuredMechanic: null,
  },
];

export const seasonData: SeasonOverviewData = {
  seasonNumber: rawSeason5.seasonNumber,
  name: rawSeason5.name,
  theme: rawSeason5.theme,
  tagline: rawSeason5.tagline,
  startDate: rawSeason5.startDate,
  endDate: rawSeason5.endDate,
  durationWeeks: extendedWeeks.length,
  lore: rawSeason5.lore,
  newFeatures: rawSeason5.newFeatures,
  mechanics: rawSeason5.mechanics,
  weekSummaries: extendedWeeks,
  generalTips: rawSeason5.generalTips,
};

export const seasonWeeks = seasonData.weekSummaries;

export function getSeasonWeek(week: number): SeasonWeek | undefined {
  return seasonWeeks.find((entry) => entry.week === week);
}
