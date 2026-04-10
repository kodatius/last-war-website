import CategoryBadge from '@/components/ui/CategoryBadge';
import GlassCard from '@/components/ui/GlassCard';
import { tips } from '@/data/tips-data';
import { getTipOfDayIndex } from '@/lib/utils';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function TipOfTheDay() {
  const tip = tips[getTipOfDayIndex(tips.length)];

  return (
    <GlassCard className="h-full">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Tip Of The Day</p>
        <Sparkles size={16} className="text-accent" />
      </div>
      <p className="mt-4 text-base leading-relaxed sm:text-lg">{tip.text}</p>
      <div className="mt-5 flex items-center justify-between gap-3">
        <CategoryBadge emoji={tip.emoji} label={tip.category} />
        <Link href="/tips" className="text-sm text-accent hover:text-accent-light">
          Open tips -&gt;
        </Link>
      </div>
    </GlassCard>
  );
}
