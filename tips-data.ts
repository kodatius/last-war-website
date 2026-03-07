// Pro tips extracted from the Last War guide
// Categories: heroes, squad, base, research, troops, drone, gear, resources, alliance, events, pvp, daily, spending, advanced

export type TipCategory =
  | 'heroes' | 'squad' | 'base' | 'research' | 'troops'
  | 'drone' | 'gear' | 'resources' | 'alliance' | 'events'
  | 'pvp' | 'daily' | 'spending' | 'advanced' | 'beginner';

export interface Tip {
  id: number;
  category: TipCategory;
  text: string;
}

export const CATEGORY_NAMES: Record<TipCategory, string> = {
  heroes: 'Heroes',
  squad: 'Squad Building',
  base: 'Base Building',
  research: 'Research',
  troops: 'Troops',
  drone: 'Drone',
  gear: 'Gear',
  resources: 'Resources',
  alliance: 'Alliance',
  events: 'Events',
  pvp: 'PvP',
  daily: 'Daily Routine',
  spending: 'Spending',
  advanced: 'Advanced',
  beginner: 'Beginner'
};

export const CATEGORY_EMOJIS: Record<TipCategory, string> = {
  heroes: '🦸',
  squad: '👥',
  base: '🏰',
  research: '🔬',
  troops: '⚔️',
  drone: '🤖',
  gear: '🛡️',
  resources: '💎',
  alliance: '🤝',
  events: '🎯',
  pvp: '⚔️',
  daily: '📋',
  spending: '💰',
  advanced: '🎓',
  beginner: '🌱'
};

export const TIPS: Tip[] = [
  // HEROES
  { id: 1, category: 'heroes', text: "Focus on 5 core heroes ONLY. Spreading upgrades thin costs 2-4 weeks of progression!" },
  { id: 2, category: 'heroes', text: "SS-Tier heroes: Kimberly, DVA, Tesla, Williams, Marshall. Prioritize these!" },
  { id: 3, category: 'heroes', text: "UR heroes > SSR > SR. Don't waste resources on SR heroes late game." },
  { id: 4, category: 'heroes', text: "Only replace SSR with UR when your UR has 1 star less than the SSR." },
  { id: 5, category: 'heroes', text: "Murphy is the gold standard for defense - pairs perfectly with Kimberly." },
  { id: 6, category: 'heroes', text: "DVA is the best burst damage dealer - core of any Aircraft team." },
  { id: 7, category: 'heroes', text: "F2P? Focus on Natalia early - she's farmable and strong!" },
  { id: 8, category: 'heroes', text: "Carlie blocks energy damage - great counter to Kim/DVA comps." },
  { id: 9, category: 'heroes', text: "If enemy has Carlie in Front Left, move Kim to Rear Right to damage the other side." },

  // SQUAD BUILDING
  { id: 10, category: 'squad', text: "5 same-type heroes = +20% all stats. Type bonuses are huge!" },
  { id: 11, category: 'squad', text: "Type advantage: Tank > Missile > Aircraft > Tank. +20% damage dealt!" },
  { id: 12, category: 'squad', text: "Your strongest tank should be in Front Left position." },
  { id: 13, category: 'squad', text: "Your strongest DPS should be in Rear Left - they live longest and deal most damage." },
  { id: 14, category: 'squad', text: "Front Left, Rear Left, and Rear Center all attack the enemy's Front Left." },
  { id: 15, category: 'squad', text: "F2P Tank Build: Murphy (def) + Mason (dps) + Monica (support) + 2 others." },
  { id: 16, category: 'squad', text: "Williams + DVA/Tesla is a great balance of defense and burst damage." },

  // BASE BUILDING
  { id: 17, category: 'base', text: "Never let Tech Center fall more than 2 levels behind HQ!" },
  { id: 18, category: 'base', text: "HQ 30 = T10 troops. This is THE critical milestone for most players." },
  { id: 19, category: 'base', text: "Tech Center unlocks at HQ 7 - place it immediately!" },
  { id: 20, category: 'base', text: "Material Workshop is a TRAP that wastes resources. Low priority!" },
  { id: 21, category: 'base', text: "Leave buildings 'gift wrapped' until Alliance Duel Tuesday for free points!" },
  { id: 22, category: 'base', text: "Enable 'Confirm to unwrap buildings' in settings to prevent accidents." },
  { id: 23, category: 'base', text: "Always have an upgrade running - idle time is wasted time." },
  { id: 24, category: 'base', text: "Use Secretary of Development before starting long upgrades!" },
  { id: 25, category: 'base', text: "Only upgrade ONE Drill Ground - don't spread resources." },

  // RESEARCH
  { id: 26, category: 'research', text: "MAX your badge-free techs first. Save badges for AD, Special Forces, and late-game." },
  { id: 27, category: 'research', text: "Alliance Duel tech doubles ALL points received - prioritize early!" },
  { id: 28, category: 'research', text: "Garage 1 research = best value. Garage 3 = most expensive, late game only." },
  { id: 29, category: 'research', text: "2nd Tech Center is one of the best investments. 3rd unlocks FREE through research!" },
  { id: 30, category: 'research', text: "Valor Badge priority: AD research > Special Forces > Military > Economy." },

  // TROOPS
  { id: 31, category: 'troops', text: "ALWAYS promote instead of training fresh - same points, faster and cheaper!" },
  { id: 32, category: 'troops', text: "Train T5 → Promote to T6 → T7 → T8 → T9 = 4x the event points vs direct T9!" },
  { id: 33, category: 'troops', text: "Keep barracks at different levels for the cascade promotion effect." },
  { id: 34, category: 'troops', text: "Each full troop tier advantage = ~20-25% more combat power." },
  { id: 35, category: 'troops', text: "Survivors only count when training STARTS - you can move them between barracks!" },
  { id: 36, category: 'troops', text: "Get Secretary of Defense before bed each night for training speed boost." },

  // DRONE
  { id: 37, category: 'drone', text: "The Drone joins EVERY fight, can't be targeted, and constantly bombs enemies!" },
  { id: 38, category: 'drone', text: "While upgrade progress is under 80%, every tap has 50% chance to DOUBLE XP!" },
  { id: 39, category: 'drone', text: "Stay under 80% drone progress as long as possible for maximum value." },
  { id: 40, category: 'drone', text: "Chip Lab: Stop at level 20. Levels 21-35 don't unlock new chips - waste of resources!" },
  { id: 41, category: 'drone', text: "Always grab RIGHT-SIDE drone pieces: Missile, Fuel, Thermal." },
  { id: 42, category: 'drone', text: "Drone movement skills = first priority. Defense skills = second priority." },

  // GEAR
  { id: 43, category: 'gear', text: "One hero with 5-star mythic gear > Three heroes with 2-star gear. FOCUS!" },
  { id: 44, category: 'gear', text: "Gear upgrade priority: WEAPONS > Chips > Radars > Armor." },
  { id: 45, category: 'gear', text: "ONLY spend Honor Points on Legendary Gear Blueprints - they're exclusive!" },
  { id: 46, category: 'gear', text: "Disassemble ALL gear not on your primary squad to make gold gear." },
  { id: 47, category: 'gear', text: "5-star Mythic gear = 2.75x power multiplier vs 0-star baseline." },

  // RESOURCES
  { id: 48, category: 'resources', text: "NEVER use diamonds to speed up buildings. EVER." },
  { id: 49, category: 'resources', text: "Save resource chests until you need them - they scale with HQ level!" },
  { id: 50, category: 'resources', text: "Iron becomes your biggest bottleneck around HQ 15." },
  { id: 51, category: 'resources', text: "Gold Zombie Event = FASTEST way to get gold. Save stamina for it!" },
  { id: 52, category: 'resources', text: "Deploy Monica during Gold Zombie Events for +25% resource bonus." },
  { id: 53, category: 'resources', text: "Hold diamonds until you have 15-20k saved before spending." },
  { id: 54, category: 'resources', text: "Arena 3v3 Brawl thumbs up = 90 free diamonds daily (30 x 3)!" },
  { id: 55, category: 'resources', text: "Monthly F2P diamond income: ~6,000 (3k tasks, 2k events, 1k alliance)." },

  // ALLIANCE
  { id: 56, category: 'alliance', text: "Join an alliance on Day 1! You'll miss 60% of content without one." },
  { id: 57, category: 'alliance', text: "Alliance = 40-50% faster progression vs playing solo." },
  { id: 58, category: 'alliance', text: "Secretary of Interior 3x daily can gain 10M+ extra resources!" },
  { id: 59, category: 'alliance', text: "Donate 4-10 diamonds to alliance tech daily (diminishing returns after)." },
  { id: 60, category: 'alliance', text: "Activity > Power when it comes to alliance value." },

  // EVENTS - Alliance Duel
  { id: 61, category: 'events', text: "AD Radar Days: Save on Sun/Tue/Thu, USE on Mon/Wed/Fri/Sat." },
  { id: 62, category: 'events', text: "Before AD matchmaking on Sunday: Unequip gear, lower troops, remove survivors to drop power!" },
  { id: 63, category: 'events', text: "Double-dip: Time AD activities with Arms Race phases for 2x points!" },
  { id: 64, category: 'events', text: "Research all 20 levels of Duel Expert tech - up to 150% more AD points!" },
  { id: 65, category: 'events', text: "Some radar tasks disappear if not started: dig site, test flights, gathering, NPC fights." },

  // EVENTS - Other
  { id: 66, category: 'events', text: "Zombie Invasion = Best stamina use in the game! 4x more beneficial than Doom Elite." },
  { id: 67, category: 'events', text: "ZI Boss Level Lock: Killing high-level bosses limits future spawns. Be careful!" },
  { id: 68, category: 'events', text: "Courage Medal priority: Stamina > 50 Drone Parts > other stuff." },
  { id: 69, category: 'events', text: "General's Trial: Solo at 10 stamina until #25, then use rallies." },
  { id: 70, category: 'events', text: "Wanted Boss: Wait until last chance for maximum damage (before 21:00 server time)." },
  { id: 71, category: 'events', text: "Honorable Campaign: Always complete when available!" },

  // PVP
  { id: 72, category: 'pvp', text: "ALWAYS scout before attacking! No defenses = easy target even if higher level." },
  { id: 73, category: 'pvp', text: "Need at least 40% of enemy's power to deal damage. Below 40% = zero troop loss." },
  { id: 74, category: 'pvp', text: "Keep walls EMPTY or use 1-hero squad. Defending fills hospitals fast!" },
  { id: 75, category: 'pvp', text: "Spam healing: Heal 20-35 minutes at a time. Alliance assistance makes it instant!" },
  { id: 76, category: 'pvp', text: "Tile hopping: Troops move 2x faster to resource tiles than direct attacks." },
  { id: 77, category: 'pvp', text: "Fire Extinguisher: Best for ally attacked by Doom Walker, NOT during repeated attacks." },
  { id: 78, category: 'pvp', text: "Rallies are sequential battles, not cumulative power. First player fights, then second, etc." },

  // DAILY ROUTINE
  { id: 79, category: 'daily', text: "Quick start (80% of progress): Free rewards, stamina, 3v3 arena, recruitment, upgrades." },
  { id: 80, category: 'daily', text: "Armed Truck appears every 8.5 hours - don't miss it!" },
  { id: 81, category: 'daily', text: "Maintain 3+ marches gathering 24/7 (except Saturdays!)." },
  { id: 82, category: 'daily', text: "Never harvest troops on Saturdays - they'll get killed in SvS!" },
  { id: 83, category: 'daily', text: "First Blood (Doom Walker rally) once daily - don't skip!" },
  { id: 84, category: 'daily', text: "Plunder bases until debuff (6-8 attacks per day)." },

  // TRUCKS & TRAINS
  { id: 85, category: 'daily', text: "GREAT truck loot: SSR/UR gear chests, decoration chests, Universal UR shards." },
  { id: 86, category: 'daily', text: "BAD truck loot: Speed up chests, low-level SR gear, low resource chests." },
  { id: 87, category: 'daily', text: "5 free truck refreshes daily. Save refreshes for AD Tuesday/Saturday." },
  { id: 88, category: 'daily', text: "Train loot: Only bottom row can be looted. Top left item CANNOT be looted!" },
  { id: 89, category: 'daily', text: "Most valuable train loot: UR decoration chests (~$30-50 value!)." },

  // SPENDING
  { id: 90, category: 'spending', text: "Diamond priority: VIP Time (10k) > Hot Deals > Emergency Speedups." },
  { id: 91, category: 'spending', text: "Only spend diamonds on VIP Points on Sunday if close to next reward." },
  { id: 92, category: 'spending', text: "$200 spent efficiently > $500 spent impulsively!" },
  { id: 93, category: 'spending', text: "Best low-spender purchases: Monthly Pass > Permanent Queues > Battle Pass." },
  { id: 94, category: 'spending', text: "Ammo Bonanza $5 packs (100-150 ammo) = best event value." },
  { id: 95, category: 'spending', text: "F2P can get 3-4 complete 5-star mythic heroes per year with discipline!" },

  // ADVANCED
  { id: 96, category: 'advanced', text: "Survivor swap trick: Move survivors between buildings - they only count when action STARTS!" },
  { id: 97, category: 'advanced', text: "One-hero squads: Great for getting carried in Doom Walker rallies and General's Trial." },
  { id: 98, category: 'advanced', text: "Use gathering spots during war: Faster movement, hide troops, no enemy notification!" },
  { id: 99, category: 'advanced', text: "Continuous marches: Send squad to attack again as soon as they start returning." },
  { id: 100, category: 'advanced', text: "Doom Walker attack prevention: Set a rally against it, then cancel. Attack prevented!" },
  { id: 101, category: 'advanced', text: "R4/R5 rallies get +5% boost. Use them for important fights!" },
  { id: 102, category: 'advanced', text: "Check mail after every fight for detailed battle report - shows where enemy invested!" },
  { id: 103, category: 'advanced', text: "Harass with scouts to flood enemy's attack logs during PvP." },

  // BEGINNER
  { id: 104, category: 'beginner', text: "Don't open level-tied chests until HQ 23-25. Rewards scale with level!" },
  { id: 105, category: 'beginner', text: "Don't do Frontline Breakthrough mini-game until level 30 (save for T10 troops)." },
  { id: 106, category: 'beginner', text: "Join newer servers where you can compete fairly. Avoid old servers!" },
  { id: 107, category: 'beginner', text: "Server selection is nearly impossible to change later. Choose wisely!" },
  { id: 108, category: 'beginner', text: "Last War is a MARATHON, not a sprint. Patience is key!" },
];

// Get all unique categories
export function getAllCategories(): TipCategory[] {
  return [...new Set(TIPS.map(t => t.category))].sort() as TipCategory[];
}

// Get random tip (optionally from a specific category)
export function getRandomTip(category?: string): Tip {
  let pool = TIPS;
  if (category) {
    pool = TIPS.filter(t => t.category.toLowerCase() === category.toLowerCase());
    if (pool.length === 0) pool = TIPS;
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

// Get all tips from a category
export function getTipsByCategory(category: string): Tip[] {
  return TIPS.filter(t => t.category.toLowerCase() === category.toLowerCase());
}
