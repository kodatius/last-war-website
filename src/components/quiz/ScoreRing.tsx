'use client';

import { motion } from 'framer-motion';

interface ScoreRingProps {
  score: number;
  total: number;
}

export default function ScoreRing({ score, total }: ScoreRingProps) {
  const percent = total > 0 ? Math.round((score / total) * 100) : 0;
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative mx-auto h-36 w-36">
      <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90">
        <circle cx="70" cy="70" r={radius} className="fill-none stroke-border" strokeWidth="10" />
        <motion.circle
          cx="70"
          cy="70"
          r={radius}
          className="fill-none stroke-accent"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 grid place-content-center text-center">
        <p className="text-2xl font-bold text-accent">{percent}%</p>
        <p className="text-xs text-text-secondary">
          {score} / {total}
        </p>
      </div>
    </div>
  );
}
