'use client';

import React, { useMemo } from 'react';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs';
import { constants } from './constants';
import { CardWrapper } from '@/shared/components/card-wrapper';
import { ProgressCard } from '@/shared/components/progress-card';
import { Text } from '@/shared/ui/typography';
import { CourseListItem } from '@/shared/components/course-list-item';
import { AccordionReview } from '@/shared/ui/accordion-review';
import { StatisticsChart } from '@/shared/components/statistics-chart';
import { useGetMainProgressQuery } from '@/api/endpoints/userProgress';
import { ErrorSection } from '@/shared/components/error-section';
import { FullscreenLoader } from '@/shared/components/fullscreen-loader/fullscreen-loader';
import { getModuleStatus } from './utils';

export const LearnMainPage = () => {
  const { data, isLoading, isError, refetch } = useGetMainProgressQuery();

  const { courseInfo, modules } = data ?? { courseInfo: null, modules: [] };

  const curModule = useMemo(() => {
    return modules.find((m) => m.id === courseInfo?.currentModuleId) ?? modules[0];
  }, [modules, courseInfo]);

  if (isLoading) return <FullscreenLoader />;
  if (isError || !data || !courseInfo) return <ErrorSection reset={refetch} />;

  const { titles, statuses, accordionItems, testsNumber } = constants;

  const moduleStatus = curModule ? statuses[curModule.completionStatus] : undefined;

  return (
    <>
      <Breadcrumbs rootDescription={courseInfo.title} />

      <div className="grid grid-cols-2 gap-4">
        <ProgressCard
          title={titles.currentCourse}
          subTitle={courseInfo.title}
          modules={courseInfo.completedModules}
          totalLessons={courseInfo.totalLessons}
          totalModules={courseInfo.totalModules}
          lessons={courseInfo.completedLessons}
          image="/images/rocket.webp"
        />
        {curModule && (
          <ProgressCard
            title={titles.currentModule}
            subTitle={curModule.title}
            totalLessons={curModule.totalLessons}
            lessons={curModule.completedLessons}
            status={moduleStatus}
          />
        )}

        <CardWrapper>
          <Section title={`Курс ${titles.courseName}`}>
            <ul className="space-y-4">
              {modules.map(
                ({ sequenceNumber, completionStatus, completedLessons, totalLessons, title }) => {
                  const moduleItemStatus = getModuleStatus(completionStatus);
                  return (
                    <li key={sequenceNumber}>
                      <CourseListItem
                        isCompleted={moduleItemStatus.completed}
                        sequenceNumber={sequenceNumber}
                        status={moduleItemStatus.statusText}
                        title={title}
                        totalLessons={totalLessons}
                        completedLessons={completedLessons}
                      />
                    </li>
                  );
                },
              )}
            </ul>
          </Section>
        </CardWrapper>

        <CardWrapper className="row-span-2">
          <Section title={titles.review}>
            <div className="overflow-auto">
              <AccordionReview items={accordionItems} />
            </div>
          </Section>
        </CardWrapper>

        <CardWrapper>
          <Section title={titles.statistics}>
            <StatisticsChart lessons={courseInfo.completedLessons} tests={testsNumber} />
          </Section>
        </CardWrapper>
      </div>
    </>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <Text variant="m-bold" className="mb-4">
      {title}
    </Text>
    <hr className="border-gray mb-4" />
    {children}
  </div>
);
