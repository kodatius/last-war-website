import type { QuizQuestion } from '@/types';
import { img } from '@/lib/prefix';
import {
  CATEGORY_NAMES,
  DIFFICULTY_POINTS,
  QUIZ_QUESTIONS,
  type QuizCategory,
  type Difficulty,
} from './raw/quiz-data';

function getQuestionImage(questionId: string, category: string): { src: string; alt: string } | null {
  if (category === 'heroes') {
    if (questionId === 'h3') return { src: img('/images/heroes/murphy.png'), alt: 'Murphy portrait' };
    if (questionId === 'h7') return { src: img('/images/heroes/carlie.png'), alt: 'Carlie portrait' };
    return { src: img('/images/heroes/kimberly.png'), alt: 'Hero portrait' };
  }

  if (category === 'events') {
    if (questionId === 'e2') return { src: img('/images/banners/game.jpg'), alt: 'Gameplay event scene' };
    return { src: img('/images/banners/map.png'), alt: 'Event map' };
  }

  return null;
}

export const quizQuestions: QuizQuestion[] = QUIZ_QUESTIONS.map((question, index) => ({
  ...(() => {
    const image = getQuestionImage(question.id, question.category);
    return image ? { imageSrc: image.src, imageAlt: image.alt } : {};
  })(),
  id: index + 1,
  key: question.id,
  question: question.question,
  options: question.options,
  correctIndex: question.correctAnswer,
  explanation: question.explanation,
  difficulty: question.difficulty,
  points: DIFFICULTY_POINTS[question.difficulty as Difficulty],
  category: question.category as QuizCategory,
}));

export const quizCategoryNames = CATEGORY_NAMES;
