import { FREQUENCY_COLORS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { EventFrequency } from '@/types';

interface FrequencyBadgeProps {
  frequency: EventFrequency;
}

export default function FrequencyBadge({ frequency }: FrequencyBadgeProps) {
  return (
    <span className={cn('rounded-full border px-2.5 py-1 text-xs font-medium capitalize', FREQUENCY_COLORS[frequency])}>
      {frequency}
    </span>
  );
}
