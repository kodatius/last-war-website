import SectionHeading from '@/components/ui/SectionHeading';
import { img } from '@/lib/prefix';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const QuizEngine = dynamic(() => import('@/components/quiz/QuizEngine'));

export const metadata: Metadata = {
  title: 'Quiz',
  description: 'Alliance knowledge quiz with quick, daily, and category challenge modes.',
  openGraph: {
    title: 'Quiz | [FATE] Alliance',
    description: 'Challenge modes, streaks, and local leaderboard.',
    images: [img('/images/banners/game.jpg')],
  },
};

export default function QuizPage() {
  return (
    <div className="container-shell py-16 sm:py-24">
      <SectionHeading title="Knowledge Quiz" subtitle="Answer fast, score high, improve alliance execution." />
      <QuizEngine />
    </div>
  );
}
