import Card from '@/components/ui/Card';
import LocalImage from '@/components/ui/LocalImage';
import { Term } from '@/types';

interface TermCardProps {
  term: Term;
}

function getTermIcon(term: Term): { src: string; alt: string } | null {
  const corpus = `${term.term} ${term.aliases.join(' ')} ${term.definition}`.toLowerCase();

  if (corpus.includes('tank')) return { src: '/images/ui/tank.png', alt: 'Tank type' };
  if (corpus.includes('aircraft')) return { src: '/images/ui/aircraft.png', alt: 'Aircraft type' };
  if (corpus.includes('missile')) return { src: '/images/ui/missile.png', alt: 'Missile type' };
  if (corpus.includes('iron')) return { src: '/images/ui/iron.png', alt: 'Iron resource' };
  if (corpus.includes('food')) return { src: '/images/ui/food.png', alt: 'Food resource' };
  if (corpus.includes('gold') || corpus.includes('coin')) return { src: '/images/ui/coin.png', alt: 'Coin resource' };
  if (corpus.includes('diamond')) return { src: '/images/ui/diamond.png', alt: 'Diamond resource' };
  return null;
}

export default function TermCard({ term }: TermCardProps) {
  const termIcon = getTermIcon(term);

  return (
    <Card className="h-full">
      <div className="flex items-center gap-2">
        {termIcon ? (
          <LocalImage
            src={termIcon.src}
            alt={termIcon.alt}
            width={20}
            height={20}
            containerClassName="h-5 w-5"
            className="h-full w-full object-contain"
            fallbackText="T"
          />
        ) : null}
        <p className="text-xl font-semibold text-accent">{term.term}</p>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {term.aliases.map((alias) => (
          <span key={alias} className="rounded-full border border-border px-2 py-1 text-xs text-text-secondary">
            {alias}
          </span>
        ))}
      </div>
      <p className="mt-4 text-sm text-text-secondary">{term.definition}</p>
      <span className="mt-4 inline-block rounded-full bg-bg-tertiary px-2.5 py-1 text-xs uppercase text-text-primary">
        {term.category}
      </span>
    </Card>
  );
}
