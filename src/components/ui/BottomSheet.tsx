'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function BottomSheet({ open, onClose, title, children }: BottomSheetProps) {
  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label={`Close ${title}`}
            className="fixed inset-0 z-50 bg-black/55"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.section
            className="fixed inset-x-0 bottom-0 z-[60] rounded-t-2xl border border-border bg-bg-secondary/95 p-4 pb-8 shadow-[0_-16px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-border" />
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-accent">{title}</h3>
            <div>{children}</div>
          </motion.section>
        </>
      ) : null}
    </AnimatePresence>
  );
}
