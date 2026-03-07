import { RARITY_COLORS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Rarity } from '@/types';

interface RarityBadgeProps {
  rarity: Rarity;
}

export default function RarityBadge({ rarity }: RarityBadgeProps) {
  return (
    <span className={cn('rounded-full border px-2.5 py-1 text-xs font-semibold', RARITY_COLORS[rarity])}>{rarity}</span>
  );
}
