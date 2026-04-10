import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className }: SkeletonProps) {
  return <div className={cn('skeleton-shimmer rounded-md bg-bg-tertiary/70', className)} aria-hidden="true" />;
}
