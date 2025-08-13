import React from 'react';
import { CalendarIcon } from '@/shared/ui/icons';
import { AreaChart } from '@/shared/ui/areaChart';
import { Text } from '@/shared/ui/typography';

type StatisticsChartProps = {
  lessons: number;
  tests: number;
};

export const StatisticsChart = ({ lessons, tests }: StatisticsChartProps) => {
  return (
    <div>
      <div className="flex justify-between gap-2">
        <div className="flex items-center gap-2">
          <CalendarIcon type="blue" />
          <Text variant={'m'}>За последнюю неделю</Text>
        </div>
        <div className="flex items-center gap-3">
          <Text variant={'m'}>
            <Text tag="span" variant={'l-bold'} className="text-medium">
              {lessons}
            </Text>{' '}
            уроков
          </Text>
          <Text variant={'m'}>
            <Text tag="span" variant={'l-bold'} className="text-medium">
              {tests}
            </Text>{' '}
            тестов
          </Text>
        </div>
      </div>
      <AreaChart />
    </div>
  );
};
