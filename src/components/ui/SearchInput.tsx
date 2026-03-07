'use client';

import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export default function SearchInput({ value, onChange, placeholder }: SearchInputProps) {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(internalValue);
    }, 300);

    return () => clearTimeout(timeout);
  }, [internalValue, onChange]);

  return (
    <label className="relative block">
      <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
      <input
        value={internalValue}
        onChange={(event) => setInternalValue(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-bg-secondary py-3 pl-10 pr-4 text-sm text-text-primary outline-none ring-accent focus:ring-2"
      />
    </label>
  );
}
