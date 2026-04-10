'use client';

import TopNav from '@/components/layout/TopNav';
import CountdownTimer from '@/components/ui/CountdownTimer';
import { LINKS } from '@/lib/constants';
import { Search } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const openSearch = () => {
    window.dispatchEvent(new Event('open-site-search'));
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-gray-950/85 backdrop-blur-md">
      <div className="container-shell py-3">
        <div className="flex items-center justify-between gap-3 lg:gap-6">
          <Link href="/" className="inline-flex shrink-0 items-center text-2xl font-extrabold tracking-tight text-accent">
            [FATE]
          </Link>

          <TopNav />

          <div className="hidden min-w-0 flex-1 items-center justify-end gap-3 lg:flex">
            <button
              aria-label="Open search"
              type="button"
              className="flex min-w-[240px] items-center justify-between rounded-full border border-border bg-bg-secondary/70 px-4 py-2 text-sm text-text-secondary transition-colors hover:border-accent hover:text-text-primary xl:min-w-[320px]"
              onClick={openSearch}
            >
              <span className="inline-flex items-center gap-2">
                <Search size={16} />
                <span>Search guides, heroes, events...</span>
              </span>
              <span className="rounded-md border border-border px-2 py-0.5 text-[11px] uppercase tracking-wide">Cmd+K</span>
            </button>

            <div className="rounded-2xl border border-border/70 bg-bg-secondary/70 px-3 py-2">
              <CountdownTimer className="text-sm" />
            </div>

            <a
              href={LINKS.discord}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-accent/50 px-3 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/10"
            >
              Discord
            </a>
          </div>
        </div>

        <div className="mt-3 flex flex-col gap-2 lg:hidden">
          <div className="flex items-center gap-2">
            <button
              aria-label="Open search"
              type="button"
              className="flex flex-1 items-center justify-between rounded-xl border border-border bg-bg-secondary/70 px-4 py-2.5 text-sm text-text-secondary transition-colors hover:border-accent hover:text-text-primary"
              onClick={openSearch}
            >
              <span className="inline-flex items-center gap-2">
                <Search size={16} />
                <span>Search</span>
              </span>
              <span className="text-[11px] uppercase tracking-wide">Cmd+K</span>
            </button>

            <a
              href={LINKS.discord}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-accent/50 px-3 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent/10"
            >
              Discord
            </a>
          </div>

          <div className="rounded-xl border border-border/70 bg-bg-secondary/70 px-4 py-2">
            <CountdownTimer className="text-base" />
          </div>
        </div>
      </div>
    </header>
  );
}
