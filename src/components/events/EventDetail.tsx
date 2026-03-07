import { EventStrategy } from '@/types';

interface EventDetailProps {
  strategies: EventStrategy[];
}

export default function EventDetail({ strategies }: EventDetailProps) {
  const initialStrategies = strategies.slice(0, 6);
  const overflowStrategies = strategies.slice(6);

  return (
    <div className="mt-4 space-y-3 border-t border-border pt-4">
      <ol className="list-decimal space-y-3 pl-5 text-sm text-text-secondary">
        {initialStrategies.map((strategy) => (
          <li key={strategy.title}>
            <span className="font-semibold text-text-primary">{strategy.title}:</span> {strategy.description}
          </li>
        ))}
      </ol>
      {overflowStrategies.length > 0 ? (
        <details className="rounded-lg border border-border bg-bg-tertiary p-3 text-sm">
          <summary className="cursor-pointer text-accent">Show more strategies</summary>
          <ol className="mt-3 list-decimal space-y-3 pl-5 text-text-secondary" start={7}>
            {overflowStrategies.map((strategy) => (
              <li key={strategy.title}>
                <span className="font-semibold text-text-primary">{strategy.title}:</span> {strategy.description}
              </li>
            ))}
          </ol>
        </details>
      ) : null}
    </div>
  );
}
