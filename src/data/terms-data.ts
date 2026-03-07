import type { Term } from '@/types';
import { terms as rawTerms } from './raw/terms-data';

const additionalTerms: Term[] = [
  {
    term: 'AR',
    aliases: ['arms race', 'ar'],
    definition: 'Arms Race - recurring event for troop training, research, and growth point racing.',
    category: 'abbreviation',
  },
  {
    term: 'ZI',
    aliases: ['zombie invasion', 'zi'],
    definition: 'Zombie Invasion - weekly PvE wave event and one of the best stamina-value activities.',
    category: 'abbreviation',
  },
  {
    term: 'GT',
    aliases: ['generals trial', 'gt'],
    definition: "General's Trial - staged challenge mode with scaling rewards and limited resets.",
    category: 'abbreviation',
  },
  {
    term: 'DD',
    aliases: ['doomsday', 'dd'],
    definition: 'Doomsday - alliance-cooperative event centered on timing and coordinated attacks.',
    category: 'abbreviation',
  },
  {
    term: 'HC',
    aliases: ['honorable campaign', 'hc'],
    definition: 'Honorable Campaign - limited challenge campaign mode with special progression rewards.',
    category: 'abbreviation',
  },
  {
    term: 'MIW',
    aliases: ['meteorite iron war', 'miw', 'iron war'],
    definition: 'Meteorite Iron War - biweekly cross-server crystal capture and iron point race event.',
    category: 'abbreviation',
  },
];

export const terms: Term[] = [...rawTerms, ...additionalTerms];
