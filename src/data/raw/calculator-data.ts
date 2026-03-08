// calculator-data.ts
// Last War: Survival — Arms Race & Event Calculator Data
// Sources: In-game data, community guides (Feb–Mar 2026, Season 5)

// ---------------------------------------------------------------------------
// TYPE DEFINITIONS
// ---------------------------------------------------------------------------

export type ArmsRacePhase =
  | 'Construction'
  | 'Research'
  | 'Training'
  | 'Combat'
  | 'Gathering'
  | 'Combined';

export type ResourceType =
  | 'Food'
  | 'Wood'
  | 'Iron'
  | 'Oil'
  | 'Gold'
  | 'CrystalGold'
  | 'UniversalShards'
  | 'Stamina';

export interface ArmsRaceThreshold {
  rank: number;
  label: string;
  pointsRequired: number;
  rewards: ArmsRaceReward[];
  cumulative: boolean;
}

export interface ArmsRaceReward {
  item: string;
  quantity: number;
  type: 'resource' | 'speed-up' | 'hero-shard' | 'gear' | 'cosmetic' | 'token';
}

export interface ArmsRacePhaseData {
  phase: ArmsRacePhase;
  durationHours: number;
  description: string;
  pointSources: PointSource[];
  optimalStrategy: string;
  tips: string[];
}

export interface PointSource {
  activity: string;
  pointsPerUnit: number;
  unit: string;
  /** Approximate daily cap on this activity, or null if uncapped */
  dailyCap: number | null;
  notes: string;
}

export interface ResourceRate {
  building: string;
  level: number;
  baseRatePerHour: number;
  resource: ResourceType;
  notes: string;
}

export interface EventFormula {
  eventName: string;
  formula: string;
  variables: Record<string, string>;
  example: string;
  tips: string[];
}

export interface SpeedUpValue {
  type: string;
  durationMinutes: number;
  relativeValue: number; // 1-100 scale
  bestUsedFor: string;
}

// ---------------------------------------------------------------------------
// ARMS RACE PHASE DATA
// ---------------------------------------------------------------------------

export const armsRacePhases: ArmsRacePhaseData[] = [
  {
    phase: 'Construction',
    durationHours: 24,
    description:
      'Earn points by upgrading buildings. Higher-level upgrades give more points. Speed-ups spent on construction also count.',
    pointSources: [
      {
        activity: 'Complete a building upgrade',
        pointsPerUnit: 1,
        unit: 'per level completed',
        dailyCap: null,
        notes: 'Higher-level upgrades (15+) give bonus multiplier x3',
      },
      {
        activity: 'Use Construction Speed-up',
        pointsPerUnit: 10,
        unit: 'per 1-hour speed-up used',
        dailyCap: null,
        notes: 'Advanced (8h) and Legendary (24h) speed-ups count proportionally',
      },
      {
        activity: 'Complete Alliance Help',
        pointsPerUnit: 5,
        unit: 'per help received from ally',
        dailyCap: 50,
        notes: 'Request help on every build — free 50 points per event',
      },
    ],
    optimalStrategy:
      'Queue your highest-level available building upgrade and let it run into the event window. Pre-stage speed-ups to finish the build and immediately start the next. Use Coffee Buff (Strong or Premium) for +20% construction speed bonus.',
    tips: [
      'Do NOT start upgrades the day before — save them to complete during event hours',
      'Upgrade HQ first if it unlocks new buildings — massive point bonus',
      'Alliance Help caps at 50 points per event — always request help at event start',
      'Premium Coffee during Construction event = 20% more builds completed = 20% more points',
      'Wall upgrades count and are cheap — good filler points',
    ],
  },
  {
    phase: 'Research',
    durationHours: 24,
    description:
      'Earn points by completing research in the Academy. Tech tree path matters — higher-tier research earns more points.',
    pointSources: [
      {
        activity: 'Complete a research node',
        pointsPerUnit: 1,
        unit: 'per research level completed',
        dailyCap: null,
        notes: 'Tier 5+ military research gives 5x point multiplier',
      },
      {
        activity: 'Use Research Speed-up',
        pointsPerUnit: 10,
        unit: 'per 1-hour speed-up used',
        dailyCap: null,
        notes: 'Same value as Construction speed-ups — use proportionally',
      },
      {
        activity: 'Queue overflow research',
        pointsPerUnit: 5,
        unit: 'per queued item completed during event',
        dailyCap: null,
        notes: 'Academy queue can hold 5 items — fill it before event starts',
      },
    ],
    optimalStrategy:
      'Fill the Academy queue with 5 items before the event. Use speed-ups to burn through the queue rapidly during the event window. Prioritise high-tier military or hero research — they give highest point returns.',
    tips: [
      'Never start research during Construction event — save speed-ups for Research phase',
      'T5 military research nodes are worth 5× base points',
      'Keep at least 50 research speed-ups specifically for Research phase Arms Race',
      'Alliance tech also counts — coordinate with R4/R5 to time alliance research during event',
      'Universal Speed-ups (work for both Construction and Research) are most valuable here',
    ],
  },
  {
    phase: 'Training',
    durationHours: 24,
    description:
      'Earn points by training troops. Higher-tier troops give more points. Troop type matters for upcoming battle events.',
    pointSources: [
      {
        activity: 'Train Tier 1 troops',
        pointsPerUnit: 1,
        unit: 'per 1,000 troops',
        dailyCap: null,
        notes: 'Low efficiency — only use if you have no higher-tier options',
      },
      {
        activity: 'Train Tier 3 troops',
        pointsPerUnit: 5,
        unit: 'per 1,000 troops',
        dailyCap: null,
        notes: 'Common mid-game efficient option',
      },
      {
        activity: 'Train Tier 4 troops',
        pointsPerUnit: 15,
        unit: 'per 1,000 troops',
        dailyCap: null,
        notes: 'Best point efficiency for resource cost at HQ 18+',
      },
      {
        activity: 'Train Tier 5 troops',
        pointsPerUnit: 40,
        unit: 'per 1,000 troops',
        dailyCap: null,
        notes: 'Highest points but most expensive — only if resources permit',
      },
      {
        activity: 'Use Training Speed-up',
        pointsPerUnit: 10,
        unit: 'per 1-hour speed-up',
        dailyCap: null,
        notes: 'Standard speed-up point value',
      },
    ],
    optimalStrategy:
      'Fill all Barracks/Ranges/Hangers with the highest-tier troops your resources support. Use Coffee Buff for +15% training speed. Convert resource stockpiles into troops during this window. T4 is the sweet spot for most players.',
    tips: [
      'Do NOT spend training speed-ups outside Training phase events',
      'T4 infantry/vehicles are the most resource-efficient high-point option',
      'Stockpile resources in the week before Training phase — you\'ll burn a lot',
      'Coffee Buff (Strong) adds ~15% more troops per 8 hours',
      'Coordinate with your alliance — group training events stack with individual points',
      'Training dead troops (hospital overflow) gives reduced points — keep hospital space clear',
    ],
  },
  {
    phase: 'Combat',
    durationHours: 24,
    description:
      'Earn points by attacking other players, rally bosses, and winning battles. Troop kill points depend on killed tier.',
    pointSources: [
      {
        activity: 'Kill enemy T1 troops',
        pointsPerUnit: 1,
        unit: 'per 1,000 killed',
        dailyCap: null,
        notes: 'Low value — target higher-tier troop owners',
      },
      {
        activity: 'Kill enemy T3 troops',
        pointsPerUnit: 5,
        unit: 'per 1,000 killed',
        dailyCap: null,
        notes: 'Standard mid-game PvP target',
      },
      {
        activity: 'Kill enemy T4 troops',
        pointsPerUnit: 15,
        unit: 'per 1,000 killed',
        dailyCap: null,
        notes: 'High-value target — hunt T4 armies',
      },
      {
        activity: 'Rally a World Boss',
        pointsPerUnit: 500,
        unit: 'per successful rally completion',
        dailyCap: 3,
        notes: 'Safe points without risking own troops',
      },
      {
        activity: 'Win Alliance Duel round',
        pointsPerUnit: 200,
        unit: 'per win',
        dailyCap: 10,
        notes: 'Safe PvP with no troop loss',
      },
    ],
    optimalStrategy:
      'Prioritise World Boss rallies (safe, high points). In Alliance Duel, play as many rounds as possible. For open-world PvP, only attack targets you can beat convincingly — losing troops during Combat phase is doubly painful.',
    tips: [
      'World Boss rallies are the safest high-point source — never miss them during Combat phase',
      'Do not attack players far above your power — you\'ll lose expensive troops for minimal points',
      'Alliance Duel rounds give points without real troop risk — play all 10 daily rounds',
      'Scout before attacking — hitting a shielded or trap account wastes marches',
      'Shield yourself when not actively playing during Combat phase',
    ],
  },
  {
    phase: 'Gathering',
    durationHours: 24,
    description:
      'Earn points by gathering resources on the world map. Rarer resource tiles give more points.',
    pointSources: [
      {
        activity: 'Gather Food tiles',
        pointsPerUnit: 1,
        unit: 'per 100,000 gathered',
        dailyCap: null,
        notes: 'Lowest value but most abundant',
      },
      {
        activity: 'Gather Iron/Wood tiles',
        pointsPerUnit: 3,
        unit: 'per 100,000 gathered',
        dailyCap: null,
        notes: 'Standard gathering target',
      },
      {
        activity: 'Gather Oil tiles',
        pointsPerUnit: 8,
        unit: 'per 100,000 gathered',
        dailyCap: null,
        notes: 'Best point rate — prioritise Oil',
      },
      {
        activity: 'Gather Gold/Crystal deposits',
        pointsPerUnit: 20,
        unit: 'per 100,000 gathered',
        dailyCap: null,
        notes: 'Rarest, highest value — location-scout before event',
      },
      {
        activity: 'Gather from Alliance Resource Building',
        pointsPerUnit: 5,
        unit: 'per 100,000 gathered',
        dailyCap: 500,
        notes: 'Free high-tier resources — always gather these first',
      },
    ],
    optimalStrategy:
      'Scout Oil and Gold tile locations before the event starts. Send all available marches simultaneously at event open. Use Gathering tech and hero skills to increase march capacity. Coffee Buff (Regular) provides +10% gathering speed.',
    tips: [
      'Pre-scout resource tile locations 24h before Gathering phase',
      'Oil and Crystal tiles are worth 8–20× more points than Food',
      'Send all marches immediately at event start — high-value tiles disappear fast',
      'Alliance Resource Buildings are free points — gather from them first',
      'Gathering hero skills (e.g., bonus march capacity) are worth activating specifically for this event',
      'Strong alliances often protect high-value tiles with players — be prepared to relocate',
    ],
  },
  {
    phase: 'Combined',
    durationHours: 48,
    description:
      'Final Arms Race phase where all activity types contribute points simultaneously. All point sources active at once.',
    pointSources: [
      {
        activity: 'All Construction activities',
        pointsPerUnit: 1,
        unit: 'see Construction phase',
        dailyCap: null,
        notes: 'Construction points × 0.75 multiplier in Combined phase',
      },
      {
        activity: 'All Research activities',
        pointsPerUnit: 1,
        unit: 'see Research phase',
        dailyCap: null,
        notes: 'Research points × 0.75 multiplier in Combined phase',
      },
      {
        activity: 'All Training activities',
        pointsPerUnit: 1,
        unit: 'see Training phase',
        dailyCap: null,
        notes: 'Training points × 0.75 multiplier in Combined phase',
      },
      {
        activity: 'All Combat activities',
        pointsPerUnit: 1,
        unit: 'see Combat phase',
        dailyCap: null,
        notes: 'Combat points at full value in Combined phase',
      },
    ],
    optimalStrategy:
      'Save a buffer of speed-ups across all categories for the Combined phase. Combat gives full value — World Boss rallies are the priority. Use remaining speed-ups for construction and training on the side.',
    tips: [
      'Do NOT exhaust all speed-ups in earlier phases — save 25–30% for Combined',
      'Combat activities give full points in Combined — prioritise World Boss rallies',
      'Combined phase lasts 48h — pace yourself, you don\'t need to score all points in hour 1',
      'Alliance coordination is critical — group construction helps and boss rallies multiply everyone\'s score',
    ],
  },
];

// ---------------------------------------------------------------------------
// ARMS RACE SCORE THRESHOLDS AND REWARDS
// ---------------------------------------------------------------------------

export const armsRaceThresholds: ArmsRaceThreshold[] = [
  {
    rank: 1,
    label: 'Bronze I',
    pointsRequired: 0,
    cumulative: false,
    rewards: [
      { item: 'Advanced Speed-up (1h)', quantity: 2, type: 'speed-up' },
      { item: 'Food', quantity: 500_000, type: 'resource' },
    ],
  },
  {
    rank: 2,
    label: 'Bronze II',
    pointsRequired: 5_000,
    cumulative: false,
    rewards: [
      { item: 'Advanced Speed-up (1h)', quantity: 5, type: 'speed-up' },
      { item: 'Iron', quantity: 300_000, type: 'resource' },
      { item: 'Universal Hero Shard', quantity: 50, type: 'hero-shard' },
    ],
  },
  {
    rank: 3,
    label: 'Silver I',
    pointsRequired: 20_000,
    cumulative: false,
    rewards: [
      { item: 'Legendary Speed-up (3h)', quantity: 3, type: 'speed-up' },
      { item: 'Universal Hero Shard', quantity: 150, type: 'hero-shard' },
      { item: 'Oil', quantity: 200_000, type: 'resource' },
    ],
  },
  {
    rank: 4,
    label: 'Silver II',
    pointsRequired: 60_000,
    cumulative: false,
    rewards: [
      { item: 'Legendary Speed-up (8h)', quantity: 2, type: 'speed-up' },
      { item: 'Universal Hero Shard', quantity: 300, type: 'hero-shard' },
      { item: 'Gear Fragment (Rare)', quantity: 5, type: 'gear' },
    ],
  },
  {
    rank: 5,
    label: 'Gold I',
    pointsRequired: 150_000,
    cumulative: false,
    rewards: [
      { item: 'Legendary Speed-up (24h)', quantity: 2, type: 'speed-up' },
      { item: 'Universal Hero Shard', quantity: 500, type: 'hero-shard' },
      { item: 'Gear Fragment (Epic)', quantity: 3, type: 'gear' },
      { item: 'CrystalGold', quantity: 500, type: 'token' },
    ],
  },
  {
    rank: 6,
    label: 'Gold II',
    pointsRequired: 400_000,
    cumulative: false,
    rewards: [
      { item: 'Legendary Speed-up (24h)', quantity: 5, type: 'speed-up' },
      { item: 'Universal Hero Shard', quantity: 1_000, type: 'hero-shard' },
      { item: 'Gear Fragment (Legendary)', quantity: 2, type: 'gear' },
      { item: 'CrystalGold', quantity: 1_500, type: 'token' },
    ],
  },
  {
    rank: 7,
    label: 'Platinum',
    pointsRequired: 1_000_000,
    cumulative: false,
    rewards: [
      { item: 'Legendary Speed-up (24h)', quantity: 10, type: 'speed-up' },
      { item: 'Universal Hero Shard', quantity: 2_000, type: 'hero-shard' },
      { item: 'UR Hero Shard (Morrison)', quantity: 50, type: 'hero-shard' },
      { item: 'CrystalGold', quantity: 3_000, type: 'token' },
      { item: 'Arms Race Platinum Frame', quantity: 1, type: 'cosmetic' },
    ],
  },
  {
    rank: 8,
    label: 'Diamond',
    pointsRequired: 3_000_000,
    cumulative: false,
    rewards: [
      { item: 'Legendary Speed-up (24h)', quantity: 20, type: 'speed-up' },
      { item: 'Universal Hero Shard', quantity: 5_000, type: 'hero-shard' },
      { item: 'UR Hero Shard (Morrison)', quantity: 150, type: 'hero-shard' },
      { item: 'CrystalGold', quantity: 8_000, type: 'token' },
      { item: 'Exclusive Gear Blueprint', quantity: 1, type: 'gear' },
    ],
  },
  {
    rank: 9,
    label: 'Master',
    pointsRequired: 8_000_000,
    cumulative: false,
    rewards: [
      { item: 'Legendary Speed-up (24h)', quantity: 50, type: 'speed-up' },
      { item: 'Universal Hero Shard', quantity: 10_000, type: 'hero-shard' },
      { item: 'UR Hero Shard (Schuyler)', quantity: 100, type: 'hero-shard' },
      { item: 'CrystalGold', quantity: 20_000, type: 'token' },
      { item: 'Arms Race Master Title', quantity: 1, type: 'cosmetic' },
    ],
  },
];

// ---------------------------------------------------------------------------
// RESOURCE GENERATION RATES
// (Base rates at max building level without tech or hero buffs)
// ---------------------------------------------------------------------------

export const resourceRates: ResourceRate[] = [
  // Food
  { building: 'Farm', level: 1, baseRatePerHour: 500, resource: 'Food', notes: 'Starting rate' },
  { building: 'Farm', level: 5, baseRatePerHour: 3_500, resource: 'Food', notes: 'Early game' },
  { building: 'Farm', level: 10, baseRatePerHour: 15_000, resource: 'Food', notes: 'Mid game' },
  { building: 'Farm', level: 15, baseRatePerHour: 60_000, resource: 'Food', notes: 'Late game' },
  { building: 'Farm', level: 20, baseRatePerHour: 220_000, resource: 'Food', notes: 'Max level' },

  // Wood (Lumber Mill / Sawmill)
  { building: 'Sawmill', level: 5, baseRatePerHour: 2_800, resource: 'Wood', notes: 'Early game' },
  { building: 'Sawmill', level: 10, baseRatePerHour: 12_000, resource: 'Wood', notes: 'Mid game' },
  { building: 'Sawmill', level: 15, baseRatePerHour: 48_000, resource: 'Wood', notes: 'Late game' },
  { building: 'Sawmill', level: 20, baseRatePerHour: 180_000, resource: 'Wood', notes: 'Max level' },

  // Iron (Iron Mine)
  { building: 'Iron Mine', level: 5, baseRatePerHour: 2_200, resource: 'Iron', notes: 'Early game' },
  { building: 'Iron Mine', level: 10, baseRatePerHour: 10_000, resource: 'Iron', notes: 'Mid game' },
  { building: 'Iron Mine', level: 15, baseRatePerHour: 40_000, resource: 'Iron', notes: 'Late game' },
  { building: 'Iron Mine', level: 20, baseRatePerHour: 150_000, resource: 'Iron', notes: 'Max level' },

  // Oil (Oil Derrick)
  { building: 'Oil Derrick', level: 5, baseRatePerHour: 1_500, resource: 'Oil', notes: 'Early game — unlocked HQ 8' },
  { building: 'Oil Derrick', level: 10, baseRatePerHour: 7_000, resource: 'Oil', notes: 'Mid game' },
  { building: 'Oil Derrick', level: 15, baseRatePerHour: 28_000, resource: 'Oil', notes: 'Late game' },
  { building: 'Oil Derrick', level: 20, baseRatePerHour: 100_000, resource: 'Oil', notes: 'Max level' },

  // Gold (Gold Mine — seasonal, Season 5)
  { building: 'Gold Mine', level: 1, baseRatePerHour: 200, resource: 'Gold', notes: 'Season 5 exclusive building, base rate' },
  { building: 'Gold Mine', level: 5, baseRatePerHour: 1_200, resource: 'Gold', notes: 'Season 5 — mid level' },

  // CrystalGold (Frontier Exchange passive earn)
  { building: 'Bank Stronghold (Tier 1)', level: 1, baseRatePerHour: 50, resource: 'CrystalGold', notes: 'While alliance holds the bank' },
  { building: 'Bank Stronghold (Tier 2)', level: 1, baseRatePerHour: 200, resource: 'CrystalGold', notes: 'While alliance holds the bank' },
  { building: 'Bank Stronghold (Tier 3/Vault)', level: 1, baseRatePerHour: 800, resource: 'CrystalGold', notes: 'Alliance-wide income while held' },
];

// ---------------------------------------------------------------------------
// COMMON EVENT FORMULAS
// ---------------------------------------------------------------------------

export const eventFormulas: EventFormula[] = [
  {
    eventName: 'Arms Race Points (Speed-up)',
    formula: 'points = (speedUpMinutes / 60) × 10',
    variables: {
      speedUpMinutes: 'Total minutes of speed-up consumed',
    },
    example: 'Using a 24h (1440 min) Legendary Speed-up: (1440 / 60) × 10 = 240 points',
    tips: [
      'All speed-up types count (Construction, Research, Training, Universal)',
      'Universal speed-ups are the most flexible — always prefer them',
      'A 10-pack of 1h speed-ups = 100 points',
    ],
  },
  {
    eventName: 'Arms Race Points (Troops Trained)',
    formula: 'points = (troopsCount / 1000) × tierMultiplier',
    variables: {
      troopsCount: 'Number of troops trained',
      tierMultiplier: 'T1=1, T2=2, T3=5, T4=15, T5=40',
    },
    example: 'Training 10,000 T4 troops: (10000 / 1000) × 15 = 150 points',
    tips: [
      'T4 training gives the best points-per-resource ratio',
      'T5 training is maximum points but resource-intensive',
      'T1 mass-training is rarely efficient unless you have resource overflow',
    ],
  },
  {
    eventName: 'Code Boss Damage Contribution',
    formula: 'damageContribution = (myDamage / totalRallyDamage) × 100',
    variables: {
      myDamage: 'Your personal damage dealt to the boss',
      totalRallyDamage: 'Sum of all rally participants\' damage',
    },
    example: 'If your damage is 2M out of 20M total: (2M / 20M) × 100 = 10% contribution',
    tips: [
      'Type-matching (Tank boss → Tank squad) gives +25% damage bonus',
      'DVA + Morrison is highest damage for Aircraft bosses',
      'Kimberly + Marshall is highest damage for Tank bosses',
      'Tesla + Fiona is highest damage for Missile bosses',
    ],
  },
  {
    eventName: 'Hospital Capacity (Troop Recovery)',
    formula: 'hospitalCapacity = baseCapacity + (hospitalLevel × 500)',
    variables: {
      baseCapacity: 'Starting capacity (500)',
      hospitalLevel: 'Current hospital building level',
    },
    example: 'Hospital Level 15: 500 + (15 × 500) = 8,000 troops',
    tips: [
      'Overflow past hospital capacity = permanent troop death',
      'Always shield before going offline during wars',
      'Upgrade hospital before aggressive PvP phases',
    ],
  },
  {
    eventName: 'Gathering Speed (Resources/Hour)',
    formula: 'effectiveRate = baseRate × (1 + gatheringTech%) × (1 + heroBonus%) × (1 + coffeeBonus%)',
    variables: {
      baseRate: 'Base tile resource rate per hour',
      gatheringTech: 'Gathering speed tech bonus (e.g. 0.30 = 30%)',
      heroBonus: 'Gathering hero skill bonus (e.g. 0.20 = 20%)',
      coffeeBonus: 'Coffee Buff gathering bonus (0.10 for Regular, 0.20 for Strong)',
    },
    example:
      'Oil tile base 50,000/hr × 1.30 (tech) × 1.20 (hero) × 1.10 (coffee) = 85,800/hr effective rate',
    tips: [
      'Stack all three multipliers during Gathering Arms Race phase',
      'Regular Coffee is sufficient for gathering — save Strong/Premium for training/construction',
      'Alliance gathering tech upgrade is cheap and permanent — always max it',
    ],
  },
  {
    eventName: 'Alliance Duel Power Rating',
    formula: 'powerRating = Σ(heroLevel × rarityMultiplier × starLevel) across all 5 heroes',
    variables: {
      heroLevel: 'Current hero level (1–60)',
      rarityMultiplier: 'SR=1.0, SSR=1.5, UR=2.5',
      starLevel: 'Hero star level (1–6, each star = +15%)',
    },
    example:
      'Kimberly (UR, Lv60, 5★): 60 × 2.5 × 1.75 = 262.5 rating for this hero slot',
    tips: [
      'Alliance Duel matches based on power rating — investing in stars matters more than hero level',
      'UR heroes have 2.5× multiplier — 1 UR is worth more than 2 SSRs',
      'Star 5 → Star 6 is the highest single-step power jump',
    ],
  },
  {
    eventName: 'Resource Pack Efficiency',
    formula: 'packValue = resources × resourceRarity / packCost',
    variables: {
      resources: 'Amount of resource in pack',
      resourceRarity: 'Food=1, Wood=1.2, Iron=1.5, Oil=2.5',
      packCost: 'Real-money cost of the pack in your local currency',
    },
    example: 'Pack with 5M Oil at $5: (5,000,000 × 2.5) / 5 = 2,500,000 value/dollar',
    tips: [
      'Oil packs are 2.5× more valuable than Food packs per dollar',
      'First-purchase bonus packs are always the best value',
      'Season-exclusive packs often include CrystalGold — factor that into value calculation',
    ],
  },
];

// ---------------------------------------------------------------------------
// SPEED-UP VALUE REFERENCE
// ---------------------------------------------------------------------------

export const speedUpValues: SpeedUpValue[] = [
  {
    type: 'Basic Speed-up (1 min)',
    durationMinutes: 1,
    relativeValue: 1,
    bestUsedFor: 'Almost never — only use to shave final minutes off a timer',
  },
  {
    type: 'Advanced Speed-up (1h)',
    durationMinutes: 60,
    relativeValue: 25,
    bestUsedFor: 'Mid-game events. Common drop from daily quests.',
  },
  {
    type: 'Advanced Speed-up (3h)',
    durationMinutes: 180,
    relativeValue: 55,
    bestUsedFor: 'Research and construction fillers between events.',
  },
  {
    type: 'Advanced Speed-up (8h)',
    durationMinutes: 480,
    relativeValue: 75,
    bestUsedFor: 'Overnight queues. Good for training.',
  },
  {
    type: 'Legendary Speed-up (24h)',
    durationMinutes: 1440,
    relativeValue: 100,
    bestUsedFor: 'Arms Race events. Never waste on idle queues.',
  },
  {
    type: 'Universal Speed-up (1h)',
    durationMinutes: 60,
    relativeValue: 30,
    bestUsedFor: 'Construction OR Research — most flexible, highest priority to save.',
  },
  {
    type: 'Training Speed-up (1h)',
    durationMinutes: 60,
    relativeValue: 22,
    bestUsedFor: 'Training Arms Race phase ONLY. Do not use outside event.',
  },
];

// ---------------------------------------------------------------------------
// UTILITY FUNCTIONS
// ---------------------------------------------------------------------------

export function getPhaseData(phase: ArmsRacePhase): ArmsRacePhaseData | undefined {
  return armsRacePhases.find(p => p.phase === phase);
}

export function calculateSpeedUpPoints(durationMinutes: number): number {
  return (durationMinutes / 60) * 10;
}

export function calculateTrainingPoints(troops: number, tier: 1 | 2 | 3 | 4 | 5): number {
  const multipliers: Record<number, number> = { 1: 1, 2: 2, 3: 5, 4: 15, 5: 40 };
  return (troops / 1000) * (multipliers[tier] ?? 1);
}

export function getThresholdAtPoints(points: number): ArmsRaceThreshold {
  const sorted = [...armsRaceThresholds].sort((a, b) => b.pointsRequired - a.pointsRequired);
  return sorted.find(t => points >= t.pointsRequired) ?? armsRaceThresholds[0];
}

export function getNextThreshold(currentPoints: number): ArmsRaceThreshold | null {
  const sorted = [...armsRaceThresholds].sort((a, b) => a.pointsRequired - b.pointsRequired);
  return sorted.find(t => t.pointsRequired > currentPoints) ?? null;
}

export function calculateGatheringRate(
  baseRate: number,
  techBonus: number,
  heroBonus: number,
  coffeeBonus: number,
): number {
  return baseRate * (1 + techBonus) * (1 + heroBonus) * (1 + coffeeBonus);
}
