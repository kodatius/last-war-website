'use client';

import { useMotionValueEvent, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ScoreDisplayProps {
  score: number;
  maxScore: number;
  current: number;
  total: number;
}

export default function ScoreDisplay({ score, maxScore, current, total }: ScoreDisplayProps) {
  const spring = useSpring(0, { stiffness: 120, damping: 20 });
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    spring.set(score);
  }, [score, spring]);

  useMotionValueEvent(spring, 'change', (latest) => {
    setAnimatedScore(Math.round(latest));
  });

  return (
    <div className="rounded-lg border border-border bg-bg-secondary p-4">
      <p className="text-sm text-text-secondary">Score</p>
      <p className="text-2xl font-bold text-accent">
        {animatedScore} / {maxScore}
      </p>
      <p className="mt-1 text-sm text-text-secondary">
        {Math.min(current + 1, total)} / {total}
      </p>
    </div>
  );
}
