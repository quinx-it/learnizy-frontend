'use client';

import { type FC } from 'react';

import { useGetDashboardAnalyticsQuery } from '@/api/endpoints/admin';
import AnalyticsCard from '@/components/AnalyticsCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProgressBar from '@/components/Progress';
import StudentsTable from '@/components/StudentsTable';
import { useTranslation } from '@/hooks';

import {
  AnalyticsGrid,
  Container,
  GrowthChartContainer,
  ProgressContainer,
  StatsContainer,
  StatsRow,
  StatsValue,
} from './styles';

const MentorStudentsPage: FC = () => {
  const { t } = useTranslation();
  const { data } = useGetDashboardAnalyticsQuery();

  const growthPercentage =
    data?.userGrowthChart && data.userGrowthChart.newUsersMonthly > 0
      ? (data.userGrowthChart.activeUsersMonthly / data.userGrowthChart.newUsersMonthly) * 100
      : 0;

  return (
    <Container>
      <Breadcrumbs rootLabel={t('MENTOR.HOME')} rootDescription={t('MENTOR.ROLE')} />

      {data?.analyticsSummary && (
        <AnalyticsGrid>
          <AnalyticsCard
            title={t('MENTOR.TOTAL_USERS')}
            value={data.analyticsSummary.totalUsers.value}
            changePercentage={data.analyticsSummary.totalUsers.changePercentage}
          />
          <AnalyticsCard
            title={t('MENTOR.ACTIVE_USERS')}
            value={data.analyticsSummary.activeUsers.value}
            changePercentage={data.analyticsSummary.activeUsers.changePercentage}
          />
          <AnalyticsCard
            title={t('MENTOR.RETENTION_RATE')}
            value={data.analyticsSummary.retentionRate.value}
            changePercentage={data.analyticsSummary.retentionRate.changePercentage}
          />
        </AnalyticsGrid>
      )}

      {data?.userGrowthChart && (
        <GrowthChartContainer>
          <AnalyticsCard title={t('MENTOR.USER_GROWTH')}>
            <ProgressContainer>
              <ProgressBar value={growthPercentage} variant="circular" size={60} strokeWidth={6} />

              <StatsContainer>
                <StatsRow>
                  {t('MENTOR.NEW_USERS')}{' '}
                  <StatsValue>{data.userGrowthChart.newUsersMonthly}</StatsValue>
                </StatsRow>
                <StatsRow>
                  {t('MENTOR.ACTIVE_USERS_LABEL')}{' '}
                  <StatsValue>{data.userGrowthChart.activeUsersMonthly}</StatsValue>
                </StatsRow>
              </StatsContainer>
            </ProgressContainer>
          </AnalyticsCard>
        </GrowthChartContainer>
      )}
      {data?.userTable && <StudentsTable students={data.userTable} />}
    </Container>
  );
};

export default MentorStudentsPage;
