import Badge from '@/components/ui/Badge';
import SectionHeading from '@/components/ui/SectionHeading';
import { img } from '@/lib/prefix';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Tools Hub',
  description: 'Access calculators, hero compare, and formation builder tools.',
  openGraph: {
    title: 'Tools Hub | [FATE] Alliance',
    description: 'Planning and optimization tools for alliance commanders.',
    images: [img('/images/banners/game.jpg')],
  },
};

const toolCards = [
  {
    href: '/tools/calculators',
    title: 'Calculators',
    description: 'Arms Race points, milestones, and resource ETA planning.',
    badge: 'Planning',
  },
  {
    href: '/tools/compare',
    title: 'Hero Compare',
    description: 'Compare 2-4 heroes side-by-side and spot stat gaps instantly.',
    badge: 'Analysis',
  },
  {
    href: '/tools/builder',
    title: 'Formation Builder',
    description: 'Draft lineups on a 2+3 grid and save your best setups locally.',
    badge: 'Execution',
  },
];

export default function ToolsPage() {
  return (
    <div className="container-shell py-16 sm:py-24">
      <SectionHeading title="Tools Hub" subtitle="Plan smarter. Execute cleaner. Win more weekly cycles." />
      <div className="grid gap-4 md:grid-cols-3">
        {toolCards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group rounded-xl border border-border bg-bg-secondary/75 p-5 transition-colors hover:border-accent/50 hover:bg-bg-secondary"
          >
            <Badge tone="accent">{card.badge}</Badge>
            <h2 className="mt-3 text-xl font-semibold group-hover:text-accent">{card.title}</h2>
            <p className="mt-2 text-sm text-text-secondary">{card.description}</p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm text-accent">
              Open tool
              <ArrowRight size={14} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
