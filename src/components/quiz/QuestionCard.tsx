'use client';

import DifficultyBadge from '@/components/ui/DifficultyBadge';
import LocalImage from '@/components/ui/LocalImage';
import { cn } from '@/lib/utils';
import { QuizQuestion } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';

interface QuestionCardProps {
  question: QuizQuestion;
  selected: number | null;
  onSelect: (index: number) => void;
  onNext: () => void;
}

export default function QuestionCard({ question, selected, onSelect, onNext }: QuestionCardProps) {
  const answered = selected !== null;

  return (
    <article className="glass-card rounded-xl border border-glass-border p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <DifficultyBadge difficulty={question.difficulty} />
        <span className="rounded-md border border-border bg-bg-primary/50 px-2 py-1 text-xs text-text-secondary">
          {question.points} pts • {question.category}
        </span>
      </div>

      {question.imageSrc ? (
        <LocalImage
          src={question.imageSrc}
          alt={question.imageAlt ?? 'Question image'}
          width={960}
          height={420}
          containerClassName="mt-4 h-36 overflow-hidden rounded-lg border border-border bg-bg-tertiary sm:h-44"
          className="h-full w-full object-cover"
          fallbackText="Quiz image"
        />
      ) : null}

      <h2 className="mt-4 text-xl font-semibold">{question.question}</h2>

      <div className="mt-5 space-y-2">
        {question.options.map((option, index) => {
          const isCorrect = index === question.correctIndex;
          const isSelected = selected === index;

          return (
            <motion.button
              key={option}
              type="button"
              className={cn(
                'w-full rounded-lg border p-3 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                answered
                  ? isCorrect
                    ? 'border-green-400/70 bg-green-500/20 shadow-[0_0_18px_rgba(34,197,94,0.25)]'
                    : isSelected
                      ? 'border-red-400/70 bg-red-500/20 shadow-[0_0_18px_rgba(239,68,68,0.25)]'
                      : 'border-border bg-bg-tertiary/80'
                  : 'border-border bg-bg-tertiary/70 hover:border-accent/60 hover:bg-bg-tertiary'
              )}
              onClick={() => onSelect(index)}
              disabled={answered}
              whileTap={{ scale: answered ? 1 : 0.98 }}
            >
              {String.fromCharCode(65 + index)}. {option}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {answered ? (
          <motion.div
            className="mt-4 rounded-lg border border-border bg-bg-tertiary/70 p-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <p className="text-sm text-text-secondary">{question.explanation}</p>
            <button
              type="button"
              onClick={onNext}
              className="mt-3 rounded-md bg-accent px-3 py-2 text-sm font-semibold text-black"
            >
              Next Question
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
}
