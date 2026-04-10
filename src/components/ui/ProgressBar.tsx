'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  className?: string;
}

export default function ProgressBar({ value, max = 100, label, className }: ProgressBarProps) {
  const safe = Math.max(0, Math.min(value, max));
  const percent = (safe / max) * 100;

  return (
    <div className={cn('space-y-2', className)}>
      {label ? <p className="text-xs text-text-secondary">{label}</p> : null}
      <div className="h-2 overflow-hidden rounded-full bg-bg-tertiary" role="progressbar" aria-valuenow={safe} aria-valuemin={0} aria-valuemax={max}>
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-accent-dark to-accent"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
