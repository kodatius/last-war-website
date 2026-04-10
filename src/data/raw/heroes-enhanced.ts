// heroes-enhanced.ts
// Enhanced hero data for Last War: Survival fan site.
// Sources: in-game observation, community guides (Feb–Mar 2026, Season 5)
// All 22 confirmed heroes with full metadata.

export type HeroTier   = 'SS' | 'S' | 'A' | 'B' | 'C';
export type HeroType   = 'Tank' | 'Aircraft' | 'Missile';
export type HeroRarity = 'UR' | 'SSR' | 'SR';
export type HeroRole   = 'Attacker' | 'Defender' | 'Support';

export interface HeroSkill {
  name: string;
  description: string;
  type: 'active' | 'passive';
}

export interface HeroStats {
  /** Relative 1–100. Represents the hero's offensive output. */
  attack: number;
  /** Relative 1–100. Represents the hero's mitigation capability. */
  defense: number;
  /** Relative 1–100. Represents the hero's raw health pool. */
  hp: number;
  /** Relative 1–100. Represents squad-buff / leadership potential. */
  command: number;
}

export interface HeroEnhanced {
  id: string;
  name: string;
  /** Flavour title shown in-game, e.g. "Unyielding Warrior" */
  title: string;
  type: HeroType;
  rarity: HeroRarity;
  tier: HeroTier;
  role: HeroRole;
  isMeta: boolean;
  skills: HeroSkill[];
  stats: HeroStats;
  /** Hero IDs this hero performs well against (counter picks). */
  strongAgainst: string[];
  /** Hero IDs that counter or outperform this hero. */
  weakAgainst: string[];
  /** Hero IDs with strong synergy in the same squad. */
  bestSquadWith: string[];
  /** How to obtain shards / the hero. */
  obtainMethod: string;
  /** Exclusive weapon name, or null if none exists. */
  exclusiveWeapon: string | null;
  /** Why this hero is worth investing in. */
  whyGood: string;
  /** PvP usage notes. */
  pvpTips: string;
  /** PvE usage notes. */
  pveTips: string;
  /** Searchable tags. */
  tags: string[];
}

// ---------------------------------------------------------------------------
// HERO DATA
// ---------------------------------------------------------------------------

export const heroesEnhanced: HeroEnhanced[] = [

  // ==========================================================================
  // SS-TIER
  // ==========================================================================

  {
    id: 'kimberly',
    name: 'Kimberly',
    title: 'Blazing Vanguard',
    type: 'Tank',
    rarity: 'UR',
    tier: 'SS',
    role: 'Attacker',
    isMeta: true,
    skills: [
      {
        name: 'Plasma Surge',
        description: 'Unleashes a wave of plasma energy that deals heavy AoE damage to all enemies. Damage scales with Kimberly\'s attack stat.',
        type: 'active',
      },
      {
        name: 'Energy Amplification',
        description: 'Passively increases Kimberly\'s energy damage output by 25%. Stacks with external attack buffs.',
        type: 'passive',
      },
      {
        name: 'Thermal Shield',
        description: 'When HP drops below 40%, generates a damage-absorbing shield equal to 20% of max HP for 5 s.',
        type: 'passive',
      },
    ],
    stats: { attack: 97, defense: 62, hp: 70, command: 55 },
    strongAgainst: ['stetmann', 'monica', 'richard', 'violet', 'scarlett'],
    weakAgainst: ['carlie'],
    bestSquadWith: ['williams', 'murphy', 'marshall'],
    obtainMethod: '$1 / £1 Starter Pack (one-time purchase)',
    exclusiveWeapon: 'Plasma Cannon Mk-II',
    whyGood:
      'Best DPS in the Tank category. Energy-based AoE shreds groups and bypasses physical defence. At equal investment Kimberly outperforms almost every hero. Her exclusive weapon amplifies burst even further.',
    pvpTips:
      'Place front-left or rear-left. If the enemy deploys Carlie front-left, shift Kim to rear-right to avoid her energy-resist bubble. Pair with Marshall for a massive attack-buff window.',
    pveTips:
      'Must-have for Zombie Invasion wave clear. Upgrade Cannon gear first. Essential for Code Boss (Tank days), General\'s Trial, and Alliance Duel.',
    tags: ['meta', 'tank', 'dps', 'aoe', 'energy', 'purchase', 'ss-tier', 'endgame'],
  },

  {
    id: 'dva',
    name: 'DVA',
    title: 'Sky Breaker',
    type: 'Aircraft',
    rarity: 'UR',
    tier: 'SS',
    role: 'Attacker',
    isMeta: true,
    skills: [
      {
        name: 'Aerial Devastation',
        description: 'Launches a saturation bombing run that hits ALL enemy units simultaneously. The highest raw burst damage skill in the game.',
        type: 'active',
      },
      {
        name: 'Afterburner',
        description: 'Increases DVA\'s critical strike chance by 18% and critical damage multiplier by 30%.',
        type: 'passive',
      },
      {
        name: 'Evasive Maneuver',
        description: 'Has a 20% chance to dodge single-target attacks, reducing incoming damage to 0.',
        type: 'passive',
      },
    ],
    stats: { attack: 99, defense: 55, hp: 60, command: 50 },
    strongAgainst: ['monica', 'richard', 'stetmann', 'violet', 'scarlett'],
    weakAgainst: ['carlie', 'schuyler'],
    bestSquadWith: ['morrison', 'schuyler', 'carlie'],
    obtainMethod: 'Premium packs / limited recruitment events',
    exclusiveWeapon: 'Devastator Air Cannon',
    whyGood:
      'Highest single-skill burst damage in the game. Her Aerial Devastation hits the entire enemy team and, with Morrison\'s defence shred active, no opponent survives at equal power. Mandatory investment for Aircraft mains.',
    pvpTips:
      'Combo with Morrison to shred enemy defence before DVA\'s active fires. Time Schuyler\'s stun so it lands just before the burst window. Watch for Carlie counters — if the enemy has Carlie front-left, consider swapping to Tank or Missile squad.',
    pveTips:
      'Wave-clear champion. Dominant on Doom Walker rallies, Zombie Invasion advanced stages, and Code Boss (Aircraft days). Dump all universal shards into DVA if running Aircraft primary squad.',
    tags: ['meta', 'aircraft', 'dps', 'burst', 'aoe', 'purchase', 'ss-tier', 'endgame'],
  },

  {
    id: 'tesla',
    name: 'Tesla',
    title: 'Arc Enforcer',
    type: 'Missile',
    rarity: 'UR',
    tier: 'SS',
    role: 'Attacker',
    isMeta: true,
    skills: [
      {
        name: 'Lightning Barrage',
        description: 'Fires a chain-lightning missile volley that bounces between targets, dealing heavy energy damage to up to 4 enemies.',
        type: 'active',
      },
      {
        name: 'Overcharge',
        description: 'Every 3rd attack deals 50% additional energy damage.',
        type: 'passive',
      },
      {
        name: 'Arc Field',
        description: 'Enemies damaged by Tesla\'s abilities have their defence reduced by 12% for 4 s.',
        type: 'passive',
      },
    ],
    stats: { attack: 96, defense: 52, hp: 58, command: 48 },
    strongAgainst: ['mcgregor', 'adam', 'violet', 'scarlett', 'richard'],
    weakAgainst: ['fiona'],
    bestSquadWith: ['fiona', 'adam', 'williams'],
    obtainMethod: 'Premium packs / limited recruitment events',
    exclusiveWeapon: 'Arc Cannon Prototype',
    whyGood:
      'Best Missile DPS by a significant margin. Energy-based chain attacks shred groups, bypass physical defence, and the passive defence reduction amplifies the whole squad\'s output. Outperforms all SSR Missile heroes from day one at equal investment.',
    pvpTips:
      'Position rear-centre or rear-right. Energy damage ignores physical defence — target high-HP defenders first. Pair with Fiona\'s AoE bombardment for a devastating two-punch combo.',
    pveTips:
      'Handles both wave clear and single-target boss damage. Strongest all-rounder in the Missile category. Essential for Code Boss (Missile days), Zombie Invasion, and General\'s Trial.',
    tags: ['meta', 'missile', 'dps', 'energy', 'chain', 'purchase', 'ss-tier', 'endgame'],
  },

  {
    id: 'marshall',
    name: 'Marshall',
    title: 'Command Titan',
    type: 'Tank',
    rarity: 'UR',
    tier: 'SS',
    role: 'Support',
    isMeta: true,
    skills: [
      {
        name: 'War Cry',
        description: 'Boosts the entire squad\'s attack by 30% for 8 s. Can be triggered every 20 s.',
        type: 'active',
      },
      {
        name: 'Iron Resolve',
        description: 'Passively increases all allies\' attack by 12% and reduces cooldown of active skills by 10%.',
        type: 'passive',
      },
      {
        name: 'Vanguard Aura',
        description: 'While Marshall is alive, all allied heroes deal 8% more damage to Tanks.',
        type: 'passive',
      },
    ],
    stats: { attack: 72, defense: 75, hp: 80, command: 95 },
    strongAgainst: ['stetmann', 'monica', 'richard'],
    weakAgainst: ['dva', 'kimberly'],
    bestSquadWith: ['kimberly', 'williams', 'murphy'],
    obtainMethod: 'Premium packs / special event recruitment',
    exclusiveWeapon: null,
    whyGood:
      'The best force-multiplier in the Tank category. War Cry\'s 30% team attack window turns Kimberly\'s DPS into a one-shot machine. His passive 12% persistent attack buff is always on, making him a permanent DPS uplift even when his active is on cooldown.',
    pvpTips:
      'Time War Cry with Kimberly\'s Plasma Surge for a devastating combined burst. Position mid-field so he survives long enough to fire the second War Cry. Works well in longer fights where the second buff cycle matters.',
    pveTips:
      'Excellent for boss fights and extended rally content. Essential for Warzone / SVS where fights last several rounds.',
    tags: ['meta', 'tank', 'support', 'buffer', 'command', 'purchase', 'ss-tier', 'endgame'],
  },

  // ==========================================================================
  // S-TIER
  // ==========================================================================

  {
    id: 'murphy',
    name: 'Murphy',
    title: 'Ironclad Defender',
    type: 'Tank',
    rarity: 'UR',
    tier: 'S',
    role: 'Defender',
    isMeta: true,
    skills: [
      {
        name: 'Bulwark Charge',
        description: 'Charges the nearest enemy, dealing 200% physical damage and granting the front row +25% HP for 6 s.',
        type: 'active',
      },
      {
        name: 'Front-Line Aura',
        description: 'All front-row allies gain +15% max HP and +10% attack passively.',
        type: 'passive',
      },
      {
        name: 'Endurance',
        description: 'Murphy regenerates 3% of his max HP per second when his HP is below 50%.',
        type: 'passive',
      },
    ],
    stats: { attack: 58, defense: 88, hp: 92, command: 78 },
    strongAgainst: ['richard', 'monica', 'scarlett', 'violet'],
    weakAgainst: ['kimberly', 'dva'],
    bestSquadWith: ['kimberly', 'mason', 'marshall'],
    obtainMethod: 'Free — Alliance Shop shards (approx. 4–6 weeks grinding)',
    exclusiveWeapon: null,
    whyGood:
      'The gold-standard F2P tank. Strong HP/attack aura for the front row, self-sustain regen, and accessible without spending money. Holds the line from HQ 10 through mid-game (HQ 18–20) when UR DPS tanks become available.',
    pvpTips:
      'Place front-left. His regen lets him outlast burst-heavy openers. Combine with Kimberly at rear-left: Murphy absorbs the opener, Kim nukes on the rebound.',
    pveTips:
      'Best F2P tank for Zombie Invasion and early-game rallies. Upgrade armor gear first. Prioritise Murphy over every other Alliance shop unlock.',
    tags: ['free', 'f2p', 'tank', 'defender', 'alliance-shop', 'beginner-friendly', 's-tier', 'meta'],
  },

  {
    id: 'williams',
    name: 'Williams',
    title: 'Shield of the Alliance',
    type: 'Tank',
    rarity: 'UR',
    tier: 'S',
    role: 'Defender',
    isMeta: true,
    skills: [
      {
        name: 'Fortress Stance',
        description: 'Activates for 10 s, reducing all damage received by the entire squad by 25%.',
        type: 'active',
      },
      {
        name: 'Ironclad',
        description: 'Passively reduces incoming damage to all allies by 10% at all times.',
        type: 'passive',
      },
      {
        name: 'Last Stand',
        description: 'When Williams would be killed, survives once with 1 HP and becomes immune to damage for 2 s.',
        type: 'passive',
      },
    ],
    stats: { attack: 55, defense: 92, hp: 95, command: 72 },
    strongAgainst: ['richard', 'monica', 'stetmann'],
    weakAgainst: ['kimberly', 'tesla'],
    bestSquadWith: ['kimberly', 'dva', 'tesla'],
    obtainMethod: 'Premium packs / select event recruitment',
    exclusiveWeapon: null,
    whyGood:
      'The best defensive tank in the game. Team-wide 10% persistent damage reduction plus a 25% active window makes the entire squad dramatically more durable. Last Stand ensures he survives one lethal hit, buying crucial extra seconds.',
    pvpTips:
      'Front-line anchor. Pop Fortress Stance when the enemy\'s main DPS active is about to fire. His survivability lets your backline DPS heroes get more rotations.',
    pveTips:
      'Essential for high-level rallies and boss raids where sustained damage over multiple waves is the primary threat. Best tank pairing for Kimberly in endgame PvE.',
    tags: ['meta', 'tank', 'defender', 'damage-reduction', 'purchase', 's-tier', 'endgame'],
  },

  {
    id: 'carlie',
    name: 'Carlie',
    title: 'Energy Aegis',
    type: 'Aircraft',
    rarity: 'UR',
    tier: 'S',
    role: 'Defender',
    isMeta: true,
    skills: [
      {
        name: 'Energy Nullifier',
        description: 'Creates a field for 6 s that blocks 40% of all incoming energy damage for the entire squad.',
        type: 'active',
      },
      {
        name: 'Energy Resistance',
        description: 'All allies passively gain +20% energy damage resistance.',
        type: 'passive',
      },
      {
        name: 'Counter Pulse',
        description: 'When hit by an energy-type attack, Carlie reflects 15% of the damage back to the attacker.',
        type: 'passive',
      },
    ],
    stats: { attack: 60, defense: 88, hp: 85, command: 65 },
    strongAgainst: ['kimberly', 'dva', 'tesla'],
    weakAgainst: ['mason', 'morrison'],
    bestSquadWith: ['dva', 'schuyler', 'morrison'],
    obtainMethod: 'Premium packs / limited Aircraft-focused events',
    exclusiveWeapon: null,
    whyGood:
      'The only hero with team-wide energy damage resistance. Hard-counter to Kimberly, DVA, and Tesla — the three highest-damage heroes in the game. Essential in Aircraft squads both as a tank and as a meta-breaker.',
    pvpTips:
      'Front-left in Aircraft squads. Time Energy Nullifier to absorb the enemy\'s DPS burst window. If you see a Kim/DVA-heavy team, Carlie front-left completely neutralises their main damage source.',
    pveTips:
      'Solid Aircraft tank for PvE content. Less impactful than in PvP since PvE enemies rarely deal energy damage at peak efficiency.',
    tags: ['meta', 'aircraft', 'defender', 'energy-resist', 'counter', 'purchase', 's-tier', 'endgame'],
  },

  {
    id: 'schuyler',
    name: 'Schuyler',
    title: 'Shockwave Commander',
    type: 'Aircraft',
    rarity: 'UR',
    tier: 'S',
    role: 'Support',
    isMeta: true,
    skills: [
      {
        name: 'Thunder Lock',
        description: 'Stuns all enemy heroes for 2.5 s, delaying their active skill cooldowns.',
        type: 'active',
      },
      {
        name: 'Disruption Field',
        description: 'Passively applies a 15% attack-speed slow to all enemies within range.',
        type: 'passive',
      },
      {
        name: 'Slipstream',
        description: 'All allied Aircraft heroes gain +12% movement speed and +8% evasion.',
        type: 'passive',
      },
    ],
    stats: { attack: 68, defense: 72, hp: 75, command: 82 },
    strongAgainst: ['marshall', 'kimberly', 'tesla'],
    weakAgainst: ['carlie', 'morrison'],
    bestSquadWith: ['dva', 'morrison', 'carlie'],
    obtainMethod: 'Premium packs / endgame event recruitment',
    exclusiveWeapon: 'Stormbreaker EMP Launcher',
    whyGood:
      'Thunder Lock is the most impactful CC in the game. Interrupting enemy actives before they fire can single-handedly win fights. With his exclusive weapon, Schuyler becomes the backbone of the endgame Aircraft formation.',
    pvpTips:
      'Time Thunder Lock 0.5–1 s before an enemy active is expected to fire. The stun window deletes their burst round, letting DVA\'s own active land on an unshielded enemy team. Critical in SVS and Alliance Duel.',
    pveTips:
      'Less impactful in PvE due to enemy AI patterns. Still provides evasion buff to Aircraft allies, making the squad tankier.',
    tags: ['meta', 'aircraft', 'support', 'cc', 'stun', 'purchase', 'exclusive-weapon', 's-tier', 'endgame'],
  },

  {
    id: 'morrison',
    name: 'Morrison',
    title: 'Iron Rain',
    type: 'Aircraft',
    rarity: 'UR',
    tier: 'S',
    role: 'Attacker',
    isMeta: true,
    skills: [
      {
        name: 'Armour Shred',
        description: 'Launches armour-piercing missiles that reduce all enemies\' defence by 30% for 6 s.',
        type: 'active',
      },
      {
        name: 'Precision Strike',
        description: 'Morrison\'s attacks ignore 20% of enemy physical defence.',
        type: 'passive',
      },
      {
        name: 'Target Acquisition',
        description: 'Increases all allied Aircraft heroes\' critical strike chance by 10%.',
        type: 'passive',
      },
    ],
    stats: { attack: 85, defense: 62, hp: 65, command: 60 },
    strongAgainst: ['williams', 'murphy', 'carlie'],
    weakAgainst: ['schuyler', 'dva'],
    bestSquadWith: ['dva', 'schuyler', 'carlie'],
    obtainMethod: 'Premium packs / limited recruitment events',
    exclusiveWeapon: 'AP Missile Battery',
    whyGood:
      'Morrison\'s defence-shred multiplies the entire squad\'s effective damage. Firing Armour Shred before DVA\'s Aerial Devastation can more than double the burst damage landing. Core of the Season 5 endgame Aircraft meta.',
    pvpTips:
      'Activate Armour Shred first, then immediately follow with DVA\'s burst. The 6-second defence reduction window is your damage window. Position him where he can survive long enough to fire twice per fight.',
    pveTips:
      'Essential for boss raids. Defence reduction is a massive DPS multiplier for the entire squad, making every boss phase faster.',
    tags: ['meta', 'aircraft', 'dps', 'debuffer', 'defence-shred', 'purchase', 'exclusive-weapon', 's-tier', 'endgame'],
  },

  {
    id: 'fiona',
    name: 'Fiona',
    title: 'Missile Tempest',
    type: 'Missile',
    rarity: 'UR',
    tier: 'S',
    role: 'Attacker',
    isMeta: true,
    skills: [
      {
        name: 'Saturation Barrage',
        description: 'Fires a spread of 8 missiles that each deal AoE damage on impact, covering the entire enemy field.',
        type: 'active',
      },
      {
        name: 'Lock-On Protocol',
        description: 'Fiona\'s basic attacks prioritise the highest-HP enemy. Increases damage to targets above 60% HP by 20%.',
        type: 'passive',
      },
      {
        name: 'Rapid Reload',
        description: 'Reduces Saturation Barrage\'s cooldown by 3 s each time an enemy is killed.',
        type: 'passive',
      },
    ],
    stats: { attack: 88, defense: 55, hp: 60, command: 55 },
    strongAgainst: ['williams', 'murphy', 'adam'],
    weakAgainst: ['tesla', 'swift'],
    bestSquadWith: ['tesla', 'adam', 'mcgregor'],
    obtainMethod: 'Premium packs / Missile-focused event recruitment',
    exclusiveWeapon: 'Tempest MLRS',
    whyGood:
      'Consistent multi-target AoE bombardment that shines in wave-clear scenarios. Core of the Missile formation alongside Tesla. Her Rapid Reload passive means she fires Saturation Barrage more frequently in prolonged fights.',
    pvpTips:
      'Position rear-right or rear-centre. Let Adam or McGregor absorb the opener while Fiona and Tesla rain damage from the backline. Synergy with Tesla\'s chain lightning clears groups fast.',
    pveTips:
      'Excellent for Zombie Invasion wave clearing. Priority upgrade for Missile squad mains after Tesla. Strong on multi-phase boss fights where Rapid Reload stacks up cooldown reduction.',
    tags: ['meta', 'missile', 'dps', 'aoe', 'purchase', 'exclusive-weapon', 's-tier', 'endgame'],
  },

  // ==========================================================================
  // A-TIER
  // ==========================================================================

  {
    id: 'mason',
    name: 'Mason',
    title: 'Steel Fist',
    type: 'Tank',
    rarity: 'SSR',
    tier: 'A',
    role: 'Attacker',
    isMeta: true,
    skills: [
      {
        name: 'Ground Slam',
        description: 'Slams the ground, dealing 180% physical AoE damage to all enemies in the front row.',
        type: 'active',
      },
      {
        name: 'Brawler\'s Edge',
        description: 'Mason\'s physical attacks deal 15% more damage to targets with more than 50% HP.',
        type: 'passive',
      },
      {
        name: 'Battle Hardened',
        description: 'Taking damage stacks a buff granting up to 20% increased attack at 5 stacks.',
        type: 'passive',
      },
    ],
    stats: { attack: 80, defense: 65, hp: 70, command: 50 },
    strongAgainst: ['monica', 'richard', 'violet', 'scarlett'],
    weakAgainst: ['williams', 'williams'],
    bestSquadWith: ['murphy', 'kimberly', 'williams'],
    obtainMethod: 'Free — Alliance Shop shards (approx. 2–4 weeks)',
    exclusiveWeapon: null,
    whyGood:
      'Premier F2P DPS tank accessible via Alliance shop. SSR→UR promotion makes him long-term viable. Fills the DPS gap in F2P Tank squads before expensive UR heroes are obtainable.',
    pvpTips:
      'Position rear-left for maximum Ground Slam coverage against enemy frontline. Battle Hardened stacks up over longer fights — useful in Alliance Duel multi-round format.',
    pveTips:
      'F2P workhorse for early and mid-game content. Alliance shop availability makes him the go-to second hero upgrade after Murphy. Solid for Zombie Invasion when Kimberly isn\'t available.',
    tags: ['free', 'f2p', 'tank', 'dps', 'alliance-shop', 'beginner-friendly', 'a-tier'],
  },

  {
    id: 'stetmann',
    name: 'Stetmann',
    title: 'Tech Vanguard',
    type: 'Tank',
    rarity: 'SSR',
    tier: 'A',
    role: 'Support',
    isMeta: false,
    skills: [
      {
        name: 'Prototype Burst',
        description: 'Fires an experimental energy cannon dealing 150% damage to a single target and healing 10% of max HP.',
        type: 'active',
      },
      {
        name: 'Nano Repair',
        description: 'Every 8 s, repairs a random ally for 5% of Stetmann\'s max HP.',
        type: 'passive',
      },
      {
        name: 'Field Analysis',
        description: 'Increases all Tank allies\' attack speed by 8%.',
        type: 'passive',
      },
    ],
    stats: { attack: 65, defense: 70, hp: 72, command: 68 },
    strongAgainst: ['richard', 'monica'],
    weakAgainst: ['kimberly', 'dva'],
    bestSquadWith: ['murphy', 'mason', 'kimberly'],
    obtainMethod: 'Tavern pulls (free pity) / select events',
    exclusiveWeapon: null,
    whyGood:
      'Provides light healing and attack-speed buff in Tank formations. Mid-game viable as a fifth-slot filler. Upgrade path: Murphy → Williams → Kim → Stetmann/Mason.',
    pvpTips:
      'Filler Tank slot. Use until UR alternatives become available. The attack-speed buff has minor but real impact on early-game PvP.',
    pveTips:
      'Nano Repair provides minor sustain across long PvE sessions. Not worth deep gear investment — divert resources to core UR heroes.',
    tags: ['free', 'tank', 'support', 'healer', 'tavern', 'mid-game', 'a-tier'],
  },

  {
    id: 'lucius',
    name: 'Lucius',
    title: 'Sky Sentinel',
    type: 'Aircraft',
    rarity: 'UR',
    tier: 'A',
    role: 'Defender',
    isMeta: false,
    skills: [
      {
        name: 'Defensive Screen',
        description: 'Projects an energy screen that absorbs up to 25% of max HP in incoming damage for 5 s.',
        type: 'active',
      },
      {
        name: 'Aerial Guard',
        description: 'Reduces damage taken by adjacent Aircraft allies by 12%.',
        type: 'passive',
      },
      {
        name: 'Interceptor',
        description: '25% chance to intercept single-target attacks aimed at allies, redirecting them to Lucius.',
        type: 'passive',
      },
    ],
    stats: { attack: 52, defense: 82, hp: 80, command: 60 },
    strongAgainst: ['monica', 'richard'],
    weakAgainst: ['carlie', 'kimberly'],
    bestSquadWith: ['dva', 'carlie', 'schuyler'],
    obtainMethod: 'Premium packs / Aircraft-focused recruitment events',
    exclusiveWeapon: null,
    whyGood:
      'Off-tank for Aircraft squads when Carlie isn\'t available. Interceptor provides surprising survivability for DVA. Budget pathway to a functional Aircraft formation.',
    pvpTips:
      'Position front-left to intercept single-target fire aimed at DVA. Replace with Carlie when available — energy resist is strictly superior.',
    pveTips:
      'Aircraft tank filler for mid-game PvE until Carlie is obtainable. Defensive Screen absorbs spike damage on wave 20+ of Zombie Invasion.',
    tags: ['aircraft', 'defender', 'purchase', 'a-tier', 'off-tank'],
  },

  {
    id: 'swift',
    name: 'Swift',
    title: 'Phantom Striker',
    type: 'Missile',
    rarity: 'SSR',
    tier: 'A',
    role: 'Attacker',
    isMeta: false,
    skills: [
      {
        name: 'Execute',
        description: 'Deals 300% damage to a single target below 30% HP. If the target is killed, reduces cooldown by 50%.',
        type: 'active',
      },
      {
        name: 'Hunter\'s Mark',
        description: 'After dealing damage, marks the target. Marked targets take 15% more damage from Swift\'s next attack.',
        type: 'passive',
      },
      {
        name: 'Rapid Fire',
        description: 'Swift\'s base attack speed is 20% faster than other Missile heroes.',
        type: 'passive',
      },
    ],
    stats: { attack: 82, defense: 50, hp: 55, command: 45 },
    strongAgainst: ['adam', 'mcgregor', 'violet'],
    weakAgainst: ['williams', 'fiona'],
    bestSquadWith: ['tesla', 'fiona', 'adam'],
    obtainMethod: 'Mall packs (periodic purchase bundles)',
    exclusiveWeapon: null,
    whyGood:
      'Execute specialist who cleans up weakened targets. In PvP where multiple enemies are reduced to low HP simultaneously, Swift can chain-execute through an entire team in seconds.',
    pvpTips:
      'Best deployed when the enemy team has been softened by Tesla/Fiona\'s AoE. Execute cooldown reset on kill lets Swift chain-eliminate multiple weakened heroes.',
    pveTips:
      'Limited in sustained PvE — boss targets don\'t drop to 30% HP frequently enough for Execute to shine. Use Tesla or Fiona for wave clear instead.',
    tags: ['missile', 'dps', 'execute', 'purchase', 'a-tier', 'pvp-specialist'],
  },

  {
    id: 'adam',
    name: 'Adam',
    title: 'Ironwall Missile',
    type: 'Missile',
    rarity: 'SSR',
    tier: 'A',
    role: 'Defender',
    isMeta: false,
    skills: [
      {
        name: 'Reactive Armour',
        description: 'Activates a reactive armour shell absorbing 30% of max HP in damage. Reflects 20% of absorbed damage back to attackers.',
        type: 'active',
      },
      {
        name: 'Retaliator',
        description: 'Every time Adam is hit, he passively deals a counterattack for 25% of incoming damage.',
        type: 'passive',
      },
      {
        name: 'Missile Anchor',
        description: 'Increases all Missile allies\' attack by 10% while Adam is alive and in the front row.',
        type: 'passive',
      },
    ],
    stats: { attack: 55, defense: 80, hp: 82, command: 62 },
    strongAgainst: ['swift', 'mcgregor', 'richard'],
    weakAgainst: ['tesla', 'fiona'],
    bestSquadWith: ['tesla', 'fiona', 'swift'],
    obtainMethod: 'Mall packs (periodic purchase bundles)',
    exclusiveWeapon: null,
    whyGood:
      'Frontline Missile tank — a unique defensive role in a damage-oriented unit type. His reflect and passive attack buff let Tesla and Fiona DPS freely from behind without taking fire.',
    pvpTips:
      'Front-left position in Missile squads. Reactive Armour + Retaliator turns him into a damage sponge that punishes burst attackers. Time Reactive Armour for the enemy\'s main burst.',
    pveTips:
      'Essential Missile tank for boss fights and Zombie Invasion advanced stages. Core of the F2P+ Missile formation: Tesla + Fiona + Adam.',
    tags: ['missile', 'defender', 'tank', 'counterattack', 'purchase', 'a-tier'],
  },

  // ==========================================================================
  // B-TIER
  // ==========================================================================

  {
    id: 'venom',
    name: 'Venom',
    title: 'Toxic Bombardier',
    type: 'Missile',
    rarity: 'SSR',
    tier: 'B',
    role: 'Attacker',
    isMeta: false,
    skills: [
      {
        name: 'Corrosive Barrage',
        description: 'Fires a cluster of corrosive warheads, dealing AoE poison damage over 10 s and reducing enemy healing by 30%.',
        type: 'active',
      },
      {
        name: 'Corrosive Shot',
        description: 'Each basic attack applies a stack of corrosive poison dealing 5% attack as damage per second for 5 s (max 5 stacks).',
        type: 'passive',
      },
      {
        name: 'Toxin Amplification',
        description: '(UR only) Corrosive stacks deal 40% more damage per stack after UR promotion.',
        type: 'passive',
      },
    ],
    stats: { attack: 68, defense: 55, hp: 58, command: 45 },
    strongAgainst: ['williams', 'murphy'],
    weakAgainst: ['tesla', 'fiona', 'swift'],
    bestSquadWith: ['tesla', 'fiona', 'adam'],
    obtainMethod: 'Events / limited purchase bundles (SSR→UR upgrade added Season 5)',
    exclusiveWeapon: null,
    whyGood:
      'Niche DoT specialist that excels in drawn-out PvE boss fights. Anti-heal from Corrosive Barrage counters regen-heavy boss mechanics. UR promotion significantly boosts DoT stack damage. Only worth investing in if fully committed to Missile long-fight PvE.',
    pvpTips:
      'Not recommended for PvP — burst damage dominates before DoT stacks can accumulate. Corrosive Barrage\'s anti-heal is occasionally useful vs regenerating PvP opponents but too niche to build around.',
    pveTips:
      'DoT stacks with Tesla\'s energy attacks in long boss fights. Anti-heal counters certain Doom Walker abilities. Best in General\'s Trial extended phases. Only consider UR upgrade if Missile main focused on PvE.',
    tags: ['missile', 'dot', 'poison', 'anti-heal', 'events', 'b-tier', 'niche', 'pve'],
  },

  {
    id: 'violet',
    name: 'Violet',
    title: 'Poison Blade',
    type: 'Tank',
    rarity: 'SSR',
    tier: 'B',
    role: 'Attacker',
    isMeta: false,
    skills: [
      {
        name: 'Toxic Rush',
        description: 'Rushes the nearest enemy, dealing 140% physical damage and applying 3 stacks of poison DoT.',
        type: 'active',
      },
      {
        name: 'Venom Coat',
        description: 'Violet\'s basic attacks apply 1 stack of poison DoT (4% attack damage/s for 4 s).',
        type: 'passive',
      },
      {
        name: 'Resilient Toxin',
        description: '(UR only) Poison stacks no longer expire on their own — they must be cleansed.',
        type: 'passive',
      },
    ],
    stats: { attack: 65, defense: 62, hp: 68, command: 42 },
    strongAgainst: ['monica', 'richard'],
    weakAgainst: ['murphy', 'williams', 'kimberly'],
    bestSquadWith: ['murphy', 'mason', 'kimberly'],
    obtainMethod: 'Events / SSR→UR upgrade via Season 2 promotion path',
    exclusiveWeapon: null,
    whyGood:
      'Early frontline tank with passive poison output. UR promotion makes persistent poison stacks moderately useful in long PvE fights. Replace with Murphy or Williams as priority targets — Violet is only a gap-filler.',
    pvpTips:
      'Not viable in competitive PvP. Burst-centric meta makes DoT accumulation irrelevant before fights end.',
    pveTips:
      'Viable early and mid-game only. Persistent poison stacks (UR) can deal meaningful damage on boss HP bars across extended fights. Replace immediately when Murphy becomes available.',
    tags: ['tank', 'dot', 'poison', 'events', 'b-tier', 'early-game', 'starter'],
  },

  {
    id: 'scarlett',
    name: 'Scarlett',
    title: 'Flame Warden',
    type: 'Tank',
    rarity: 'SSR',
    tier: 'B',
    role: 'Attacker',
    isMeta: false,
    skills: [
      {
        name: 'Inferno Strike',
        description: 'Deals 160% fire damage to a single target and 80% splash damage to adjacent enemies. Applies 2 s burn.',
        type: 'active',
      },
      {
        name: 'Blaze Aura',
        description: 'Increases the attack of all allied Tanks by 8%.',
        type: 'passive',
      },
      {
        name: 'Heat Shield',
        description: 'Reduces fire damage received by 20%.',
        type: 'passive',
      },
    ],
    stats: { attack: 68, defense: 60, hp: 65, command: 45 },
    strongAgainst: ['monica', 'richard'],
    weakAgainst: ['murphy', 'williams'],
    bestSquadWith: ['mason', 'murphy', 'kimberly'],
    obtainMethod: 'Alliance Shop (UR shards unlocked Season 3) / Tavern pulls',
    exclusiveWeapon: null,
    whyGood:
      'Early attack-buffer and splash Tank. Blaze Aura passively boosts all Tank allies, giving real (if minor) value even when Scarlett herself is weak. Low-priority UR upgrade.',
    pvpTips:
      'Early-game only. The 8% Tank attack buff has some marginal PvP value in starter squads but is outclassed by Marshall.',
    pveTips:
      'Temporary tank fill until better options arrive. Do not invest heavily — resources are better spent on Murphy, Mason, or Williams.',
    tags: ['tank', 'fire', 'attacker', 'alliance-shop', 'b-tier', 'early-game', 'starter'],
  },

  {
    id: 'sarah',
    name: 'Sarah',
    title: 'Wings of Mercy',
    type: 'Aircraft',
    rarity: 'SSR',
    tier: 'B',
    role: 'Support',
    isMeta: false,
    skills: [
      {
        name: 'Emergency Airlift',
        description: 'Heals the lowest-HP ally for 25% of Sarah\'s max HP and grants them a shield for 3 s.',
        type: 'active',
      },
      {
        name: 'Aerial Support',
        description: 'Passively reduces cooldowns of all Aircraft allies\' actives by 8%.',
        type: 'passive',
      },
      {
        name: 'Combat Triage',
        description: 'Heals the entire squad for 3% max HP every 10 s.',
        type: 'passive',
      },
    ],
    stats: { attack: 42, defense: 65, hp: 70, command: 75 },
    strongAgainst: ['richard', 'monica'],
    weakAgainst: ['dva', 'morrison'],
    bestSquadWith: ['dva', 'carlie', 'lucius'],
    obtainMethod: 'Events / SSR→UR upgrade added Season 4',
    exclusiveWeapon: null,
    whyGood:
      'Budget healer / support for Aircraft squads. Cooldown reduction passive is genuinely useful for DVA burst windows. UR upgrade is available but low priority — healing value doesn\'t scale with the burst-meta PvP environment.',
    pvpTips:
      'Filler only. The 3% combat triage rarely matters in fast PvP fights. Upgrade Carlie or Schuyler first.',
    pveTips:
      'Budget Aircraft squad support for mid-game PvE. Emergency Airlift can save a key unit on wave 25+ Zombie Invasion. Replace with Carlie/Schuyler when available.',
    tags: ['aircraft', 'support', 'healer', 'events', 'b-tier', 'mid-game'],
  },

  {
    id: 'mcgregor',
    name: 'McGregor',
    title: 'Iron Taunt',
    type: 'Missile',
    rarity: 'SSR',
    tier: 'B',
    role: 'Defender',
    isMeta: false,
    skills: [
      {
        name: 'Provocation',
        description: 'Forces all enemies to target McGregor for 4 s. During this time, McGregor\'s defence is increased by 40%.',
        type: 'active',
      },
      {
        name: 'Defiant Stance',
        description: 'When McGregor is the target of an attack, his defence is passively boosted by 5% (stacks to 25%).',
        type: 'passive',
      },
      {
        name: 'Battlefield Presence',
        description: 'Reduces all Missile allies\' damage taken by 5%.',
        type: 'passive',
      },
    ],
    stats: { attack: 48, defense: 78, hp: 80, command: 55 },
    strongAgainst: ['swift', 'tesla'],
    weakAgainst: ['adam', 'fiona'],
    bestSquadWith: ['tesla', 'fiona', 'swift'],
    obtainMethod: 'Mall packs (periodic purchase bundles)',
    exclusiveWeapon: null,
    whyGood:
      'Taunt tank for Missile squads. Provocation is a game-changer when McGregor is heavily armoured — it redirects all burst away from Tesla and Fiona. High risk without defensive gear investment.',
    pvpTips:
      'Upgrade Armor gear to 5★ before using McGregor in PvP — without high defense he dies instantly to the redirected burst. Adam is safer and preferred in most setups.',
    pveTips:
      'Niche taunt tank for extended Missile PvE fights. Provocation used against boss AoE can protect the backline DPS. Adam preferred for most situations.',
    tags: ['missile', 'defender', 'tank', 'taunt', 'purchase', 'b-tier', 'niche'],
  },

  {
    id: 'monica',
    name: 'Monica',
    title: 'Field Medic',
    type: 'Tank',
    rarity: 'SSR',
    tier: 'B',
    role: 'Support',
    isMeta: false,
    skills: [
      {
        name: 'Healing Wave',
        description: 'Heals all allies for 15% of Monica\'s max HP.',
        type: 'active',
      },
      {
        name: 'Fortify',
        description: 'Increases all allies\' defence by 10% for 6 s after using Healing Wave.',
        type: 'passive',
      },
      {
        name: 'Rally',
        description: 'When an ally drops below 20% HP, Monica immediately heals them for 8% max HP (10 s cooldown).',
        type: 'passive',
      },
    ],
    stats: { attack: 38, defense: 60, hp: 65, command: 72 },
    strongAgainst: ['richard'],
    weakAgainst: ['kimberly', 'dva', 'mason'],
    bestSquadWith: ['mason', 'stetmann', 'scarlett'],
    obtainMethod: 'Free — Starter roster / early mission rewards',
    exclusiveWeapon: null,
    whyGood:
      'Starter support hero for the very early game. Healing Wave buys time in the first few days. Limited scaling makes her a dead investment beyond HQ 8.',
    pvpTips:
      'Not viable for PvP even in early game — healing can\'t offset burst damage meta.',
    pveTips:
      'Very early game only (HQ 1–8). Replace immediately when Murphy shards become available from Alliance shop.',
    tags: ['tank', 'support', 'healer', 'free', 'starter', 'beginner', 'b-tier', 'early-game'],
  },

  {
    id: 'richard',
    name: 'Richard',
    title: 'Ground Pounder',
    type: 'Tank',
    rarity: 'SSR',
    tier: 'B',
    role: 'Attacker',
    isMeta: false,
    skills: [
      {
        name: 'Earthquake Slam',
        description: 'Stomps the ground dealing AoE physical damage to all grounded enemies.',
        type: 'active',
      },
      {
        name: 'Heavy Armour',
        description: 'Increases Richard\'s own defence by 15%, but reduces his movement speed by 10%.',
        type: 'passive',
      },
      {
        name: 'Tremor',
        description: 'Earthquake Slam has a 25% chance to stun enemies for 1 s.',
        type: 'passive',
      },
    ],
    stats: { attack: 62, defense: 55, hp: 60, command: 40 },
    strongAgainst: ['monica'],
    weakAgainst: ['murphy', 'williams', 'kimberly', 'dva'],
    bestSquadWith: ['mason', 'stetmann', 'murphy'],
    obtainMethod: 'Free — Starter roster / early mission rewards',
    exclusiveWeapon: null,
    whyGood:
      'Provides AoE clear in very early game PvE wave content. Too fragile to be an effective tank despite the Tank classification. Used only as a temporary damage dealer before better options arrive.',
    pvpTips:
      'Avoid entirely in PvP. Poor survivability and mediocre damage make him a liability against real opponents.',
    pveTips:
      'Occasional wave-clear utility in the very first week. Replace with Mason as soon as Alliance shop shards are available.',
    tags: ['tank', 'attacker', 'free', 'starter', 'b-tier', 'early-game'],
  },

  {
    id: 'natalia',
    name: 'Natalia',
    title: 'Steel Sentinel',
    type: 'Tank',
    rarity: 'SSR',
    tier: 'B',
    role: 'Defender',
    isMeta: false,
    skills: [
      {
        name: 'Guardian Rush',
        description: 'Dashes forward and taunts the closest enemy formation segment for 3 s while dealing moderate physical damage.',
        type: 'active',
      },
      {
        name: 'Fortified Hull',
        description: 'Passively increases Natalia defense by 18% and grants 8% damage reduction while in the front row.',
        type: 'passive',
      },
      {
        name: 'Emergency Plating',
        description: 'When Natalia drops below 35% HP, gains a shield equal to 14% max HP for 5 s.',
        type: 'passive',
      },
    ],
    stats: { attack: 50, defense: 70, hp: 74, command: 46 },
    strongAgainst: ['richard', 'monica'],
    weakAgainst: ['kimberly', 'dva', 'tesla', 'morrison'],
    bestSquadWith: ['murphy', 'mason', 'stetmann'],
    obtainMethod: 'Campaign progression rewards and standard tavern pools',
    exclusiveWeapon: null,
    whyGood:
      'Stable early-game frontliner for F2P squads. Natalia is easy to build and buys survivability while your UR tank roster develops.',
    pvpTips:
      'Use only as a stopgap front-left option when Murphy or Williams are unavailable. Replace once stronger UR tanks are unlocked.',
    pveTips:
      'Useful in early campaign and zombie stages where raw HP and defense matter more than burst output.',
    tags: ['tank', 'defender', 'f2p', 'starter', 'b-tier', 'early-game'],
  },
];

// ---------------------------------------------------------------------------
// UTILITY FUNCTIONS
// ---------------------------------------------------------------------------

export function getEnhancedHeroById(id: string): HeroEnhanced | undefined {
  return heroesEnhanced.find(h => h.id === id.toLowerCase());
}

export function getEnhancedHeroByName(name: string): HeroEnhanced | undefined {
  return heroesEnhanced.find(h => h.name.toLowerCase() === name.toLowerCase());
}

export function getEnhancedHeroesByTier(tier: HeroTier): HeroEnhanced[] {
  return heroesEnhanced.filter(h => h.tier === tier);
}

export function getEnhancedHeroesByType(type: HeroType): HeroEnhanced[] {
  return heroesEnhanced.filter(h => h.type === type);
}

export function getEnhancedHeroesByRole(role: HeroRole): HeroEnhanced[] {
  return heroesEnhanced.filter(h => h.role === role);
}

export function getMetaEnhancedHeroes(): HeroEnhanced[] {
  return heroesEnhanced.filter(h => h.isMeta);
}

export function getCountersFor(heroId: string): HeroEnhanced[] {
  return heroesEnhanced.filter(h => h.strongAgainst.includes(heroId));
}

export function getBestSquadFor(heroId: string): HeroEnhanced[] {
  const hero = getEnhancedHeroById(heroId);
  if (!hero) return [];
  return hero.bestSquadWith
    .map(id => getEnhancedHeroById(id))
    .filter((h): h is HeroEnhanced => h !== undefined);
}

export function searchHeroesByTag(tag: string): HeroEnhanced[] {
  return heroesEnhanced.filter(h => h.tags.includes(tag.toLowerCase()));
}

export function getFreeHeroes(): HeroEnhanced[] {
  return heroesEnhanced.filter(h => h.tags.includes('free') || h.tags.includes('f2p'));
}
