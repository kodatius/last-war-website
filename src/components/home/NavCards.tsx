import Card from '@/components/ui/Card';
import { BookOpen, Brain, CalendarClock, Layers3, ShieldAlert, Swords } from 'lucide-react';
import Link from 'next/link';

const cards = [
  { href: '/heroes', title: 'Heroes', description: 'Tier list and build guidance.', icon: ShieldAlert },
  { href: '/events', title: 'Events', description: 'Schedules and strategies.', icon: CalendarClock },
  { href: '/squads', title: 'Squads', description: 'Formations and counters.', icon: Layers3 },
  { href: '/tips', title: 'Tips', description: '108 practical optimization tips.', icon: Swords },
  { href: '/glossary', title: 'Glossary', description: '32 key terms explained.', icon: BookOpen },
  { href: '/quiz', title: 'Quiz', description: 'Test your war knowledge.', icon: Brain },
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
                <Icon className="text-accent" size={22} />
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
