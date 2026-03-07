# Tech Spec: [ViKF] Last War Alliance Website

**Project:** lw-website  
**Author:** Barry (Quick Flow Solo Dev)  
**Date:** 2026-03-07  
**Status:** Ready for Implementation

---

## 1. Problem Statement

The [ViKF] alliance on Server #2058 in Last War: Survival has accumulated significant strategic knowledge — hero tier rankings, event strategies, squad formations, 108+ pro tips, and glossary terms — but it lives scattered across Discord messages, spreadsheets, and tribal knowledge. New members ramp slowly. Veteran members repeat the same advice. There's no single source of truth.

### Solution

A static, password-gated alliance website that consolidates all strategic content into a polished, mobile-first experience. Zero backend complexity. All content baked into TypeScript data files. Deploy free on Vercel. The password gate (5955) is a simple community deterrent, not real security — keeps random Google crawlers and rival alliances from casually browsing.

### Why Static Export

- **Free hosting** on Vercel/Netlify with zero config
- **Instant page loads** — no server rendering, no cold starts
- **No infrastructure** to maintain — alliance leaders aren't DevOps engineers
- **Content updates** via PR to data files — Toxzin or any contributor can edit TypeScript arrays

---

## 2. Tech Stack

| Layer | Choice | Version | Rationale |
|---|---|---|---|
| Framework | Next.js (App Router) | 15.x | Static export, file-based routing, React Server Components where applicable |
| Styling | Tailwind CSS | v4 | Utility-first, tree-shakes aggressively, dark theme trivial |
| Language | TypeScript | 5.x | Type safety on data files prevents silent content bugs |
| Animation | framer-motion | 11.x | Page transitions, card reveals, micro-interactions |
| Icons | lucide-react | latest | Consistent icon set, tree-shakeable |
| Deployment | Vercel | — | Zero-config Next.js hosting, free tier sufficient |
| Package Manager | pnpm | 9.x | Fast, disk-efficient |

### Key Constraints

- `next.config.ts`: `output: "export"` — generates static HTML/CSS/JS
- No `getServerSideProps`, no API routes, no middleware (incompatible with static export)
- All dynamic behavior is client-side (useState, useEffect, client components)
- Password gate uses cookies via `js-cookie` (lightweight, no server needed)

---

## 3. Project Structure

```
lw-website/
├── public/
│   ├── favicon.ico
│   ├── og-image.png                    # Open Graph share image
│   └── fonts/                          # Self-hosted tactical fonts if needed
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # Root layout: metadata, fonts, PasswordGate wrapper
│   │   ├── page.tsx                    # Home page
│   │   ├── heroes/
│   │   │   └── page.tsx               # Hero tier list
│   │   ├── events/
│   │   │   └── page.tsx               # Event guides
│   │   ├── squads/
│   │   │   └── page.tsx               # Squad builder
│   │   ├── tips/
│   │   │   └── page.tsx               # Pro tips
│   │   ├── glossary/
│   │   │   └── page.tsx               # Glossary
│   │   ├── quiz/
│   │   │   └── page.tsx               # Quiz
│   │   └── about/
│   │       └── page.tsx               # About page
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx             # Nav bar with alliance branding
│   │   │   ├── Footer.tsx             # Discord link, credits
│   │   │   ├── MobileNav.tsx          # Hamburger slide-out menu
│   │   │   └── PageTransition.tsx     # framer-motion AnimatePresence wrapper
│   │   ├── gate/
│   │   │   └── PasswordGate.tsx       # Cookie-based password wall
│   │   ├── ui/
│   │   │   ├── TierBadge.tsx          # SS/S/A/B/C colored badges
│   │   │   ├── FrequencyBadge.tsx     # daily/weekly/biweekly/monthly pills
│   │   │   ├── DifficultyBadge.tsx    # easy/medium/hard quiz badges
│   │   │   ├── TypeIcon.tsx           # Tank/Aircraft/Missile icons
│   │   │   ├── RarityBadge.tsx        # UR/SSR/SR badges
│   │   │   ├── CategoryBadge.tsx      # Emoji + category label pills
│   │   │   ├── SearchInput.tsx        # Reusable search bar with debounce
│   │   │   ├── FilterBar.tsx          # Multi-select filter chips
│   │   │   ├── Card.tsx              # Base card component with hover effects
│   │   │   ├── ExpandableCard.tsx     # Card with collapsible detail section
│   │   │   ├── SectionHeading.tsx     # Consistent h2 with accent underline
│   │   │   └── DiscordButton.tsx      # Styled Discord invite CTA
│   │   ├── home/
│   │   │   ├── HeroBanner.tsx         # Full-width hero with tagline
│   │   │   ├── StatsBar.tsx           # Server, alliance, member count
│   │   │   ├── NavCards.tsx           # Grid of section navigation cards
│   │   │   └── TipOfTheDay.tsx        # Rotating daily tip widget
│   │   ├── heroes/
│   │   │   ├── TierSection.tsx        # SS/S/A/B/C tier row with heroes
│   │   │   └── HeroCard.tsx           # Individual hero with expandable details
│   │   ├── events/
│   │   │   ├── EventCard.tsx          # Event summary card
│   │   │   ├── EventDetail.tsx        # Full strategy breakdown
│   │   │   └── WeeklyCalendar.tsx     # Day-of-week event schedule grid
│   │   ├── squads/
│   │   │   ├── PositionGrid.tsx       # 5-position visual layout
│   │   │   ├── FormationCard.tsx      # Recommended formation display
│   │   │   └── TypeTriangle.tsx       # Tank > Aircraft > Missile > Tank diagram
│   │   ├── tips/
│   │   │   └── TipCard.tsx            # Individual tip card
│   │   ├── glossary/
│   │   │   └── TermCard.tsx           # Term with aliases and definition
│   │   └── quiz/
│   │       ├── QuizEngine.tsx         # Quiz state machine (question flow, scoring)
│   │       ├── QuestionCard.tsx       # Single question with answer options
│   │       ├── ScoreDisplay.tsx       # Current score + progress
│   │       └── DailyChallenge.tsx     # Date-seeded daily question selector
│   ├── data/
│   │   ├── heroes-data.ts            # Hero[]
│   │   ├── events-data.ts            # GameEvent[]
│   │   ├── tips-data.ts              # Tip[]
│   │   ├── terms-data.ts             # Term[]
│   │   └── quiz-data.ts              # QuizQuestion[]
│   ├── types/
│   │   └── index.ts                   # All shared TypeScript interfaces
│   ├── lib/
│   │   ├── constants.ts               # Colors, URLs, alliance info
│   │   └── utils.ts                   # Helper functions (date seed, shuffle, search)
│   └── styles/
│       └── globals.css                # Tailwind directives + custom properties
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 4. Type Definitions

```typescript
// src/types/index.ts

export type HeroType = 'Tank' | 'Aircraft' | 'Missile';
export type Rarity = 'UR' | 'SSR' | 'SR';
export type Tier = 'SS' | 'S' | 'A' | 'B' | 'C';

export interface Hero {
  id: string;                          // e.g., "phantom" — used for image URL
  name: string;
  type: HeroType;
  rarity: Rarity;
  tier: Tier;
  whyGood: string;
  bestPairings: string[];
  usageTips: {
    pvp: string;
    pve: string;
    events: string;
  };
  recommendedGear: string;
}

export type EventFrequency = 'daily' | 'weekly' | 'biweekly' | 'monthly';

export interface EventStrategy {
  title: string;
  description: string;
}

export interface GameEvent {
  id: string;
  name: string;
  icon: string;                        // emoji
  frequency: EventFrequency;
  description: string;
  strategies: EventStrategy[];
  daysActive?: string[];               // e.g., ["Monday", "Thursday"]
}

export interface Tip {
  id: number;
  category: string;
  emoji: string;
  text: string;
}

export type TermCategory = 'abbreviation' | 'slang' | 'mechanic';

export interface Term {
  term: string;
  aliases: string[];
  definition: string;
  category: TermCategory;
}

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: Difficulty;
  points: number;                      // easy=1, medium=2, hard=3
}
```

---

## 5. Component Architecture

### 5.1 Root Layout (`src/app/layout.tsx`)

Server component. Sets:
- HTML metadata (title, description, OG tags)
- Font loading (Inter + optional tactical display font)
- `<body>` with dark background class
- Wraps children in `<PasswordGate>` → `<Header>` + `<main>` + `<Footer>`
- `<PageTransition>` wraps page content for framer-motion route animations

### 5.2 Password Gate (`src/components/gate/PasswordGate.tsx`)

Client component (`"use client"`).

**Behavior:**
1. On mount, check for cookie `vikf_access` via `js-cookie`
2. If cookie exists and value matches hash → render children
3. If no cookie → render full-screen password prompt
4. On correct password (5955) → set cookie with 30-day expiry → render children
5. Wrong password → shake animation + error message

**Implementation:**
- Store a simple bcrypt-like hash or just compare plaintext (it's client-side, not real security)
- Cookie name: `vikf_access`, value: `verified`, max-age: 30 days
- Full-screen overlay with alliance branding, input field, submit button
- No "forgot password" — it's an alliance gate, ask in Discord

### 5.3 Header (`src/components/layout/Header.tsx`)

Client component (needs mobile menu state).

- Fixed top nav, glass-morphism dark background (`bg-gray-950/80 backdrop-blur-md`)
- Left: [ViKF] logo/text
- Center/right: Nav links (Home, Heroes, Events, Squads, Tips, Glossary, Quiz, About)
- Mobile: hamburger → `<MobileNav>` slide-out drawer
- Active link indicator (gold underline)

### 5.4 Page Transition (`src/components/layout/PageTransition.tsx`)

Client component wrapping each page's content.

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3 }}
>
  {children}
</motion.div>
```

### 5.5 Reusable UI Components

| Component | Props | Notes |
|---|---|---|
| `TierBadge` | `tier: Tier` | Color map: SS=red, S=orange, A=gold, B=blue, C=gray |
| `FrequencyBadge` | `frequency: EventFrequency` | Pill with appropriate color |
| `DifficultyBadge` | `difficulty: Difficulty` | green/yellow/red |
| `TypeIcon` | `type: HeroType` | Tank=shield, Aircraft=plane, Missile=rocket |
| `RarityBadge` | `rarity: Rarity` | UR=gold glow, SSR=purple, SR=blue |
| `CategoryBadge` | `emoji: string, label: string` | Generic pill with emoji prefix |
| `SearchInput` | `value, onChange, placeholder` | Debounced (300ms), with search icon |
| `FilterBar` | `options: string[], selected: string[], onChange` | Horizontal scrollable chip bar |
| `Card` | `children, className?` | Dark card with border, hover:scale(1.02), gold border-glow on hover |
| `ExpandableCard` | `header, children` | Card + chevron toggle for detail section |
| `SectionHeading` | `title: string, subtitle?: string` | h2 with gold accent bar |
| `DiscordButton` | — | Links to `https://discord.gg/S4m3mmzuKZ` |

---

## 6. Page Specifications

### 6.1 Home Page (`/`)

**Components:** HeroBanner, StatsBar, NavCards, TipOfTheDay

**HeroBanner:**
- Full viewport height (100vh) with dark gradient overlay
- Optional subtle particle/grid animation (CSS only, no heavy lib)
- Alliance name "[ViKF]" in large tactical font
- Tagline: "Strategy wins wars, but preparation wins servers."
- CTA button → Discord invite
- Scroll-down chevron indicator

**StatsBar:**
- Horizontal bar below hero: Server #2058 | Alliance [ViKF] | Discord link
- Subtle entrance animation (stagger fade-in)

**NavCards:**
- 2×3 or 3×3 responsive grid
- Each card: icon, title, short description, → link
- Cards: Heroes, Events, Squads, Tips, Glossary, Quiz
- Hover: lift + gold border glow

**TipOfTheDay:**
- Selects tip based on `Math.floor(Date.now() / 86400000) % tips.length`
- Card with lightbulb icon, tip text, category badge
- "See all tips →" link

### 6.2 Hero Tier List (`/heroes`)

**Components:** FilterBar, TierSection (×5), HeroCard (×23)

**Layout:**
1. Page header with SectionHeading
2. FilterBar: filter by type (Tank/Aircraft/Missile) + filter by tier (SS/S/A/B/C)
3. Tier sections rendered top-to-bottom: SS → S → A → B → C
4. Each tier section: TierBadge header + horizontal scroll row of HeroCards
5. Empty tiers (after filtering) hidden

**HeroCard:**
- Image: `https://raw.githubusercontent.com/kodatius/last-war-companion-bot/main/images/heroes/{hero.id}.png`
- Fallback: colored placeholder with hero initials
- Name, TypeIcon, RarityBadge, TierBadge
- Click/tap → expand: whyGood, bestPairings (as tags), usageTips (tabbed: PvP/PvE/Events), recommendedGear
- Smooth expand animation via framer-motion `AnimatePresence` + `layout`

**Image Error Handling:**
- `onError` handler swaps to a gradient placeholder with hero initials
- No broken image icons ever shown

### 6.3 Event Guides (`/events`)

**Components:** WeeklyCalendar, EventCard (×11), EventDetail

**Layout:**
1. SectionHeading
2. WeeklyCalendar: 7-column grid (Mon-Sun), each cell lists events active that day
3. Below calendar: all events as EventCards
4. Click EventCard → expand inline to show EventDetail with full strategy list

**WeeklyCalendar:**
- Responsive: horizontal scroll on mobile, full grid on desktop
- Today's column highlighted with gold border
- Events shown as small pills with icon + abbreviated name

**EventCard:**
- Icon (emoji), name, FrequencyBadge, short description
- Strategy count indicator ("12 strategies")

**EventDetail:**
- Numbered strategy list with title + description for each
- Collapsible accordion if >6 strategies

### 6.4 Squad Builder (`/squads`)

**Components:** PositionGrid, FormationCard (×3), TypeTriangle

**Layout:**
1. SectionHeading
2. PositionGrid: visual 2-row grid showing 5 positions
   - Row 1: Front Left, Front Right
   - Row 2: Rear Left, Rear Center, Rear Right
   - Each position labeled with name + targeting info
3. TypeTriangle: SVG/CSS triangle showing Tank → beats Aircraft → beats Missile → beats Tank
4. Position targeting explanation: text block explaining who attacks whom
5. Three FormationCards below

**PositionGrid:**
- Visual grid with connecting lines/arrows
- Color-coded positions
- Tooltip or label: "Front Left targets Rear Right" etc.

**FormationCard:**
- Formation name (F2P Tank, Aircraft Meta, Missile)
- Mini PositionGrid with hero names/images placed in each slot
- Brief strategy description
- Link to relevant heroes in tier list

**TypeTriangle:**
- Animated SVG triangle with three nodes (Tank, Aircraft, Missile)
- Directional arrows showing advantage
- Color-coded: Tank=green, Aircraft=blue, Missile=red

### 6.5 Pro Tips (`/tips`)

**Components:** SearchInput, FilterBar, TipCard (×108)

**Layout:**
1. SectionHeading with tip count ("108 Pro Tips")
2. SearchInput (searches tip text)
3. FilterBar: 15 category chips with emojis, multi-select
4. Responsive card grid (1 col mobile, 2 col tablet, 3 col desktop)
5. Empty state: "No tips match your search" with reset button

**TipCard:**
- CategoryBadge (emoji + category)
- Tip text
- Subtle entrance animation (stagger on initial load, instant on filter)

**Performance:**
- 108 items is fine for client-side rendering, no virtualization needed
- Filter + search both operate on the same filtered array

### 6.6 Glossary (`/glossary`)

**Components:** SearchInput, FilterBar, TermCard (×32)

**Layout:**
1. SectionHeading
2. SearchInput (searches term, aliases, definition)
3. FilterBar: category chips (abbreviation, slang, mechanic)
4. Alphabetically sorted term list
5. TermCards in responsive grid

**TermCard:**
- Term name (bold, gold)
- Aliases as small gray tags
- Definition text
- TermCategory badge

### 6.7 Quiz (`/quiz`)

**Components:** QuizEngine, QuestionCard, ScoreDisplay, DailyChallenge

**State Machine (QuizEngine):**
```
IDLE → START → ANSWERING → FEEDBACK → (next question or COMPLETE)
```

**States:**
- `IDLE`: Show start screen with mode selection (All Questions / Daily Challenge)
- `ANSWERING`: Display current question, 4 options, no answer selected yet
- `FEEDBACK`: Answer selected → immediately show correct/incorrect + explanation
- `COMPLETE`: All questions answered → final score, breakdown by difficulty, restart button

**Quiz Modes:**
1. **Full Quiz:** All questions shuffled, sequential
2. **Daily Challenge:** 5 questions seeded by date (`new Date().toDateString()` as seed for deterministic shuffle). Same 5 questions for everyone on the same day.

**QuestionCard:**
- Question text
- DifficultyBadge + point value
- 4 option buttons (A/B/C/D)
- On answer: correct option turns green, wrong selection turns red
- Explanation text appears below
- "Next" button

**ScoreDisplay:**
- Current score / max possible score
- Question progress (e.g., "7 / 40")
- Animated score counter (framer-motion `useSpring`)

**Daily Challenge:**
- Date-seeded PRNG: `hashCode(dateString) % questions.length` to pick 5
- Shows "Daily Challenge — March 7, 2026" header
- Completion stores date in localStorage to prevent re-taking (honor system)

### 6.8 About (`/about`)

**Layout:**
1. SectionHeading
2. Alliance history/lore section
3. Server info: #2058
4. Leadership credits: "Built by Toxzin and the [ViKF] leadership team"
5. Large Discord invite CTA
6. Tech credits: "Powered by Next.js, deployed on Vercel"

---

## 7. Design System

### 7.1 Color Palette

```css
/* globals.css — Tailwind v4 theme overrides */
@theme {
  --color-bg-primary: #0a0a0f;        /* Near-black base */
  --color-bg-secondary: #12121a;      /* Card backgrounds */
  --color-bg-tertiary: #1a1a2e;       /* Elevated surfaces */
  --color-border: #2a2a3e;            /* Subtle borders */
  --color-border-hover: #d4a017;      /* Gold border on hover */
  --color-accent: #d4a017;            /* Primary gold/amber */
  --color-accent-light: #f0c040;      /* Light gold for text highlights */
  --color-accent-dark: #a07a10;       /* Dark gold for pressed states */
  --color-text-primary: #e8e8f0;      /* Main text */
  --color-text-secondary: #8888a0;    /* Muted text */
  --color-success: #22c55e;           /* Correct answer, positive */
  --color-error: #ef4444;             /* Wrong answer, errors */
  --color-tier-ss: #ff2d55;           /* SS tier — red/magenta */
  --color-tier-s: #ff9500;            /* S tier — orange */
  --color-tier-a: #d4a017;            /* A tier — gold */
  --color-tier-b: #5ac8fa;            /* B tier — sky blue */
  --color-tier-c: #6b7280;            /* C tier — gray */
  --color-type-tank: #22c55e;         /* Tank — green */
  --color-type-aircraft: #3b82f6;     /* Aircraft — blue */
  --color-type-missile: #ef4444;      /* Missile — red */
}
```

### 7.2 Typography

- **Headings:** `font-bold tracking-tight` — Inter or system sans-serif
- **Body:** Inter, 16px base, `leading-relaxed`
- **Monospace accents:** For stats/numbers, use `font-mono tabular-nums`
- Consider a tactical/military display font for the alliance name only (e.g., Rajdhani, Orbitron). Load via `next/font/google` — zero layout shift.

### 7.3 Spacing & Layout

- Container max-width: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Section padding: `py-16 sm:py-24`
- Card padding: `p-4 sm:p-6`
- Card gap: `gap-4 sm:gap-6`
- Border radius: `rounded-lg` (8px) for cards, `rounded-full` for badges

### 7.4 Effects & Animations

- **Card hover:** `transition-all duration-200 hover:scale-[1.02] hover:border-accent`
- **Gold glow:** `hover:shadow-[0_0_20px_rgba(212,160,23,0.15)]`
- **Page transitions:** opacity + translateY (0.3s)
- **Stagger entrance:** children fade in with 50ms delay each (framer-motion `staggerChildren`)
- **Skeleton loading:** Not needed (static export, all data is bundled)
- **Reduced motion:** Respect `prefers-reduced-motion` — disable transforms, keep opacity

### 7.5 Background Textures

- Subtle grid pattern via CSS (`background-image: radial-gradient(...)` or SVG pattern)
- Optional scan-line overlay at low opacity for military feel
- Gradient overlays on hero banner sections

---

## 8. Implementation Tasks

Tasks are ordered for incremental progress. Each task produces a testable increment.

### Task 1: Project Scaffold
**Priority:** P0  
**Estimate:** 30 min

**Work:**
- `npx create-next-app@latest lw-website --typescript --tailwind --app --src-dir`
- Configure `next.config.ts` with `output: "export"`, `images: { unoptimized: true }`
- Set up Tailwind v4 theme with color palette from §7.1
- Install dependencies: `framer-motion`, `js-cookie`, `@types/js-cookie`, `lucide-react`
- Set up `globals.css` with theme variables, base styles, grid background
- Create `src/types/index.ts` with all interfaces from §4
- Create `src/lib/constants.ts` with alliance info, URLs, color maps

**Acceptance Criteria:**
```gherkin
Given a fresh clone of the repository
When I run `pnpm install && pnpm build`
Then the build succeeds with zero errors
And the output directory contains static HTML files
And Tailwind classes render correctly with the dark theme
```

### Task 2: Data Files
**Priority:** P0  
**Estimate:** 2 hours

**Work:**
- Create all 5 data files in `src/data/` with full content
- `heroes-data.ts`: 23 heroes with complete fields (id, name, type, rarity, tier, whyGood, bestPairings, usageTips, recommendedGear)
- `events-data.ts`: 11 events with strategies and day schedules
- `tips-data.ts`: 108 tips across 15 categories with emojis
- `terms-data.ts`: 32 terms with aliases, definitions, categories
- `quiz-data.ts`: 40+ questions with options, correct answers, explanations, difficulty
- All data sourced from the existing companion bot data files

**Acceptance Criteria:**
```gherkin
Given the data files are imported in a test
When I validate each array against its TypeScript interface
Then all items pass type checking with zero `any` types
And heroes-data contains exactly 23 entries
And events-data contains exactly 11 entries
And tips-data contains at least 108 entries
And terms-data contains at least 32 entries
And quiz-data contains at least 40 entries
And no field contains placeholder text like "TODO" or "TBD"
```

### Task 3: Password Gate
**Priority:** P0  
**Estimate:** 45 min

**Work:**
- Implement `PasswordGate.tsx` as client component
- Full-screen dark overlay with alliance branding
- Password input field (type="password"), submit button
- On correct input (5955): set `vikf_access=verified` cookie, 30-day expiry
- On incorrect: shake animation, error text "Wrong password. Ask in Discord."
- Cookie check on mount, render children immediately if valid
- No flash of gated content (check cookie before first render via useEffect + loading state)

**Acceptance Criteria:**
```gherkin
Given a user visits any page without the vikf_access cookie
When the page loads
Then the password gate overlay is displayed
And no page content is visible behind it

Given a user enters the correct password "5955"
When they submit the form
Then the cookie vikf_access is set with a 30-day expiry
And the password gate disappears
And the page content is rendered

Given a user enters an incorrect password
When they submit the form
Then an error message is displayed
And the input field plays a shake animation

Given a user with a valid vikf_access cookie visits the site
When the page loads
Then the password gate is not displayed
And the page content renders immediately
```

### Task 4: Layout Shell
**Priority:** P0  
**Estimate:** 1 hour

**Work:**
- Implement root `layout.tsx` with metadata, font loading, PasswordGate wrapper
- Implement `Header.tsx` with fixed nav, glass-morphism background, responsive breakpoints
- Implement `MobileNav.tsx` slide-out drawer with framer-motion
- Implement `Footer.tsx` with Discord link, credits, "Built for [ViKF]"
- Implement `PageTransition.tsx` wrapper
- Wire up all layout components

**Acceptance Criteria:**
```gherkin
Given a user is on any page (desktop)
When the header is visible
Then all 8 navigation links are displayed
And the current page link has a gold underline indicator
And the header has a dark glass-morphism background

Given a user is on mobile (< 768px)
When the header is visible
Then a hamburger menu icon is displayed instead of nav links
When the user taps the hamburger
Then a slide-out drawer appears with all navigation links
When the user taps a link or the backdrop
Then the drawer closes

Given a user navigates between pages
When the new page loads
Then the outgoing content fades out with upward motion
And the incoming content fades in with upward motion
And the transition takes approximately 300ms
```

### Task 5: Reusable UI Components
**Priority:** P0  
**Estimate:** 1.5 hours

**Work:**
- Implement all components listed in §5.5
- Each component is self-contained, uses Tailwind classes, accepts typed props
- Badge components use color maps from constants
- SearchInput has 300ms debounce
- FilterBar supports multi-select with visual toggle state
- Card components have consistent hover effects

**Acceptance Criteria:**
```gherkin
Given any badge component receives a valid prop
When it renders
Then it displays the correct color and label for that tier/type/frequency/difficulty

Given the SearchInput component receives user input
When the user types
Then the onChange callback fires after a 300ms debounce

Given the FilterBar has multiple options
When the user clicks an option
Then it toggles between selected and unselected states
And the selected state is visually distinct (gold background)
```

### Task 6: Home Page
**Priority:** P1  
**Estimate:** 1.5 hours

**Work:**
- Implement HeroBanner with full-viewport height, gradient overlay, tagline, CTA
- Implement StatsBar with stagger animation
- Implement NavCards grid (6 cards linking to each section)
- Implement TipOfTheDay with date-based tip selection
- CSS grid background pattern for military texture

**Acceptance Criteria:**
```gherkin
Given a user visits the home page
When the page loads
Then the hero banner fills the viewport height
And the tagline "Strategy wins wars, but preparation wins servers." is visible
And the Discord CTA button links to https://discord.gg/S4m3mmzuKZ

Given the NavCards section is visible
When the user views the cards
Then 6 cards are displayed linking to Heroes, Events, Squads, Tips, Glossary, Quiz
When the user hovers a card
Then it lifts slightly and shows a gold border glow

Given the TipOfTheDay widget is visible
When the user views it
Then it displays a tip from the tips data
And the same tip shows for the entire calendar day
And a different tip shows the next day
```

### Task 7: Hero Tier List Page
**Priority:** P1  
**Estimate:** 2 hours

**Work:**
- Implement page with FilterBar (type + tier filters)
- Implement TierSection for each tier level (SS through C)
- Implement HeroCard with image loading, fallback, expandable details
- Hero image URL pattern: `https://raw.githubusercontent.com/kodatius/last-war-companion-bot/main/images/heroes/{hero.id}.png`
- Expandable detail section with tabs for PvP/PvE/Events usage tips
- Client-side filtering logic

**Acceptance Criteria:**
```gherkin
Given a user visits the heroes page
When the page loads
Then all 23 heroes are displayed grouped by tier (SS first, C last)
And each hero shows name, type icon, rarity badge, tier badge, and image

Given the user selects "Tank" in the type filter
When the filter is applied
Then only Tank-type heroes are displayed
And empty tier sections are hidden

Given the user clicks/taps a hero card
When the card expands
Then whyGood text, bestPairings tags, usage tips (PvP/PvE/Events tabs), and recommended gear are shown
And the expansion is animated smoothly

Given a hero image fails to load
When the error is caught
Then a gradient placeholder with the hero's initials is displayed
And no broken image icon is shown
```

### Task 8: Event Guides Page
**Priority:** P1  
**Estimate:** 1.5 hours

**Work:**
- Implement WeeklyCalendar grid (7 columns, responsive)
- Implement EventCards for all 11 events
- Implement expandable EventDetail with strategy list
- Today's column highlighted in calendar

**Acceptance Criteria:**
```gherkin
Given a user visits the events page
When the page loads
Then the weekly calendar shows 7 days with events mapped to their active days
And today's column is highlighted with a gold border

Given the user clicks an event card
When it expands
Then all strategies for that event are displayed
And each strategy has a title and description
And events with >6 strategies use an accordion layout
```

### Task 9: Squad Builder Page
**Priority:** P1  
**Estimate:** 1.5 hours

**Work:**
- Implement PositionGrid with 5 labeled positions
- Implement TypeTriangle SVG diagram
- Implement 3 FormationCards (F2P Tank, Aircraft Meta, Missile)
- Position targeting explanation section

**Acceptance Criteria:**
```gherkin
Given a user visits the squads page
When the page loads
Then the position grid shows 5 positions in correct spatial layout (2 front, 3 rear)
And the type advantage triangle shows Tank > Aircraft > Missile > Tank
And 3 formation cards are displayed with hero placements

Given a formation card is displayed
When the user views it
Then each position shows the recommended hero name
And a brief strategy description is included
```

### Task 10: Pro Tips Page
**Priority:** P1  
**Estimate:** 1 hour

**Work:**
- Implement page with SearchInput + FilterBar (15 categories)
- Render 108 TipCards in responsive grid
- Search filters by tip text (case-insensitive substring)
- Category filter shows/hides by selected categories
- Empty state when no results match

**Acceptance Criteria:**
```gherkin
Given a user visits the tips page
When the page loads
Then all 108 tips are displayed in a responsive grid
And 15 category filter chips are shown with emojis

Given the user types "alliance" in the search bar
When the debounce completes (300ms)
Then only tips containing "alliance" (case-insensitive) are displayed

Given the user selects 2 category filters
When the filters are applied
Then only tips matching those categories are shown
And the tip count updates
```

### Task 11: Glossary Page
**Priority:** P1  
**Estimate:** 45 min

**Work:**
- Implement page with SearchInput + FilterBar (3 categories)
- Render 32 TermCards alphabetically sorted
- Search covers term, aliases, and definition

**Acceptance Criteria:**
```gherkin
Given a user visits the glossary page
When the page loads
Then all 32 terms are displayed in alphabetical order
And each term shows its name, aliases, definition, and category badge

Given the user searches for a term alias
When the search matches
Then the corresponding term card is displayed
```

### Task 12: Quiz Page
**Priority:** P2  
**Estimate:** 2 hours

**Work:**
- Implement QuizEngine state machine
- Implement QuestionCard with option buttons and feedback display
- Implement ScoreDisplay with animated counter
- Implement DailyChallenge with date-seeded question selection
- Mode selection screen (Full Quiz vs Daily Challenge)
- Final score screen with restart option

**Acceptance Criteria:**
```gherkin
Given a user starts a Full Quiz
When they answer all questions
Then each answer shows immediate feedback (correct/incorrect + explanation)
And the score increments correctly (easy=1, medium=2, hard=3 points)
And a final score screen shows total score vs maximum possible

Given a user starts a Daily Challenge
When 5 questions are presented
Then the same 5 questions appear for any user on the same calendar day
And different questions appear the next day
And completing the challenge stores the date in localStorage

Given a user selects a wrong answer
When feedback is shown
Then the selected option turns red
And the correct option turns green
And the explanation text is displayed
```

### Task 13: About Page
**Priority:** P2  
**Estimate:** 30 min

**Work:**
- Static content page
- Alliance info, server info, credits
- Large Discord invite button
- Tech credits footer

**Acceptance Criteria:**
```gherkin
Given a user visits the about page
When the page loads
Then alliance information for [ViKF] on Server #2058 is displayed
And credits mention Toxzin and alliance leadership
And the Discord invite button links to https://discord.gg/S4m3mmzuKZ
```

### Task 14: SEO & Meta Tags
**Priority:** P2  
**Estimate:** 30 min

**Work:**
- Root layout metadata: title template, description, OG image, theme-color
- Per-page metadata using Next.js `generateMetadata` or static `metadata` exports
- `robots.txt` (disallow all — password-protected community site)
- Sitemap generation disabled (private site)

**Acceptance Criteria:**
```gherkin
Given any page is rendered
When the HTML head is inspected
Then it contains title, description, og:title, og:description, og:image meta tags
And the title follows the pattern "[Page] | [ViKF] Alliance"

Given a search engine visits the site
When it reads robots.txt
Then all paths are disallowed (Disallow: /)
```

### Task 15: Performance & Accessibility Audit
**Priority:** P2  
**Estimate:** 1 hour

**Work:**
- Run Lighthouse on all pages
- Fix any issues below 90 score threshold
- Verify `prefers-reduced-motion` disables animations
- Verify keyboard navigation (tab order, focus indicators)
- Verify color contrast ratios meet WCAG AA
- Add `aria-label` to icon-only buttons
- Test mobile viewport (375px) to desktop (1440px)

**Acceptance Criteria:**
```gherkin
Given any page is audited with Lighthouse
When the audit completes
Then Performance score is ≥ 90
And Accessibility score is ≥ 90
And Best Practices score is ≥ 90
And SEO score is ≥ 90

Given a user enables reduced motion in OS settings
When animations would normally play
Then no transform animations occur (opacity transitions only)
```

### Task 16: Deployment
**Priority:** P2  
**Estimate:** 30 min

**Work:**
- Connect GitHub repo to Vercel
- Configure build command: `pnpm build`
- Configure output directory: `out`
- Set up custom domain (if applicable)
- Verify production build matches dev

**Acceptance Criteria:**
```gherkin
Given the main branch is pushed to GitHub
When Vercel detects the push
Then it builds and deploys the static site automatically
And all pages load correctly on the production URL
And the password gate functions correctly in production
And hero images load from the GitHub CDN
```

---

## 9. Testing Strategy

### 9.1 Type Safety (Zero Cost)

TypeScript strict mode (`"strict": true` in tsconfig) acts as the first testing layer. All data files are typed against interfaces. If a hero is missing `recommendedGear`, the build fails.

### 9.2 Build Verification

`pnpm build` is the primary quality gate. Static export will fail if:
- Any component has a runtime error during rendering
- Any import is missing
- Type errors exist anywhere

### 9.3 Manual Testing Checklist

| Test | Steps | Expected |
|---|---|---|
| Password gate blocks | Clear cookies, visit site | Gate appears, no content visible |
| Password gate works | Enter 5955, submit | Gate disappears, cookie set for 30 days |
| Wrong password | Enter wrong value | Error message + shake animation |
| Cookie persistence | Close browser, reopen | Site loads without gate |
| Hero images load | Visit /heroes | All 23 hero images render |
| Hero image fallback | Block image CDN | Gradient placeholders with initials |
| Filter functionality | Apply type + tier filters on /heroes | Only matching heroes shown |
| Search (tips) | Search "alliance" on /tips | Only relevant tips shown |
| Search (glossary) | Search by alias on /glossary | Matching term appears |
| Quiz flow | Complete full quiz | Score tallies correctly, feedback shown |
| Daily challenge | Complete, check next day | Different questions |
| Mobile nav | View on 375px viewport | Hamburger menu works |
| Page transitions | Navigate between pages | Smooth fade animations |
| Reduced motion | Enable OS setting | No transform animations |
| External links | Click Discord buttons | Opens Discord invite in new tab |

### 9.4 Optional: Playwright E2E

Not required for MVP but recommended post-launch:

```bash
pnpm add -D @playwright/test
```

Key test flows:
1. Password gate → enter correct password → verify content visible
2. Navigate all 8 pages → verify no 404s
3. Hero filter → verify count changes
4. Quiz → answer all → verify final score

---

## 10. Dependencies

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "framer-motion": "^11.0.0",
    "js-cookie": "^3.0.5",
    "lucide-react": "^0.460.0"
  },
  "devDependencies": {
    "@types/js-cookie": "^3.0.6",
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "typescript": "^5.6.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/postcss": "^4.0.0",
    "postcss": "^8.0.0",
    "eslint": "^9.0.0",
    "eslint-config-next": "^15.0.0"
  }
}
```

**Total production dependencies: 4** (next, framer-motion, js-cookie, lucide-react)  
**Bundle impact:** framer-motion (~35KB gzipped) is the heaviest. Everything else is negligible.

---

## 11. Deployment Plan

### Primary: Vercel (Recommended)

1. Push repo to GitHub
2. Connect repo to Vercel (vercel.com → Import Project)
3. Framework preset: Next.js (auto-detected)
4. Build command: `pnpm build` (auto-detected)
5. Output: `out/` directory (static export)
6. Deploy on push to `main`
7. Preview deploys on PRs

**Cost:** Free tier. Static sites have generous limits.

### Alternative: Netlify

1. Same GitHub connection flow
2. Build command: `pnpm build`
3. Publish directory: `out`
4. No Netlify-specific config needed for static export

### Alternative: GitHub Pages

1. Add GitHub Actions workflow for build + deploy
2. Uses `actions/deploy-pages` action
3. Free, but no preview deploys

### DNS / Custom Domain (Optional)

- Add CNAME record pointing to Vercel/Netlify
- Free SSL via hosting provider
- Recommended subdomain: `vikf.vercel.app` or custom domain

---

## 12. Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Hero images missing from CDN | Medium | Low | Fallback placeholder. Verify all 23 hero IDs have images before launch. |
| Password visible in source code | Certain | Low | Accepted. This is a deterrent, not security. Alliance members know the password. |
| framer-motion bundle size | Low | Low | Tree-shaking handles it. Only import used components. |
| Tailwind v4 breaking changes | Low | Medium | Lock version in package.json. Test before upgrading. |
| Discord invite link expires | Medium | Medium | Use a permanent invite link. Check quarterly. |
| Data becomes stale | Medium | Medium | Keep data files in repo root for easy editing. Document how to update. |

---

## 13. Future Enhancements (Out of Scope)

These are explicitly NOT part of this build but are natural next steps:

1. **Hero comparison tool** — select 2 heroes, side-by-side stats
2. **War timer countdown** — countdown to next alliance war
3. **Dark/light mode toggle** — currently dark only (correct for the vibe)
4. **i18n** — multi-language support if alliance grows internationally
5. **Analytics** — privacy-friendly analytics (Plausible/Umami)
6. **PWA** — offline access via service worker
7. **CMS integration** — Notion/GitHub-based CMS for non-dev content updates

---

*End of spec. Ship it.* 🚀
