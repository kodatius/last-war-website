export interface GameEvent {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  description: string;
  frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly';
  dayOfWeek?: number; // 0 = Sunday, 1 = Monday, etc.
  strategies: string[];
}

export const events: GameEvent[] = [
  {
    id: 'alliance-duel',
    name: 'Alliance Duel',
    shortName: 'AD',
    icon: '🏆',
    description: 'Weekly competitive event where alliances compete for points through various activities.',
    frequency: 'weekly',
    dayOfWeek: 1, // Monday
    strategies: [
      '**Day 1:** SAVE your radar tasks! Don\'t complete them yet.',
      '**Day 2:** Pop all saved radar tasks for double points. This is your big scoring day!',
      '**Day 3-4:** Focus on healing and troop training tasks for consistent points.',
      '**Double-Dipping:** Time your activities to score in both AD and Arms Race simultaneously.',
      '**Spam Healing:** Heal small batches of troops for quick alliance help points.',
      '**Gift Wrapping:** Complete building upgrades but don\'t claim them until AD starts.'
    ]
  },
  {
    id: 'arms-race',
    name: 'Arms Race',
    shortName: 'AR',
    icon: '⚔️',
    description: 'Individual and alliance competition for training troops and building power.',
    frequency: 'weekly',
    dayOfWeek: 4, // Thursday
    strategies: [
      'Save speedups for Arms Race days.',
      'Coordinate with alliance for maximum point generation.',
      'Double-dip with Alliance Duel when schedules overlap.',
      'Focus on troop training for most efficient points.',
      'Use research speedups during the event for bonus points.'
    ]
  },
  {
    id: 'zombie-invasion',
    name: 'Zombie Invasion',
    shortName: 'ZI',
    icon: '🧟',
    description: 'PvE event where you defend against waves of zombies.',
    frequency: 'weekly',
    dayOfWeek: 5, // Friday
    strategies: [
      'Use your strongest PvE squad composition.',
      'Kimberly and Tesla excel in wave clear.',
      'Save stamina/energy for the event.',
      'Coordinate with alliance for boss zombies.',
      'Higher waves give better rewards - push as far as possible.'
    ]
  },
  {
    id: 'warzone-duel',
    name: 'Warzone Duel',
    shortName: 'WD',
    icon: '⚔️',
    description: 'Server vs Server (SvS) warfare. Your server competes against another server.',
    frequency: 'monthly',
    strategies: [
      '**Waterfall Structure:** Servers face progressively harder opponents.',
      '**Tile Control:** Capture and hold territory for points.',
      '**Shield Management:** Know when to shield and when to fight.',
      '**Coordinate Attacks:** Rally with your alliance for maximum impact.',
      '**Avoid the Mud:** The Capitol area has no shields - very dangerous!',
      '**Troop Preservation:** Use the 40% rule - retreat at 40% losses.',
      '**Time Zone Advantage:** Attack during enemy server\'s off-hours.'
    ]
  },
  {
    id: 'generals-trial',
    name: 'General\'s Trial',
    shortName: 'GT',
    icon: '⚔️',
    description: 'Challenge mode where you test your squads against increasingly difficult trials.',
    frequency: 'weekly',
    strategies: [
      'Use your best heroes for maximum progress.',
      'Different trials favor different hero types.',
      'Reset attempts are limited - plan carefully.',
      'Higher stages give significantly better rewards.'
    ]
  },
  {
    id: 'doomsday',
    name: 'Doomsday',
    shortName: 'DD',
    icon: '💀',
    description: 'Alliance cooperative event against massive threats.',
    frequency: 'weekly',
    strategies: [
      'Coordinate with your entire alliance.',
      'Assign roles based on player strength.',
      'Timing is crucial - be online when it starts.',
      'Use rally mechanics for boss enemies.'
    ]
  },
  {
    id: 'wanted-code',
    name: 'Wanted Code Boss',
    shortName: 'WC',
    icon: '🎯',
    description: 'Special boss that spawns from codes. Great rewards for participation.',
    frequency: 'daily',
    strategies: [
      'Share codes in alliance chat.',
      'Participation matters more than damage.',
      'Use stamina efficiently across multiple bosses.',
      'Check World Chat for code shares.'
    ]
  },
  {
    id: 'marshalls-guard',
    name: 'Marshall\'s Guard',
    shortName: 'MG',
    icon: '🛡️',
    description: 'Wave defense event. Survive as many waves as possible.',
    frequency: 'weekly',
    strategies: [
      'Tank-heavy squads survive longer.',
      'Williams and Marshall are essential.',
      'Waves get progressively harder.',
      'Rewards scale with waves completed.',
      'Use your best defensive heroes.'
    ]
  },
  {
    id: 'honorable-campaign',
    name: 'Honorable Campaign',
    shortName: 'HC',
    icon: '🎖️',
    description: 'Campaign mode with special rewards and challenges.',
    frequency: 'weekly',
    strategies: [
      'Progress through stages for rewards.',
      'Some stages have specific requirements.',
      'Use guides for difficult stages.',
      'Don\'t waste attempts on stages you can\'t beat.'
    ]
  },
  {
    id: 'meteorite-iron-war',
    name: 'Meteorite Iron War',
    shortName: 'MIW',
    icon: '☄️',
    description: 'Cross-server resource capture event. A meteor strikes the map — race to occupy Red/Yellow Zones and collect Crystals, Stellar Cores, and Debris for Iron points.',
    frequency: 'biweekly',
    strategies: [
      '**Format:** 2 rounds. You only need Top 3 in ONE round — sit out the other for free TP.',
      '**Pre-Meteor Move:** Teleport OUTSIDE the ring before impact for a free TP in — skipping the ejection animation.',
      '**Red Zone (Level 5 Cities):** Most dangerous, highest yield. Crystals = 30/sec, Stellar Cores = 120/sec. No shield allowed.',
      '**Yellow Zone (Level 4 Cities):** Debris only (40/sec + 300 flat). Shield OK here.',
      '**Crystal Shield Rule:** Crystals only stolen by enemy attack. Stay IN zone — leave = instant loss.',
      '**Spawn Waves:** Major meteor shower at ~15 min mark. Blue crystal surge near Capital at ~10 min — prime push window.',
      '**Individual Target:** 600K Iron for max boxes (Honor Medals, Universal Shards, Chip Materials).',
      '**F2P:** Enter early, grab 2–3 crystals from Red Zone, retreat to farm Debris. 1–2 attackers hunting = safe.',
      '**Mid-Tier:** Hold 5–10 at HQ, use alliance protection, target inner Red then Stellar Cores if reachable.',
      '**Whales:** Grab Crystals + Stellar Cores near Capitol. Ping-pong 2 strongest squads — steal 10–20 crystal players.',
      '**Cross-Server Diplomacy:** Let the other server win R1, you win R2. Both get top rewards.',
      '**Alliance Rewards:** 1st place = ~20K Honor Medals per member + Universal Exclusive Shards.'
    ]
  }
];

export function getEventById(id: string): GameEvent | undefined {
  return events.find(e => e.id === id);
}

export function getEventByName(name: string): GameEvent | undefined {
  const nameLower = name.toLowerCase();
  return events.find(e =>
    e.name.toLowerCase().includes(nameLower) ||
    e.shortName.toLowerCase() === nameLower
  );
}

export function getTodaysEvents(): GameEvent[] {
  const today = new Date().getDay();
  return events.filter(e => e.dayOfWeek === today);
}

export function getWeeklyEvents(): GameEvent[] {
  return events.filter(e => e.frequency === 'weekly');
}
