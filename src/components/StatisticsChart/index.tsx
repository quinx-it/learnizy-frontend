import { Box } from '@mui/material';
import { FC } from 'react';

import AreaChart from '@/components/AreaChart';
import { CalendarIcon } from '@/components/Icons';
import { Text } from '@/components/Typography';
import { useTranslation } from '@/hooks';

import { WEEK_DAYS } from './constants';
import { StatisticsChartPropsType } from './typings';

import { HeaderContainer, StatisticsWrapper, TitleWrapper } from './styles';

const StatisticsChart: FC<StatisticsChartPropsType> = (props) => {
  const { weeklyActivity } = props;

  const { t } = useTranslation();

  const totalLessons = weeklyActivity.reduce((acc, item) => acc + item.lessonsCompleted, 0);
  const totalTests = weeklyActivity.reduce((acc, item) => acc + item.testsPassed, 0);

  const chartData = weeklyActivity.map((item) => {
    const dateObj = new Date(item.date);
    const dayName = t(WEEK_DAYS[dateObj.getDay()]);

    return { day: dayName, value: item.lessonsCompleted + item.testsPassed };
  });

  return (
    <Box>
      <HeaderContainer>
        <TitleWrapper>
          <CalendarIcon type="blue" />
          <Text variant="m">{t('STATISTICS_CHART.LAST_WEEK')}</Text>
        </TitleWrapper>
        <StatisticsWrapper>
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
        </StatisticsWrapper>
      </HeaderContainer>
      <AreaChart data={chartData} />
    </Box>
  );
};

export default StatisticsChart;
