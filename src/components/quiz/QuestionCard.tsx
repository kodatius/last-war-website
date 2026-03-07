import DifficultyBadge from '@/components/ui/DifficultyBadge';
import { QuizQuestion } from '@/types';

interface QuestionCardProps {
  question: QuizQuestion;
  selected: number | null;
  onSelect: (index: number) => void;
  onNext: () => void;
}

export default function QuestionCard({ question, selected, onSelect, onNext }: QuestionCardProps) {
  const answered = selected !== null;

  return (
    <div className="rounded-lg border border-border bg-bg-secondary p-6">
      <div className="flex items-center justify-between gap-3">
        <DifficultyBadge difficulty={question.difficulty} />
        <span className="text-xs text-text-secondary">{question.points} pts</span>
      </div>
      <h2 className="mt-4 text-xl font-semibold">{question.question}</h2>
      <div className="mt-5 space-y-2">
        {question.options.map((option, index) => {
          const isCorrect = index === question.correctIndex;
          const isSelected = selected === index;
          const stateClass = answered
            ? isCorrect
              ? 'border-green-400 bg-green-500/20'
              : isSelected
                ? 'border-red-400 bg-red-500/20'
                : 'border-border bg-bg-tertiary'
            : 'border-border bg-bg-tertiary hover:border-accent';

          return (
            <button
              key={option}
              type="button"
              className={`w-full rounded-lg border p-3 text-left text-sm transition ${stateClass}`}
              onClick={() => onSelect(index)}
              disabled={answered}
            >
              {String.fromCharCode(65 + index)}. {option}
            </button>
          );
        })}
      </div>

      {answered ? (
        <div className="mt-4 rounded-lg border border-border bg-bg-tertiary p-3">
          <p className="text-sm text-text-secondary">{question.explanation}</p>
          <button
            type="button"
            onClick={onNext}
            className="mt-3 rounded-md bg-accent px-3 py-2 text-sm font-semibold text-black"
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
}
