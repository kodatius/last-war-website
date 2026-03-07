import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({ children, className }: GlassCardProps) {
  return <div className={cn('glass-card glass-card-hover rounded-xl p-4 sm:p-6', className)}>{children}</div>;
}
