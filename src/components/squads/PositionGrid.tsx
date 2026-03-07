const positions = [
  { slot: 'Front Left', target: 'Targets Rear Right' },
  { slot: 'Front Right', target: 'Targets Rear Left' },
  { slot: 'Rear Left', target: 'Targets Front Left' },
  { slot: 'Rear Center', target: 'Targets Front Left' },
  { slot: 'Rear Right', target: 'Targets Front Right' },
];

export default function PositionGrid() {
  return (
    <div className="rounded-lg border border-border bg-bg-secondary p-4 sm:p-6">
      <div className="grid grid-cols-2 gap-3">
        {positions.slice(0, 2).map((position) => (
          <div key={position.slot} className="rounded-lg border border-accent/40 bg-bg-tertiary p-3 text-center">
            <p className="font-semibold">{position.slot}</p>
            <p className="text-xs text-text-secondary">{position.target}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-3">
        {positions.slice(2).map((position) => (
          <div key={position.slot} className="rounded-lg border border-border bg-bg-tertiary p-3 text-center">
            <p className="font-semibold">{position.slot}</p>
            <p className="text-xs text-text-secondary">{position.target}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
