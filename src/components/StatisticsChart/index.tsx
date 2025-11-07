import { FC } from 'react';

import AreaChart from '@/components/AreaChart';
import { CalendarIcon } from '@/components/Icons';
import { Text } from '@/components/Typography';

import { WEEK_DAYS } from './constants';
import { StatisticsChartPropsType } from './typings';

const StatisticsChart: FC<StatisticsChartPropsType> = (props) => {
  const { weeklyActivity } = props;

  const t = (label: string) => label;

  const totalLessons = weeklyActivity.reduce((acc, item) => acc + item.lessonsCompleted, 0);
  const totalTests = weeklyActivity.reduce((acc, item) => acc + item.testsPassed, 0);

  const chartData = weeklyActivity.map((item) => {
    const dateObj = new Date(item.date);
    const dayName = t(WEEK_DAYS[dateObj.getDay()]);

    return { day: dayName, value: item.lessonsCompleted + item.testsPassed };
  });

  return (
    <div>
      <div className="mb-4 flex justify-between gap-2">
        <div className="flex items-center gap-2">
          <CalendarIcon type="blue" />
          <Text variant="m">{t('STATISTICS_CHART.LAST_WEEK')}</Text>
        </div>
        <div className="flex items-center gap-3">
          <Text variant="m">
            <Text tag="span" variant="l-bold" className="text-medium">
              {totalLessons}
            </Text>{' '}
            {t('STATISTICS_CHART.LESSONS')}
          </Text>
          <Text variant="m">
            <Text tag="span" variant="l-bold" className="text-medium">
              {totalTests}
            </Text>{' '}
            {t('STATISTICS_CHART.TESTS')}
          </Text>
        </div>
      </div>
      <AreaChart data={chartData} />
    </div>
  );
};

export default StatisticsChart;
