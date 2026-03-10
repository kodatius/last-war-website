'use client';

import BottomSheet from '@/components/ui/BottomSheet';
import { BOTTOM_NAV_ITEMS, BOTTOM_SHEET_GROUPS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function BottomNav() {
  const pathname = usePathname();
  const [openSheet, setOpenSheet] = useState<string | null>(null);

  return (
    <>
      <nav className="glass-card fixed inset-x-0 bottom-0 z-50 mx-auto flex h-14 max-w-screen-lg items-center justify-around rounded-none border-x-0 border-b-0 lg:hidden">
        {BOTTOM_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          if (item.sheetId) {
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setOpenSheet(item.sheetId ?? null)}
                className={cn(
                  'flex min-w-0 flex-col items-center justify-center gap-0.5 px-2 text-[10px] leading-none text-text-secondary',
                  openSheet === item.sheetId && 'text-accent'
                )}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                'flex min-w-0 flex-col items-center justify-center gap-0.5 px-2 text-[10px] leading-none text-text-secondary',
                isActive && 'text-accent'
              )}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {BOTTOM_SHEET_GROUPS.map((group) => (
        <BottomSheet
          key={group.id}
          open={openSheet === group.id}
          onClose={() => setOpenSheet(null)}
          title={group.title}
        >
          <ul className="space-y-1">
            {group.items.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-text-primary hover:bg-bg-tertiary"
                    onClick={() => setOpenSheet(null)}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </BottomSheet>
      ))}
    </>
  );
}
