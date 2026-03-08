import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  tone?: 'default' | 'accent' | 'success' | 'warning' | 'danger';
}

const toneClassMap: Record<NonNullable<BadgeProps['tone']>, string> = {
  default: 'border-border/80 bg-bg-tertiary/70 text-text-secondary',
  accent: 'border-accent/40 bg-accent/15 text-accent',
  success: 'border-emerald-400/40 bg-emerald-500/15 text-emerald-300',
  warning: 'border-amber-400/40 bg-amber-500/15 text-amber-200',
  danger: 'border-red-400/40 bg-red-500/15 text-red-300',
};

export default function Badge({ children, className, tone = 'default' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold tracking-wide',
        toneClassMap[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
