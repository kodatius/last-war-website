import type { QuizQuestion } from '@/types';
import {
  DIFFICULTY_POINTS,
  QUIZ_QUESTIONS,
  type Difficulty,
} from './raw/quiz-data';

export const quizQuestions: QuizQuestion[] = QUIZ_QUESTIONS.map((question, index) => ({
  id: index + 1,
  question: question.question,
  options: question.options,
  correctIndex: question.correctAnswer,
  explanation: question.explanation,
  difficulty: question.difficulty,
  points: DIFFICULTY_POINTS[question.difficulty as Difficulty],
}));
