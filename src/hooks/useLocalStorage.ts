'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        setStoredValue(JSON.parse(item) as T);
      }
    } catch {
      setStoredValue(initialValue);
    } finally {
      setIsReady(true);
    }
  }, [initialValue, key]);

  useEffect(() => {
    if (typeof window === 'undefined' || !isReady) {
      return;
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      // Ignore write errors (quota/private mode)
    }
  }, [isReady, key, storedValue]);

  return [storedValue, setStoredValue];
}
