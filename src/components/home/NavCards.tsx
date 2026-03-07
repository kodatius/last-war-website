import Card from '@/components/ui/Card';
import LocalImage from '@/components/ui/LocalImage';
import { BookOpen, Brain, CalendarClock, Layers3, ShieldAlert, Swords } from 'lucide-react';
import Link from 'next/link';

const cards = [
  { href: '/heroes', title: 'Heroes', description: 'Tier list and build guidance.', icon: ShieldAlert, heroId: 'kimberly' },
  { href: '/events', title: 'Events', description: 'Schedules and strategies.', icon: CalendarClock, heroId: 'marshall' },
  { href: '/squads', title: 'Squads', description: 'Formations and counters.', icon: Layers3, heroId: 'murphy' },
  { href: '/tips', title: 'Tips', description: '108 practical optimization tips.', icon: Swords, heroId: 'dva' },
  { href: '/glossary', title: 'Glossary', description: '32 key terms explained.', icon: BookOpen, heroId: 'tesla' },
  { href: '/quiz', title: 'Quiz', description: 'Test your war knowledge.', icon: Brain, heroId: 'williams' },
];

export default function NavCards() {
  return (
    <section className="container-shell py-16 sm:py-24">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.href} href={card.href}>
              <Card className="h-full">
                <div className="flex items-center justify-between gap-3">
                  <Icon className="text-accent" size={22} />
                  <LocalImage
                    src={`/images/heroes/${card.heroId}.png`}
                    alt={`${card.title} featured hero`}
                    width={48}
                    height={48}
                    containerClassName="h-12 w-12 overflow-hidden rounded-md border border-border bg-bg-tertiary"
                    className="h-full w-full object-cover"
                    fallbackText="Hero"
                  />
                </div>
                <h3 className="mt-3 text-xl font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm text-text-secondary">{card.description}</p>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
