'use client';

import { quizQuestions } from '@/data/quiz-data';
import { getDailyChallengeQuestions, seededShuffle } from '@/lib/utils';
import { QuizQuestion } from '@/types';
import { useMemo, useState } from 'react';
import DailyChallenge from './DailyChallenge';
import QuestionCard from './QuestionCard';
import ScoreDisplay from './ScoreDisplay';

type QuizState = 'IDLE' | 'ANSWERING' | 'FEEDBACK' | 'COMPLETE';
type Mode = 'full' | 'daily';

export default function QuizEngine() {
  const [mode, setMode] = useState<Mode | null>(null);
  const [state, setState] = useState<QuizState>('IDLE');
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const questions = useMemo<QuizQuestion[]>(() => {
    if (!mode) return [];
    if (mode === 'daily') return getDailyChallengeQuestions(quizQuestions);
    return seededShuffle(quizQuestions, 'full-quiz-seed');
  }, [mode]);

  const maxScore = useMemo(() => questions.reduce((sum, question) => sum + question.points, 0), [questions]);
  const dailyDone = typeof window !== 'undefined' && localStorage.getItem('vikf_daily_done') === new Date().toDateString();

  const startQuiz = (nextMode: Mode) => {
    setMode(nextMode);
    setState('ANSWERING');
    setIndex(0);
    setScore(0);
    setSelected(null);
  };

  const handleSelect = (answerIndex: number) => {
    if (selected !== null) return;
    setSelected(answerIndex);
    const question = questions[index];
    if (question.correctIndex === answerIndex) {
      setScore((current) => current + question.points);
    }
    setState('FEEDBACK');
  };

  const handleNext = () => {
    if (index + 1 >= questions.length) {
      if (mode === 'daily') {
        localStorage.setItem('vikf_daily_done', new Date().toDateString());
      }
      setState('COMPLETE');
      return;
    }

    setIndex((current) => current + 1);
    setSelected(null);
    setState('ANSWERING');
  };

  const reset = () => {
    setMode(null);
    setState('IDLE');
    setIndex(0);
    setScore(0);
    setSelected(null);
  };

  if (state === 'IDLE') {
    return (
      <div className="space-y-4 rounded-lg border border-border bg-bg-secondary p-6">
        <h2 className="text-2xl font-semibold">Choose Mode</h2>
        <p className="text-sm text-text-secondary">Run a full quiz or daily challenge.</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button className="rounded-lg bg-accent px-4 py-3 font-semibold text-black" onClick={() => startQuiz('full')}>
            All Questions
          </button>
          <button className="rounded-lg border border-border px-4 py-3 font-semibold" onClick={() => startQuiz('daily')}>
            Daily Challenge
          </button>
        </div>
      </div>
    );
  }

  if (state === 'COMPLETE') {
    return (
      <div className="space-y-4 rounded-lg border border-border bg-bg-secondary p-6">
        <h2 className="text-2xl font-semibold text-accent">Mission Complete</h2>
        <p>
          Final Score: <span className="font-bold">{score}</span> / {maxScore}
        </p>
        <button className="rounded-lg bg-accent px-4 py-3 font-semibold text-black" onClick={reset}>
          Restart
        </button>
      </div>
    );
  }

  const question = questions[index];

  return (
    <div className="space-y-4">
      {mode === 'daily' ? <DailyChallenge completed={dailyDone} /> : null}
      <ScoreDisplay score={score} maxScore={maxScore} current={index} total={questions.length} />
      <QuestionCard question={question} selected={selected} onSelect={handleSelect} onNext={handleNext} />
    </div>
  );
}
