// All heroes in this file are confirmed Last War: Survival heroes.
// Sources: SUPER_GUIDE.md, heroes/tier-list-meta.md, heroes/aircraft.md,
//          heroes/missile.md, heroes/tanks.md (Season 5, Feb 2026)

export type HeroTier = 'SS' | 'S' | 'A' | 'B' | 'C';
export type HeroType = 'Tank' | 'Aircraft' | 'Missile';
export type HeroRarity = 'UR' | 'SSR' | 'SR';

export interface Hero {
  id: string;
  name: string;
  tier: HeroTier;
  type: HeroType;
  rarity: HeroRarity;
  description: string;
  whyGood: string;
  bestPairings: string[];
  recommendedGear: {
    weapon: string;
    armor: string;
    accessory: string;
  };
  usageTips: {
    pvp: string;
    pve: string;
    events: string;
  };
  isMeta: boolean;
}

export const heroes: Hero[] = [
  // ====================================================
  // SS-TIER
  // ====================================================
  {
    id: 'kimberly',
    name: 'Kimberly',
    tier: 'SS',
    type: 'Tank',
    rarity: 'UR',
    description: 'Devastating AoE Tank attacker. Best DPS in the game. Available via $1 starter pack.',
    whyGood: 'Kimberly deals devastating energy-based AoE damage. Her skills scale exceptionally well with investment. At 3M power she beats most heroes at 4M. Core of Tank and mixed squads.',
    bestPairings: ['williams', 'murphy', 'marshall'],
    recommendedGear: {
      weapon: 'Cannon (upgrade first for DPS heroes)',
      armor: 'Armor (upgrade last for DPS)',
      accessory: 'Chip + Radar after Cannon'
    },
    usageTips: {
      pvp: 'Front-left or rear-left. Shreds enemy squads. If enemy has Carlie front-left (energy resist), move Kim to rear-right.',
      pve: 'Essential for Zombie Invasion wave clear. High priority upgrade target.',
      events: 'Must-have for Alliance Duel. Used in most competitive event squads.'
    },
    isMeta: true
  },
  {
    id: 'dva',
    name: 'DVA',
    tier: 'SS',
    type: 'Aircraft',
    rarity: 'UR',
    description: 'Highest AoE burst damage in game. Wave-clear monster. Core of Aircraft squads.',
    whyGood: 'DVA delivers the highest burst damage in the game with AoE that hits ALL enemies. Her 3rd skill is a wave-clear monster. Priority: dump all universal shards into DVA if running Aircraft squad.',
    bestPairings: ['morrison', 'schuyler', 'carlie'],
    recommendedGear: {
      weapon: 'Cannon (upgrade first — DPS priority)',
      armor: 'Armor (upgrade last)',
      accessory: 'Chip + Radar after Cannon'
    },
    usageTips: {
      pvp: 'AoE hits all enemies simultaneously. Surgical burst against priority targets. Watch out for Carlie counters (energy block).',
      pve: 'Dominant wave-clear. Strong on Doom Walker rallies.',
      events: 'Core of Aircraft formations in competitive play. Essential for Arms Race Aircraft phases.'
    },
    isMeta: true
  },
  {
    id: 'tesla',
    name: 'Tesla',
    tier: 'SS',
    type: 'Missile',
    rarity: 'UR',
    description: 'Best Missile DPS. Energy-based attacks melt waves and bosses.',
    whyGood: 'Tesla brings devastating Missile energy damage that clears waves and melts bosses. Outperforms ALL SSR Missile heroes from day one at equal investment. High base stats scale excellently.',
    bestPairings: ['fiona', 'adam', 'williams'],
    recommendedGear: {
      weapon: 'Cannon (DPS priority)',
      armor: 'Armor (last)',
      accessory: 'Chip + Radar after Cannon'
    },
    usageTips: {
      pvp: 'Rear position preferred. Energy damage bypasses physical defense.',
      pve: 'Best wave clear + boss damage. Very versatile for all PvE content.',
      events: 'Strong pick for Code Boss (Missile days), Zombie Invasion, General\'s Trial.'
    },
    isMeta: true
  },
  {
    id: 'marshall',
    name: 'Marshall',
    tier: 'SS',
    type: 'Tank',
    rarity: 'UR',
    description: 'Team-wide damage buffs. Synergy enabler for all Tank and mixed squads.',
    whyGood: 'Marshall provides team-wide attack buffs that amplify every hero\'s output. Essential for maximizing squad damage in both Tank and mixed formations. Priority upgrade path: Murphy → Williams → Kim → Marshall.',
    bestPairings: ['kimberly', 'williams', 'murphy'],
    recommendedGear: {
      weapon: 'Cannon',
      armor: 'Armor',
      accessory: 'Chip + Radar'
    },
    usageTips: {
      pvp: 'Shines in longer fights. Position to benefit from his buff stacks.',
      pve: 'Excellent for boss fights and extended rally content.',
      events: 'Top pick for Warzone Duel / SVS and extended Alliance Duel battles.'
    },
    isMeta: true
  },

  // ====================================================
  // S-TIER
  // ====================================================
  {
    id: 'murphy',
    name: 'Murphy',
    tier: 'S',
    type: 'Tank',
    rarity: 'UR',
    description: 'Best early-game tank. Buffs front-row HP and attack. F2P accessible via Alliance shop.',
    whyGood: 'Murphy is the gold-standard F2P tank. Exceptional defense with front-row HP/attack buffs. Accessible via Alliance shop shards (4–6 weeks). Remains viable until HQ 18–20 when Williams/Kimberly become available.',
    bestPairings: ['kimberly', 'mason', 'marshall'],
    recommendedGear: {
      weapon: 'Armor (tank priority — upgrade armor first)',
      armor: 'Armor to 5★ first',
      accessory: 'Chip + Radar after Armor'
    },
    usageTips: {
      pvp: 'Front-left position. Absorbs burst to protect backline DPS.',
      pve: 'Best F2P tank for early Zombie Invasion and rallies.',
      events: 'Alliance shop shards make him accessible. Core of F2P Tank build.'
    },
    isMeta: true
  },
  {
    id: 'williams',
    name: 'Williams',
    tier: 'S',
    type: 'Tank',
    rarity: 'UR',
    description: 'Team-wide damage reduction tank. Rock-solid frontline anchor for PvP and rallies.',
    whyGood: 'Williams provides team-wide damage reduction, making your entire squad significantly more durable. Rock-solid frontline anchor. Note: Joytify (2026) rates B-tier due to late-game endurance scaling — most sources still consider S-tier.',
    bestPairings: ['kimberly', 'dva', 'tesla'],
    recommendedGear: {
      weapon: 'Armor (tank priority)',
      armor: 'Armor to 5★ first',
      accessory: 'Chip + Radar after Armor'
    },
    usageTips: {
      pvp: 'Front-line anchor. His team-wide damage reduction keeps DPS alive.',
      pve: 'Essential for high-level rallies and boss content.',
      events: 'Core of most competitive squads. Priority upgrade after Murphy.'
    },
    isMeta: true
  },
  {
    id: 'carlie',
    name: 'Carlie',
    tier: 'S',
    type: 'Aircraft',
    rarity: 'UR',
    description: 'Best aircraft tank. Only hero that blocks energy damage. Counters Kim/DVA heavy squads.',
    whyGood: 'Carlie is the only hero with energy damage resistance. Essential for aircraft formations and as a counter to energy-heavy enemies (Kim, DVA). If enemy has Carlie front-left, move Kim to rear-right. Season 5: Rose to S-tier with Aircraft meta shift.',
    bestPairings: ['dva', 'schuyler', 'morrison'],
    recommendedGear: {
      weapon: 'Armor (tank priority)',
      armor: 'Armor to 5★ first',
      accessory: 'Chip + Radar after Armor'
    },
    usageTips: {
      pvp: 'Front-left position in Aircraft squads. Energy block provides huge defensive value.',
      pve: 'Solid tank for aircraft PvE content.',
      events: 'Core of Aircraft formation. Counter pick vs energy teams.'
    },
    isMeta: true
  },
  {
    id: 'schuyler',
    name: 'Schuyler',
    tier: 'S',
    type: 'Aircraft',
    rarity: 'UR',
    description: 'PvP crowd control specialist. Stun/paralyze disrupts enemy formations.',
    whyGood: 'Schuyler brings crucial crowd control to Aircraft squads. Stuns interrupt enemy burst abilities before they fire. Season 5 endgame aircraft core: DVA + Morrison + Schuyler with exclusive weapons absorbs massive damage.',
    bestPairings: ['dva', 'morrison', 'carlie'],
    recommendedGear: {
      weapon: 'Cannon (control/DPS)',
      armor: 'Armor',
      accessory: 'Chip + Radar'
    },
    usageTips: {
      pvp: 'Time stuns to interrupt enemy special abilities. Shuts down burst attackers.',
      pve: 'Less critical but still provides control value.',
      events: 'Core of endgame Aircraft formation with exclusive weapon.'
    },
    isMeta: true
  },
  {
    id: 'morrison',
    name: 'Morrison',
    tier: 'S',
    type: 'Aircraft',
    rarity: 'UR',
    description: 'Aircraft DPS + defense reduction. Season 5 Aircraft meta staple.',
    whyGood: 'Morrison\'s defense reduction amplifies the entire team\'s damage. Season 5 meta: Aircraft formation (DVA + Morrison + Schuyler) with exclusive weapons is the top endgame squad. Disputed (PocketGamer SS-tier, SimpleGame B-tier) — consensus A/S-tier.',
    bestPairings: ['dva', 'schuyler', 'carlie'],
    recommendedGear: {
      weapon: 'Cannon (DPS)',
      armor: 'Armor',
      accessory: 'Chip + Radar'
    },
    usageTips: {
      pvp: 'Defense shred before DVA\'s burst = maximum damage window.',
      pve: 'Essential for boss raids. Defense reduction is massive DPS multiplier.',
      events: 'Core of Aircraft-focused event squads.'
    },
    isMeta: true
  },
  {
    id: 'fiona',
    name: 'Fiona',
    tier: 'S',
    type: 'Missile',
    rarity: 'UR',
    description: 'Multi-target Missile nuker. Excellent wave-clear. Pairs with Tesla for Missile squads.',
    whyGood: 'Fiona provides consistent multi-target Missile damage. Core of Missile formation alongside Tesla. Her AoE bombardment excels at wave clearing in PvE. SS-tier per PocketGamer/U7Buy, S-tier consensus.',
    bestPairings: ['tesla', 'adam', 'mcgregor'],
    recommendedGear: {
      weapon: 'Cannon (DPS)',
      armor: 'Armor',
      accessory: 'Chip + Radar'
    },
    usageTips: {
      pvp: 'Soften groups before focused damage lands.',
      pve: 'Excellent wave clear for Zombie Invasion. Priority for Missile squads.',
      events: 'Core Missile squad pick. Strong for most event PvE content.'
    },
    isMeta: true
  },

  // ====================================================
  // A-TIER
  // ====================================================
  {
    id: 'mason',
    name: 'Mason',
    tier: 'A',
    type: 'Tank',
    rarity: 'SSR',
    description: 'Alliance shop Tank DPS. SSR→UR promotion available. Core of F2P Tank squad.',
    whyGood: 'Mason is the premier F2P DPS tank available via Alliance shop shards (2–4 weeks). SSR→UR promotion makes him long-term viable. Priority upgrade path: Murphy → Williams → Kim → Stetmann/Mason.',
    bestPairings: ['murphy', 'kimberly', 'williams'],
    recommendedGear: {
      weapon: 'Cannon (DPS first)',
      armor: 'Armor',
      accessory: 'Chip + Radar'
    },
    usageTips: {
      pvp: 'Rear-left DPS position. Solid damage in Tank formations.',
      pve: 'F2P workhorse for early-mid game content.',
      events: 'Alliance shop shards make him very accessible. Core F2P squad pick.'
    },
    isMeta: true
  },
  {
    id: 'stetmann',
    name: 'Stetmann',
    tier: 'A',
    type: 'Tank',
    rarity: 'SSR',
    description: 'Support Tank. Useful in full Tank formations. Mid-game filler.',
    whyGood: 'Stetmann provides support utility in Tank formations. Available via Tavern pulls and events. Mid-game viable, eventually replaced by UR heroes. Upgrade path: Murphy → Williams → Kim → Stetmann/Mason.',
    bestPairings: ['murphy', 'mason', 'kimberly'],
    recommendedGear: {
      weapon: 'Cannon',
      armor: 'Armor',
      accessory: 'Chip + Radar'
    },
    usageTips: {
      pvp: 'Filler Tank slot. Usable until UR Tank alternatives available.',
      pve: 'Good early-mid game Tank for zombie content.',
      events: 'Replace with UR Tanks when available.'
    },
    isMeta: false
  },
  {
    id: 'lucius',
    name: 'Lucius',
    tier: 'A',
    type: 'Aircraft',
    rarity: 'UR',
    description: 'Secondary Aircraft tank. Decent off-tank, outclassed by Carlie.',
    whyGood: 'Lucius fills the aircraft off-tank role when Carlie isn\'t available. Provides defense alongside DVA. Budget option for players building Aircraft squads before getting Carlie.',
    bestPairings: ['dva', 'carlie', 'schuyler'],
    recommendedGear: {
      weapon: 'Armor (tank priority)',
      armor: 'Armor to 5★ first',
      accessory: 'Chip + Radar'
    },
    usageTips: {
      pvp: 'Off-tank position in Aircraft squads.',
      pve: 'Aircraft tank filler until Carlie available.',
      events: 'Replace with Carlie when possible.'
    },
    isMeta: false
  },
  {
    id: 'swift',
    name: 'Swift',
    tier: 'A',
    type: 'Missile',
    rarity: 'SSR',
    description: 'Execute specialist. Takes down low-HP targets fast. Premium purchase.',
    whyGood: 'Swift excels at finishing weakened enemies. Fast attacks and execute mechanics shine in PvP when enemies are at low HP. Falls off in extended fights. Available via Mall packs.',
    bestPairings: ['tesla', 'fiona', 'adam'],
    recommendedGear: {
      weapon: 'Cannon (DPS)',
      armor: 'Armor',
      accessory: 'Chip + Radar'
    },
    usageTips: {
      pvp: 'Best against low-HP targets. PvP execute specialist.',
      pve: 'Limited — PvE fights favor sustained damage.',
      events: 'Niche PvP disruption squads.'
    },
    isMeta: false
  },
  {
    id: 'adam',
    name: 'Adam',
    tier: 'A',
    type: 'Missile',
    rarity: 'SSR',
    description: 'Frontline Missile tank + counterattacks. Niche defensive role.',
    whyGood: 'Adam provides frontline tanking for Missile squads — a unique role. Counterattack mechanics add passive damage. Available via Mall packs. Core of Missile formation: Tesla + Fiona + Adam.',
    bestPairings: ['tesla', 'fiona', 'swift'],
    recommendedGear: {
      weapon: 'Armor (tank priority)',
      armor: 'Armor to 5★ first',
      accessory: 'Chip + Radar'
    },
    usageTips: {
      pvp: 'Front-left tank in Missile squads. Takes hits so Tesla and Fiona can DPS freely.',
      pve: 'Essential Missile squad tank for boss and wave content.',
      events: 'Core of competitive Missile formation.'
    },
    isMeta: false
  },

  // ====================================================
  // B-TIER
  // ====================================================
  {
    id: 'venom',
    name: 'Venom',
    tier: 'B',
    type: 'Missile',
    rarity: 'SSR',
    description: 'Poison DoT specialist. Season 5: SSR→UR upgrade now available. Niche long-fight value.',
    whyGood: 'UR Venom gains Corrosive Shot (single-target poison) and Corrosive Barrage (AoE DoT). Niche use in drawn-out PvE battles and boss raids. NOT PvP meta — burst damage still dominates. Only worth UR upgrade if running Missile formation + long-fight PvE focus.',
    bestPairings: ['tesla', 'fiona', 'adam'],
    recommendedGear: {
      weapon: 'Cannon (DPS)',
      armor: 'Armor',
      accessory: 'Chip + Radar'
    },
    usageTips: {
      pvp: 'Not recommended — burst damage dominates PvP.',
      pve: 'DoT stacks with Tesla energy attacks in long boss fights.',
      events: 'Niche pick for extended PvE boss events. Skip UR upgrade unless Missile main.'
    },
    isMeta: false
  },
  {
    id: 'violet',
    name: 'Violet',
    tier: 'B',
    type: 'Tank',
    rarity: 'SSR',
    description: 'Poison DoT Tank. SSR→UR promotion (Season 2). Low priority upgrade.',
    whyGood: 'Violet provides poison DoT defense. UR upgrade available but low priority compared to other tanks. Early frontline option. Replace with Murphy/Williams as soon as available.',
    bestPairings: ['murphy', 'mason', 'kimberly'],
    recommendedGear: {
      weapon: 'Armor (tank priority)',
      armor: 'Armor first',
      accessory: 'Chip + Radar'
    },
    usageTips: {
      pvp: 'Early game tank. Outclassed by UR options.',
      pve: 'Viable early-mid game only.',
      events: 'Replace with Murphy/Williams when possible.'
    },
    isMeta: false
  },
  {
    id: 'scarlett',
    name: 'Scarlett',
    tier: 'B',
    type: 'Tank',
    rarity: 'SSR',
    description: 'Early tank. SSR→UR upgrade (Season 3) available but low priority.',
    whyGood: 'Scarlett serves as an early frontline tank. UR upgrade available via Alliance shop but not worth prioritizing over Murphy or Mason. Replace when better tanks become available.',
    bestPairings: ['mason', 'murphy', 'kimberly'],
    recommendedGear: {
      weapon: 'Armor (tank priority)',
      armor: 'Armor first',
      accessory: 'Chip + Radar'
    },
    usageTips: {
      pvp: 'Early game only.',
      pve: 'Temporary tank until better options.',
      events: 'Do not invest heavily.'
    },
    isMeta: false
  },
  {
    id: 'sarah',
    name: 'Sarah',
    tier: 'B',
    type: 'Aircraft',
    rarity: 'SSR',
    description: 'Aircraft support. SSR→UR (Season 4). Limited impact.',
    whyGood: 'Sarah provides support buffs for Aircraft teams. UR upgrade available but low priority — support role too niche for the investment. Budget Aircraft filler.',
    bestPairings: ['dva', 'carlie', 'lucius'],
    recommendedGear: {
      weapon: 'Armor',
      armor: 'Armor',
      accessory: 'Chip + Radar'
    },
    usageTips: {
      pvp: 'Filler only.',
      pve: 'Budget Aircraft squad filler.',
      events: 'Replace with Carlie/Schuyler when available.'
    },
    isMeta: false
  },
  {
    id: 'mcgregor',
    name: 'McGregor',
    tier: 'B',
    type: 'Missile',
    rarity: 'SSR',
    description: 'Taunt tank for Missile squads. Risky without defensive investment.',
    whyGood: 'McGregor draws enemy fire via taunt. Can backfire badly without proper defensive gear investment. Niche in Missile formations: Tesla + Fiona + Adam/McGregor. Occasional Mall pack availability.',
    bestPairings: ['tesla', 'fiona', 'swift'],
    recommendedGear: {
      weapon: 'Armor (tank priority)',
      armor: 'Armor to 5★ first',
      accessory: 'Chip + Radar'
    },
    usageTips: {
      pvp: 'Risky — taunt exposes him without high defense investment.',
      pve: 'Niche taunt tank for Missile PvE content.',
      events: 'Adam preferred over McGregor in most setups.'
    },
    isMeta: false
  },
  {
    id: 'monica',
    name: 'Monica',
    tier: 'B',
    type: 'Tank',
    rarity: 'SSR',
    description: 'Beginner support tank. Replace quickly.',
    whyGood: 'Monica is a starter support hero for very early game. Has limited scaling. Replace immediately when Murphy or better tanks become available.',
    bestPairings: ['mason', 'stetmann', 'scarlett'],
    recommendedGear: {
      weapon: 'Armor',
      armor: 'Armor',
      accessory: 'Basic module'
    },
    usageTips: {
      pvp: 'Not viable for PvP.',
      pve: 'Very early game only.',
      events: 'Do not invest resources here.'
    },
    isMeta: false
  },
  {
    id: 'richard',
    name: 'Richard',
    tier: 'B',
    type: 'Tank',
    rarity: 'SSR',
    description: 'Moderate AoE Tank. Cannot tank well despite Tank type.',
    whyGood: 'Richard provides some AoE in PvE wave content but cannot effectively tank damage. Avoid for PvP. PvE wave use only.',
    bestPairings: ['mason', 'stetmann', 'murphy'],
    recommendedGear: {
      weapon: 'Cannon',
      armor: 'Armor',
      accessory: 'Chip'
    },
    usageTips: {
      pvp: 'Avoid entirely.',
      pve: 'Occasional wave-clear use only.',
      events: 'Skip investment.'
    },
    isMeta: false
  }
];

export function getHeroById(id: string): Hero | undefined {
  return heroes.find(h => h.id === id.toLowerCase());
}

export function getHeroByName(name: string): Hero | undefined {
  return heroes.find(h => h.name.toLowerCase() === name.toLowerCase());
}

export function getHeroesByTier(tier: HeroTier): Hero[] {
  return heroes.filter(h => h.tier === tier);
}

export function getHeroesByType(type: HeroType): Hero[] {
  return heroes.filter(h => h.type === type);
}

export function getMetaHeroes(): Hero[] {
  return heroes.filter(h => h.isMeta);
}
