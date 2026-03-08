// season-data.ts
// Last War: Survival — Season 5 "Wild West" data
// Sources: In-game observation, community guides (Feb–Mar 2026)

// ---------------------------------------------------------------------------
// TYPE DEFINITIONS
// ---------------------------------------------------------------------------

export interface SeasonMechanic {
  name: string;
  description: string;
  howToUse: string;
  tips: string[];
}

export interface WeekSummary {
  week: number;
  title: string;
  phase: 'Foundation' | 'Development' | 'Conflict' | 'Finals';
  dateRange: string;
  keyEvents: string[];
  primaryFocus: string;
  tips: string[];
  featuredMechanic: string | null;
}

export interface SeasonReward {
  rank: string;
  rankRange: string;
  rewards: string[];
}

export interface SeasonInfo {
  seasonNumber: number;
  name: string;
  theme: string;
  tagline: string;
  startDate: string;
  endDate: string;
  durationWeeks: number;
  lore: string;
  visualStyle: string;
  newFeatures: string[];
  mechanics: SeasonMechanic[];
  weekSummaries: WeekSummary[];
  finalRankRewards: SeasonReward[];
  generalTips: string[];
}

// ---------------------------------------------------------------------------
// SEASON 5 DATA
// ---------------------------------------------------------------------------

export const season5: SeasonInfo = {
  seasonNumber: 5,
  name: 'Wild West',
  theme: 'Wild West / Frontier',
  tagline: 'Stake your claim. Defend your territory. Outlast the frontier.',
  startDate: 'January 2026',
  endDate: 'March 2026',
  durationWeeks: 8,
  lore:
    'After the chaos of Season 4\'s nuclear winter, survivors emerge into the scorched plains of the New Frontier. Resources are scarce, alliances are fragile, and only the strongest ranches — I mean, bases — will dominate the Wild West. Gold rushes, bank heists, and frontier duels define this season.',
  visualStyle:
    'Desert landscape tileset with saloon-style buildings, wooden fences, sheriff badges for rankings, and gold-rush UI accents. Limited edition Wild West avatar frames and troop skins available.',
  newFeatures: [
    'Bank Strongholds — new resource buildings on the seasonal map',
    'CrystalGold — new seasonal currency replacing Season 4 tokens',
    'Coffee Buffs — time-limited production boosters available at the Ranch building',
    'City Clash — expanded SVS format with multiple city objectives per map',
    'UR Venom upgrade path added to Missile progression',
    'Aircraft exclusive weapons added for Morrison, Schuyler',
    'New seasonal cosmetics: Wild West troop skins, avatar frames',
  ],

  // -------------------------------------------------------------------------
  // KEY SEASONAL MECHANICS
  // -------------------------------------------------------------------------
  mechanics: [
    {
      name: 'Coffee Buffs',
      description:
        'The Ranch building (Season 5 exclusive structure) produces Coffee over time. Consuming Coffee grants temporary production buffs (resource gathering, construction speed, or troop training) for 2–4 hours depending on Coffee grade. Three grades: Regular (green), Strong (blue), Premium (gold).',
      howToUse:
        'Visit your Ranch daily to collect Coffee. Stockpile Premium Coffee for construction/training events. Use Regular Coffee on low-value activities between events. Do not let the Ranch overflow — it stops producing when full.',
      tips: [
        'Use Premium Coffee during Construction or Training events for 2× point efficiency',
        'Strong Coffee pairs well with Arms Race gathering phases',
        'Regular Coffee is free speed-up equivalent — never waste it',
        'Alliance members can gift Coffee via the Gift Centre (unlocked at Ranch level 5)',
        'Coffee cannot be purchased directly — Ranch upgrades increase Coffee production rate',
      ],
    },
    {
      name: 'CrystalGold',
      description:
        'Seasonal currency for Season 5. Earned through seasonal events, completing Wild West challenges, Bank Stronghold raids, and daily quests. Spent at the Frontier Exchange for exclusive skins, UR hero shards (Morrison/Schuyler/Venom), gear components, and speed-ups.',
      howToUse:
        'Prioritise spending on UR hero shards if you\'re missing Morrison, Schuyler, or the UR Venom upgrade. Secondary priority: exclusive gear. Skins and cosmetics last — spend on them only with surplus.',
      tips: [
        'CrystalGold expires at season end — spend before the season closes',
        'Top players earn 3-4× more CrystalGold than casual players due to Bank Stronghold bonuses',
        'Track your weekly CrystalGold income vs shard costs to plan your roadmap',
        'Alliance events reward bonus CrystalGold for participation — show up',
        'Daily quest streak provides 50% bonus CrystalGold on day 7',
      ],
    },
    {
      name: 'Bank Strongholds',
      description:
        'Fixed-point resource buildings scattered across the seasonal map. Each Bank Stronghold holds CrystalGold reserves that can be raided. Banks respawn every 24 hours. Higher-tier Banks (Tier 1–3) hold more CrystalGold but are defended by stronger garrisons and player alliances. Capturing a Bank grants the holding alliance a CrystalGold income bonus for the duration of control.',
      howToUse:
        'Send scouts to locate Tier 2 and Tier 3 Banks. Coordinate alliance rallies to capture and hold high-value banks. Assign defensive garrisons immediately after capture. Rotate capturing duties so more members earn the control bonus.',
      tips: [
        'Banks are most contested during hours 18:00–22:00 server time — defend actively',
        'Tier 3 Banks grant alliance-wide CrystalGold bonuses — worth fighting for',
        'A solo player can capture Tier 1 Banks; Tier 2+ require rally or alliance coordination',
        'After capturing a bank, reinforce immediately — enemies will counter-attack within minutes',
        'The Bank with the highest tier in your quadrant is called the Frontier Vault — whoever holds it at weekly reset gets a massive bonus',
      ],
    },
    {
      name: 'City Clash',
      description:
        'Expanded Server vs Server (SVS) event in Season 5. Instead of a single capital city, the map now features 5 city objectives: the Frontier Capital (center), 2 Eastern Cities, and 2 Western Cities. Alliances must contest multiple cities simultaneously. Points are earned for each city held at hourly checkpoints. The server with the most points at the 4-hour mark wins the Clash.',
      howToUse:
        'Divide your alliance into 3 groups: Capitol Strike Force (your strongest players), Eastern Defence, Western Defence. Coordinate via Alliance chat. Prioritise the Frontier Capital for maximum points while using defensive groups to hold secondary cities.',
      tips: [
        'The Frontier Capital is worth 3× the points of a standard city — never concede it',
        'Split-push strategy: let enemies chase your Capital group while a secondary team captures uncontested Eastern/Western cities',
        'Troop losses during City Clash are NOT fully refunded — bring your best heroes but protect troop composition',
        'City Clash starts every Saturday at 14:00 server time in Season 5',
        'Alliance level directly impacts march size — upgrade Alliance tech before City Clash weekends',
        'Hero formation tip: Run mixed squads (Tank + Aircraft) in City Clash — pure formations are easier to counter',
      ],
    },
  ],

  // -------------------------------------------------------------------------
  // WEEK SUMMARIES
  // -------------------------------------------------------------------------
  weekSummaries: [
    {
      week: 1,
      title: 'Frontier Settlement',
      phase: 'Foundation',
      dateRange: 'Week 1 of Season 5',
      keyEvents: [
        'Season Opening Ceremony — log-in bonus distributed',
        'Ranch Construction Tutorial quest chain',
        'First Coffee Buff activation event',
        'Tier 1 Bank Stronghold opens (Tier 2 and 3 locked)',
        'Arms Race: Construction Phase (build levels for points)',
        'Wild West Welcome Pack available in Mall (one-time)',
      ],
      primaryFocus: 'Build your Ranch, upgrade your base to HQ 16+, collect the welcome pack',
      tips: [
        'Purchase the Wild West Welcome Pack if available — best value of the season',
        'Prioritise Ranch construction before other seasonal buildings',
        'Use all Regular Coffee this week — no point stockpiling in Week 1',
        'Arms Race Construction phase: queue as many builds as possible before the event window',
      ],
      featuredMechanic: 'Coffee Buffs',
    },
    {
      week: 2,
      title: 'Gold Rush Begins',
      phase: 'Foundation',
      dateRange: 'Week 2 of Season 5',
      keyEvents: [
        'Tier 2 Bank Strongholds unlock',
        'First CrystalGold Frontier Exchange opens',
        'Alliance Duel (Weekly format)',
        'Arms Race: Training Phase',
        'Code Boss — Missile Type (server-wide boss event)',
        'Wild West Challenge: Gather 50M resources for CrystalGold bonus',
      ],
      primaryFocus: 'Contest Tier 2 Banks, earn CrystalGold, complete first Code Boss',
      tips: [
        'Rally Tier 2 Banks with your alliance — solo players will lose them to coordinated enemies',
        'Save Strong Coffee for Arms Race Training Phase to maximise training event points',
        'Check Frontier Exchange this week — Morrison shards may be available early',
        'Code Boss (Missile): Deploy Tesla + Fiona for maximum damage contribution',
      ],
      featuredMechanic: 'Bank Strongholds',
    },
    {
      week: 3,
      title: 'Outlaw Season',
      phase: 'Development',
      dateRange: 'Week 3 of Season 5',
      keyEvents: [
        'Tier 3 (Frontier Vault) Banks unlock',
        'Code Boss — Tank Type',
        'Alliance Duel',
        'Arms Race: Research Phase',
        'Zombie Invasion — Advanced Waves (seasonal difficulty spike)',
        'Wild West Challenge: Win 30 PvP battles for bonus CrystalGold',
      ],
      primaryFocus: 'Tier 3 bank competition, aggressive expansion, hero upgrades',
      tips: [
        'The Frontier Vault (Tier 3 Bank) fight is the biggest event of weeks 3–5 — coordinate with your whole alliance',
        'Code Boss (Tank): Deploy Kimberly + Williams + Marshall for maximum damage',
        'Research Arms Race: queue as many tech upgrades as possible beforehand',
        'Zombie Invasion difficulty spike — ensure heroes are at minimum 3M power',
      ],
      featuredMechanic: 'Bank Strongholds',
    },
    {
      week: 4,
      title: 'Sheriff\'s Standoff',
      phase: 'Development',
      dateRange: 'Week 4 of Season 5',
      keyEvents: [
        'Mid-Season Rankings published',
        'Code Boss — Aircraft Type',
        'Alliance Duel (extended format)',
        'Arms Race: Combat Phase (PvP kills and attacks)',
        'City Clash — Preview Event (non-scoring warm-up)',
        'Frontier Exchange adds Schuyler shards',
      ],
      primaryFocus: 'Rankings check, Aircraft Code Boss, preview City Clash mechanics',
      tips: [
        'Check mid-season ranking against alliance peers — adjust CrystalGold spending priorities',
        'Code Boss (Aircraft): DVA + Morrison + Schuyler is the must-run formation',
        'Arms Race Combat Phase: Don\'t attack bases of whales far above your power — target near-equal opponents',
        'City Clash preview has no stakes — use it to learn city locations and spawn timing',
      ],
      featuredMechanic: 'CrystalGold',
    },
    {
      week: 5,
      title: 'Frontier War',
      phase: 'Conflict',
      dateRange: 'Week 5 of Season 5',
      keyEvents: [
        'City Clash — First Scoring Event (full format)',
        'Warzone / SVS begins (server vs server)',
        'Code Boss — All Types (rotating 24-hour windows)',
        'Alliance Duel',
        'Arms Race: All-type combined phase',
        'Frontier Exchange: UR Venom upgrade materials added',
      ],
      primaryFocus: 'City Clash, SVS domination, maximise CrystalGold before season end',
      tips: [
        'This is the highest-stakes week — healing troops costs real resources, do not overextend',
        'SVS: mixed squad formations (Tank + Aircraft) are hardest to counter — run them',
        'City Clash: Assign the Frontier Capital to your top 20 power players',
        'UR Venom upgrade: only buy if you\'re a committed Missile-main with no better CrystalGold target',
      ],
      featuredMechanic: 'City Clash',
    },
    {
      week: 6,
      title: 'Last Stand',
      phase: 'Conflict',
      dateRange: 'Week 6 of Season 5',
      keyEvents: [
        'City Clash — Second Scoring Event',
        'SVS continues',
        'General\'s Trial — Season-long PvE event concludes',
        'Alliance Duel',
        'Arms Race: Finals qualification phase',
        'Wild West Challenge completion rewards distributed',
      ],
      primaryFocus: 'Second City Clash, finalise General\'s Trial, Arms Race qualification',
      tips: [
        'Second City Clash often sees biggest battles — heal and reinforce all troops before weekend',
        'General\'s Trial ends this week — complete all remaining difficulty tiers for max CrystalGold',
        'Arms Race: top 3 alliance members qualify for finals — communicate with R4/R5 on strategy',
        'Premium Coffee: use all stockpiles before season end (doesn\'t carry over)',
      ],
      featuredMechanic: 'City Clash',
    },
    {
      week: 7,
      title: 'Wild West Finals',
      phase: 'Finals',
      dateRange: 'Week 7 of Season 5',
      keyEvents: [
        'Arms Race Grand Finals',
        'City Clash — Championship Event (highest scoring)',
        'Season ranking lock',
        'Frontier Exchange: Final week — spend all remaining CrystalGold',
        'Alliance Duel (final round)',
        'Code Boss: Legendary Difficulty unlocked (top alliances only)',
      ],
      primaryFocus: 'Arms Race Finals, Championship City Clash, spend all CrystalGold',
      tips: [
        'Do not miss the CrystalGold spending deadline — it expires with season end',
        'Championship City Clash: full server mobilisation — coordinate all alliance members online',
        'Code Boss Legendary: only attempt with 6M+ power heroes — massive rewards but brutal difficulty',
        'Arms Race Finals: your squad composition matters — check meta builds beforehand',
      ],
      featuredMechanic: 'CrystalGold',
    },
    {
      week: 8,
      title: 'The Dust Settles',
      phase: 'Finals',
      dateRange: 'Week 8 of Season 5',
      keyEvents: [
        'Season 5 ranking finalised',
        'Season rewards distributed',
        'Season 5 → Season 6 transition preparation window',
        'Last day to spend CrystalGold (Frontier Exchange closes)',
        'Season 6 preview announcements',
        'Wild West exclusive cosmetics locked — final chance to earn',
      ],
      primaryFocus: 'Collect rewards, prepare for Season 6 transition',
      tips: [
        'Spend every CrystalGold token before the exchange closes',
        'Screenshot your final ranking and hero roster for Season 6 planning',
        'Season 6 transition: some buildings reset — do not over-invest in Season 5 seasonal buildings',
        'Use remaining speed-ups on construction/training before season close',
      ],
      featuredMechanic: null,
    },
  ],

  // -------------------------------------------------------------------------
  // FINAL RANKING REWARDS
  // -------------------------------------------------------------------------
  finalRankRewards: [
    {
      rank: 'Frontier Legend',
      rankRange: 'Top 1 (Server #1)',
      rewards: [
        'Frontier Legend avatar frame (permanent)',
        '10,000 Universal Hero Shards',
        '50,000 CrystalGold (next season carry-over: 10%)',
        'Exclusive "Gold Sheriff" troop skin (account-wide)',
        '500 Legendary Speed-ups',
        'Season 5 Champion title',
      ],
    },
    {
      rank: 'Marshal',
      rankRange: 'Top 2–5',
      rewards: [
        'Marshal avatar frame (permanent)',
        '5,000 Universal Hero Shards',
        '20,000 CrystalGold',
        '200 Legendary Speed-ups',
        'Marshal title',
      ],
    },
    {
      rank: 'Sheriff',
      rankRange: 'Top 6–20',
      rewards: [
        'Sheriff avatar frame (90 days)',
        '2,000 Universal Hero Shards',
        '10,000 CrystalGold',
        '100 Legendary Speed-ups',
        'Sheriff title',
      ],
    },
    {
      rank: 'Ranger',
      rankRange: 'Top 21–100',
      rewards: [
        '500 Universal Hero Shards',
        '5,000 CrystalGold',
        '50 Legendary Speed-ups',
      ],
    },
    {
      rank: 'Trailblazer',
      rankRange: 'Top 101–500',
      rewards: [
        '200 Universal Hero Shards',
        '2,000 CrystalGold',
        '20 Advanced Speed-ups',
      ],
    },
    {
      rank: 'Settler',
      rankRange: 'All active participants',
      rewards: [
        '50 Universal Hero Shards',
        '500 CrystalGold',
        'Season 5 Participation badge',
      ],
    },
  ],

  generalTips: [
    'Join an active alliance before Week 2 — solo play in Season 5 is severely handicapped by Bank Stronghold mechanics',
    'Upgrade your Ranch to level 5+ as soon as possible to unlock Coffee gifting',
    'Coffee Buffs are most efficient when used during corresponding Arms Race event phases',
    'CrystalGold priority order: UR hero shards → gear components → cosmetics',
    'City Clash requires a pre-formed strategy — attend alliance war meetings before the event',
    'Season 5 Aircraft meta: DVA + Morrison + Schuyler with exclusive weapons is the top formation',
    'F2P tip: focus Murphy and Mason from Alliance shop, avoid spending CrystalGold on cosmetics',
    'Bank Stronghold tip: hold even a Tier 1 Bank — small CrystalGold income adds up over 8 weeks',
    'Code Boss: matching the correct troop type (Tank/Aircraft/Missile) to the boss type gives 25% bonus damage',
    'Don\'t panic-spend CrystalGold mid-season — plan your shopping list by Week 3 when the full Frontier Exchange is visible',
  ],
};

// ---------------------------------------------------------------------------
// UTILITY FUNCTIONS
// ---------------------------------------------------------------------------

export function getWeekSummary(week: number): WeekSummary | undefined {
  return season5.weekSummaries.find(w => w.week === week);
}

export function getMechanicByName(name: string): SeasonMechanic | undefined {
  return season5.mechanics.find(m =>
    m.name.toLowerCase().includes(name.toLowerCase())
  );
}

export function getWeeksByPhase(phase: WeekSummary['phase']): WeekSummary[] {
  return season5.weekSummaries.filter(w => w.phase === phase);
}

export function getCurrentSeasonInfo(): SeasonInfo {
  return season5;
}
