'use client';

import { AnimatePresence, motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function Sheet({ open, onClose, title, children }: SheetProps) {
  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            className="fixed inset-0 z-50 bg-black/55"
            onClick={onClose}
            aria-label={`Close ${title}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.section
            className="fixed inset-x-0 bottom-0 z-[60] max-h-[80vh] overflow-y-auto rounded-t-2xl border border-border bg-bg-secondary p-4"
            role="dialog"
            aria-label={title}
            aria-modal="true"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-border" />
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-accent">{title}</h3>
            {children}
          </motion.section>
        </>
      ) : null}
    </AnimatePresence>
  );
}
