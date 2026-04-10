'use client';

import { useEffect } from 'react';

export function useKeyboardShortcut(handler: () => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const onKeydown = (event: KeyboardEvent) => {
      const isMod = event.metaKey || event.ctrlKey;
      const isK = event.key.toLowerCase() === 'k';
      if (!isMod || !isK) return;
      event.preventDefault();
      handler();
    };

    window.addEventListener('keydown', onKeydown);
    return () => window.removeEventListener('keydown', onKeydown);
  }, [enabled, handler]);
}
