import Card from '@/components/ui/Card';
import { Term } from '@/types';

interface TermCardProps {
  term: Term;
}

export default function TermCard({ term }: TermCardProps) {
  return (
    <Card className="h-full">
      <p className="text-xl font-semibold text-accent">{term.term}</p>
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
