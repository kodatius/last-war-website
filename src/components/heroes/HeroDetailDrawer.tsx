'use client';

import LocalImage from '@/components/ui/LocalImage';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { img } from '@/lib/prefix';
import { Hero } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';

interface HeroDetailDrawerProps {
  hero: Hero | null;
  onClose: () => void;
}

type HeroTab = 'overview' | 'skills' | 'pvp' | 'pve';

const tabs: HeroTab[] = ['overview', 'skills', 'pvp', 'pve'];

export default function HeroDetailDrawer({ hero, onClose }: HeroDetailDrawerProps) {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [tab, setTab] = useState<HeroTab>('overview');

  return (
    <AnimatePresence>
      {hero ? (
        <>
          <motion.button
            type="button"
            aria-label="Close hero details"
            className="fixed inset-0 z-50 bg-black/60"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={`${hero.name} details`}
            className={`fixed z-[60] border border-border/80 bg-bg-secondary/95 shadow-2xl backdrop-blur-xl ${
              isDesktop
                ? 'inset-y-0 right-0 w-full max-w-[480px] rounded-l-2xl'
                : 'inset-x-0 bottom-0 max-h-[86vh] rounded-t-2xl'
            }`}
            initial={isDesktop ? { x: 520, opacity: 0.8 } : { y: '100%', opacity: 0.9 }}
            animate={isDesktop ? { x: 0, opacity: 1 } : { y: 0, opacity: 1 }}
            exit={isDesktop ? { x: 520, opacity: 0.8 } : { y: '100%', opacity: 0.9 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-border/70 px-4 py-3">
                <div>
                  <p className="font-hero text-2xl font-bold leading-none">{hero.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-text-secondary">
                    {hero.tier} Tier {hero.type} {hero.role}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border/70 bg-bg-tertiary/60"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="h-44 overflow-hidden border-b border-border/60 sm:h-56">
                <LocalImage
                  src={img(`/images/heroes/${hero.id}.png`)}
                  alt={hero.name}
                  width={720}
                  height={420}
                  containerClassName="h-full w-full"
                  className="h-full w-full object-cover"
                  fallbackText={hero.name.slice(0, 2)}
                  fallbackClassName="text-4xl"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto border-b border-border/70 px-4 py-3">
                {tabs.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setTab(item)}
                    className={`rounded-full px-3 py-1.5 text-xs uppercase tracking-wide ${
                      tab === item ? 'bg-accent text-black' : 'bg-bg-tertiary/55 text-text-secondary'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="min-h-0 flex-1 overflow-auto p-4 text-sm">
                {tab === 'overview' ? (
                  <div className="space-y-4">
                    <p className="text-text-primary">{hero.whyGood}</p>
                    <div className="grid grid-cols-2 gap-2">
                      <p className="rounded-lg border border-border/70 bg-bg-tertiary/40 p-2 font-mono">ATK {hero.stats.attack}</p>
                      <p className="rounded-lg border border-border/70 bg-bg-tertiary/40 p-2 font-mono">DEF {hero.stats.defense}</p>
                      <p className="rounded-lg border border-border/70 bg-bg-tertiary/40 p-2 font-mono">HP {hero.stats.hp}</p>
                      <p className="rounded-lg border border-border/70 bg-bg-tertiary/40 p-2 font-mono">CMD {hero.stats.command}</p>
                    </div>
                    <p className="text-text-secondary">
                      Tier rationale: <span className="text-text-primary">{hero.tier}-tier {hero.role.toLowerCase()} profile with {hero.isMeta ? 'active meta relevance' : 'specialized use cases'}.</span>
                    </p>
                    <p className="text-text-secondary">
                      Meta status: <span className={hero.isMeta ? 'text-neon-green' : 'text-text-primary'}>{hero.isMeta ? 'Meta pick' : 'Off-meta pick'}</span>
                    </p>
                    <p className="text-text-secondary">Strong against: {hero.strongAgainst.join(', ') || 'N/A'}</p>
                    <p className="text-text-secondary">Weak against: {hero.weakAgainst.join(', ') || 'N/A'}</p>
                  </div>
                ) : null}

                {tab === 'skills' ? (
                  <div className="space-y-3">
                    {hero.skills.map((skill) => (
                      <div key={skill.name} className="rounded-lg border border-border/70 bg-bg-tertiary/40 p-3">
                        <p className="font-semibold text-accent">{skill.name}</p>
                        <p className="mt-1 text-xs uppercase tracking-wide text-text-secondary">{skill.type}</p>
                        <p className="mt-2 text-text-primary">{skill.description}</p>
                      </div>
                    ))}
                  </div>
                ) : null}

                {tab === 'pvp' ? (
                  <div className="space-y-4">
                    <p>{hero.usageTips.pvp}</p>
                    <p className="text-text-secondary">Best pairings: {hero.bestPairings.join(', ') || 'N/A'}</p>
                  </div>
                ) : null}

                {tab === 'pve' ? (
                  <div className="space-y-4">
                    <p>{hero.usageTips.pve}</p>
                    <p className="text-text-secondary">Events: {hero.usageTips.events}</p>
                    <p className="text-text-secondary">
                      Recommended gear: {hero.recommendedGear.weapon} | {hero.recommendedGear.armor} | {hero.recommendedGear.accessory}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
