import { TYPE_COLORS } from '@/lib/constants';
import LocalImage from '@/components/ui/LocalImage';
import { cn } from '@/lib/utils';
import { HeroType } from '@/types';

interface TypeIconProps {
  type: HeroType;
}

export default function TypeIcon({ type }: TypeIconProps) {
  const iconSrc = type === 'Tank' ? '/images/ui/tank.png' : type === 'Aircraft' ? '/images/ui/aircraft.png' : '/images/ui/missile.png';

  return (
    <span className={cn('inline-flex items-center gap-1 text-xs font-medium', TYPE_COLORS[type])}>
      <LocalImage
        src={iconSrc}
        alt={`${type} type`}
        width={14}
        height={14}
        containerClassName="h-[14px] w-[14px]"
        className="h-full w-full object-contain"
        fallbackText={type.slice(0, 1)}
      />
      {type}
    </span>
  );
}
