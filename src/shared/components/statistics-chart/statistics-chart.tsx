import React from 'react';
import { CalendarIcon } from '@/shared/ui/icons';
import { AreaChart } from '@/shared/ui/areaChart';
import { Text } from '@/shared/ui/typography';

type WeeklyActivityItem = {
  date: string;
  lessonsCompleted: number;
  testsPassed: number;
};

type StatisticsChartProps = {
  weeklyActivity: WeeklyActivityItem[];
};

const WEEK_DAYS = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

export const StatisticsChart = ({ weeklyActivity }: StatisticsChartProps) => {
  const totalLessons = weeklyActivity.reduce((acc, item) => acc + item.lessonsCompleted, 0);
  const totalTests = weeklyActivity.reduce((acc, item) => acc + item.testsPassed, 0);

  const chartData = weeklyActivity.map((item) => {
    const dateObj = new Date(item.date);
    const dayName = WEEK_DAYS[dateObj.getDay()];
    return { day: dayName, value: item.lessonsCompleted + item.testsPassed };
  });

  return (
    <div>
      <div className="mb-4 flex justify-between gap-2">
        <div className="flex items-center gap-2">
          <CalendarIcon type="blue" />
          <Text variant={'m'}>За последнюю неделю</Text>
        </div>
        <div className="flex items-center gap-3">
          <Text variant={'m'}>
            <Text tag="span" variant={'l-bold'} className="text-medium">
              {totalLessons}
            </Text>{' '}
            уроков
          </Text>
          <Text variant={'m'}>
            <Text tag="span" variant={'l-bold'} className="text-medium">
              {totalTests}
            </Text>{' '}
            тестов
          </Text>
        </div>
      </div>
      <AreaChart data={chartData} />
    </div>
  );
};
