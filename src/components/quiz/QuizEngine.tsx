'use client';

import Leaderboard from '@/components/quiz/Leaderboard';
import QuestionCard from '@/components/quiz/QuestionCard';
import QuizModeSelect from '@/components/quiz/QuizModeSelect';
import ScoreRing from '@/components/quiz/ScoreRing';
import StreakCounter from '@/components/quiz/StreakCounter';
import ProgressBar from '@/components/ui/ProgressBar';
import { quizCategoryNames, quizQuestions } from '@/data/quiz-data';
import { getDailyChallengeQuestions, seededShuffle } from '@/lib/utils';
import { QuizCategory, QuizMode, QuizQuestion } from '@/types';
import { useMemo, useState } from 'react';

type QuizStage = 'select' | 'playing' | 'complete';

export default function QuizEngine() {
  const [mode, setMode] = useState<QuizMode>('quick');
  const [stage, setStage] = useState<QuizStage>('select');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [hardMode, setHardMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory>('heroes');

  const questions = useMemo<QuizQuestion[]>(() => {
    if (mode === 'daily') return getDailyChallengeQuestions(quizQuestions);

    if (mode === 'category') {
      const filtered = quizQuestions.filter((question) => question.category === selectedCategory);
      return seededShuffle(filtered, `${selectedCategory}-${new Date().toDateString()}`).slice(0, 10);
    }

    return seededShuffle(quizQuestions, `${Date.now()}`).slice(0, 10);
  }, [mode, selectedCategory]);

  const question = questions[questionIndex];
  const baseTotal = useMemo(
    () => questions.reduce((sum, currentQuestion) => sum + currentQuestion.points, 0) * (hardMode ? 1.5 : 1),
    [hardMode, questions]
  );
  const progress = questions.length ? ((questionIndex + (selected !== null ? 1 : 0)) / questions.length) * 100 : 0;

  const startQuiz = (nextMode: QuizMode) => {
    setMode(nextMode);
    setQuestionIndex(0);
    setSelected(null);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setStage('playing');
  };

  const handleSelect = (answerIndex: number) => {
    if (!question || selected !== null) return;

    setSelected(answerIndex);

    if (answerIndex === question.correctIndex) {
      setStreak((currentStreak) => {
        const nextStreak = currentStreak + 1;
        setBestStreak((best) => Math.max(best, nextStreak));

        const streakBonus = Math.min(5, Math.floor(nextStreak / 2));
        const hardBonus = hardMode ? 1.5 : 1;
        setScore((currentScore) => currentScore + Math.round((question.points + streakBonus) * hardBonus));

        return nextStreak;
      });
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (questionIndex + 1 >= questions.length) {
      setStage('complete');
      return;
    }

    setQuestionIndex((current) => current + 1);
    setSelected(null);
  };

  const reset = () => {
    setStage('select');
    setQuestionIndex(0);
    setSelected(null);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
  };

  if (stage === 'select') {
    return (
      <QuizModeSelect
        hardMode={hardMode}
        selectedCategory={selectedCategory}
        onHardModeChange={setHardMode}
        onCategoryChange={setSelectedCategory}
        onStart={startQuiz}
      />
    );
  }

  if (stage === 'complete') {
    return (
      <div className="space-y-4">
        <section className="rounded-xl border border-border bg-bg-secondary/80 p-5 text-center sm:p-6">
          <p className="text-sm uppercase tracking-widest text-text-secondary">Mission Complete</p>
          <h2 className="mt-1 text-2xl font-semibold text-accent">{mode === 'daily' ? 'Daily Challenge Cleared' : 'Quiz Cleared'}</h2>
          <ScoreRing score={score} total={Math.max(1, Math.round(baseTotal))} />
          <p className="mt-2 text-sm text-text-secondary">Best streak: {bestStreak}</p>
          <button
            type="button"
            onClick={reset}
            className="mt-4 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-black"
          >
            Play Again
          </button>
        </section>

        <Leaderboard
          pendingScore={{
            mode,
            score,
            total: Math.max(1, Math.round(baseTotal)),
          }}
        />
      </div>
    );
  }

  if (!question) {
    return (
      <div className="rounded-lg border border-border bg-bg-secondary p-5">
        <p className="text-sm text-text-secondary">No questions found for this mode. Choose another mode.</p>
        <button type="button" onClick={reset} className="mt-3 rounded-md bg-accent px-3 py-2 text-sm font-semibold text-black">
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-bg-secondary/75 p-3">
          <p className="text-xs uppercase tracking-wider text-text-secondary">Mode</p>
          <p className="text-lg font-semibold text-accent">{mode === 'category' ? quizCategoryNames[selectedCategory] : mode}</p>
        </div>
        <div className="rounded-lg border border-border bg-bg-secondary/75 p-3">
          <p className="text-xs uppercase tracking-wider text-text-secondary">Score</p>
          <p className="text-lg font-semibold">{score}</p>
        </div>
        <StreakCounter streak={streak} />
      </div>

      <ProgressBar value={progress} max={100} label={`Progress ${Math.min(questionIndex + 1, questions.length)} / ${questions.length}`} />
      <QuestionCard question={question} selected={selected} onSelect={handleSelect} onNext={handleNext} />
    </div>
  );
}
