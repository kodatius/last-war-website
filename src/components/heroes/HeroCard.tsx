'use client';

import RarityBadge from '@/components/ui/RarityBadge';
import TierBadge from '@/components/ui/TierBadge';
import TypeIcon from '@/components/ui/TypeIcon';
import LocalImage from '@/components/ui/LocalImage';
import { img } from '@/lib/prefix';
import { Hero } from '@/types';
import { motion } from 'framer-motion';

interface HeroCardProps {
  hero: Hero;
  onOpen?: (hero: Hero) => void;
}

export default function HeroCard({ hero, onOpen }: HeroCardProps) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen?.(hero)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="glass-card glass-card-hover group block overflow-hidden rounded-xl border text-left"
    >
      <div className="relative h-44 overflow-hidden sm:h-48">
        <LocalImage
          src={img(`/images/heroes/${hero.id}.png`)}
          alt={hero.name}
          width={420}
          height={320}
          containerClassName="h-full w-full"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          fallbackClassName="text-3xl"
          fallbackText={hero.name.slice(0, 2)}
        />
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/65 to-transparent px-3 pb-3 pt-10"
          initial={{ y: '100%' }}
          whileHover={{ y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="grid grid-cols-2 gap-2 text-xs">
            <p className="rounded bg-black/35 px-2 py-1 font-mono">ATK {hero.stats.attack}</p>
            <p className="rounded bg-black/35 px-2 py-1 font-mono">DEF {hero.stats.defense}</p>
            <p className="rounded bg-black/35 px-2 py-1 font-mono">HP {hero.stats.hp}</p>
            <p className="rounded bg-black/35 px-2 py-1 font-mono">CMD {hero.stats.command}</p>
          </div>
        </motion.div>
      </div>

      <div className="p-4">
        <h3 className="font-hero text-2xl font-bold leading-none">{hero.name}</h3>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <TypeIcon type={hero.type} />
          <RarityBadge rarity={hero.rarity} />
          <TierBadge tier={hero.tier} />
          {hero.isMeta ? <span className="rounded-full border border-neon-green/40 bg-neon-green/20 px-2 py-1 text-[10px] uppercase tracking-wide text-neon-green">Meta</span> : null}
        </div>
        <p className="mt-3 line-clamp-1 text-sm text-text-secondary">{hero.whyGood}</p>
      </div>
    </motion.button>
  );
}
