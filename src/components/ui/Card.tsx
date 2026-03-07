import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={`rounded-lg border border-border bg-bg-secondary p-4 transition-all duration-200 hover:scale-[1.02] hover:border-accent hover:shadow-[0_0_20px_rgba(212,160,23,0.15)] sm:p-6 ${className ?? ''}`}
    >
      {children}
    </div>
  );
}
