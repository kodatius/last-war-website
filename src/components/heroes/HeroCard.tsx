'use client';

import RarityBadge from '@/components/ui/RarityBadge';
import TierBadge from '@/components/ui/TierBadge';
import TypeIcon from '@/components/ui/TypeIcon';
import { LINKS } from '@/lib/constants';
import { Hero } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';

interface HeroCardProps {
  hero: Hero;
}

type HeroTab = 'pvp' | 'pve' | 'events';

export default function HeroCard({ hero }: HeroCardProps) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<HeroTab>('pvp');
  const [imageError, setImageError] = useState(false);

  const initials = useMemo(
    () =>
      hero.name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase(),
    [hero.name]
  );

  return (
    <motion.article layout className="rounded-lg border border-border bg-bg-secondary p-4">
      <button type="button" className="w-full text-left" onClick={() => setOpen((prev) => !prev)}>
        <div className="mb-3 h-36 overflow-hidden rounded-lg border border-border bg-bg-tertiary">
          {imageError ? (
            <div className="flex h-full items-center justify-center bg-gradient-to-r from-accent/30 to-transparent text-3xl font-bold text-accent">
              {initials}
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`${LINKS.heroImageBase}/${hero.id}.png`}
              alt={hero.name}
              className="h-full w-full object-cover"
              onError={() => setImageError(true)}
            />
          )}
        </div>

        <h3 className="text-lg font-semibold">{hero.name}</h3>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <TypeIcon type={hero.type} />
          <RarityBadge rarity={hero.rarity} />
          <TierBadge tier={hero.tier} />
        </div>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <p className="mt-4 text-sm text-text-secondary">{hero.whyGood}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {hero.bestPairings.map((pair) => (
                <span key={pair} className="rounded-full border border-border px-2 py-1 text-xs text-text-secondary">
                  {pair}
                </span>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              {(['pvp', 'pve', 'events'] as HeroTab[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setTab(item)}
                  className={`rounded-full px-2.5 py-1 text-xs uppercase ${
                    tab === item ? 'bg-accent text-black' : 'bg-bg-tertiary text-text-secondary'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm">{hero.usageTips[tab]}</p>
            <p className="mt-3 text-xs text-text-secondary">Gear: {hero.recommendedGear}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.article>
  );
}
