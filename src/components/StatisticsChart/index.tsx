import { Box } from '@mui/material';
import Image from 'next/image';
import { FC } from 'react';

import AreaChart from '@/components/AreaChart';
import { Text } from '@/components/Typography';
import { useTranslation } from '@/hooks';

import { WEEK_DAY_KEYS } from './const';
import { StatisticsChartPropsType } from './typings';

import { HeaderContainer, StatisticsWrapper, TitleWrapper } from './styles';

const StatisticsChart: FC<StatisticsChartPropsType> = (props) => {
  const { weeklyActivity } = props;

  const { t } = useTranslation();

  const totalLessons = weeklyActivity.reduce((acc, item) => acc + item.lessonsCompleted, 0);
  const totalTests = weeklyActivity.reduce((acc, item) => acc + item.testsPassed, 0);

  const chartData = weeklyActivity.map((item) => {
    const dateObj = new Date(item.date);
    const dayName = t(WEEK_DAY_KEYS[dateObj.getDay()]);

    return { day: dayName, value: item.lessonsCompleted + item.testsPassed };
  });

  return (
    <Box>
      <HeaderContainer>
        <TitleWrapper>
          <Image
            src="/images/calendar-icon.svg"
            alt="Calendar icon"
            width={16}
            height={16}
            style={{ color: '#A9DBE9' }}
          />
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
