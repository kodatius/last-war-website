import { GameEvent } from '@/types';

interface WeeklyCalendarProps {
  events: GameEvent[];
}

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function WeeklyCalendar({ events }: WeeklyCalendarProps) {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="overflow-x-auto">
      <div className="grid min-w-[720px] grid-cols-7 gap-2">
        {days.map((day) => (
          <div
            key={day}
            className={`rounded-lg border p-3 ${day === today ? 'border-accent' : 'border-border'} bg-bg-secondary`}
          >
            <p className="mb-2 text-sm font-semibold">{day.slice(0, 3)}</p>
            <div className="space-y-1">
              {events
                .filter((event) => event.daysActive?.includes(day))
                .map((event) => (
                  <div key={event.id} className="rounded-full bg-bg-tertiary px-2 py-1 text-xs">
                    {event.icon} {event.name.slice(0, 12)}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
