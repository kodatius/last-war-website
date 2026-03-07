import { RARITY_COLORS } from '@/lib/constants';
import LocalImage from '@/components/ui/LocalImage';
import { img } from '@/lib/prefix';
import { cn } from '@/lib/utils';
import { Rarity } from '@/types';

interface RarityBadgeProps {
  rarity: Rarity;
}

export default function RarityBadge({ rarity }: RarityBadgeProps) {
  const iconSrc = rarity === 'UR' ? img('/images/ui/ur.png') : rarity === 'SSR' ? img('/images/ui/ssr.png') : img('/images/ui/sr.png');

  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold', RARITY_COLORS[rarity])}>
      <LocalImage
        src={iconSrc}
        alt={`${rarity} rarity`}
        width={12}
        height={12}
        containerClassName="h-3 w-3"
        className="h-full w-full object-contain"
        fallbackText={rarity.slice(0, 1)}
      />
      {rarity}
    </span>
  );
}
