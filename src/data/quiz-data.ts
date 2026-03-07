import type { QuizQuestion } from '@/types';
import {
  DIFFICULTY_POINTS,
  QUIZ_QUESTIONS,
  type Difficulty,
} from './raw/quiz-data';

function getQuestionImage(questionId: string, category: string): { src: string; alt: string } | null {
  if (category === 'heroes') {
    if (questionId === 'h3') return { src: '/images/heroes/murphy.png', alt: 'Murphy portrait' };
    if (questionId === 'h7') return { src: '/images/heroes/carlie.png', alt: 'Carlie portrait' };
    return { src: '/images/heroes/kimberly.png', alt: 'Hero portrait' };
  }

  if (category === 'events') {
    if (questionId === 'e2') return { src: '/images/banners/game.jpg', alt: 'Gameplay event scene' };
    return { src: '/images/banners/map.png', alt: 'Event map' };
  }

  return null;
}

export const quizQuestions: QuizQuestion[] = QUIZ_QUESTIONS.map((question, index) => ({
  ...(() => {
    const image = getQuestionImage(question.id, question.category);
    return image ? { imageSrc: image.src, imageAlt: image.alt } : {};
  })(),
  id: index + 1,
  question: question.question,
  options: question.options,
  correctIndex: question.correctAnswer,
  explanation: question.explanation,
  difficulty: question.difficulty,
  points: DIFFICULTY_POINTS[question.difficulty as Difficulty],
}));
