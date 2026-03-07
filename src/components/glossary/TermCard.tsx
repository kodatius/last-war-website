'use client';

import Card from '@/components/ui/Card';
import LocalImage from '@/components/ui/LocalImage';
import { img } from '@/lib/prefix';
import { Term } from '@/types';
import { Copy } from 'lucide-react';
import { Fragment, ReactNode } from 'react';

interface TermCardProps {
  term: Term;
  query?: string;
  relatedTerms: string[];
  onCopy: (term: Term) => void;
  onRelatedTermClick: (termLabel: string) => void;
}

function getTermIcon(term: Term): { src: string; alt: string } | null {
  const corpus = `${term.term} ${term.aliases.join(' ')} ${term.definition}`.toLowerCase();

  if (corpus.includes('tank')) return { src: img('/images/ui/tank.png'), alt: 'Tank type' };
  if (corpus.includes('aircraft')) return { src: img('/images/ui/aircraft.png'), alt: 'Aircraft type' };
  if (corpus.includes('missile')) return { src: img('/images/ui/missile.png'), alt: 'Missile type' };
  if (corpus.includes('iron')) return { src: img('/images/ui/iron.png'), alt: 'Iron resource' };
  if (corpus.includes('food')) return { src: img('/images/ui/food.png'), alt: 'Food resource' };
  if (corpus.includes('gold') || corpus.includes('coin')) return { src: img('/images/ui/coin.png'), alt: 'Coin resource' };
  if (corpus.includes('diamond')) return { src: img('/images/ui/diamond.png'), alt: 'Diamond resource' };
  return null;
}

function highlightChunk(chunk: string, query: string): ReactNode {
  if (!query) return chunk;
  const lower = chunk.toLowerCase();
  const q = query.toLowerCase();
  const index = lower.indexOf(q);
  if (index === -1) return chunk;

  return (
    <>
      {chunk.slice(0, index)}
      <mark className="rounded bg-accent/20 px-0.5 text-accent">{chunk.slice(index, index + q.length)}</mark>
      {chunk.slice(index + q.length)}
    </>
  );
}

export default function TermCard({ term, query = '', relatedTerms, onCopy, onRelatedTermClick }: TermCardProps) {
  const termIcon = getTermIcon(term);
  const relatedSet = new Set(relatedTerms.map((item) => item.toLowerCase()));

  return (
    <Card className="h-full">
      <div className="flex items-center justify-between gap-2">
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
        <button
          type="button"
          onClick={() => onCopy(term)}
          className="rounded-full border border-border p-1.5 text-text-secondary transition hover:border-accent/50 hover:text-text-primary"
          aria-label={`Copy ${term.term}`}
        >
          <Copy size={14} />
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {term.aliases.map((alias) => (
          <span key={alias} className="rounded-full border border-border px-2 py-1 text-xs text-text-secondary">
            {alias}
          </span>
        ))}
      </div>
      <p className="mt-4 text-sm text-text-secondary">
        {term.definition.split(/(\s+)/).map((chunk, index) => {
          const clean = chunk.replace(/[^a-zA-Z0-9%]/g, '').toLowerCase();
          if (clean && relatedSet.has(clean)) {
            return (
              <button
                key={`${chunk}-${index}`}
                type="button"
                onClick={() => onRelatedTermClick(chunk.replace(/[^a-zA-Z0-9%]/g, ''))}
                className="font-medium text-accent underline decoration-accent/50 underline-offset-2"
              >
                {highlightChunk(chunk, query)}
              </button>
            );
          }
          return <Fragment key={`${chunk}-${index}`}>{highlightChunk(chunk, query)}</Fragment>;
        })}
      </p>
      <span className="mt-4 inline-block rounded-full bg-bg-tertiary px-2.5 py-1 text-xs uppercase text-text-primary">
        {term.category}
      </span>
    </Card>
  );
}
