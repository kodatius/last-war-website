export interface Term {
  term: string;
  aliases: string[];
  definition: string;
  category: 'abbreviation' | 'slang' | 'mechanic';
}

export const terms: Term[] = [
  // Abbreviations
  {
    term: 'RSS',
    aliases: ['resources'],
    definition: 'Resources - Iron, Food, and Gold used for upgrades and training.',
    category: 'abbreviation'
  },
  {
    term: 'PVP',
    aliases: ['pvp'],
    definition: 'Player Versus Player - Combat against other real players.',
    category: 'abbreviation'
  },
  {
    term: 'PVE',
    aliases: ['pve'],
    definition: 'Player Versus Environment - Combat against zombies, NPCs, and AI enemies.',
    category: 'abbreviation'
  },
  {
    term: 'F2P',
    aliases: ['f2p', 'free to play', 'freetoplay'],
    definition: 'Free To Play - Players who don\'t spend real money on the game.',
    category: 'abbreviation'
  },
  {
    term: 'MG',
    aliases: ['mg', 'marshalls guard'],
    definition: 'Marshall\'s Guard - A recurring event where you defend against waves of enemies.',
    category: 'abbreviation'
  },
  {
    term: 'AD',
    aliases: ['ad', 'alliance duel'],
    definition: 'Alliance Duel - Weekly competitive event where alliances compete for points through various activities.',
    category: 'abbreviation'
  },
  {
    term: 'WD',
    aliases: ['wd', 'warzone duel'],
    definition: 'Warzone Duel - Server versus Server (SvS) warfare event.',
    category: 'abbreviation'
  },
  {
    term: 'SvS',
    aliases: ['svs', 'server vs server'],
    definition: 'Server Versus Server - Events where entire servers compete against each other.',
    category: 'abbreviation'
  },
  {
    term: 'NAP',
    aliases: ['nap'],
    definition: 'Non-Aggression Pact - An agreement between alliances not to attack each other.',
    category: 'abbreviation'
  },
  {
    term: 'HQ',
    aliases: ['hq', 'headquarters'],
    definition: 'Headquarters - Your main building that determines your overall level and unlocks.',
    category: 'abbreviation'
  },
  {
    term: 'UR',
    aliases: ['ur', 'ultra rare'],
    definition: 'Ultra Rare - The highest hero rarity tier. These are your priority investments.',
    category: 'abbreviation'
  },
  {
    term: 'SSR',
    aliases: ['ssr'],
    definition: 'Super Super Rare - Second highest hero rarity. Good early-mid game options.',
    category: 'abbreviation'
  },
  {
    term: 'SR',
    aliases: ['sr'],
    definition: 'Super Rare - Lower hero rarity. Replace these with higher tier heroes ASAP.',
    category: 'abbreviation'
  },

  // Slang Terms
  {
    term: 'Whale',
    aliases: ['whale', 'whales', 'whaling'],
    definition: 'Heavy spender who invests $100s-$1000s per month in the game.',
    category: 'slang'
  },
  {
    term: 'Dolphin',
    aliases: ['dolphin', 'dolphins'],
    definition: 'Moderate spender who invests $20-100 per month. Between F2P and whale.',
    category: 'slang'
  },
  {
    term: 'Mud',
    aliases: ['mud', 'the mud'],
    definition: 'The dirt area around the Capitol where shields are not allowed. Very dangerous!',
    category: 'slang'
  },
  {
    term: 'Ashed',
    aliases: ['ashed', 'got ashed'],
    definition: 'When your base is destroyed/burning after an attack. Very bad situation.',
    category: 'slang'
  },
  {
    term: 'Gift Wrapped',
    aliases: ['gift wrapped', 'giftwrapped'],
    definition: 'A building upgrade that\'s completed but not claimed yet. Useful for event timing.',
    category: 'slang'
  },
  {
    term: 'Double-Dipping',
    aliases: ['double dipping', 'double-dip', 'doubledip'],
    definition: 'Earning points for both Alliance Duel and Arms Race simultaneously with the same actions.',
    category: 'slang'
  },
  {
    term: 'Spam Healing',
    aliases: ['spam healing', 'spam heal'],
    definition: 'Healing small batches of troops for instant alliance assistance points.',
    category: 'slang'
  },
  {
    term: 'Tile Hopping',
    aliases: ['tile hopping', 'tile hop'],
    definition: 'Using gather tiles for faster movement across the map.',
    category: 'slang'
  },
  {
    term: 'WC',
    aliases: ['wc', 'world chat'],
    definition: 'World Chat - The global chat channel where all players on a server can communicate.',
    category: 'slang'
  },

  // Game Mechanics
  {
    term: 'Barracks Staggering',
    aliases: ['barracks stagger', 'staggering'],
    definition: 'A technique where you offset barracks training times to have continuous troop production with minimal management.',
    category: 'mechanic'
  },
  {
    term: 'Radar Tasks',
    aliases: ['radar', 'radar task'],
    definition: 'Daily tasks from the radar that give rewards. Save them for Alliance Duel day 2 for double points!',
    category: 'mechanic'
  },
  {
    term: '40% Rule',
    aliases: ['40 percent rule', 'forty percent'],
    definition: 'In combat, you can retreat when reaching 40% losses to minimize troop casualties.',
    category: 'mechanic'
  },
  {
    term: 'Waterfall',
    aliases: ['waterfall structure', 'waterfall strategy'],
    definition: 'The Warzone Duel structure where servers face progressively harder opponents.',
    category: 'mechanic'
  }
];

export function findTerm(search: string): Term | undefined {
  const searchLower = search.toLowerCase();
  return terms.find(t =>
    t.term.toLowerCase() === searchLower ||
    t.aliases.some(a => a.toLowerCase() === searchLower)
  );
}

export function searchTerms(query: string): Term[] {
  const queryLower = query.toLowerCase();
  return terms.filter(t =>
    t.term.toLowerCase().includes(queryLower) ||
    t.aliases.some(a => a.toLowerCase().includes(queryLower)) ||
    t.definition.toLowerCase().includes(queryLower)
  );
}
