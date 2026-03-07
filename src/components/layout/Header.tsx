'use client';

import { LINKS } from '@/lib/constants';
import LocalImage from '@/components/ui/LocalImage';
import { img } from '@/lib/prefix';
import { Search } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-gray-950/80 backdrop-blur-md">
      <div className="container-shell flex h-16 items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2 text-xl font-bold tracking-tight text-accent">
          <LocalImage
            src={img('/images/ui/logo.png')}
            alt="Last War Survival logo"
            width={36}
            height={36}
            loading="eager"
            containerClassName="h-9 w-9 overflow-hidden rounded-md border border-border bg-bg-tertiary"
            className="h-full w-full object-cover"
            fallbackText="LW"
          />
          <span>[ViKF]</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            aria-label="Open search"
            type="button"
            className="rounded-lg border border-border p-2 text-text-primary transition-colors hover:border-accent hover:text-accent"
          >
            <Search size={18} />
          </button>
          <a
            href={LINKS.discord}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-accent/50 px-3 py-1.5 text-sm font-medium text-accent transition-colors hover:bg-accent/10"
          >
            Discord
          </a>
        </div>
      </div>
    </header>
  );
}
