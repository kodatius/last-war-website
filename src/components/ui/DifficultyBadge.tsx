import { DIFFICULTY_COLORS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Difficulty } from '@/types';

interface DifficultyBadgeProps {
  difficulty: Difficulty;
}

export default function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  return (
    <span className={cn('rounded-full border px-2.5 py-1 text-xs font-medium capitalize', DIFFICULTY_COLORS[difficulty])}>
      {difficulty}
    </span>
  );
}
