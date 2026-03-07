interface DailyChallengeProps {
  completed: boolean;
}

export default function DailyChallenge({ completed }: DailyChallengeProps) {
  const date = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="rounded-lg border border-border bg-bg-secondary p-4">
      <h2 className="text-lg font-semibold">Daily Challenge - {date}</h2>
      <p className="mt-2 text-sm text-text-secondary">
        {completed ? 'Completed for today. You can still review results.' : '5 deterministic questions shared with all members today.'}
      </p>
    </div>
  );
}
