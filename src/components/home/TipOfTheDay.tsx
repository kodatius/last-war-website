import CategoryBadge from '@/components/ui/CategoryBadge';
import Card from '@/components/ui/Card';
import { tips } from '@/data/tips-data';
import { getTipOfDayIndex } from '@/lib/utils';
import Link from 'next/link';

export default function TipOfTheDay() {
  const tip = tips[getTipOfDayIndex(tips.length)];

  return (
    <section className="container-shell pb-16 sm:pb-24">
      <Card>
        <p className="text-sm text-accent">Tip Of The Day</p>
        <p className="mt-3 text-lg">{tip.text}</p>
        <div className="mt-4 flex items-center justify-between">
          <CategoryBadge emoji={tip.emoji} label={tip.category} />
          <Link href="/tips" className="text-sm text-accent hover:underline">
            See all tips -&gt;
          </Link>
        </div>
      </Card>
    </section>
  );
}
