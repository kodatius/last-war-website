import QuizEngine from '@/components/quiz/QuizEngine';
import SectionHeading from '@/components/ui/SectionHeading';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quiz',
  description: 'Interactive alliance knowledge quiz for Last War: Survival with 100+ questions. Test your strategy knowledge with daily challenges and compete with alliance members.',
};

export default function QuizPage() {
  return (
    <div className="container-shell py-16 sm:py-24">
      <SectionHeading title="Knowledge Quiz" subtitle="Answer fast, score high, improve alliance execution." />
      <QuizEngine />
    </div>
  );
}
