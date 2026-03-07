'use client';

import { NAV_LINKS } from '@/lib/constants';
import LocalImage from '@/components/ui/LocalImage';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import MobileNav from './MobileNav';

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-gray-950/80 backdrop-blur-md">
      <div className="container-shell flex h-16 items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2 text-xl font-bold tracking-tight text-accent">
          <LocalImage
            src="/last-war-website/images/ui/logo.png"
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

        <nav className="hidden items-center gap-5 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'border-b-2 border-transparent pb-1 text-sm font-medium transition-colors hover:text-accent',
                pathname === link.href && 'border-accent text-accent'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          aria-label="Open navigation menu"
          className="rounded-lg border border-border p-2 text-text-primary md:hidden"
          onClick={() => setIsOpen(true)}
          type="button"
        >
          <Menu size={18} />
        </button>
      </div>
      <MobileNav open={isOpen} onClose={() => setIsOpen(false)} />
    </header>
  );
}
