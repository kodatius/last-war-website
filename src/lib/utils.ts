import { QuizQuestion } from '@/types';

export function cn(...values: Array<string | false | undefined | null>): string {
  return values.filter(Boolean).join(' ');
}

export function getTipOfDayIndex(length: number): number {
  return Math.floor(Date.now() / 86400000) % length;
}

export function hashCode(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function seededShuffle<T>(items: T[], seedText: string): T[] {
  const result = [...items];
  let seed = hashCode(seedText) || 1;

  for (let i = result.length - 1; i > 0; i -= 1) {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    const j = Math.floor((seed / 4294967296) * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

export function getDailyChallengeQuestions(questions: QuizQuestion[]): QuizQuestion[] {
  const dateKey = new Date().toDateString();
  return seededShuffle(questions, dateKey).slice(0, 5);
}

export function normalize(input: string): string {
  return input.toLowerCase().trim();
}
