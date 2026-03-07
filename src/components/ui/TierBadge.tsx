import { TIER_COLORS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Tier } from '@/types';

interface TierBadgeProps {
  tier: Tier;
}

export default function TierBadge({ tier }: TierBadgeProps) {
  return (
    <span className={cn('rounded-full px-2.5 py-1 text-xs font-bold', TIER_COLORS[tier])}>
      {tier}
    </span>
  );
}
