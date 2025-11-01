'use client';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import React from 'react';
import { constants } from './constants';
import { CardWrapper } from '@/shared/components/CardWrapper';
import { ProgressCard } from '@/shared/components/ProgressCard';
import { ProgressStatus } from '@/shared/components/ProgressCard/constants';
import { Text } from '@/shared/ui/typography';
import { CourseListItem } from '@/shared/components/CourseListItem';
import { StatisticsChart } from '@/shared/components/StatisticsChart';
import { useGetMainPageProgressQuery } from '@/api/endpoints/progress/progress';
import { routes } from '@/shared/constants';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Page from '@/shared/components/Page';

export const LearnMainPage = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const { data: mainPageProgress, error } = useGetMainPageProgressQuery();

  if (error || !mainPageProgress) return null;

  const currentModule = mainPageProgress.modules.find(
    (mod) => mod.id === mainPageProgress.courseInfo.currentModuleId,
  );

  return (
    <Page key="MAIN_PAGE_SEO">
      <Breadcrumbs rootDescription={mainPageProgress.courseInfo.title || ''} />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ProgressCard
          title={t(constants.titles.currentCourse)}
          subTitle={mainPageProgress.courseInfo.title || ''}
          modules={mainPageProgress.courseInfo.completedModules || 0}
          totalLessons={mainPageProgress.courseInfo.totalLessons || 0}
          totalModules={mainPageProgress.courseInfo.totalModules || 0}
          lessons={mainPageProgress.courseInfo.completedLessons || 0}
          image="/images/rocket.webp"
        />

        <ProgressCard
          title={t(constants.titles.currentModule)}
          subTitle={currentModule?.title || t(constants.titles.moduleName)}
          totalLessons={currentModule?.totalLessons || 0}
          lessons={currentModule?.completedLessons || 0}
          status={ProgressStatus.CONTINUE}
          onClick={() => currentModule && router.push(`${routes.user.modules}/${currentModule.id}`)}
        />

        <CardWrapper>
          <div>
            <Text variant="m-bold" className="mb-4">
              {t('COURSE_LABEL')}{' '}
              <Text tag="span" className="text-medium" variant={'m-bold'}>
                {mainPageProgress.courseInfo.title}
              </Text>
            </Text>
            <hr className="border-gray mb-4" />
            <ul className="space-y-4">
              {mainPageProgress.modules.map((module) => {
                const moduleProgress =
                  module.totalLessons > 0
                    ? (module.completedLessons / module.totalLessons) * 100
                    : 0;
                let status: keyof typeof constants.statuses = 'NOT_STARTED';
                if (module.completionStatus === 'BLOCKED') {
                  status = 'BLOCKED';
                } else if (module.completionStatus === 'COMPLETED') {
                  status = 'COMPLETED';
                } else if (module.completedLessons > 0) {
                  status = 'IN_PROGRESS';
                }
                return (
                  <li key={module.id}>
                    <CourseListItem
                      number={module.sequenceNumber}
                      title={module.title}
                      status={status}
                      progress={moduleProgress}
                      onClick={() =>
                        status !== 'BLOCKED' && router.push(`${routes.user.modules}/${module.id}`)
                      }
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </CardWrapper>
        <CardWrapper>
          <div>
            <Text variant="m-bold" className="mb-4">
              {t(constants.titles.statistics)}
            </Text>
            <hr className="border-gray mb-4" />
            <StatisticsChart weeklyActivity={mainPageProgress.weeklyActivity ?? []} />
          </div>
        </CardWrapper>
      </div>
    </Page>
  );
};
