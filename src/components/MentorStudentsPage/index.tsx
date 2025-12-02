'use client';

import { FC } from 'react';

import { useGetDashboardAnalyticsQuery } from '@/api/endpoints/admin';
import AnalyticsCard from '@/components/AnalyticsCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProgressBar from '@/components/Progress';
import StudentsTable from '@/components/StudentsTable';

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
  const { data } = useGetDashboardAnalyticsQuery();

  const growthPercentage =
    data?.userGrowthChart && data.userGrowthChart.newUsersMonthly > 0
      ? (data.userGrowthChart.activeUsersMonthly / data.userGrowthChart.newUsersMonthly) * 100
      : 0;

  return (
    <Container>
      <Breadcrumbs rootLabel="Главная" rootDescription="Ментор" />

      {data?.analyticsSummary && (
        <AnalyticsGrid>
          <AnalyticsCard
            title="Общие число пользователей"
            value={data.analyticsSummary.totalUsers.value}
            changePercentage={data.analyticsSummary.totalUsers.changePercentage}
          />
          <AnalyticsCard
            title="Активные пользователи"
            value={data.analyticsSummary.activeUsers.value}
            changePercentage={data.analyticsSummary.activeUsers.changePercentage}
          />
          <AnalyticsCard
            title="Коэффициент удержания"
            value={data.analyticsSummary.retentionRate.value}
            changePercentage={data.analyticsSummary.retentionRate.changePercentage}
          />
        </AnalyticsGrid>
      )}

      {data?.userGrowthChart && (
        <GrowthChartContainer>
          <AnalyticsCard title="Рост новых пользователей">
            <ProgressContainer>
              <ProgressBar value={growthPercentage} variant="circular" size={60} strokeWidth={6} />

              <StatsContainer>
                <StatsRow>
                  Новые пользователи:{' '}
                  <StatsValue>{data.userGrowthChart.newUsersMonthly}</StatsValue>
                </StatsRow>
                <StatsRow>
                  Активные пользователи:{' '}
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
