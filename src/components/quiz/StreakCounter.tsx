interface StreakCounterProps {
  streak: number;
}

function streakFlames(streak: number): string {
  if (streak <= 0) return '';
  if (streak < 3) return '🔥';
  if (streak < 6) return '🔥🔥';
  if (streak < 10) return '🔥🔥🔥';
  return '🔥🔥🔥🔥';
}

export default function StreakCounter({ streak }: StreakCounterProps) {
  return (
    <div className="rounded-lg border border-border bg-bg-secondary/75 p-3">
      <p className="text-xs uppercase tracking-wider text-text-secondary">Streak</p>
      <p className="text-lg font-semibold text-accent">
        {streak} {streakFlames(streak)}
      </p>
    </div>
  );
}
