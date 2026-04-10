export interface DayRecommendation {
  actions: string[];
  avoid: string[];
  prepForNext: string[];
}

export const VS_RECOMMENDATIONS: Record<string, DayRecommendation> = {
  'Troop Training': {
    actions: ['Queue max troop batches with speedups', 'Use training speedups — save research/building ones', 'Claim any troop-related rewards from mail', 'Double-dip with Alliance Duel if it overlaps'],
    avoid: ['Don\'t waste research or building speedups', 'Don\'t start long upgrades that eat your queue'],
    prepForNext: ['Bank research speedups for tomorrow', 'Check which research is closest to finishing'],
  },
  'Research': {
    actions: ['Push research with speedups', 'Prioritize combat tech or economy tech', 'Use any research boost items'],
    avoid: ['Don\'t use training speedups today', 'Don\'t start building upgrades yet'],
    prepForNext: ['Queue up a building upgrade ready to speed', 'Stock building speedups'],
  },
  'Building': {
    actions: ['Speed up building upgrades', 'Focus on HQ and key production buildings', 'Use builder boost items if you have them'],
    avoid: ['Don\'t burn training or research speedups', 'Don\'t start troop batches unless free'],
    prepForNext: ['Check hero XP and skill materials', 'Prep hero upgrade items'],
  },
  'Hero Development': {
    actions: ['Level up hero skills and star ratings', 'Use hero EXP items', 'Promote heroes that are ready', 'Invest in your main 5 squad heroes first'],
    avoid: ['Don\'t level bench heroes you won\'t use', 'Don\'t waste universal fragments on low-tier heroes'],
    prepForNext: ['Send gatherers out tonight for a head start', 'Check resource tile levels on the map'],
  },
  'Resource Gathering': {
    actions: ['Send all marches to resource tiles', 'Use gathering boost items', 'Focus on your scarcest resource', 'Protect gatherers — don\'t leave them unshielded'],
    avoid: ['Don\'t recall gatherers early for points', 'Don\'t start PvP fights while troops are out'],
    prepForNext: ['Save speedups of all types for Power Increase', 'Queue up builds, research, and troops'],
  },
  'Power Increase': {
    actions: ['Speed up everything — troops, research, buildings', 'This is your dump-all-speedups day', 'Claim any pending rewards that add power', 'Promote heroes if it adds BP'],
    avoid: ['Don\'t hold back speedups — use them now', 'Don\'t gather resources (low points)'],
    prepForNext: ['Save radar tasks — don\'t complete them yet', 'Prep alliance duel tasks overnight'],
  },
  'Alliance Duel': {
    actions: ['Coordinate with R4/R5 on duel strategy', 'Pop saved radar tasks for double points', 'Complete healing tasks for consistent scoring', 'Spam heal small troop batches for help points'],
    avoid: ['Don\'t go solo — coordinate with alliance', 'Don\'t waste high-value speedups on low-point tasks'],
    prepForNext: ['Queue troop batches for tomorrow\'s training day', 'Check troop capacity and barracks level'],
  },
  'Kill Event': {
    actions: ['Hunt enemy tiles and troops outside shields', 'Rally with your alliance for big targets', 'Use anti-scout before attacking', 'Focus on wounded troops over kills if you\'re weaker'],
    avoid: ['Don\'t leave your base unshielded', 'Don\'t attack players way above your power', 'Don\'t send gatherers out unprotected'],
    prepForNext: ['Stock up on speedups for Arms Race', 'Check Arms Race phase requirements'],
  },
  'Arms Race': {
    actions: ['Follow the phase requirements exactly', 'Coordinate with alliance for phase pushes', 'Double-dip with any overlapping VS tasks', 'Use speedups strategically per phase'],
    avoid: ['Don\'t waste speedups on wrong phase categories', 'Don\'t go offline during phase transitions'],
    prepForNext: ['Heal troops that need it', 'Rest and recover resources'],
  },
  'Healing': {
    actions: ['Heal all wounded troops', 'Use healing speedups', 'Top off hospital capacity', 'Check troop composition balance'],
    avoid: ['Don\'t start new fights', 'Don\'t waste combat speedups'],
    prepForNext: ['Relax — free day is next', 'Plan your week ahead'],
  },
  'Free Day': {
    actions: ['Catch up on anything you missed this cycle', 'Farm resources for next cycle', 'Level heroes, do campaign stages', 'Check alliance donations and tech'],
    avoid: ['Don\'t burn speedups — save for next cycle'],
    prepForNext: ['Queue troop batches — Training day starts the new cycle', 'Stock training speedups', 'Set an alarm for cycle reset'],
  },
};

export function getRecommendation(label: string): DayRecommendation {
  return VS_RECOMMENDATIONS[label] ?? {
    actions: ['Check alliance chat for guidance', 'Focus on daily tasks'],
    avoid: ['Don\'t waste speedups without a plan'],
    prepForNext: ['Check tomorrow\'s VS day and plan accordingly'],
  };
}
