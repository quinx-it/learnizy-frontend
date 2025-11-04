'use client';

import React from 'react';
import { StudentsTable } from '@/components/StudentsTable';
import { Breadcrumbs } from '@/ui/breadcrumbs';
import { useGetDashboardAnalyticsQuery } from '@/api/endpoints/admin';
import { AnalyticsCard } from '@/components/AnalyticsCard';
import { ProgressBar } from '@/ui/progress';
import Page from '@/components/Page';

export const MentorStudentsPage = () => {
  const { data } = useGetDashboardAnalyticsQuery();

  const growthPercentage =
    data?.userGrowthChart && data.userGrowthChart.newUsersMonthly > 0
      ? (data.userGrowthChart.activeUsersMonthly / data.userGrowthChart.newUsersMonthly) * 100
      : 0;

  return (
    <Page noIndex>
      <div>
        <Breadcrumbs rootLabel="Главная" rootDescription="Ментор" />

        {data?.analyticsSummary && (
          <div className="my-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
          </div>
        )}

        {data?.userGrowthChart && (
          <div className="my-6 w-[400px]">
            <AnalyticsCard title={`Рост новых пользователей`}>
              <div className="flex items-center gap-4">
                <ProgressBar
                  value={growthPercentage}
                  variant="circular"
                  size={60}
                  strokeWidth={6}
                />

                <div className="flex flex-col text-sm text-gray-600">
                  <div>
                    Новые пользователи:{' '}
                    <span className="font-semibold">{data.userGrowthChart.newUsersMonthly}</span>
                  </div>
                  <div>
                    Активные пользователи:{' '}
                    <span className="font-semibold">{data.userGrowthChart.activeUsersMonthly}</span>
                  </div>
                </div>
              </div>
            </AnalyticsCard>
          </div>
        )}
        {data?.userTable && <StudentsTable students={data.userTable} />}
      </div>
    </Page>
  );
};
