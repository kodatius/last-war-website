'use client';

import CountdownTimer from '@/components/ui/CountdownTimer';
import GlassCard from '@/components/ui/GlassCard';
import { NAV_GROUPS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';

export default function Sidebar() {
  const pathname = usePathname();
  const [toolsOpen, setToolsOpen] = useState(true);

  const primaryGroups = useMemo(() => NAV_GROUPS.filter((group) => group.id !== 'tools'), []);
  const toolsGroup = useMemo(() => NAV_GROUPS.find((group) => group.id === 'tools'), []);
  const ToolsIcon = toolsGroup?.icon;
  const openSearch = () => window.dispatchEvent(new Event('open-site-search'));

  return (
    <aside className="sticky top-20 h-[calc(100vh-6rem)] w-60 shrink-0">
      <GlassCard className="flex h-full flex-col p-3">
        <nav className="space-y-1">
          <button
            type="button"
            onClick={openSearch}
            className="mb-2 w-full rounded-lg border border-border px-3 py-2 text-left text-sm text-text-secondary transition-colors hover:border-accent hover:text-accent"
          >
            Search (Ctrl/Cmd + K)
          </button>

          {primaryGroups.map((group) =>
            group.items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors',
                    isActive ? 'bg-accent/15 text-accent' : 'text-text-primary hover:bg-bg-tertiary/70'
                  )}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </Link>
              );
            })
          )}

          {toolsGroup ? (
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setToolsOpen((prev) => !prev)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-text-primary transition-colors hover:bg-bg-tertiary/70"
              >
                <span className="flex items-center gap-2">
                  {ToolsIcon ? <ToolsIcon size={16} /> : null}
                  Tools
                </span>
                <ChevronDown size={16} className={cn('transition-transform', toolsOpen && 'rotate-180')} />
              </button>

              {toolsOpen ? (
                <div className="mt-1 space-y-1 pl-3">
                  {toolsGroup.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          'flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors',
                          isActive ? 'bg-accent/15 text-accent' : 'text-text-secondary hover:bg-bg-tertiary/70 hover:text-text-primary'
                        )}
                      >
                        <Icon size={15} />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>
          ) : null}
        </nav>

        <div className="mt-auto border-t border-border/70 p-3">
          <CountdownTimer />
        </div>
      </GlassCard>
    </aside>
  );
}
