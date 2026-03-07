/**
 * Image Registry — maps hero IDs and topics to image URLs.
 *
 * Images are stored in /images/ (committed to the repo) and served via GitHub raw CDN.
 * URL pattern: https://raw.githubusercontent.com/kodatius/last-war-companion-bot/main/images/{path}
 *
 * To add a hero portrait: drop `{heroId}.png` into images/heroes/ and push.
 * No code changes needed — the URL is constructed automatically from the hero ID.
 */

const GITHUB_RAW = 'https://raw.githubusercontent.com/kodatius/last-war-companion-bot/main/images';

// ---------------------------------------------------------------------------
// Hero portraits (auto-constructed from hero ID — just add the file)
// ---------------------------------------------------------------------------

/** Returns the GitHub raw CDN URL for a hero portrait by ID. */
export function getHeroImageUrl(heroId: string): string {
  return `${GITHUB_RAW}/heroes/${heroId.toLowerCase()}.png`;
}

// ---------------------------------------------------------------------------
// Guide images — keyword → image URL
// Topic detection: check if query contains any of the listed keywords
// ---------------------------------------------------------------------------

export interface TopicImage {
  url: string;
  /** Short label shown in embed footer or caption */
  label: string;
}

interface TopicMapping {
  keywords: string[];
  image: TopicImage;
}

const TOPIC_IMAGES: TopicMapping[] = [
  {
    keywords: [
      'meteorite', 'meteor', 'iron war', 'meteorite iron war', 'iron event',
      'stellar core', 'red zone', 'yellow zone', 'meteor shower', 'crystal spawn',
      'iron war guide', 'meteor guide', 'iron war tips'
    ],
    image: {
      url: `${GITHUB_RAW}/guides/meteorite-iron-war.png`,
      label: 'Meteorite Iron War – Full Guide'
    }
  },
  {
    keywords: ['alliance duel', 'ad scoring', 'duel strategy', 'ad day', 'ad points', 'duel tips'],
    image: {
      url: `${GITHUB_RAW}/guides/alliance-duel.png`,
      label: 'Alliance Duel Guide'
    }
  },
  {
    keywords: ['server vs server', 'svs', 's vs s', 'server war', 'cross server'],
    image: {
      url: `${GITHUB_RAW}/guides/server-vs-server.png`,
      label: 'Server vs Server Guide'
    }
  },
  {
    keywords: ['formation', 'squad setup', 'team comp', 'squad build', 'who to pair', 'best squad', 'hero lineup'],
    image: {
      url: `${GITHUB_RAW}/guides/formation-guide.png`,
      label: 'Formation Guide'
    }
  },
  {
    keywords: ['rally', 'march', 'rally attack', 'rally setup', 'march size'],
    image: {
      url: `${GITHUB_RAW}/guides/rally-guide.png`,
      label: 'Rally Guide'
    }
  },
  {
    keywords: ['gear', 'equipment', 'weapon', 'armor', 'accessory', 'crafting', 'forge'],
    image: {
      url: `${GITHUB_RAW}/guides/gear-guide.png`,
      label: 'Gear Guide'
    }
  },
  {
    keywords: ['building', 'hq', 'headquarter', 'base', 'construction', 'upgrade priority', 'what to build'],
    image: {
      url: `${GITHUB_RAW}/guides/building-guide.png`,
      label: 'Building Guide'
    }
  },
  {
    keywords: ['zombie', 'pve', 'zombie wave', 'zombie boss', 'shadow plague', 'infection'],
    image: {
      url: `${GITHUB_RAW}/guides/zombie-guide.png`,
      label: 'Zombie / PvE Guide'
    }
  }
];

// ---------------------------------------------------------------------------
// Hero keyword detection
// Maps name/alias patterns → hero ID (for RAG chat responses)
// ---------------------------------------------------------------------------

// All hero IDs below are confirmed Last War: Survival (FirstFun) heroes.
// Sources: PocketGamer (Feb 2026), Dracie BOWS guide, lastwartutorial.com
// Removed: logan, chen, hawk, garcia, nina, mike — NOT Last War: Survival heroes.
const HERO_KEYWORDS: Record<string, string> = {
  // SS-Tier
  kimberly: 'kimberly',
  kim: 'kimberly',
  dva: 'dva',
  tesla: 'tesla',
  marshall: 'marshall',
  morrison: 'morrison',
  fiona: 'fiona',
  // S-Tier
  williams: 'williams',
  mason: 'mason',
  murphy: 'murphy',
  carlie: 'carlie',
  lucius: 'lucius',
  schuyler: 'schuyler',
  adam: 'adam',
  swift: 'swift',
  // A-Tier
  stetmann: 'stetmann',
  violet: 'violet',
  sarah: 'sarah',
  mcgregor: 'mcgregor',
  // B-Tier
  monica: 'monica',
  scarlett: 'scarlett',
  richard: 'richard',
  cage: 'cage',
  elsa: 'elsa',
  // C-Tier / Specialty
  venom: 'venom',
  farhad: 'farhad',
  gump: 'gump',
  loki: 'loki',
  maxwell: 'maxwell',
  ambolt: 'ambolt',
  blaz: 'blaz',
  kane: 'kane'
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Given a query string, return the best matching TopicImage or null.
 * Checks hero names first, then guide topics.
 */
export function getImageForQuery(query: string): TopicImage | null {
  const lower = query.toLowerCase();

  // Check hero names first (returns hero portrait)
  for (const [keyword, heroId] of Object.entries(HERO_KEYWORDS)) {
    if (lower.includes(keyword)) {
      return {
        url: getHeroImageUrl(heroId),
        label: heroId.charAt(0).toUpperCase() + heroId.slice(1)
      };
    }
  }

  // Check guide topics
  for (const mapping of TOPIC_IMAGES) {
    if (mapping.keywords.some(kw => lower.includes(kw))) {
      return mapping.image;
    }
  }

  return null;
}

/**
 * Returns a topic image for a specific guide topic.
 * Use when you already know the topic (e.g., from a slash command).
 */
export function getGuideImage(topic: 'alliance-duel' | 'svs' | 'formation' | 'rally' | 'gear' | 'building' | 'zombie' | 'meteorite-iron-war'): TopicImage | null {
  const urlMap: Record<string, TopicImage> = {
    'alliance-duel': { url: `${GITHUB_RAW}/guides/alliance-duel.png`, label: 'Alliance Duel Guide' },
    'svs': { url: `${GITHUB_RAW}/guides/server-vs-server.png`, label: 'Server vs Server Guide' },
    'formation': { url: `${GITHUB_RAW}/guides/formation-guide.png`, label: 'Formation Guide' },
    'rally': { url: `${GITHUB_RAW}/guides/rally-guide.png`, label: 'Rally Guide' },
    'gear': { url: `${GITHUB_RAW}/guides/gear-guide.png`, label: 'Gear Guide' },
    'building': { url: `${GITHUB_RAW}/guides/building-guide.png`, label: 'Building Guide' },
    'zombie': { url: `${GITHUB_RAW}/guides/zombie-guide.png`, label: 'Zombie / PvE Guide' },
    'meteorite-iron-war': { url: `${GITHUB_RAW}/guides/meteorite-iron-war.png`, label: 'Meteorite Iron War – Full Guide' }
  };
  return urlMap[topic] || null;
}
