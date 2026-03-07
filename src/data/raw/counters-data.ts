// counters-data.ts
// Last War: Survival — Formation Counter Guide
// Sources: In-game observation, community meta analysis (Feb–Mar 2026, Season 5)

// ---------------------------------------------------------------------------
// TYPE DEFINITIONS
// ---------------------------------------------------------------------------

export type TroopType = 'Tank' | 'Aircraft' | 'Missile';
export type FormationArchetype =
  | 'Rush'
  | 'Turtle'
  | 'Balanced'
  | 'Sniper'
  | 'DoT'
  | 'DoubleAircraft'
  | 'TripleTank'
  | 'MissileBlitz'
  | 'EnergyStack'
  | 'SupportCore'
  | 'HybridFlex';

export interface HeroSlot {
  position: 'front-left' | 'front-right' | 'rear-left' | 'rear-right' | 'center';
  heroId: string;
  role: 'tank' | 'dps' | 'support' | 'control';
  why: string;
}

export interface Formation {
  archetype: FormationArchetype;
  name: string;
  description: string;
  primaryType: TroopType | 'Mixed';
  slots: HeroSlot[];
  keyHeroes: string[];
  /** Hero IDs that define this formation — if enemy has these, they're running this archetype */
  identifiers: string[];
  strengths: string[];
  weaknesses: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  costTier: 'F2P' | 'Low-spend' | 'Mid-spend' | 'High-spend' | 'Whale';
  typicalPowerRange: string;
}

export interface CounterRelation {
  targetArchetype: FormationArchetype;
  counterArchetype: FormationArchetype;
  effectiveness: 'Hard Counter' | 'Soft Counter' | 'Situational';
  whyItWorks: string;
  keyMechanics: string[];
  tips: string[];
  heroSwaps: {
    swapOut: string;
    swapIn: string;
    reason: string;
  }[];
}

export interface PositionalTip {
  position: HeroSlot['position'];
  generalRule: string;
  examples: string[];
}

// ---------------------------------------------------------------------------
// FORMATIONS
// ---------------------------------------------------------------------------

export const formations: Formation[] = [
  // =========================================================================
  {
    archetype: 'TripleTank',
    name: 'Triple Tank (Full Frontline)',
    description:
      'Three tank heroes anchoring the frontline — typically Murphy, Williams, and Kimberly or Mason. Relies on raw durability and Kimberly\'s AoE burst from the front line. Common F2P and low-spend formation.',
    primaryType: 'Tank',
    keyHeroes: ['murphy', 'williams', 'kimberly', 'mason', 'marshall'],
    identifiers: ['murphy', 'williams', 'kimberly'],
    slots: [
      { position: 'front-left', heroId: 'murphy', role: 'tank', why: 'Highest HP tank, absorbs opener burst' },
      { position: 'front-right', heroId: 'williams', role: 'tank', why: 'Team-wide damage reduction' },
      { position: 'rear-left', heroId: 'kimberly', role: 'dps', why: 'AoE energy damage shreds through the durability window' },
      { position: 'rear-right', heroId: 'mason', role: 'dps', why: 'Physical DPS backup' },
      { position: 'center', heroId: 'marshall', role: 'support', why: 'War Cry amplifies Kimberly\'s burst' },
    ],
    strengths: [
      'Extremely durable — survives most early burst windows',
      'Simple to play — no complex positioning decisions',
      'F2P accessible via Alliance shop (Murphy + Mason)',
      'Hard to burst down even at lower power levels',
      'Marshall + Kimberly combo hits extremely hard in the buff window',
    ],
    weaknesses: [
      'Vulnerable to energy counters — Carlie in opposing squad dramatically reduces Kimberly damage',
      'Slow to kill high-HP targets — can lose to attrition vs equally durable teams',
      'Predictable — experienced opponents will deploy Carlie front-left',
      'No crowd control — gets out-macroed by Schuyler stun squads',
      'Limited range — struggles if enemy tanks are sturdier',
    ],
    difficulty: 'Beginner',
    costTier: 'Low-spend',
    typicalPowerRange: '1M – 8M',
  },

  // =========================================================================
  {
    archetype: 'DoubleAircraft',
    name: 'Double Aircraft Core',
    description:
      'DVA + Morrison as the damage core with Carlie or Schuyler providing either defence or control. The Season 5 meta-dominant formation. Highest single-skill burst in the game.',
    primaryType: 'Aircraft',
    keyHeroes: ['dva', 'morrison', 'schuyler', 'carlie', 'lucius'],
    identifiers: ['dva', 'morrison'],
    slots: [
      { position: 'front-left', heroId: 'carlie', role: 'tank', why: 'Energy resist protects DVA from Kim counter-squads' },
      { position: 'front-right', heroId: 'lucius', role: 'tank', why: 'Off-tank to absorb secondary fire' },
      { position: 'rear-left', heroId: 'dva', role: 'dps', why: 'Primary AoE burst dealer' },
      { position: 'rear-right', heroId: 'morrison', role: 'dps', why: 'Defence shred enables DVA\'s burst' },
      { position: 'center', heroId: 'schuyler', role: 'control', why: 'Stun delays enemy actives before DVA fires' },
    ],
    strengths: [
      'Highest burst damage ceiling in the game',
      'Carlie front-left hard-counters Kim/Tesla energy formations',
      'Schuyler stun disrupts enemy ability timing',
      'Morrison defence shred amplifies entire squad damage',
      'DVA exclusive weapon dramatically increases burst window damage',
    ],
    weaknesses: [
      'Expensive — requires 3+ UR heroes to function optimally',
      'Fragile if Carlie is taken down early — energy damage bypass',
      'Schuyler-less versions lose the CC disruption advantage',
      'Can struggle vs very high HP turtle formations that outlast the burst window',
      'Physical-heavy Tank formations without energy heroes can outlast Aircraft squads',
    ],
    difficulty: 'Intermediate',
    costTier: 'High-spend',
    typicalPowerRange: '4M – 15M+',
  },

  // =========================================================================
  {
    archetype: 'Rush',
    name: 'Rush Formation',
    description:
      'Maximum early-burst composition designed to kill one or two key enemies before they can act. Usually 3 DPS heroes and 1 control hero. Glass cannon strategy.',
    primaryType: 'Mixed',
    keyHeroes: ['kimberly', 'dva', 'tesla', 'swift', 'schuyler'],
    identifiers: ['dva', 'kimberly', 'tesla'],
    slots: [
      { position: 'front-left', heroId: 'schuyler', role: 'control', why: 'Front stun to buy burst DPS the window they need' },
      { position: 'front-right', heroId: 'lucius', role: 'tank', why: 'Minimal tank to soak the first hit' },
      { position: 'rear-left', heroId: 'dva', role: 'dps', why: 'Primary burst AoE' },
      { position: 'rear-right', heroId: 'kimberly', role: 'dps', why: 'Secondary energy burst' },
      { position: 'center', heroId: 'morrison', role: 'dps', why: 'Defence shred maximises burst window' },
    ],
    strengths: [
      'Fastest kill speed — can eliminate 2–3 heroes before they act',
      'Highly effective vs slower formations that rely on ramp-up',
      'Schuyler stun + Morrison shred + DVA burst = instant one-shot window',
      'Difficult to outplay if executed correctly at matched power',
    ],
    weaknesses: [
      'Extremely fragile — one surviving enemy DPS can wipe the formation',
      'Carlie front-left completely neuters the energy burst component',
      'If burst fails (shield/resist), squad collapses immediately',
      'Predictable — opponents who recognize Rush will deploy CC shields or Carlie',
      'No recovery mechanism — can\'t win an attrition fight',
    ],
    difficulty: 'Advanced',
    costTier: 'Whale',
    typicalPowerRange: '6M – 20M+',
  },

  // =========================================================================
  {
    archetype: 'Turtle',
    name: 'Turtle Formation (Bunker)',
    description:
      'Maximum defence formation designed to outlast opponents over multiple rounds. Uses Williams\' damage reduction, heavy tank layers, and healing support. Common in extended PvP events like Alliance Duel.',
    primaryType: 'Tank',
    keyHeroes: ['williams', 'murphy', 'stetmann', 'sarah', 'monica'],
    identifiers: ['williams', 'murphy', 'stetmann'],
    slots: [
      { position: 'front-left', heroId: 'murphy', role: 'tank', why: 'Regen sustain + HP aura for front row' },
      { position: 'front-right', heroId: 'williams', role: 'tank', why: 'Team-wide damage reduction anchor' },
      { position: 'rear-left', heroId: 'stetmann', role: 'support', why: 'Nano repair passive sustains frontline' },
      { position: 'rear-right', heroId: 'mason', role: 'dps', why: 'Minimal DPS to eventually close the fight' },
      { position: 'center', heroId: 'marshall', role: 'support', why: 'Attack buff to help Mason close fights faster' },
    ],
    strengths: [
      'Extremely hard to burst down — Williams passive + Murphy regen + Stetmann repair stacks',
      'Wins attrition fights against opponents who run out of DPS',
      'Effective defensive formation for base defence while offline',
      'Low-cost variant accessible to F2P players (Murphy + Mason from Alliance shop)',
    ],
    weaknesses: [
      'Very low damage ceiling — relies on opponents running out of resources',
      'Struggles against DoT compositions that bypass shields',
      'Slow — experienced opponents will simply outlast you with better DPS if they match your defence',
      'Kimberly energy AoE still damages through Williams\' reduction significantly',
      'Almost no offensive threat — enemy can regenerate between rounds',
    ],
    difficulty: 'Beginner',
    costTier: 'F2P',
    typicalPowerRange: '500K – 5M',
  },

  // =========================================================================
  {
    archetype: 'Balanced',
    name: 'Balanced Formation',
    description:
      'Standard 2-tank, 2-DPS, 1-support lineup. Most common mid-game formation. Flexible enough to handle most match-ups with correct hero choice.',
    primaryType: 'Mixed',
    keyHeroes: ['murphy', 'kimberly', 'dva', 'mason', 'marshall'],
    identifiers: ['murphy', 'kimberly', 'mason'],
    slots: [
      { position: 'front-left', heroId: 'murphy', role: 'tank', why: 'Primary frontline tank' },
      { position: 'front-right', heroId: 'mason', role: 'dps', why: 'Secondary frontline DPS' },
      { position: 'rear-left', heroId: 'kimberly', role: 'dps', why: 'AoE energy damage' },
      { position: 'rear-right', heroId: 'dva', role: 'dps', why: 'Aerial burst supplement' },
      { position: 'center', heroId: 'marshall', role: 'support', why: 'Team-wide attack buff' },
    ],
    strengths: [
      'No catastrophic weakness — reasonable defence and offence',
      'Flexible positioning — heroes can be rearranged for different match-ups',
      'Mid-game accessible with common hero roster',
      'Works as a starting point to build toward more specialised formations',
    ],
    weaknesses: [
      'No extreme strength — dominated by specialist formations at equal power',
      'Lacks the CC disruption of Aircraft-heavy squads',
      'Insufficient burst to punch above weight class',
      'Predictable — experienced players immediately know your kit',
    ],
    difficulty: 'Beginner',
    costTier: 'Low-spend',
    typicalPowerRange: '1M – 5M',
  },

  // =========================================================================
  {
    archetype: 'Sniper',
    name: 'Sniper / Priority-Target Formation',
    description:
      'Formation focused on eliminating one high-value enemy hero (usually the enemy\'s key DPS) before the fight opens up. Uses Execute mechanics and focused single-target damage.',
    primaryType: 'Missile',
    keyHeroes: ['swift', 'tesla', 'adam', 'fiona', 'schuyler'],
    identifiers: ['swift', 'tesla', 'adam'],
    slots: [
      { position: 'front-left', heroId: 'adam', role: 'tank', why: 'Frontline Missile tank, absorbs initial fire' },
      { position: 'front-right', heroId: 'schuyler', role: 'control', why: 'Stun to delay enemy DPS from acting' },
      { position: 'rear-left', heroId: 'tesla', role: 'dps', why: 'Chain lightning hits multiple targets including priority' },
      { position: 'rear-right', heroId: 'fiona', role: 'dps', why: 'AoE softens everyone while Swift executes' },
      { position: 'center', heroId: 'swift', role: 'dps', why: 'Execute mechanic finishes weakened priority target' },
    ],
    strengths: [
      'Devastating vs single-DPS formations — removes their core in round 1',
      'Schuyler stun buys time for Tesla/Fiona to soften targets',
      'Swift Execute chains can clear multiple weakened enemies',
      'Effective counter to formations that rely on one OP hero',
    ],
    weaknesses: [
      'Inconsistent vs spread-DPS formations — hard to pick one priority target',
      'Fiona softening too spread out to trigger Execute efficiently against full-HP targets',
      'Fragile frontline — Adam alone can\'t tank sustained damage',
      'Less effective vs Turtle formations that never drop low enough for Execute',
    ],
    difficulty: 'Intermediate',
    costTier: 'Mid-spend',
    typicalPowerRange: '2M – 7M',
  },

  // =========================================================================
  {
    archetype: 'DoT',
    name: 'DoT / Poison Composition',
    description:
      'Formation centred around stacking Damage-over-Time effects (poison, burn, corrosion). Venom, Violet, and Scarlett are the DoT heroes. Niche — effective only in extended PvE boss fights.',
    primaryType: 'Mixed',
    keyHeroes: ['venom', 'violet', 'tesla', 'fiona', 'adam'],
    identifiers: ['venom', 'violet'],
    slots: [
      { position: 'front-left', heroId: 'adam', role: 'tank', why: 'Missile tank to survive long enough for DoT to stack' },
      { position: 'front-right', heroId: 'violet', role: 'dps', why: 'Poison DoT stacker' },
      { position: 'rear-left', heroId: 'tesla', role: 'dps', why: 'Energy damage synergises with corrosive debuffs' },
      { position: 'rear-right', heroId: 'venom', role: 'dps', why: 'Primary DoT and anti-heal source' },
      { position: 'center', heroId: 'fiona', role: 'dps', why: 'AoE spreads DoT more broadly' },
    ],
    strengths: [
      'In long PvE fights (10+ rounds), DoT stacks become enormous',
      'Anti-heal from Venom counters boss regeneration mechanics',
      'Passive damage is free — no active timing required',
      'Can threaten high-HP boss targets that resist burst',
    ],
    weaknesses: [
      'Completely non-viable in PvP — fights end before DoT accumulates',
      'Low burst damage — gets destroyed by Rush/Aircraft formations immediately',
      'Multiple DoT heroes waste slots in any mixed formation',
      'Only relevant in General\'s Trial and specific PvE boss phases',
    ],
    difficulty: 'Intermediate',
    costTier: 'Mid-spend',
    typicalPowerRange: 'PvE content only',
  },

  // =========================================================================
  {
    archetype: 'MissileBlitz',
    name: 'Missile Blitz',
    description:
      'Tesla + Fiona double-DPS Missile formation with Adam or McGregor as frontline tank. Focuses on chain-lightning and AoE bombardment for rapid multi-target elimination.',
    primaryType: 'Missile',
    keyHeroes: ['tesla', 'fiona', 'adam', 'mcgregor', 'swift'],
    identifiers: ['tesla', 'fiona', 'adam'],
    slots: [
      { position: 'front-left', heroId: 'adam', role: 'tank', why: 'Reactive armour + counterattack protects the backline' },
      { position: 'front-right', heroId: 'mcgregor', role: 'tank', why: 'Taunt redirects fire to high-def target' },
      { position: 'rear-left', heroId: 'tesla', role: 'dps', why: 'Chain lightning primary DPS' },
      { position: 'rear-right', heroId: 'fiona', role: 'dps', why: 'AoE barrage secondary DPS' },
      { position: 'center', heroId: 'swift', role: 'dps', why: 'Execute finisher as targets weaken' },
    ],
    strengths: [
      'High sustained DPS from Tesla chain-lightning',
      'AoE coverage from Fiona ensures no target survives at low HP',
      'Adam counterattack adds passive damage with zero cost',
      'Tesla defence reduction debuff amplifies Fiona\'s missiles',
    ],
    weaknesses: [
      'No CC — gets disrupted by Schuyler stuns easily',
      'McGregor taunt can backfire dramatically without heavy armour investment',
      'Burst ceiling lower than DVA Aircraft formation',
      'Countered by high-energy-resist formations or Carlie',
    ],
    difficulty: 'Intermediate',
    costTier: 'Mid-spend',
    typicalPowerRange: '2M – 8M',
  },

  // =========================================================================
  {
    archetype: 'EnergyStack',
    name: 'Energy Stack',
    description:
      'Multiple energy damage heroes (Kimberly + DVA + Tesla) deployed together. Maximum energy damage output, designed to shred formations without energy resistance.',
    primaryType: 'Mixed',
    keyHeroes: ['kimberly', 'dva', 'tesla', 'morrison', 'marshall'],
    identifiers: ['kimberly', 'dva', 'tesla'],
    slots: [
      { position: 'front-left', heroId: 'williams', role: 'tank', why: 'Damage reduction keeps energy DPS alive' },
      { position: 'front-right', heroId: 'lucius', role: 'tank', why: 'Off-tank to prevent backline focus' },
      { position: 'rear-left', heroId: 'kimberly', role: 'dps', why: 'Tank-type energy AoE' },
      { position: 'rear-right', heroId: 'dva', role: 'dps', why: 'Aircraft-type energy AoE burst' },
      { position: 'center', heroId: 'tesla', role: 'dps', why: 'Missile-type energy chain covers all angles' },
    ],
    strengths: [
      'Devastating burst if enemy has no energy resistance',
      'Three energy damage sources hit simultaneously — no single resist blocks all three',
      'Cross-type coverage (Tank/Aircraft/Missile) means troop composition debuffs are split',
      'Marshall variant can boost all three DPS simultaneously',
    ],
    weaknesses: [
      'Carlie front-left is a near-hard-counter — energy resist blocks majority of damage',
      'Extremely expensive — requires three UR heroes at high star levels',
      'No CC — vulnerable to Schuyler stun squads',
      'Resource-intensive to star up three UR DPS heroes simultaneously',
    ],
    difficulty: 'Expert',
    costTier: 'Whale',
    typicalPowerRange: '8M – 20M+',
  },

  // =========================================================================
  {
    archetype: 'SupportCore',
    name: 'Support Core (Attrition)',
    description:
      'Formation built around sustain and buffs — Marshall + Williams + Stetmann backing up frontline damage dealers. Wins via sustained pressure rather than burst.',
    primaryType: 'Tank',
    keyHeroes: ['marshall', 'williams', 'stetmann', 'kimberly', 'murphy'],
    identifiers: ['marshall', 'williams', 'stetmann'],
    slots: [
      { position: 'front-left', heroId: 'murphy', role: 'tank', why: 'Primary tank with self-regen' },
      { position: 'front-right', heroId: 'williams', role: 'tank', why: 'Team damage reduction' },
      { position: 'rear-left', heroId: 'kimberly', role: 'dps', why: 'Sole DPS carrier, kept alive by support' },
      { position: 'rear-right', heroId: 'stetmann', role: 'support', why: 'Nano repair sustains frontline tanks' },
      { position: 'center', heroId: 'marshall', role: 'support', why: 'War Cry amplifies Kim\'s burst periodically' },
    ],
    strengths: [
      'Sustained pressure with strong recovery between burst windows',
      'Kimberly output is amplified multiple times per fight via War Cry',
      'Hard to burst kill — two tank layers + Stetmann regen',
      'Effective in multi-round events like Alliance Duel',
    ],
    weaknesses: [
      'Single DPS carry — removing Kimberly collapses the formation',
      'Energy counters (Carlie) still cut Kimberly\'s effectiveness',
      'Not a top-end endgame formation — outclassed by Aircraft with exclusive weapons',
      'Two support slots feels wasteful at high power levels',
    ],
    difficulty: 'Beginner',
    costTier: 'Low-spend',
    typicalPowerRange: '1M – 6M',
  },

  // =========================================================================
  {
    archetype: 'HybridFlex',
    name: 'Hybrid Flex',
    description:
      'City Clash optimised formation mixing Tank and Aircraft heroes. Designed to resist single-formation counters by presenting both energy and physical damage threats simultaneously.',
    primaryType: 'Mixed',
    keyHeroes: ['williams', 'carlie', 'kimberly', 'dva', 'morrison'],
    identifiers: ['williams', 'carlie', 'dva', 'kimberly'],
    slots: [
      { position: 'front-left', heroId: 'williams', role: 'tank', why: 'Damage reduction anchor for the mixed squad' },
      { position: 'front-right', heroId: 'carlie', role: 'tank', why: 'Energy resist covers both Kim and DVA from counter-squads' },
      { position: 'rear-left', heroId: 'kimberly', role: 'dps', why: 'Tank-type energy burst' },
      { position: 'rear-right', heroId: 'dva', role: 'dps', why: 'Aircraft-type energy burst' },
      { position: 'center', heroId: 'morrison', role: 'dps', why: 'Defence shred benefits both DPS heroes' },
    ],
    strengths: [
      'Best formation for City Clash — mixed type is hardest to single-counter',
      'Carlie protects BOTH energy DPS heroes from energy-resist counters',
      'Morrison defence shred scales both Tank and Aircraft damage',
      'DVA + Kimberly simultaneous energy burst is devastating',
      'Williams damage reduction keeps the formation alive through the opener',
    ],
    weaknesses: [
      'Extremely expensive — requires 5 UR heroes all at high investment',
      'Schuyler\'s CC still disrupts timing if not accounted for',
      'Best formation for SVS and City Clash but overkill for regular PvP',
      'Requires tight hero positioning management to avoid wasted stats',
    ],
    difficulty: 'Expert',
    costTier: 'Whale',
    typicalPowerRange: '8M – 25M+',
  },
];

// ---------------------------------------------------------------------------
// COUNTER RELATIONS
// ---------------------------------------------------------------------------

export const counterRelations: CounterRelation[] = [
  // -------------------------------------------------------------------------
  {
    targetArchetype: 'TripleTank',
    counterArchetype: 'DoubleAircraft',
    effectiveness: 'Soft Counter',
    whyItWorks:
      'DVA\'s Aerial Devastation bypasses Tank physical defence with energy damage. Morrison\'s defence shred reduces Tank defences before the burst lands. Carlie prevents the enemy\'s own Kim from countering back.',
    keyMechanics: [
      'Energy damage bypasses physical defence of Tank heroes',
      'Morrison -30% defence shred makes even Murphy/Williams fragile',
      'DVA hits all 5 enemies simultaneously — no single target to protect',
    ],
    tips: [
      'Deploy Carlie front-left to neutralise enemy Kim if they run a hybrid TripleTank/Kim setup',
      'Time Morrison\'s Armour Shred before DVA fires — do not fire DVA first',
      'If enemy has Williams for damage reduction, boost your own power rather than relying on the counter',
    ],
    heroSwaps: [
      { swapOut: 'lucius', swapIn: 'schuyler', reason: 'Add CC to delay Murphy\'s active HP buff from protecting against DVA burst' },
    ],
  },

  // -------------------------------------------------------------------------
  {
    targetArchetype: 'DoubleAircraft',
    counterArchetype: 'TripleTank',
    effectiveness: 'Soft Counter',
    whyItWorks:
      'Without Carlie in their squad, TripleTank can deploy Carlie as a counter-tank. Williams + Murphy\'s extreme HP can outlast DVA\'s burst windows. If DVA\'s burst window is survived, Aircraft have no sustained damage.',
    keyMechanics: [
      'Carlie\'s energy resistance blocks 20% passive + up to 40% via active',
      'Williams + Murphy raw HP pool is the highest available — forces multiple burst windows',
      'If DVA doesn\'t one-shot the frontline, Aircraft squads run out of burst damage quickly',
    ],
    tips: [
      'Add Carlie to your TripleTank formation specifically to counter Aircraft squads',
      'Williams + Carlie front-line effectively neuters the entire Aircraft energy damage toolkit',
      'Use Marshall War Cry after surviving DVA\'s first burst to counterattack hard',
    ],
    heroSwaps: [
      { swapOut: 'mason', swapIn: 'carlie', reason: 'Carlie energy resist is the core counter mechanism' },
      { swapOut: 'stetmann', swapIn: 'williams', reason: 'Add second damage-reduction tank to ensure burst survival' },
    ],
  },

  // -------------------------------------------------------------------------
  {
    targetArchetype: 'Rush',
    counterArchetype: 'Turtle',
    effectiveness: 'Hard Counter',
    whyItWorks:
      'Turtle\'s stacked damage reduction, HP pools, and healing outlast Rush\'s burst window. If the Rush fails to one-shot the frontline, the glass-cannon DPS heroes have no sustain and collapse under the Turtle\'s counter-pressure.',
    keyMechanics: [
      'Williams Fortress Stance absorbs the critical burst window that Rush relies on',
      'Murphy\'s regen means even a near-killed frontline hero survives to block follow-up',
      'Stetmann Nano Repair ensures frontline stays above Execute thresholds',
      'Rush DPS heroes are fragile — any counterdamage kills them quickly',
    ],
    tips: [
      'Activate Williams Fortress Stance the moment you see Rush launching their burst combo',
      'Keep Murphy at full HP via gear — Rush players often time their burst for when Murphy is at 60% HP',
      'After surviving the Rush burst, your counter-DPS (Mason, Kimberly) easily cleans up fragile glass-cannon enemies',
    ],
    heroSwaps: [
      { swapOut: 'richard', swapIn: 'williams', reason: 'Williams is mandatory for the damage reduction needed to survive Rush burst' },
    ],
  },

  // -------------------------------------------------------------------------
  {
    targetArchetype: 'Turtle',
    counterArchetype: 'EnergyStack',
    effectiveness: 'Soft Counter',
    whyItWorks:
      'Energy damage from Kim + DVA + Tesla bypasses the physical defence that Turtle relies on. Williams\' damage reduction applies to all damage types equally, so energy stacks still deal 75% of their burst. Turtle has no answer to three simultaneous energy damage sources.',
    keyMechanics: [
      'Physical defence from tank gear does NOT reduce energy damage',
      'Three simultaneous energy sources split across all resist mechanisms',
      'Tesla\'s defence reduction further reduces what little resistance Turtle has',
    ],
    tips: [
      'Deploy EnergyStack only if enemy Turtle does not have Carlie — if they do, switch to MissileBlitz',
      'Marshall War Cry + three energy DPS in the same burst window is the win condition',
      'Williams 25% damage reduction still applies — you need 33% more raw energy output than vs a standard formation',
    ],
    heroSwaps: [
      { swapOut: 'morrison', swapIn: 'marshall', reason: 'Marshall War Cry amplifies three DPS heroes simultaneously, maximising the energy stack burst' },
    ],
  },

  // -------------------------------------------------------------------------
  {
    targetArchetype: 'Sniper',
    counterArchetype: 'Balanced',
    effectiveness: 'Situational',
    whyItWorks:
      'Balanced formation spreads power across 5 heroes evenly — no single priority target for the Sniper to Execute. Without a clearly weak target to Execute, Swift\'s cooldown resets never chain.',
    keyMechanics: [
      'Sniper requires a hero to reach execute threshold (30% HP) — balanced HP distribution delays this',
      'Marshall\'s War Cry burst window kills Swift before Execute can chain',
      'No hero in a Balanced formation is "obviously weak" — confuses Swift\'s targeting priority',
    ],
    tips: [
      'Keep hero levels consistent across your Balanced formation — a weak hero is an Execute bait for Swift',
      'Williams damage reduction keeps heroes from reaching 30% HP during the initial Tesla/Fiona softening phase',
      'Once Swift executes one hero and charges up, burst him down immediately with your DPS',
    ],
    heroSwaps: [
      { swapOut: 'stetmann', swapIn: 'williams', reason: 'Extra damage reduction prevents heroes from reaching Swift\'s Execute threshold' },
    ],
  },

  // -------------------------------------------------------------------------
  {
    targetArchetype: 'DoT',
    counterArchetype: 'Rush',
    effectiveness: 'Hard Counter',
    whyItWorks:
      'DoT requires multiple rounds to accumulate meaningful damage. Rush kills the entire DoT squad in round 1 before any stacks build. This is one of the few situations where Rush\'s fragility doesn\'t matter because DoT can\'t respond fast enough.',
    keyMechanics: [
      'DoT heroes have low burst defensive stats — they die to Rush AoE immediately',
      'Venom and Violet are both SSR with low HP compared to UR tanks',
      'Adam is the only defensive anchor in DoT squads — he alone can\'t tank Rush burst',
    ],
    tips: [
      'Rush is only relevant against DoT in PvE contexts (bosses with DoT mechanics)',
      'In PvP, DoT formations should not be fielded at all — this counter is purely theoretical',
      'Use the Rush comp vs DoT-heavy PvE boss phases to burst through before debuffs apply',
    ],
    heroSwaps: [],
  },

  // -------------------------------------------------------------------------
  {
    targetArchetype: 'MissileBlitz',
    counterArchetype: 'DoubleAircraft',
    effectiveness: 'Soft Counter',
    whyItWorks:
      'Aircraft troop type bonus gives Aircraft heroes +25% damage against Missile enemy squads. DVA\'s AoE hits all 5 Missile heroes simultaneously. MissileBlitz has no CC to delay DVA\'s burst timing.',
    keyMechanics: [
      'Troop type advantage: Aircraft deals 25% bonus damage to Missile troops',
      'Schuyler stun delays Tesla/Fiona from firing before DVA\'s burst lands',
      'Adam\'s counterattack does not trigger in time to matter against an Aircraft burst combo',
    ],
    tips: [
      'Deploy Schuyler specifically to stun Tesla and Fiona before they can fire — this is the winning condition',
      'DVA hits all MissileBlitz heroes with AoE — if Morrison shreds first, every hero dies',
      'McGregor taunt actually helps Aircraft — it redirects DVA\'s single-target follow-ups to the high-def target',
    ],
    heroSwaps: [
      { swapOut: 'lucius', swapIn: 'schuyler', reason: 'Schuyler stun is critical to prevent Tesla/Fiona from firing before DVA lands' },
    ],
  },

  // -------------------------------------------------------------------------
  {
    targetArchetype: 'EnergyStack',
    counterArchetype: 'HybridFlex',
    effectiveness: 'Hard Counter',
    whyItWorks:
      'HybridFlex includes both Williams (damage reduction) and Carlie (energy resistance), cutting EnergyStack output by 30–50% simultaneously. Meanwhile HybridFlex\'s own Kimberly and DVA still deal full damage to EnergyStack\'s unprotected heroes.',
    keyMechanics: [
      'Carlie energy resist passively blocks 20% of ALL energy damage from Kim + DVA + Tesla',
      'Williams 10% passive damage reduction stacks additively with Carlie\'s resist',
      'Carlie active Energy Nullifier triggered during EnergyStack\'s burst window can block 40% additional',
      'Morrison defence shred from HybridFlex side still at full value against EnergyStack\'s tanks',
    ],
    tips: [
      'Time Carlie\'s Energy Nullifier active precisely as the enemy\'s triple-energy burst fires',
      'HybridFlex Morrison shred + DVA burst kills EnergyStack heroes who lack Carlie protection',
      'EnergyStack is hardest to play into after HybridFlex becomes available — consider switching formations entirely',
    ],
    heroSwaps: [],
  },

  // -------------------------------------------------------------------------
  {
    targetArchetype: 'SupportCore',
    counterArchetype: 'MissileBlitz',
    effectiveness: 'Soft Counter',
    whyItWorks:
      'SupportCore\'s single DPS carry (Kimberly) is a clean priority target for Sniper Execute variants, but MissileBlitz does something more elegant: Tesla\'s chain lightning bounces to Kimberly through the tank layers, and Fiona\'s AoE softens all heroes so Swift can chain-execute.',
    keyMechanics: [
      'Tesla chain lightning hits backline Kimberly even through front-tank layers',
      'Fiona\'s barrage spreads damage to all 5 heroes including Stetmann and Marshall',
      'With Kimberly down, SupportCore has no meaningful DPS output — Stetmann/Marshall deal no damage',
    ],
    tips: [
      'Focus fire Kimberly with Tesla chain lightning — she is the only win condition for SupportCore',
      'Once Kimberly is at 30% HP, Swift Execute guarantees the kill and chains to nearby weakened targets',
      'Deploy Swift + Tesla + Fiona combination specifically for SupportCore match-ups',
    ],
    heroSwaps: [
      { swapOut: 'mcgregor', swapIn: 'swift', reason: 'Swift Execute is the priority-target kill mechanism needed against single-carry formations' },
    ],
  },

  // -------------------------------------------------------------------------
  {
    targetArchetype: 'Balanced',
    counterArchetype: 'Rush',
    effectiveness: 'Soft Counter',
    whyItWorks:
      'Rush\'s single burst window kills 2–3 mid-level heroes in a Balanced formation before they act. Balanced lacks the specific defensive layering (Williams + Carlie + Murphy) needed to survive Rush\'s opener.',
    keyMechanics: [
      'Balanced formation tanks are not stacked for burst survival — only standard HP pools',
      'DVA + Kimberly simultaneous burst kills both front Balanced tanks in one go',
      'No CC in Balanced formation — Schuyler\'s stun goes uncontested',
    ],
    tips: [
      'Rush is your optimal format against Balanced — commit to the full Schuyler + Morrison + DVA + Kim combo',
      'If Balanced player has Williams, consider adding your own Williams to ensure the burst lands',
      'Rush beats Balanced at equal power — go aggressive',
    ],
    heroSwaps: [],
  },
];

// ---------------------------------------------------------------------------
// POSITIONAL TIPS
// ---------------------------------------------------------------------------

export const positionalTips: PositionalTip[] = [
  {
    position: 'front-left',
    generalRule:
      'Highest priority defensive position. Absorbs the most burst damage. Reserved for your sturdiest tank or for a counter-specific hero (e.g. Carlie against energy squads).',
    examples: [
      'Murphy front-left: absorbs opener burst, regen keeps him alive for round 2',
      'Carlie front-left: energy resist bubble blocks Kim and DVA completely',
      'Williams front-left: damage reduction active protects entire squad during burst window',
    ],
  },
  {
    position: 'front-right',
    generalRule:
      'Secondary defensive position. Less initial focus than front-left. Good for off-tanks, secondary defenders, or control heroes that need to survive the first round to deploy CC.',
    examples: [
      'Mason front-right: secondary DPS that also takes hits to protect Kim',
      'Schuyler front-right: must survive to deploy Thunder Lock — positioning away from front-left reduces initial focus',
      'Lucius front-right: Interceptor passive protects DVA behind him',
    ],
  },
  {
    position: 'rear-left',
    generalRule:
      'Primary DPS backline position. Less exposed than front row, allows DPS heroes to fire their actives before being targeted. Your highest-damage dealer goes here.',
    examples: [
      'Kimberly rear-left: Plasma Surge from the backline maximises survival during charge',
      'DVA rear-left: Aerial Devastation safely fires from behind frontline tanks',
      'Tesla rear-left: chain lightning covers frontline and enemy backline from safe position',
    ],
  },
  {
    position: 'rear-right',
    generalRule:
      'Secondary DPS backline position. Often hosts the second-highest DPS hero or a debuffer. Less focused than rear-left in most AI targeting patterns.',
    examples: [
      'Morrison rear-right: Armour Shred fires from safe position, then DVA burst lands',
      'Fiona rear-right: AoE barrage from protected position',
      'Swift rear-right: waits for targets to be softened by Tesla/Fiona before Execute fires',
    ],
  },
  {
    position: 'center',
    generalRule:
      'Support and command position. Buffers, healers, and aura heroes go here. Center position is hit last by most targeting algorithms, maximising support uptime.',
    examples: [
      'Marshall center: War Cry aura reaches all positions from center; survives longest to fire War Cry twice',
      'Stetmann center: Nano Repair passive covers all allies from center position',
      'Sarah center: Emergency Airlift fires in time to save front-row tanks from burst',
    ],
  },
];

// ---------------------------------------------------------------------------
// UTILITY FUNCTIONS
// ---------------------------------------------------------------------------

export function getFormationByArchetype(archetype: FormationArchetype): Formation | undefined {
  return formations.find(f => f.archetype === archetype);
}

export function getCountersFor(archetype: FormationArchetype): CounterRelation[] {
  return counterRelations.filter(c => c.targetArchetype === archetype);
}

export function getCounteredBy(archetype: FormationArchetype): CounterRelation[] {
  return counterRelations.filter(c => c.counterArchetype === archetype);
}

export function detectEnemyArchetype(enemyHeroIds: string[]): Formation[] {
  return formations.filter(f =>
    f.identifiers.some(id => enemyHeroIds.includes(id))
  );
}

export function getBestCounterFormation(
  enemyArchetype: FormationArchetype,
): { formation: Formation; relation: CounterRelation } | null {
  const relations = getCountersFor(enemyArchetype);
  if (relations.length === 0) return null;

  // Prefer Hard Counter > Soft Counter > Situational
  const priority = ['Hard Counter', 'Soft Counter', 'Situational'];
  const best = relations.sort(
    (a, b) => priority.indexOf(a.effectiveness) - priority.indexOf(b.effectiveness),
  )[0];

  const counterFormation = getFormationByArchetype(best.counterArchetype);
  if (!counterFormation) return null;

  return { formation: counterFormation, relation: best };
}

export function getFormationsByType(type: TroopType | 'Mixed'): Formation[] {
  return formations.filter(f => f.primaryType === type);
}

export function getFormationsByDifficulty(difficulty: Formation['difficulty']): Formation[] {
  return formations.filter(f => f.difficulty === difficulty);
}

export function getFormationsByCostTier(costTier: Formation['costTier']): Formation[] {
  return formations.filter(f => f.costTier === costTier);
}

export function getPositionalTip(position: HeroSlot['position']): PositionalTip | undefined {
  return positionalTips.find(t => t.position === position);
}
