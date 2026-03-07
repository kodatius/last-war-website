import { TYPE_COLORS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { HeroType } from '@/types';
import { Plane, Rocket, Shield } from 'lucide-react';

interface TypeIconProps {
  type: HeroType;
}

export default function TypeIcon({ type }: TypeIconProps) {
  const icon =
    type === 'Tank' ? <Shield size={14} /> : type === 'Aircraft' ? <Plane size={14} /> : <Rocket size={14} />;

  return (
    <span className={cn('inline-flex items-center gap-1 text-xs font-medium', TYPE_COLORS[type])}>
      {icon}
      {type}
    </span>
  );
}
