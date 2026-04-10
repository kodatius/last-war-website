'use client';

import { cn } from '@/lib/utils';

interface TabOption<T extends string> {
  key: T;
  label: string;
}

interface TabsProps<T extends string> {
  options: Array<TabOption<T>>;
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export default function Tabs<T extends string>({ options, value, onChange, className }: TabsProps<T>) {
  return (
    <div className={cn('rounded-xl border border-border bg-bg-secondary p-1', className)} role="tablist" aria-label="Tabs">
      <div className="grid grid-cols-1 gap-1 sm:grid-cols-3">
        {options.map((option) => {
          const active = option.key === value;
          return (
            <button
              key={option.key}
              type="button"
              role="tab"
              aria-selected={active}
              className={cn(
                'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                active ? 'bg-accent text-black' : 'text-text-secondary hover:bg-bg-tertiary hover:text-text-primary'
              )}
              onClick={() => onChange(option.key)}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
