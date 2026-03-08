'use client';

import SeasonOverview from '@/components/season/SeasonOverview';
import WeekDetail from '@/components/season/WeekDetail';
import WeekTimeline from '@/components/season/WeekTimeline';
import { seasonData } from '@/data/season-data';
import { useMemo, useState } from 'react';

export default function SeasonClient() {
  const [selectedWeek, setSelectedWeek] = useState(seasonData.weekSummaries[0]?.week ?? 1);

  const currentWeek = useMemo(
    () => seasonData.weekSummaries.find((week) => week.week === selectedWeek) ?? seasonData.weekSummaries[0],
    [selectedWeek]
  );

  if (!currentWeek) return null;

  return (
    <div className="space-y-4">
      <SeasonOverview season={seasonData} />
      <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
        <WeekTimeline weeks={seasonData.weekSummaries} selectedWeek={currentWeek.week} onSelectWeek={setSelectedWeek} />
        <WeekDetail week={currentWeek} />
      </div>
    </div>
  );
}
