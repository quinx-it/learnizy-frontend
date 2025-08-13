import { Breadcrumbs } from '@/shared/ui/breadcrumbs';
import React from 'react';
import { constants } from './constants';
import { CardWrapper } from '@/shared/components/card-wrapper';
import { ProgressCard } from '@/shared/components/progress-card';
import { Text } from '@/shared/ui/typography';
import { CourseListItem } from '@/shared/components/course-list-item';
import { AccordionReview } from '@/shared/ui/accordion-review';
import { StatisticsChart } from '@/shared/components/statistics-chart';

export const LearnMainPage = () => {

  return (
    <>
      <Breadcrumbs rootDescription={constants.titles.courseName} />
      <div className="grid grid-cols-2 gap-4">
        <ProgressCard
          title={constants.titles.currentCourse}
          subTitle={constants.titles.courseName}
          modules={0}
          totalLessons={36}
          totalModules={9}
          lessons={0}
          image="/images/rocket.webp"
        />
        <ProgressCard
          title={constants.titles.currentModule}
          subTitle={constants.titles.moduleName}
          totalLessons={9}
          lessons={0}
          status={'Продолжить'}
        />
        <CardWrapper>
          <div>
            <Text variant="m-bold" className="mb-4">
              Курс{' '}
              <Text tag="span" className="text-medium" variant={'m-bold'}>
                {constants.titles.courseName}
              </Text>
            </Text>
            <hr className="border-gray mb-4" />
            <ul className="space-y-4">
              {constants.courseListItems.map(({ number, status, title }) => (
                <li key={number}>
                  <CourseListItem number={number} status={status} title={title} />
                </li>
              ))}
            </ul>
          </div>
        </CardWrapper>
        <CardWrapper className="row-span-2">
          <div>
            <Text variant="m-bold" className="!font-montserrat mb-4">
              {constants.titles.review}
            </Text>
            <hr className="border-gray mb-4" />
            <div className="overflow-auto">
              <AccordionReview items={constants.accordionItems} />
            </div>
          </div>
        </CardWrapper>
        <CardWrapper>
          <div>
            <Text variant="m-bold" className="mb-4">
              {constants.titles.statistics}
            </Text>
            <hr className="border-gray mb-4" />
            <StatisticsChart lessons={constants.lessonsNumber} tests={constants.testsNumber} />
          </div>
        </CardWrapper>
      </div>
    </>
  );
};
