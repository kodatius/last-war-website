# Last War Website - Project Instructions

Welcome to the [ViKF] Alliance Last War: Survival strategy portal. This is a Next.js 15 static-export site designed to be deployed on GitHub Pages.

## Quick Start

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm, pnpm, or yarn

### Installation & Development

```bash
# Install dependencies
npm install
# or
pnpm install

# Run development server
npm run dev
# or
pnpm dev

# Open http://localhost:3000/last-war-website in your browser
```

### Building

```bash
# Build for production
npm run build

# Output is in the 'out/' directory ready for GitHub Pages deployment
```

### Linting

```bash
npm run lint
```

## Deployment to GitHub Pages

This site is configured to deploy to GitHub Pages with the basePath `/last-war-website`.

### Automatic Deployment (GitHub Actions)

If you have GitHub Actions configured:

1. Push to the `main` or `master` branch
2. GitHub Actions automatically builds and deploys to `gh-pages` branch
3. Site is live at: `https://vikfalliande.github.io/last-war-website`

### Manual Deployment

```bash
# 1. Build the project
npm run build

# 2. Upload the 'out/' directory contents to GitHub Pages
# Option A: Use GitHub's deployment tools
# Option B: Commit 'out/' directory to gh-pages branch
# Option C: Use GitHub Actions with `actions/deploy-pages`
```

## Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Home page
│   │   ├── heroes/            # Heroes page
│   │   ├── events/            # Events page
│   │   ├── squads/            # Squad builder page
│   │   ├── tips/              # Tips page
│   │   ├── glossary/          # Glossary page
│   │   ├── quiz/              # Quiz page
│   │   ├── about/             # About page
│   │   ├── layout.tsx         # Root layout with password gate
│   │   └── sitemap.ts         # SEO sitemap
│   ├── components/            # React components
│   │   ├── layout/            # Header, Footer, Layout components
│   │   ├── home/              # Home page components
│   │   ├── heroes/            # Hero display components
│   │   ├── events/            # Event components
│   │   ├── squads/            # Squad builder components
│   │   ├── gate/              # Password gate component
│   │   ├── ui/                # Reusable UI components
│   │   └── quiz/              # Quiz components
│   ├── lib/
│   │   ├── constants.ts       # Alliance info, colors, navigation
│   │   ├── prefix.ts          # basePath prefix utility
│   │   ├── utils.ts           # Utility functions
│   │   └── hooks/             # Custom React hooks
│   ├── types/
│   │   └── index.ts           # TypeScript type definitions
│   ├── styles/
│   │   └── globals.css        # Global styles and CSS variables
│   └── data/                  # Data imports (symlinked to root)
├── public/
│   ├── images/
│   │   ├── heroes/            # Hero portraits (23 images)
│   │   ├── banners/           # Banner images
│   │   └── ui/                # UI icons and logos
│   ├── robots.txt             # Search engine crawling rules
│   └── og-image.png           # Open Graph preview image
├── heroes-data.ts             # 23 heroes with tier list, builds, pairings
├── events-data.ts             # 11 core events with schedules and strategies
├── tips-data.ts               # 100+ optimization tips
├── quiz-data.ts               # 100+ quiz questions
├── terms-data.ts              # 32 glossary terms
├── image-registry-data.ts     # Image URL mappings
├── next.config.ts             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
└── tsconfig.json              # TypeScript configuration
```

## How to Add/Update Content

### Adding a New Hero

1. **Add hero portrait image**
   - Place image in `public/images/heroes/{heroId}.png` (512x512 recommended)
   - Use lowercase hero ID (e.g., `kimberly.png`)

2. **Add hero data** in `heroes-data.ts`:
```typescript
{
  id: 'newhero',
  name: 'New Hero',
  tier: 'SS' | 'S' | 'A' | 'B' | 'C',
  type: 'Tank' | 'Aircraft' | 'Missile',
  rarity: 'UR' | 'SSR' | 'SR',
  description: 'One-line description',
  whyGood: 'Detailed explanation of hero strengths',
  bestPairings: ['hero1', 'hero2', 'hero3'],
  recommendedGear: {
    weapon: 'Weapon recommendation',
    armor: 'Armor recommendation',
    accessory: 'Accessory recommendation'
  },
  usageTips: {
    pvp: 'PvP strategy tips',
    pve: 'PvE strategy tips',
    events: 'Event usage tips'
  },
  isMeta: true | false
}
```

3. **Rebuild and test**
```bash
npm run dev
```

### Adding a New Event

1. **Add event data** in `events-data.ts`:
```typescript
{
  id: 'eventid',
  name: 'Event Name',
  description: 'Short description',
  schedule: 'Monday–Friday, 10:00–12:00 server time',
  frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly',
  difficulty: 'easy' | 'medium' | 'hard',
  strategies: [
    {
      title: 'Strategy Title',
      description: 'Detailed strategy explanation',
      heroRecommendations: ['hero1', 'hero2']
    }
  ]
}
```

2. Rebuild:
```bash
npm run dev
```

### Adding Quiz Questions

Edit `quiz-data.ts` and add to the `questions` array:

```typescript
{
  id: 'q999',
  question: 'Your question here?',
  options: ['Option A', 'Option B', 'Option C', 'Option D'],
  correctAnswer: 0, // index of correct option
  explanation: 'Explanation of the correct answer',
  difficulty: 'easy' | 'medium' | 'hard',
  category: 'Category Name',
  imageUrl: '/last-war-website/images/path.png' // optional
}
```

### Adding Tips

Edit `tips-data.ts` and add to the `tips` array:

```typescript
{
  id: 'tip-xxx',
  title: 'Tip Title',
  description: 'Detailed tip explanation',
  category: 'Category Name',
  isPriority: true | false,
  relatedHeroes: ['hero1', 'hero2'],
  tags: ['tag1', 'tag2']
}
```

### Adding Glossary Terms

Edit `terms-data.ts` and add to the `terms` array:

```typescript
{
  id: 'termid',
  term: 'Term Name',
  aliases: ['Alias1', 'Alias2'],
  definition: 'Clear definition of the term',
  context: 'When and how this term is used',
  relatedTerms: ['term1', 'term2']
}
```

## SEO & Metadata

### Sitemap
- Automatically generated at `/sitemap.xml`
- Includes all 8 main pages
- Updates on every build

### Robots.txt
- Located at `public/robots.txt`
- Allows search engines to crawl `/last-war-website/`
- Points to the sitemap

### Page Titles & Descriptions
- Each page has SEO-optimized metadata in its `page.tsx` file
- Edit the `metadata` export to update title and description
- Root layout includes Open Graph and Twitter Card tags

Example:
```typescript
export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Clear, keyword-rich description (155-160 chars)',
};
```

## Password Gate

The site is protected by a **password gate** that users must pass through before accessing content.

### Configuration

Edit `src/lib/constants.ts`:

```typescript
export const ALLIANCE_INFO = {
  name: '[ViKF]',
  server: '#2058',
  tagline: 'Strategy wins wars...',
  password: '5955',           // Change this password
  cookieName: 'vikf_access',  // Cookie storage key
  cookieValue: 'verified',    // Cookie storage value
  cookieDays: 30,             // Cookie expiration in days
} as const;
```

### How It Works

1. User lands on the site
2. PasswordGate component checks for a cookie
3. If no cookie or wrong password, shows password prompt
4. On success, sets a cookie valid for `cookieDays`
5. User bypasses gate on subsequent visits (within cookie expiration)

### Disabling the Gate (Not Recommended)

If you want to disable the password gate for public access:

1. Remove PasswordGate from `src/app/layout.tsx`:
```typescript
// Before (with gate)
<PasswordGate>
  <LayoutShell>{children}</LayoutShell>
</PasswordGate>

// After (without gate)
<LayoutShell>{children}</LayoutShell>
```

2. Rebuild: `npm run build`

## Styling

- **Tailwind CSS 4**: Configured in `tailwind.config.ts`
- **CSS Variables**: Custom colors defined in `src/styles/globals.css`
- **Color Palette**:
  - Primary background: `bg-bg-primary` (#0a0a0f)
  - Secondary background: `bg-bg-secondary` (#12121a)
  - Accent color: `text-accent` / `bg-accent` (#d4a017 gold)
  - Text: `text-text-primary` (light gray)
  - Borders: `border-border` (#2a2a3e)

## Components

### LocalImage
Renders images with fallback support for missing images:
```typescript
<LocalImage
  src={img('/images/heroes/kimberly.png')}
  alt="Kimberly hero portrait"
  width={200}
  height={200}
  containerClassName="rounded-lg border border-border"
  className="object-cover"
  fallbackText="KM"
/>
```

### Card
Reusable card component with borders and consistent styling:
```typescript
<Card className="p-4">
  {/* Content */}
</Card>
```

### SectionHeading
Page section header:
```typescript
<SectionHeading 
  title="Main Title"
  subtitle="Subtitle text"
/>
```

## Building & Types

### TypeScript

Strict TypeScript configuration ensures type safety. Check for errors:

```bash
npm run build
# or run type checking only (Next.js provides this via build process)
```

### Data Type Definitions

All data structures are defined in `src/types/index.ts`:

```typescript
export interface Hero { ... }
export interface Event { ... }
export interface Tip { ... }
export interface Question { ... }
export interface Term { ... }
```

Update types when adding new content structure.

## Performance

- **Static Export**: All pages pre-rendered at build time
- **Image Optimization**: Unoptimized images (for GitHub Pages compatibility)
- **Code Splitting**: Automatic by Next.js and Tailwind
- **Bundle Size**: ~146KB first load JS (shared chunks)

## Accessibility Features

- ✓ Alt text on all images
- ✓ Proper heading hierarchy (h1, h2, h3)
- ✓ ARIA labels on interactive elements
- ✓ Keyboard navigation support
- ✓ Color contrast ratios meet WCAG AA standards
- ✓ Semantic HTML (buttons, links, nav)

## Troubleshooting

### Build Fails with Font Errors
Solution: Fonts are already configured to use system fonts. This is intentional for offline builds.

### Images Not Loading
1. Check image paths use `img()` prefix function
2. Verify images exist in `public/images/`
3. Check alt text is present
4. Clear .next folder: `rm -rf .next`

### Password Gate Not Working
1. Check `ALLIANCE_INFO.password` in `src/lib/constants.ts`
2. Clear browser cookies (domain: localhost for dev)
3. Rebuild: `npm run build`

### basePath Issues
- All internal links should use Next.js `<Link>` component
- All image paths should use `img()` function
- External resources should reference full URL

## Tech Stack

- **Framework**: Next.js 15.0.4
- **React**: 19.0.0
- **TypeScript**: 5.7.2
- **CSS**: Tailwind CSS 4.1.12
- **Animations**: Framer Motion 11.18.2
- **Icons**: Lucide React 0.460.0
- **State**: js-cookie 3.0.5 (for password gate)

## Deployment Checklist

Before deploying:

- [ ] Run `npm run build` successfully
- [ ] Verify all pages load at `/last-war-website/` in build output
- [ ] Check robots.txt allows crawling
- [ ] Verify sitemap.xml is generated
- [ ] Test password gate works
- [ ] Update metadata if needed
- [ ] Verify hero/event/tip images exist
- [ ] Test on mobile (responsive design)

## Support & Maintenance

- **Creator**: Toxzin and [ViKF] leadership
- **Game**: Last War: Survival
- **Discord**: https://discord.gg/S4m3mmzuKZ
- **Server**: #2058

---

**Last Updated**: April 2026
**Version**: 1.0.0
**Status**: Production Ready
