'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function Drawer({ open, onClose, title, children }: DrawerProps) {
  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label={`Close ${title}`}
            className="fixed inset-0 z-50 bg-black/60"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            className="fixed right-0 top-0 z-[60] h-full w-full max-w-md border-l border-border bg-bg-secondary p-4 shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-accent">{title}</h3>
              <button
                type="button"
                className="rounded-md border border-border p-1 text-text-secondary hover:border-accent hover:text-accent"
                onClick={onClose}
              >
                <X size={16} />
              </button>
            </div>
            <div className="h-[calc(100%-2rem)] overflow-y-auto pr-1">{children}</div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
