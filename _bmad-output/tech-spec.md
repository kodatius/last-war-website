# Tech Spec: [ViKF] Alliance Website — Super Version Redesign

**Document Version:** 1.0
**Date:** 2026-03-07
**Author:** Barry (Quick Flow Solo Dev, BMAD V6)
**Status:** Ready for Implementation

---

## Table of Contents

1. [Problem Statement & Vision](#1-problem-statement--vision)
2. [Design System](#2-design-system)
3. [Navigation & Layout Redesign](#3-navigation--layout-redesign)
4. [Page-by-Page Redesign Plan](#4-page-by-page-redesign-plan)
5. [New Features with Acceptance Criteria](#5-new-features-with-acceptance-criteria)
6. [Component Architecture](#6-component-architecture)
7. [Data Model Changes](#7-data-model-changes)
8. [Ordered Implementation Tasks](#8-ordered-implementation-tasks)
9. [Testing Strategy](#9-testing-strategy)
10. [Performance Targets](#10-performance-targets)

---

## 1. Problem Statement & Vision

### 1.1 Problem

The current [ViKF] alliance website is a solid v1 with 8 functional pages, but it falls short of being the *best* Last War fan site on the internet:

- **Static information only** — no interactive tools, calculators, or builders. Competitors like cpt-hedge.com already offer event calculators.
- **Limited hero data** — hero cards expand to show tips but lack skill descriptions, stat values, growth curves, or comparison tools. lastwartutorial.com has far deeper hero profiles.
- **No event calculators** — players must do Arms Race math manually or visit competitor sites.
- **Basic navigation** — hamburger menu on mobile with no bottom nav bar; no global search; no sidebar on desktop.
- **Missing seasonal content** — no week-by-week season guides (lastwartutorial.com's main strength).
- **No alliance war tooling** — no formation builder, counter-picker, or duel timer despite being an alliance-specific site.
- **Quiz is single-mode** — no difficulty levels, no categories, no persistent leaderboard.
- **UI lacks premium feel** — functional but not immersive. No glassmorphism, no particle effects, no animated card reveals.

### 1.2 Vision

Transform the [ViKF] site into the **definitive Last War alliance companion** — a site that combines:

- The **content depth** of lastwartutorial.com (hero details, season guides)
- The **interactive tools** of cpt-hedge.com (calculators, maps)
- The **gaming aesthetic** that no competitor delivers (immersive dark theme, neon accents, subtle animation)
- **Alliance-specific features** no competitor can match (formation builder, duel timer, server dashboard)
- **Mobile-first responsive design** (most gamers browse on phone)

**One-line vision:** *The site you open during Alliance Duel, during Arms Race, and whenever you need to look up a hero — because it's faster, prettier, and more useful than anything else.*

### 1.3 Technical Constraints (Unchanged)

| Constraint | Value |
|---|---|
| Framework | Next.js 15 + TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| UI Components | shadcn/ui (add as needed) |
| Deployment | GitHub Pages (static export) |
| Backend | None — all data in local JSON/TS files |
| basePath | `/last-war-website` |
| Storage | localStorage only (quiz scores, preferences) |
| Package manager | pnpm |

---

## 2. Design System

### 2.1 Color Palette (Extended)

Keep the existing dark theme with gold/amber accents. Add neon accent variants for interactive elements and status indicators.

```css
/* Existing (keep) */
--color-bg-primary: #0a0a0f;
--color-bg-secondary: #12121a;
--color-bg-tertiary: #1a1a2e;
--color-border: #2a2a3e;
--color-accent: #d4a017;
--color-accent-light: #f0c040;
--color-text-primary: #e8e8f0;
--color-text-secondary: #8888a0;

/* New: Glassmorphism */
--color-glass-bg: rgba(18, 18, 26, 0.6);
--color-glass-border: rgba(212, 160, 23, 0.15);
--color-glass-blur: 12px;

/* New: Neon accents for interactive elements */
--color-neon-blue: #00d4ff;
--color-neon-green: #00ff88;
--color-neon-pink: #ff3399;
--color-neon-purple: #a855f7;

/* New: Status colors */
--color-status-online: #22c55e;
--color-status-warning: #f59e0b;
--color-status-danger: #ef4444;
```

### 2.2 Typography Hierarchy

| Level | Font | Size (mobile / desktop) | Weight | Use |
|---|---|---|---|---|
| Hero Title | Rajdhani | 3rem / 4.5rem | 700 | Page hero sections |
| Section Title | Rajdhani | 1.75rem / 2.25rem | 700 | Section headings |
| Card Title | Inter | 1.125rem / 1.25rem | 600 | Card headers |
| Body | Inter | 0.875rem / 1rem | 400 | Paragraph text |
| Caption | Inter | 0.75rem / 0.8125rem | 400 | Metadata, badges |
| Mono | JetBrains Mono | 0.8125rem | 400 | Stats, numbers, timers |

### 2.3 Glassmorphism Card System

All major cards use a glassmorphism style:

```css
.glass-card {
  background: rgba(18, 18, 26, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(212, 160, 23, 0.15);
  border-radius: 12px;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.glass-card:hover {
  border-color: rgba(212, 160, 23, 0.35);
  box-shadow: 0 0 20px rgba(212, 160, 23, 0.08);
}
```

### 2.4 Animation Principles

- **Page transitions:** Fade + slight Y-translate (keep existing Framer Motion `PageTransition`)
- **Card entrance:** Stagger-fade from `opacity:0, y:20` to `opacity:1, y:0` using `whileInView` with `viewport={{ once: true }}`
- **Hero card hover:** Scale 1.02 + glow border + reveal stat overlay
- **Buttons:** Scale 0.97 on press, glow on hover
- **Background:** Subtle CSS-based grid pattern (existing) + optional floating particle layer (CSS keyframes, not JS — performance)
- **Loading:** Skeleton shimmer animation using Tailwind's `animate-pulse`
- **Reduced motion:** Respect `prefers-reduced-motion` (existing)

### 2.5 Responsive Breakpoints

| Breakpoint | Width | Layout |
|---|---|---|
| Mobile | < 640px | Single column, bottom nav, full-width cards |
| Tablet | 640–1023px | 2-column grids, hamburger nav |
| Desktop | ≥ 1024px | 3-column grids, sticky sidebar nav, max-width 80rem |

---

## 3. Navigation & Layout Redesign

### 3.1 Current State

- Fixed top header with horizontal nav links (desktop) and hamburger menu (mobile)
- No sidebar, no bottom nav, no search

### 3.2 New Layout: Desktop

```
┌──────────────────────────────────────────────────────┐
│  Top Bar: Logo [ViKF] │ Global Search │ Discord │ ⚙  │
├──────────┬───────────────────────────────────────────┤
│ Sidebar  │  Main Content Area                        │
│ (sticky) │                                           │
│          │                                           │
│ Home     │  [Page Content]                           │
│ Heroes   │                                           │
│ Events   │                                           │
│ Squads   │                                           │
│ Tools ▼  │                                           │
│  Calc    │                                           │
│  Compare │                                           │
│  Builder │                                           │
│ Tips     │                                           │
│ Glossary │                                           │
│ Quiz     │                                           │
│ Season   │                                           │
│ About    │                                           │
│          │                                           │
│ ──────── │                                           │
│ Duel     │                                           │
│ Timer    │                                           │
│ 08:42:13 │                                           │
├──────────┴───────────────────────────────────────────┤
│  Footer                                              │
└──────────────────────────────────────────────────────┘
```

- **Sidebar:** 240px wide, sticky, `position: sticky; top: 64px` (below top bar)
- **Sidebar content:** Nav links with icons, collapsible "Tools" group, live Alliance Duel countdown at bottom
- **Top bar:** Simplified — logo, global search input (⌘K shortcut), Discord link, settings gear
- **Main content:** `calc(100% - 240px)` with padding

### 3.3 New Layout: Mobile

```
┌──────────────────────────┐
│ Top Bar: [ViKF] │ 🔍 │ ⋮ │
├──────────────────────────┤
│                          │
│   Main Content Area      │
│   (full width)           │
│                          │
├──────────────────────────┤
│ 🏠  ⚔️  🛠️  📖  ≡     │
│ Home Hero Tools Tips More│
└──────────────────────────┘
```

- **Bottom nav bar:** 5 items — Home, Heroes, Tools (opens sheet with Calc/Compare/Builder/Events/Squads), Tips (opens sheet with Tips/Glossary/Season), More (Quiz/About)
- **Top bar:** Compact — logo left, search icon center, overflow menu right
- **No sidebar on mobile**
- **Bottom nav is fixed, 56px tall, glass-bg with blur**

### 3.4 Global Search (⌘K)

A command palette / search overlay accessible from any page:

- **Trigger:** Click search icon, or press ⌘K / Ctrl+K
- **Implementation:** Client-side fuzzy search over heroes, events, terms, tips
- **UI:** Full-screen overlay with input field, real-time results grouped by category
- **Results:** Hero cards (name + type + tier), events (name + frequency), terms (term + definition preview), tips (category + text preview)
- **Navigation:** Arrow keys to navigate results, Enter to go to page, Esc to close
- **Library:** No external dependency — simple `includes()` matching with category grouping. Fuse.js could be added later but not needed for this data size (~200 items)

### 3.5 Alliance Duel Countdown Timer

A persistent countdown widget displayed in:
- Desktop sidebar (always visible)
- Mobile: accessible from the Tools bottom nav sheet

**Logic:**
- Alliance Duel occurs daily at 21:00 EST (02:00 UTC next day)
- Timer shows `HH:MM:SS` until next duel
- When < 1 hour: text turns `--color-neon-green`, subtle pulse animation
- When duel is active (window ~30 min): shows "DUEL ACTIVE 🔴" with red pulse

---

## 4. Page-by-Page Redesign Plan

### 4.1 Home Page (`/`)

**Current:** HeroBanner → StatsBar → Map Image → NavCards grid → TipOfTheDay
**Redesign:**

#### Hero Section (above fold)
- Full-viewport hero section with **parallax background** (existing map image with CSS `background-attachment: fixed`)
- Alliance crest/logo centered, animated entrance (scale from 0.8 + fade)
- `[ViKF]` title in Rajdhani 4.5rem with subtle gold text-shadow glow
- Tagline below in Inter
- Two CTAs: "Enter HQ" (scrolls to dashboard) and "Join Discord" (external)
- Floating particle effect in background (CSS-only: 6-8 small gold dots with `@keyframes float`)

#### Alliance Dashboard Section
- **Server Info Card:** Server #2058, alliance name, member display area, alliance power placeholder
- **Duel Countdown Card:** Next Alliance Duel timer (prominent, with gold border glow)
- **Today's Events Card:** Dynamically shows events for today's day-of-week from events data
- **Quick Stats:** Heroes catalogued (23), Events covered (11), Tips available (108+), Terms defined (32+)

#### Navigation Cards Section (redesigned)
- 2×3 grid of glass cards (desktop), single column on mobile
- Each card: icon + title + description + hero thumbnail (keep existing concept)
- **New:** Subtle gradient overlay on hover, scale 1.02 transform
- **New:** Add cards for new sections: "Season Guide" and "War Tools"

#### Featured Content Section
- **Tip of the Day** (keep, restyle with glass card)
- **Hero Spotlight:** Random SS-tier hero with brief card (links to heroes page)
- **Latest Season Info:** Current season number + week indicator

### 4.2 Heroes Page (`/heroes`) — Major Overhaul

**Current:** Filter bars (type + tier) → TierSection groups → expandable HeroCard
**Redesign:**

#### Hero Hub Header
- Page title "Hero Database" with subtitle showing count
- **Search bar** (hero name filter, instant)
- **Filter row:** Type pills (Tank/Aircraft/Missile with colored icons) + Rarity pills (UR/SSR/SR) + Tier pills (SS/S/A/B/C) + "Meta Only" toggle
- **View toggle:** Grid view (cards) vs. Table view (compact sortable list)
- **Sort dropdown:** By tier (default), by name, by type

#### Grid View (Default)
- 3-column grid (desktop), 2-column (tablet), 1-column (mobile)
- **Redesigned Hero Card:**
  - Glass card with hero portrait (top half)
  - On hover: portrait scales slightly, stats overlay slides up from bottom (semi-transparent dark gradient)
  - Below portrait: Name (bold), Type icon + Rarity badge + Tier badge in a row
  - One-line `whyGood` excerpt (truncated)
  - Click to expand OR navigate to hero detail modal

#### Hero Detail Modal/Sheet
- Opens as a **bottom sheet** on mobile, **side drawer** on desktop
- Full hero portrait at top
- **Tabs:** Overview | Skills | PvP | PvE | Events | Gear
  - **Overview:** `whyGood`, tier rationale, meta status, `isMeta` indicator
  - **Skills:** Skill 1, Skill 2, Skill 3 with descriptions and level scaling (new data)
  - **PvP:** `usageTips.pvp`, recommended position, counter matchups
  - **PvE:** `usageTips.pve`, best event types
  - **Events:** `usageTips.events`, event-specific recommendations
  - **Gear:** Weapon, Armor, Accessory recommendations with priority order
- **Best Pairings:** Clickable hero pills that link to those heroes
- **"Compare" button** — adds hero to comparison tray

#### Table View
- Sortable columns: Name, Type, Rarity, Tier, Meta
- Click row to open detail modal
- Compact rows with hero thumbnail, badges inline
- Sticky header row

### 4.3 Events Page (`/events`) — Enhanced

**Current:** Banner image → SectionHeading → WeeklyCalendar → EventCard list
**Redesign:**

#### Weekly Calendar (Redesigned)
- **Visual 7-day strip** with today highlighted (gold border + "TODAY" label)
- Each day shows event icons stacked vertically
- Click a day to filter events below to that day only
- Current day auto-scrolled into view on mobile

#### Event Cards (Redesigned)
- Glass cards with event icon (large emoji or custom SVG), name, frequency badge
- Click to expand strategies (keep existing expand pattern)
- **New:** Each event card shows a "quick tip" one-liner even when collapsed
- **New:** Add time-until-next indicator for weekly events (e.g., "Arms Race in 2d 14h")

#### Event Calculator Section (NEW — linked)
- Below event cards, a prominent CTA card: "📊 Open Event Calculators" linking to `/tools/calculators`

### 4.4 Squads Page (`/squads`) — Enhanced

**Current:** Position grid diagram → Formation cards with 5-hero lineup
**Redesign:**

#### Position Guide (Keep + Polish)
- Restyle PositionGrid with glass cards and animated target lines (SVG arrows connecting positions)
- Add color coding: gold border for front-left (tank), blue for rear-left (DPS)

#### Formation Library
- Categorized formations: "Tank Squads", "Aircraft Squads", "Missile Squads", "Mixed"
- Each FormationCard redesigned:
  - Glass card with formation name header
  - 5 hero slots in 2+3 grid layout (existing) but with **actual hero portraits** (already implemented, keep)
  - Tags: "F2P Friendly", "Meta", "Anti-Aircraft", etc.
  - Expand for strategy description
- **New: "Why this works" tooltip** — explains the synergy logic

#### Counter-Picker Section (NEW)
- Dropdown: "Enemy is running..." → select a formation template
- Shows recommended counter formation with explanation
- Simple lookup table in data, not algorithmic

### 4.5 Tips Page (`/tips`) — Polish

**Current:** Category filter + search + tip cards
**Keep existing, enhance:**

- Restyle cards as glass cards
- Add "bookmark" feature (localStorage) — star icon on each tip, filter to show bookmarked only
- Add "random tip" button with shuffle animation
- Better category chips with emoji icons from `CATEGORY_EMOJIS`
- Tip count per category shown on chips: `Heroes (12)`

### 4.6 Glossary Page (`/glossary`) — Polish

**Current:** Search + category filter + term cards
**Keep existing, enhance:**

- Restyle as glass cards
- **Alphabetical jump bar** — A B C D... letters across top, click to jump
- Highlight search matches within definition text
- Add "copy term" button for each entry (copies formatted definition)
- Related terms linking (if a term's definition mentions another term, make it a clickable link)

### 4.7 Quiz Page (`/quiz`) — Major Overhaul

**Current:** Mode select (Full/Daily) → QuestionCard → ScoreDisplay → Complete
**Redesign:**

#### Quiz Hub (Mode Select)
- 3 mode cards:
  - **Quick Play** — 10 random questions, all difficulties
  - **Daily Challenge** — 5 questions, changes daily (keep existing seed logic)
  - **Category Challenge** — Pick a category, answer all questions in it
- Each mode card shows: description, estimated time, best score (from localStorage)

#### Quiz Experience (Redesigned)
- **Progress bar** at top (animated fill)
- **Timer** (optional, for competitive feel — can be toggled)
- **Question card** with large text, image (if applicable), 4 answer buttons
- Answer buttons: Glass style, on select → correct = green glow + ✓, wrong = red glow + ✗ + show correct
- **Streak counter** — consecutive correct answers with fire emoji escalation (🔥🔥🔥)
- **Points animation** — "+2 pts" floating text on correct answer (Framer Motion)

#### Results Screen (Redesigned)
- Score circle (animated SVG ring fill, like a fitness tracker)
- Grade: "S+" / "A" / "B" / "C" / "F" with corresponding tier color
- Breakdown: correct/wrong per category
- **Leaderboard** (localStorage-based):
  - Stores top 10 scores with player-entered name, date, score, mode
  - Shows "Your Rank: #3"
  - "Share Score" button (copies text: "I scored 42/50 on [ViKF] Quiz! 🏆")

#### Difficulty System
- Questions already have `difficulty` field (easy/medium/hard)
- Points: easy=1, medium=2, hard=3 (existing)
- **New: Hard Mode toggle** — only hard questions, 2x points
- **New: Category filtering** — use existing `category` field from raw quiz data

### 4.8 Season Guide Hub (`/season`) — NEW PAGE

A week-by-week content browser for the current season, inspired by lastwartutorial.com's depth.

#### Season Overview
- Current season number + name (from data file)
- Season progress bar (current week / total weeks)
- Key season mechanic explanation

#### Weekly Content Browser
- **Timeline UI:** Vertical timeline on desktop, horizontal scrollable strip on mobile
- Each week node shows: week number, title, brief summary
- Click to expand full week content:
  - New heroes/features introduced
  - Recommended activities
  - Event schedule for that week
  - Tips specific to that phase

#### Season Changelog
- What changed from previous season
- New heroes added, balance changes, feature additions

**Data structure:** See Section 7 — `SeasonData`, `SeasonWeek`

### 4.9 Tools Hub (`/tools`) — NEW PAGE

Landing page for all interactive tools, with cards linking to sub-pages.

#### Tools Available
1. **Event Calculators** (`/tools/calculators`)
2. **Hero Comparison** (`/tools/compare`)
3. **Formation Builder** (`/tools/builder`)

Each tool card: Glass card, icon, title, one-line description, "Open Tool →" button.

### 4.10 Event Calculators (`/tools/calculators`) — NEW PAGE

#### Arms Race Calculator
- **Input fields:** Current troop count, training speed bonus (%), speedups available (hours), research available (hours)
- **Output:** Estimated points, time to complete milestones, recommended activity split (train vs research vs build)
- **Milestone markers:** Shows which Arms Race reward tiers you'll hit
- **"Optimize" button:** Suggests best speedup allocation

#### Resource Optimizer
- **Input:** Current RSS (iron, food, gold), daily production rate, target upgrade cost
- **Output:** Days until affordable, recommended gathering vs production split
- **Visual:** Progress bar toward target

#### Implementation Notes
- Pure client-side calculations — no API
- All formulas derived from game mechanics data
- Use `useState` for inputs, `useMemo` for computed outputs
- Debounce inputs for smooth UX

### 4.11 Hero Comparison Tool (`/tools/compare`) — NEW PAGE

- **Hero selector:** Two side-by-side search/dropdown fields — pick hero A and hero B
- **Comparison layout:** Two hero cards facing each other with versus "⚔️" divider
- **Stat comparison:** Side-by-side rows for each attribute, the higher value highlighted in green
  - Tier, Type, Rarity
  - PvP rating (derived badge)
  - PvE rating (derived badge)
  - Best pairings overlap indicator
- **"Add another"** — expand to 3 or 4-way comparison
- **Share comparison** — URL hash state (`?heroes=kimberly,dva`)

### 4.12 Formation Builder (`/tools/builder`) — NEW PAGE

- **5-slot grid** matching the in-game formation layout (2 front + 3 rear)
- **Hero picker panel:** Scrollable list of all heroes with search, filtered by type
- **Drag-and-drop** (or tap-to-select + tap-slot) to place heroes in slots
- **Formation analysis panel:**
  - Type composition breakdown (e.g., "3 Tank / 1 Aircraft / 1 Missile")
  - Type bonus indicator: "Full Tank bonus: +20% all stats" if all 5 same type
  - Synergy notes: auto-generated from hero pairing data
  - Warnings: e.g., "No tank in front-left — vulnerable!"
- **Preset formations:** Load any formation from the squads page data
- **Save formations:** localStorage — name them, recall later
- **Share:** Generate URL hash state

### 4.13 About Page (`/about`) — Polish

**Current:** Description + hero roster grid
**Enhance:**

- **Alliance info card** with glass styling
- **Team/Leadership section** with role badges (R4, R5, etc.) — placeholder structure for future member data
- **Server info card:** Server #2058, server age, timezone
- **Community links:** Discord (prominent), social links
- **Site credits** and tech stack
- Hero roster grid: keep, add hover-to-see-name tooltip

---

## 5. New Features with Acceptance Criteria

### 5.1 Global Search (⌘K)

**Given** a user is on any page
**When** they press ⌘K (Mac) or Ctrl+K (Windows), or tap the search icon
**Then** a search overlay appears with a focused input field

**Given** the search overlay is open and the user types "kim"
**When** results are computed
**Then** the overlay shows "Kimberly" under "Heroes" category, plus any matching tips, events, or terms

**Given** the user selects a result with Enter or click
**When** navigation occurs
**Then** the overlay closes and the user is taken to the relevant page/section

### 5.2 Arms Race Calculator

**Given** a user navigates to `/tools/calculators`
**When** they select "Arms Race Calculator"
**Then** they see input fields for: troop count, training speed bonus %, available speedups (hours)

**Given** the user enters values into the calculator inputs
**When** the values change
**Then** the estimated points, milestone indicators, and time-to-complete update in real-time

**Given** the user enters 50,000 troops, 25% training bonus, and 48 hours of speedups
**When** the calculation runs
**Then** the output shows estimated Arms Race points and which milestone rewards they'll reach

### 5.3 Hero Comparison Tool

**Given** a user navigates to `/tools/compare`
**When** the page loads
**Then** they see two empty hero selector dropdowns side by side

**Given** the user selects "Kimberly" in slot A and "DVA" in slot B
**When** both heroes are selected
**Then** a side-by-side comparison appears showing tier, type, rarity, usage tips for each, with differences highlighted

**Given** the user clicks "Add another"
**When** a third slot appears
**Then** the comparison expands to show 3 heroes with shared layout

### 5.4 Formation Builder

**Given** a user navigates to `/tools/builder`
**When** the page loads
**Then** they see a 2+3 formation grid (empty slots) and a hero picker panel

**Given** the user taps a hero in the picker, then taps an empty slot
**When** the hero is placed
**Then** the hero's portrait appears in the slot, and the formation analysis updates (type breakdown, synergy notes)

**Given** the user has placed 5 same-type heroes
**When** the analysis panel updates
**Then** it shows "+20% all stats type bonus" indicator in green

**Given** the user has no tank in front-left position
**When** the analysis panel updates
**Then** it shows a warning: "⚠️ No tank in front-left — this position takes the most damage"

**Given** the user clicks "Save Formation"
**When** they enter a name and confirm
**Then** the formation is saved to localStorage and appears in their "Saved Formations" list

### 5.5 Enhanced Quiz with Leaderboard

**Given** a user completes a quiz
**When** the results screen appears
**Then** they see an animated score ring, letter grade, category breakdown, and a "Save Score" prompt

**Given** the user enters their name and saves their score
**When** localStorage is updated
**Then** the leaderboard shows their entry ranked among top 10 scores, with rank indicator

**Given** a user selects "Category Challenge" mode and picks "Heroes"
**When** the quiz starts
**Then** only questions with `category: 'heroes'` are included

### 5.6 Season Guide Hub

**Given** a user navigates to `/season`
**When** the page loads
**Then** they see the current season overview with progress bar and a weekly timeline

**Given** the user clicks on "Week 3" in the timeline
**When** the week details expand
**Then** they see that week's content: new features, recommended activities, event schedule, tips

### 5.7 Alliance Duel Countdown

**Given** any page is loaded and the sidebar/widget is visible
**When** the timer ticks
**Then** it shows accurate countdown to next 21:00 EST duel time in HH:MM:SS format

**Given** less than 1 hour remains until duel
**When** the timer updates
**Then** the timer text turns neon green and gently pulses

### 5.8 Bottom Navigation (Mobile)

**Given** a user views the site on a mobile device (< 1024px)
**When** any page is displayed
**Then** a fixed bottom navigation bar appears with 5 items: Home, Heroes, Tools, Tips, More

**Given** the user taps "Tools" in the bottom nav
**When** a bottom sheet opens
**Then** it shows links to: Events, Squads, Calculators, Compare, Builder

### 5.9 Counter-Picker

**Given** a user is on the Squads page and scrolls to the Counter-Picker section
**When** they select "Aircraft Meta (DVA + Morrison + Schuyler + Carlie + Lucius)" from the dropdown
**Then** the recommended counter formation appears with explanation of why it works

---

## 6. Component Architecture

### 6.1 Directory Structure (New)

```
src/
├── app/
│   ├── layout.tsx                    # Root layout (add JetBrains Mono font)
│   ├── page.tsx                      # Home (redesigned)
│   ├── heroes/
│   │   ├── page.tsx                  # Heroes hub
│   │   └── HeroesClient.tsx          # Client component (enhanced)
│   ├── events/
│   │   └── page.tsx                  # Events (enhanced)
│   ├── squads/
│   │   └── page.tsx                  # Squads (enhanced with counter-picker)
│   ├── tips/
│   │   ├── page.tsx
│   │   └── TipsClient.tsx
│   ├── glossary/
│   │   ├── page.tsx
│   │   └── GlossaryClient.tsx
│   ├── quiz/
│   │   └── page.tsx                  # Quiz (overhauled)
│   ├── season/                       # NEW
│   │   └── page.tsx
│   ├── tools/                        # NEW
│   │   ├── page.tsx                  # Tools hub
│   │   ├── calculators/
│   │   │   └── page.tsx
│   │   ├── compare/
│   │   │   └── page.tsx
│   │   └── builder/
│   │       └── page.tsx
│   └── about/
│       └── page.tsx
├── components/
│   ├── layout/
│   │   ├── LayoutShell.tsx           # Updated: sidebar + bottom nav
│   │   ├── Header.tsx                # Simplified top bar
│   │   ├── Sidebar.tsx               # NEW: desktop sidebar
│   │   ├── BottomNav.tsx             # NEW: mobile bottom nav
│   │   ├── BottomSheet.tsx           # NEW: bottom sheet for sub-menus
│   │   ├── Footer.tsx                # Keep, polish
│   │   ├── MobileNav.tsx             # DEPRECATE (replaced by BottomNav)
│   │   └── PageTransition.tsx        # Keep
│   ├── home/
│   │   ├── HeroBanner.tsx            # Enhanced with particles
│   │   ├── AllianceDashboard.tsx     # NEW: server info + duel timer + today's events
│   │   ├── NavCards.tsx              # Enhanced glass cards
│   │   ├── StatsBar.tsx              # Enhanced
│   │   ├── TipOfTheDay.tsx           # Restyled
│   │   └── HeroSpotlight.tsx         # NEW: featured hero card
│   ├── heroes/
│   │   ├── HeroCard.tsx              # Redesigned with hover overlay
│   │   ├── HeroDetailDrawer.tsx      # NEW: side drawer / bottom sheet
│   │   ├── HeroTableView.tsx         # NEW: sortable table
│   │   ├── HeroFilters.tsx           # NEW: consolidated filter bar with search
│   │   └── TierSection.tsx           # Keep, polish
│   ├── events/
│   │   ├── EventCard.tsx             # Restyled glass
│   │   ├── EventDetail.tsx           # Keep
│   │   ├── WeeklyCalendar.tsx        # Redesigned visual strip
│   │   └── NextEventTimer.tsx        # NEW: time-until indicator
│   ├── squads/
│   │   ├── FormationCard.tsx         # Restyled
│   │   ├── PositionGrid.tsx          # Enhanced with SVG arrows
│   │   ├── TypeTriangle.tsx          # Keep
│   │   └── CounterPicker.tsx         # NEW
│   ├── quiz/
│   │   ├── QuizEngine.tsx            # Overhauled
│   │   ├── QuizModeSelect.tsx        # NEW: 3-mode hub
│   │   ├── QuestionCard.tsx          # Restyled with animations
│   │   ├── ScoreDisplay.tsx          # Keep
│   │   ├── ScoreRing.tsx             # NEW: animated SVG ring
│   │   ├── Leaderboard.tsx           # NEW: localStorage leaderboard
│   │   ├── StreakCounter.tsx          # NEW
│   │   └── DailyChallenge.tsx        # Keep
│   ├── season/                       # NEW
│   │   ├── SeasonOverview.tsx
│   │   ├── WeekTimeline.tsx
│   │   └── WeekDetail.tsx
│   ├── tools/                        # NEW
│   │   ├── calculators/
│   │   │   ├── ArmsRaceCalc.tsx
│   │   │   └── ResourceOptimizer.tsx
│   │   ├── compare/
│   │   │   ├── HeroSelector.tsx
│   │   │   └── ComparisonView.tsx
│   │   └── builder/
│   │       ├── FormationGrid.tsx
│   │       ├── HeroPicker.tsx
│   │       ├── FormationAnalysis.tsx
│   │       └── SavedFormations.tsx
│   ├── search/                       # NEW
│   │   ├── SearchOverlay.tsx
│   │   └── SearchResults.tsx
│   └── ui/
│       ├── GlassCard.tsx             # NEW: replaces Card.tsx
│       ├── Card.tsx                  # Keep for backward compat
│       ├── Skeleton.tsx              # NEW: loading skeleton
│       ├── Toast.tsx                 # NEW: toast notifications
│       ├── ToastProvider.tsx         # NEW: toast context
│       ├── Badge.tsx                 # NEW: generic badge component
│       ├── Tooltip.tsx              # NEW
│       ├── Drawer.tsx               # NEW: side drawer (desktop)
│       ├── Sheet.tsx                # NEW: bottom sheet (mobile)
│       ├── Tabs.tsx                 # NEW: tab component
│       ├── ProgressBar.tsx          # NEW
│       ├── CountdownTimer.tsx       # NEW: reusable timer
│       ├── FilterBar.tsx            # Keep, enhance
│       ├── SearchInput.tsx          # Keep, enhance
│       ├── SectionHeading.tsx       # Keep
│       ├── CategoryBadge.tsx        # Keep
│       ├── TierBadge.tsx            # Keep
│       ├── RarityBadge.tsx          # Keep
│       ├── TypeIcon.tsx             # Keep
│       ├── DifficultyBadge.tsx      # Keep
│       ├── FrequencyBadge.tsx       # Keep
│       ├── DiscordButton.tsx        # Keep
│       ├── ExpandableCard.tsx       # Keep
│       └── LocalImage.tsx           # Keep
├── data/
│   ├── raw/                          # Source data (expanded)
│   │   ├── heroes-data.ts           # Enhanced with skills, stats
│   │   ├── events-data.ts           # Enhanced with calculator formulas
│   │   ├── quiz-data.ts             # Keep (already has categories)
│   │   ├── tips-data.ts             # Keep
│   │   ├── terms-data.ts            # Keep
│   │   ├── season-data.ts           # NEW
│   │   ├── formations-data.ts       # NEW: extracted from squads page
│   │   ├── counters-data.ts         # NEW: counter-pick lookup
│   │   └── calculator-formulas.ts   # NEW: game math formulas
│   ├── heroes-data.ts               # Adapter (enhanced)
│   ├── events-data.ts               # Adapter (keep)
│   ├── quiz-data.ts                 # Adapter (keep)
│   ├── tips-data.ts                 # Adapter (keep)
│   ├── terms-data.ts                # Adapter (keep)
│   └── search-index.ts              # NEW: combined search index
├── hooks/                            # NEW
│   ├── useCountdown.ts              # Countdown timer hook
│   ├── useLocalStorage.ts           # localStorage hook
│   ├── useSearch.ts                 # Search hook
│   ├── useMediaQuery.ts             # Responsive hook
│   └── useKeyboardShortcut.ts       # ⌘K handler
├── lib/
│   ├── constants.ts                 # Enhanced with new nav items
│   ├── utils.ts                     # Keep + add new utilities
│   └── prefix.ts                    # Keep
├── styles/
│   └── globals.css                  # Enhanced with new CSS variables + glassmorphism
└── types/
    └── index.ts                     # Enhanced with new types
```

### 6.2 Key New Components — Specifications

#### `GlassCard`
```tsx
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;        // enable hover glow (default: true)
  glow?: 'gold' | 'blue' | 'green' | 'none';  // glow color on hover
  padding?: 'sm' | 'md' | 'lg';
  as?: 'div' | 'article' | 'section';
}
```

#### `Sidebar`
```tsx
// Desktop only (hidden below 1024px)
// Sticky positioned at top: 64px (below header)
// 240px wide, scrollable if content overflows
// Contains: nav links with icons, collapsible groups, duel timer
```

#### `BottomNav`
```tsx
// Mobile only (visible below 1024px)
// Fixed to bottom, 56px tall, z-50
// Glass background with backdrop-blur
// 5 items with icon + label
// Active item: gold accent color
// "Tools" and "Tips" items open BottomSheet with sub-links
```

#### `SearchOverlay`
```tsx
// Full-screen overlay with backdrop blur
// Search input with autofocus
// Results grouped by category
// Keyboard navigation (up/down arrows, enter, escape)
// Debounced input (150ms)
```

#### `CountdownTimer`
```tsx
interface CountdownTimerProps {
  targetHour: number;    // hour in UTC (e.g., 2 for 21:00 EST = 02:00 UTC)
  label: string;
  urgentThresholdMs?: number;  // default: 3600000 (1 hour)
  onUrgent?: () => void;
}
// Returns: HH:MM:SS countdown, auto-resets after target passes
// Uses requestAnimationFrame for smooth updates
// Memoized with useRef to avoid re-renders
```

#### `HeroDetailDrawer`
```tsx
interface HeroDetailDrawerProps {
  hero: Hero | null;
  open: boolean;
  onClose: () => void;
}
// On desktop (≥1024px): right-side drawer, 480px wide, slides in from right
// On mobile (<1024px): bottom sheet, slides up, max 90vh
// Contains: full hero profile with tabs
// Uses Framer Motion for entrance/exit
```

#### `Toast` / `ToastProvider`
```tsx
// Context-based toast system
// useToast() hook returns { toast(message, type) }
// Types: success, error, info
// Auto-dismiss after 3 seconds
// Stack up to 3 toasts
// Positioned: bottom-right (desktop), bottom-center above bottom nav (mobile)
```

---

## 7. Data Model Changes

### 7.1 Enhanced Hero Type

```typescript
// types/index.ts — additions

export interface HeroSkill {
  name: string;
  description: string;
  type: 'active' | 'passive';
  unlockLevel?: number;          // e.g., skill 3 unlocks at certain upgrade
}

export interface HeroStats {
  attack: number;                // relative 1-100 scale
  defense: number;
  hp: number;
  speed: number;
  critRate?: number;             // percentage
}

export interface Hero {
  // Existing fields (keep all)
  id: string;
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

  // New fields
  skills: HeroSkill[];            // 3 skills per hero
  stats: HeroStats;               // relative stat profile
  isMeta: boolean;                // from raw data (already exists there)
  position: 'front' | 'rear';    // recommended position
  counters: string[];             // hero IDs this hero is weak against
  strongAgainst: string[];        // hero IDs this hero counters
  tags: string[];                 // e.g., ['f2p', 'farmable', 'aoe', 'buffer', 'tank']
}
```

### 7.2 Season Data (New)

```typescript
// types/index.ts — new

export interface SeasonWeek {
  week: number;
  title: string;
  summary: string;
  newHeroes?: string[];           // hero IDs introduced
  events: string[];               // event IDs active this week
  tips: string[];                 // week-specific tips
  features?: string[];            // new features unlocked
}

export interface SeasonData {
  seasonNumber: number;
  name: string;
  startDate: string;              // ISO date
  totalWeeks: number;
  currentWeek: number;            // updated manually or derived
  overview: string;
  changelog: string[];            // what changed from previous season
  weeks: SeasonWeek[];
}
```

### 7.3 Formation Data (New — extracted)

```typescript
// types/index.ts — new

export interface Formation {
  id: string;
  name: string;
  category: 'tank' | 'aircraft' | 'missile' | 'mixed';
  heroes: [string, string, string, string, string]; // 5 hero IDs in slot order
  description: string;
  tags: string[];                 // 'f2p', 'meta', 'anti-aircraft', etc.
  synergyNotes: string;
}

export interface CounterEntry {
  formation: string;              // formation ID being countered
  counter: string;                // formation ID that counters it
  explanation: string;
}
```

### 7.4 Calculator Formulas (New)

```typescript
// data/raw/calculator-formulas.ts

export interface ArmsRaceFormula {
  troopTrainingPointsPerUnit: number;
  researchPointsPerHour: number;
  buildingPointsPerHour: number;
  milestones: { points: number; reward: string }[];
}

export interface ResourceFormula {
  ironProductionBase: number;     // per hour at HQ level
  foodProductionBase: number;
  goldProductionBase: number;
  gatherRate: Record<string, number>;
}
```

### 7.5 Search Index (New)

```typescript
// data/search-index.ts

export interface SearchItem {
  type: 'hero' | 'event' | 'term' | 'tip' | 'page';
  id: string;
  title: string;
  subtitle?: string;
  keywords: string[];             // searchable text fragments
  href: string;                   // navigation target
}

// Built at import time by combining all data sources
export const searchIndex: SearchItem[] = [
  // Auto-generated from heroes, events, terms, tips
];
```

### 7.6 Quiz Leaderboard (localStorage)

```typescript
// types/index.ts — new

export interface QuizScore {
  name: string;
  score: number;
  maxScore: number;
  mode: 'full' | 'daily' | 'category';
  category?: string;
  date: string;                   // ISO date
  streak: number;                 // max consecutive correct
}

// Stored in localStorage key: 'vikf_quiz_leaderboard'
// Max 10 entries, sorted by score descending
```

### 7.7 Formation Builder State (localStorage)

```typescript
// types/index.ts — new

export interface SavedFormation {
  id: string;                     // crypto.randomUUID()
  name: string;
  slots: (string | null)[];       // 5 hero IDs or null
  createdAt: string;
  notes?: string;
}

// Stored in localStorage key: 'vikf_saved_formations'
```

---

## 8. Ordered Implementation Tasks

Implementation is divided into 5 phases. Each phase is self-contained and results in a deployable improvement.

### Phase 1: Design System + Layout Overhaul (Foundation)

| # | Task | Description | Est. |
|---|---|---|---|
| 1 | Update `globals.css` | Add new CSS variables (glassmorphism, neon accents), add JetBrains Mono font import, add glass-card utility class, floating particle keyframes | 1hr |
| 2 | Create `GlassCard` component | Replace `Card.tsx` usage pattern with glassmorphism styling. Keep `Card.tsx` as alias | 30min |
| 3 | Create `Skeleton` component | Loading skeleton with shimmer animation for cards, text lines, images | 30min |
| 4 | Create `Sidebar` component | Desktop sticky sidebar with nav links, icons, collapsible "Tools" group | 1.5hr |
| 5 | Create `BottomNav` component | Mobile fixed bottom nav with 5 items | 1hr |
| 6 | Create `BottomSheet` component | Reusable bottom sheet with Framer Motion slide-up animation | 1hr |
| 7 | Update `LayoutShell` | Integrate Sidebar (desktop) + BottomNav (mobile), remove old MobileNav, adjust main content padding | 1hr |
| 8 | Update `Header` | Simplify: logo + search icon + Discord. Remove inline nav links (moved to sidebar) | 30min |
| 9 | Create `useMediaQuery` hook | Responsive breakpoint detection for conditional rendering | 15min |
| 10 | Create `useLocalStorage` hook | Type-safe localStorage read/write with SSR safety | 15min |
| 11 | Update `constants.ts` | New nav structure with icons, add new page routes, add duel time constant | 30min |
| 12 | Create `Toast` / `ToastProvider` | Context-based toast notification system | 1hr |
| 13 | Create `Tooltip` component | Simple tooltip using CSS positioning (no dependency) | 30min |
| 14 | Create `CountdownTimer` component | Reusable countdown with urgency state | 45min |
| 15 | Create `useCountdown` hook | Timer logic with requestAnimationFrame | 30min |
| 16 | Verify and test phase 1 | Build, test responsiveness at all breakpoints, check static export | 1hr |

**Phase 1 Total: ~11 hours**

### Phase 2: Home Page + Heroes Page Redesign

| # | Task | Description | Est. |
|---|---|---|---|
| 17 | Redesign `HeroBanner` | Add CSS particle effect, parallax background, animated entrance, dual CTAs | 1.5hr |
| 18 | Create `AllianceDashboard` | Server info + duel countdown + today's events + quick stats. 4-card grid | 2hr |
| 19 | Update `NavCards` | Glass card styling, add Season Guide and War Tools cards, hover animations | 1hr |
| 20 | Create `HeroSpotlight` | Random SS-tier hero mini-card for homepage | 30min |
| 21 | Update `StatsBar` | Add member count area, enhance styling | 30min |
| 22 | Update `TipOfTheDay` | Restyle with glass card | 15min |
| 23 | Enhance hero raw data | Add `skills`, `stats`, `position`, `counters`, `strongAgainst`, `tags` fields to all 23 heroes in `raw/heroes-data.ts` | 3hr |
| 24 | Update `types/index.ts` | Add new Hero fields, SeasonData, Formation, SearchItem, QuizScore types | 1hr |
| 25 | Create `HeroFilters` | Consolidated filter component: search input + type pills + rarity pills + tier pills + meta toggle + view toggle + sort dropdown | 1.5hr |
| 26 | Redesign `HeroCard` | Glass card with hover overlay (stats slide up), portrait area, badges row, one-line excerpt | 1.5hr |
| 27 | Create `HeroDetailDrawer` | Side drawer (desktop) / bottom sheet (mobile) with tabbed hero profile | 2.5hr |
| 28 | Create `HeroTableView` | Sortable table with columns: thumbnail, name, type, rarity, tier, meta. Click row → drawer | 1.5hr |
| 29 | Update `HeroesClient` | Integrate new filters, view toggle, detail drawer | 1hr |
| 30 | Update hero data adapter | Map new raw fields through adapter layer | 30min |
| 31 | Verify and test phase 2 | Build, test hero page interactions, responsive check | 1hr |

**Phase 2 Total: ~18 hours**

### Phase 3: Events, Squads, Tips, Glossary Polish

| # | Task | Description | Est. |
|---|---|---|---|
| 32 | Redesign `WeeklyCalendar` | Visual 7-day strip with today highlight, click-to-filter, event icon stacking | 2hr |
| 33 | Update `EventCard` | Glass styling, quick-tip one-liner collapsed, time-until-next indicator | 1hr |
| 34 | Create `NextEventTimer` | Small timer component showing time until next occurrence of a weekly event | 45min |
| 35 | Add CTA card to Events page | "Open Event Calculators" card linking to tools | 15min |
| 36 | Create `formations-data.ts` | Extract existing formation data into structured format with categories and tags | 1hr |
| 37 | Create `counters-data.ts` | Counter-pick lookup table: ~8-10 entries mapping formations to counters | 1hr |
| 38 | Create `CounterPicker` | Dropdown + counter display component for Squads page | 1.5hr |
| 39 | Update `PositionGrid` | Glass cards, SVG connector arrows, color coding (gold tank slot, blue DPS slot) | 1hr |
| 40 | Update `FormationCard` | Glass styling, category tags, "Why this works" tooltip | 45min |
| 41 | Update Squads page | Integrate counter-picker, categorized formation sections | 1hr |
| 42 | Update Tips page | Glass cards, bookmark feature (localStorage star icon), "Random Tip" button, category count chips | 2hr |
| 43 | Update Glossary page | Glass cards, alphabetical jump bar, search highlight, copy button, related terms linking | 2hr |
| 44 | Verify and test phase 3 | Build, test interactions, responsive | 1hr |

**Phase 3 Total: ~15 hours**

### Phase 4: New Pages (Quiz Overhaul, Season Hub, Tools)

| # | Task | Description | Est. |
|---|---|---|---|
| 45 | Create `QuizModeSelect` | 3-mode card layout: Quick Play, Daily Challenge, Category Challenge | 1hr |
| 46 | Create `StreakCounter` | Consecutive correct answers display with fire emoji escalation | 30min |
| 47 | Create `ScoreRing` | Animated SVG ring for results screen (Framer Motion animate path) | 1.5hr |
| 48 | Create `Leaderboard` | localStorage-based top-10 leaderboard with name entry, ranking, date | 1.5hr |
| 49 | Overhaul `QuizEngine` | Integrate new mode select, streak, category filter, hard mode, progress bar, points animation | 2.5hr |
| 50 | Update `QuestionCard` | Glass styling, animated answer feedback (green glow/red glow), explanation reveal | 1hr |
| 51 | Create `season-data.ts` | Season 5 data: overview, 12+ week entries with content | 2hr |
| 52 | Create `SeasonOverview` | Season name, progress bar, key mechanic explanation | 1hr |
| 53 | Create `WeekTimeline` | Vertical timeline (desktop) / horizontal scroll (mobile) with week nodes | 2hr |
| 54 | Create `WeekDetail` | Expandable week content: heroes, events, tips, features | 1hr |
| 55 | Create Season page (`/season/page.tsx`) | Compose season components | 30min |
| 56 | Create Tools hub page (`/tools/page.tsx`) | 3-card layout linking to calculators, compare, builder | 30min |
| 57 | Create `calculator-formulas.ts` | Arms Race formulas, milestone data, resource rates | 1hr |
| 58 | Create `ArmsRaceCalc` | Input form + real-time output + milestone indicators | 2.5hr |
| 59 | Create `ResourceOptimizer` | Input form + days-until calculation + progress bar visual | 1.5hr |
| 60 | Create Calculators page (`/tools/calculators/page.tsx`) | Tab layout with Arms Race + Resource calculators | 30min |
| 61 | Verify and test phase 4 | Build, test all new pages and interactions | 1.5hr |

**Phase 4 Total: ~21 hours**

### Phase 5: Hero Compare, Formation Builder, Search, Final Polish

| # | Task | Description | Est. |
|---|---|---|---|
| 62 | Create `search-index.ts` | Build combined search index from all data sources at import time | 1hr |
| 63 | Create `useSearch` hook | Fuzzy-ish matching (includes + split words) over search index, debounced | 45min |
| 64 | Create `useKeyboardShortcut` hook | ⌘K / Ctrl+K handler | 15min |
| 65 | Create `SearchOverlay` | Full-screen overlay with input, grouped results, keyboard navigation | 2hr |
| 66 | Create `SearchResults` | Result item components grouped by category | 45min |
| 67 | Integrate search into Header + Sidebar | Search icon triggers overlay, ⌘K shortcut registered | 30min |
| 68 | Create `HeroSelector` | Dropdown/search input that selects a hero, shows portrait + name | 1hr |
| 69 | Create `ComparisonView` | Side-by-side hero stat comparison with highlighted differences | 2hr |
| 70 | Create Compare page (`/tools/compare/page.tsx`) | 2-4 hero comparison with "Add another" + share URL | 1hr |
| 71 | Create `FormationGrid` | Interactive 2+3 slot grid, tap-to-select-slot behavior | 1.5hr |
| 72 | Create `HeroPicker` | Scrollable hero list panel with search, type filter, used-hero indicators | 1.5hr |
| 73 | Create `FormationAnalysis` | Type breakdown, bonus indicator, synergy notes, warnings | 1.5hr |
| 74 | Create `SavedFormations` | localStorage CRUD for formations, list with load/delete | 1hr |
| 75 | Create Builder page (`/tools/builder/page.tsx`) | Compose formation builder components | 1hr |
| 76 | Update `ProgressBar` component | Animated fill with label, used across quiz + season + calculators | 30min |
| 77 | Create `Tabs` component | Accessible tab component with Framer Motion panel transitions | 1hr |
| 78 | Create `Drawer` component | Desktop side-drawer wrapper (used by hero detail) | 45min |
| 79 | Create `Sheet` component | Mobile bottom-sheet wrapper (used by hero detail + bottom nav) | 45min |
| 80 | Create `Badge` component | Generic badge with color variants (replaces individual badge pattern repetition) | 30min |
| 81 | Update About page | Glass styling, leadership section placeholder, server info card | 45min |
| 82 | Add Open Graph metadata | Per-page OG titles, descriptions, hero images for social sharing | 1hr |
| 83 | Accessibility audit pass | Keyboard navigation for all interactive elements, ARIA labels, focus rings, screen reader text | 2hr |
| 84 | Performance optimization | Lazy-load below-fold components with `dynamic()`, optimize images, minimize bundle | 1.5hr |
| 85 | Final integration test | Full build, test all pages, all interactions, all breakpoints, static export deploy test | 2hr |

**Phase 5 Total: ~23 hours**

### Total Estimate: ~88 hours (~11 working days at 8hr/day)

### Implementation Priority Map

If time-constrained, implement in this priority order:

1. **Phase 1** (Foundation) — everything depends on this
2. **Phase 2** (Home + Heroes) — highest-impact user-facing pages
3. **Phase 5, tasks 62-67 only** (Global Search) — immediately useful utility
4. **Phase 3** (Events, Squads, Tips, Glossary) — polishing existing pages
5. **Phase 4** (Quiz, Season, Calculators) — new interactive features
6. **Phase 5, remaining** (Compare, Builder, Final Polish) — advanced tools

---

## 9. Testing Strategy

### 9.1 Build Verification (Every Phase)

```bash
pnpm build        # Must succeed with zero errors
pnpm lint         # Must pass with zero warnings
```

Static export generates to `out/` directory — verify all pages exist and are accessible.

### 9.2 Manual Testing Checklist

#### Layout & Navigation
- [ ] Desktop sidebar shows all nav links, collapses Tools group
- [ ] Mobile bottom nav shows 5 items, sub-menus open correctly
- [ ] ⌘K / Ctrl+K opens search overlay on desktop
- [ ] Search icon opens search overlay on mobile
- [ ] All nav links navigate correctly
- [ ] Active page indicated in sidebar/bottom nav
- [ ] Page transitions animate smoothly
- [ ] Alliance Duel countdown ticks accurately

#### Heroes Page
- [ ] All 23 heroes render in grid view
- [ ] Type, rarity, tier filters work independently and combined
- [ ] Search filters heroes by name
- [ ] "Meta Only" toggle shows only isMeta heroes
- [ ] View toggle switches between grid and table
- [ ] Click hero card opens detail drawer/sheet
- [ ] Detail drawer tabs (Overview/Skills/PvP/PvE/Events/Gear) switch content
- [ ] Best pairings are clickable and navigate to those heroes
- [ ] Table view columns are sortable

#### Quiz
- [ ] 3 mode cards display with best scores from localStorage
- [ ] Quick Play: 10 random questions load
- [ ] Daily Challenge: 5 seeded questions load, "already completed" state works
- [ ] Category Challenge: category picker filters questions correctly
- [ ] Streak counter increments on consecutive correct answers
- [ ] Points animation shows on correct answer
- [ ] Results screen: score ring animates, grade displays, breakdown shows
- [ ] Leaderboard: save score prompts name, ranks correctly, persists across sessions
- [ ] Hard mode toggle doubles points for hard-only questions

#### Event Calculators
- [ ] Arms Race calculator inputs respond in real-time
- [ ] Milestone indicators update as values change
- [ ] Resource optimizer shows correct days-until calculation
- [ ] All number inputs accept valid values and reject invalid

#### Formation Builder
- [ ] Empty slots render in 2+3 grid
- [ ] Hero picker lists all heroes with search
- [ ] Tap hero + tap slot places hero
- [ ] Formation analysis updates on each placement
- [ ] Type bonus shows correctly for 5 same-type
- [ ] Warning shows when no tank in front-left
- [ ] Save/load formations works via localStorage
- [ ] Preset formations load correctly

#### Hero Comparison
- [ ] Two hero selectors render
- [ ] Selecting heroes shows side-by-side comparison
- [ ] Higher values highlighted
- [ ] "Add another" expands to 3-4 heroes
- [ ] URL hash updates with selected heroes

### 9.3 Responsive Testing Matrix

| Page | 375px (iPhone SE) | 390px (iPhone 14) | 768px (iPad) | 1024px (laptop) | 1440px (desktop) |
|---|---|---|---|---|---|
| Home | ✓ | ✓ | ✓ | ✓ | ✓ |
| Heroes | ✓ | ✓ | ✓ | ✓ | ✓ |
| Events | ✓ | ✓ | ✓ | ✓ | ✓ |
| Squads | ✓ | ✓ | ✓ | ✓ | ✓ |
| Tips | ✓ | ✓ | ✓ | ✓ | ✓ |
| Glossary | ✓ | ✓ | ✓ | ✓ | ✓ |
| Quiz | ✓ | ✓ | ✓ | ✓ | ✓ |
| Season | ✓ | ✓ | ✓ | ✓ | ✓ |
| Tools Hub | ✓ | ✓ | ✓ | ✓ | ✓ |
| Calculators | ✓ | ✓ | ✓ | ✓ | ✓ |
| Compare | ✓ | ✓ | ✓ | ✓ | ✓ |
| Builder | ✓ | ✓ | ✓ | ✓ | ✓ |
| About | ✓ | ✓ | ✓ | ✓ | ✓ |

### 9.4 Accessibility Testing

- Lighthouse accessibility score ≥ 90 on all pages
- All interactive elements reachable via keyboard (Tab/Shift+Tab)
- Focus indicators visible (not hidden by styling)
- All images have meaningful alt text
- Color contrast ratio ≥ 4.5:1 for body text, ≥ 3:1 for large text
- `prefers-reduced-motion` disables all animations (existing)
- Screen reader test: hero cards announce name, type, tier, rarity

### 9.5 Cross-Browser Testing

| Browser | Priority |
|---|---|
| Chrome (Android) | P0 — primary audience |
| Safari (iOS) | P0 — primary audience |
| Chrome (Desktop) | P1 |
| Firefox (Desktop) | P2 |
| Safari (macOS) | P2 |

---

## 10. Performance Targets

### 10.1 Core Web Vitals (per page)

| Metric | Target | Measurement |
|---|---|---|
| Largest Contentful Paint (LCP) | < 2.0s | Lighthouse |
| First Input Delay (FID) | < 100ms | Lighthouse |
| Cumulative Layout Shift (CLS) | < 0.05 | Lighthouse |
| First Contentful Paint (FCP) | < 1.5s | Lighthouse |
| Time to Interactive (TTI) | < 3.0s | Lighthouse |

### 10.2 Lighthouse Scores (per page, mobile)

| Category | Target |
|---|---|
| Performance | ≥ 90 |
| Accessibility | ≥ 90 |
| Best Practices | ≥ 95 |
| SEO | ≥ 90 |

### 10.3 Bundle Size Budget

| Metric | Target |
|---|---|
| Total JS (gzipped) | < 150KB |
| Largest page JS chunk | < 50KB |
| CSS (gzipped) | < 15KB |
| Hero images (each) | < 30KB (WebP) |
| Banner images (each) | < 80KB (WebP) |

### 10.4 Performance Strategies

1. **Dynamic imports:** Lazy-load heavy components (FormationBuilder, ArmsRaceCalc, SearchOverlay, HeroDetailDrawer) using `next/dynamic` with loading skeletons
2. **Image optimization:** Convert hero PNGs to WebP, serve at 2x resolution max, use `loading="lazy"` for below-fold images
3. **Font optimization:** `next/font` already handles Inter + Rajdhani. Add JetBrains Mono for mono content only via `next/font`
4. **CSS:** Tailwind v4 tree-shakes unused styles automatically
5. **Animation:** Use CSS animations where possible (particles, shimmer). Reserve Framer Motion for entrance animations and interactive transitions
6. **Data splitting:** Import only the data needed per page. Use dynamic imports for large data files on tools pages
7. **No external API calls:** All data is local, so no network waterfall
8. **Preload critical assets:** Hero banner image, logo, primary fonts

### 10.5 Static Export Verification

```bash
# Build must succeed
pnpm build

# Verify static output
ls out/
# Expected: index.html, heroes/index.html, events/index.html, squads/index.html,
#           tips/index.html, glossary/index.html, quiz/index.html, season/index.html,
#           tools/index.html, tools/calculators/index.html, tools/compare/index.html,
#           tools/builder/index.html, about/index.html

# Verify basePath
grep -r "last-war-website" out/index.html  # Should appear in asset paths
```

---

## Appendix A: Page Count Summary

| # | Page | Route | Status |
|---|---|---|---|
| 1 | Home | `/` | Redesign |
| 2 | Heroes | `/heroes` | Major overhaul |
| 3 | Events | `/events` | Enhanced |
| 4 | Squads | `/squads` | Enhanced + counter-picker |
| 5 | Tips | `/tips` | Polished |
| 6 | Glossary | `/glossary` | Polished |
| 7 | Quiz | `/quiz` | Major overhaul |
| 8 | About | `/about` | Polished |
| 9 | Season Guide | `/season` | **NEW** |
| 10 | Tools Hub | `/tools` | **NEW** |
| 11 | Calculators | `/tools/calculators` | **NEW** |
| 12 | Hero Compare | `/tools/compare` | **NEW** |
| 13 | Formation Builder | `/tools/builder` | **NEW** |

**Total: 13 pages (8 existing + 5 new)**

## Appendix B: New Dependencies

| Package | Purpose | Size Impact |
|---|---|---|
| None required | All features implementable with existing stack | — |

**Note:** shadcn/ui components are copy-paste, not npm dependencies. Use as needed for Tabs, Drawer, Sheet, Toast patterns — but implement custom to avoid Radix UI dependency overhead. Keep the site lean.

## Appendix C: localStorage Keys

| Key | Type | Purpose |
|---|---|---|
| `vikf_access` | string | Password gate cookie (existing) |
| `vikf_daily_done` | string | Daily quiz completion (existing) |
| `vikf_quiz_leaderboard` | QuizScore[] | Quiz leaderboard |
| `vikf_saved_formations` | SavedFormation[] | Formation builder saves |
| `vikf_bookmarked_tips` | number[] | Bookmarked tip IDs |
| `vikf_hero_view_pref` | 'grid' \| 'table' | Hero page view preference |
| `vikf_search_recent` | string[] | Recent search queries (max 5) |

---

*End of spec. This document is the single source of truth for the Super Version redesign. All implementation tasks reference this spec.*
