'use client';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { QuizMode, QuizScore } from '@/types';
import { useMemo, useState } from 'react';

interface LeaderboardProps {
  pendingScore: {
    mode: QuizMode;
    score: number;
    total: number;
  };
}

const STORAGE_KEY = 'vikf_quiz_leaderboard_v2';

export default function Leaderboard({ pendingScore }: LeaderboardProps) {
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(false);
  const [scores, setScores] = useLocalStorage<QuizScore[]>(STORAGE_KEY, []);

  const topScores = useMemo(
    () =>
      [...scores]
        .sort((a, b) => {
          const aPct = a.total ? a.score / a.total : 0;
          const bPct = b.total ? b.score / b.total : 0;
          if (bPct !== aPct) return bPct - aPct;
          return b.score - a.score;
        })
        .slice(0, 10),
    [scores]
  );

  const submitScore = () => {
    if (!name.trim() || saved) return;

    const entry: QuizScore = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      player: name.trim().slice(0, 18),
      date: new Date().toISOString(),
      mode: pendingScore.mode,
      score: pendingScore.score,
      total: pendingScore.total,
    };

    setScores((current) => [...current, entry]);
    setSaved(true);
  };

  return (
    <section className="rounded-xl border border-border bg-bg-secondary/80 p-5">
      <h3 className="text-lg font-semibold">Leaderboard</h3>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          maxLength={18}
          placeholder="Enter commander name"
          className="w-full rounded-lg border border-border bg-bg-primary px-3 py-2 text-sm outline-none ring-accent focus:ring-2"
          aria-label="Commander name"
        />
        <button
          type="button"
          onClick={submitScore}
          disabled={!name.trim() || saved}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saved ? 'Saved' : 'Save Score'}
        </button>
      </div>

      <ol className="mt-4 space-y-2">
        {topScores.map((entry, index) => (
          <li key={entry.id} className="flex items-center justify-between rounded-lg border border-border bg-bg-primary/40 px-3 py-2 text-sm">
            <span>
              #{index + 1} {entry.player}
            </span>
            <span className="text-text-secondary">
              {entry.score}/{entry.total} • {entry.mode}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
