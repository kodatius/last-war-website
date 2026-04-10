'use client';

import { NAV_GROUPS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

function isItemActive(pathname: string, href: string) {
  if (href === '/') {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function TopNav() {
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpenGroup(null);
  }, [pathname]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!navRef.current?.contains(event.target as Node)) {
        setOpenGroup(null);
      }
    }

    window.addEventListener('mousedown', handlePointerDown);
    return () => window.removeEventListener('mousedown', handlePointerDown);
  }, []);

  return (
    <div ref={navRef} className="hidden items-center gap-2 lg:flex">
      {NAV_GROUPS.map((group) => {
        const groupActive = group.items.some((item) => isItemActive(pathname, item.href));
        const isOpen = openGroup === group.id;

        return (
          <div
            key={group.id}
            className="relative"
            onMouseEnter={() => setOpenGroup(group.id)}
            onMouseLeave={() => setOpenGroup((current) => (current === group.id ? null : current))}
          >
            <button
              type="button"
              onClick={() => setOpenGroup((current) => (current === group.id ? null : group.id))}
              className={cn(
                'inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors',
                groupActive || isOpen
                  ? 'bg-accent/15 text-accent'
                  : 'text-text-primary hover:bg-bg-tertiary/80 hover:text-accent'
              )}
            >
              <span>{group.title}</span>
              <ChevronDown size={16} className={cn('transition-transform', isOpen && 'rotate-180')} />
            </button>

            <div
              className={cn(
                'absolute left-0 top-full z-50 mt-2 w-64 rounded-2xl border border-border bg-bg-secondary/95 p-2 shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all',
                isOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
              )}
            >
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = isItemActive(pathname, item.href);

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          'flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors',
                          active
                            ? 'bg-accent/15 text-accent'
                            : 'text-text-secondary hover:bg-bg-tertiary/80 hover:text-text-primary'
                        )}
                        onClick={() => setOpenGroup(null)}
                      >
                        <Icon size={16} />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
