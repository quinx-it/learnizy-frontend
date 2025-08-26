'use client';
import { CardWrapper } from '@/shared/components/card-wrapper';
import { globalConstants, routes } from '@/shared/constants';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs';
import React from 'react';
import { constants } from './constants';
import { Text } from '@/shared/ui/typography';
import { LessonTestForm, LessonTestFormValues } from '@/shared/components/lesson-test-form';

type LessonTestPageProps = {
  lessonId: string;
  moduleId: string;
};

export const LessonTestPage = ({ lessonId, moduleId }: LessonTestPageProps) => {
  const { breadcrumbs } = constants;

  const onSubmit = async (data: LessonTestFormValues) => {
    try {
      console.log(data);
    } catch (error) {
      console.error('Ошибка отправки данных теста: ', error);
    }
  };

  return (
    <>
      <Breadcrumbs
        items={breadcrumbs(lessonId, moduleId)}
        rootHref={routes.user.modules}
        rootLabel={globalConstants.rootBreadcrumbLabels.modulesLabel}
      />

      <div className="space-y-6">
        <CardWrapper className="flex flex-col gap-5">
          <div>
            <Text variant="l" className="text-medium mb-5">
              {constants.title} {lessonId}
            </Text>
            <hr className="border-gray mb-4" />
            <div className="space-y-1">
              <Text variant={'l'} className="mb-4 whitespace-pre-wrap xl:max-w-[90%]">
                {constants.description}
              </Text>
              <Text variant={'m'} className="text-medium">
                {constants.questionAmount} {constants.questions.length}
              </Text>
              <Text variant={'m'} className="text-medium">
                {constants.procent} [X]%
              </Text>
            </div>
          </div>
        </CardWrapper>
        <CardWrapper className="flex flex-col gap-5">
          <LessonTestForm
            onSubmit={onSubmit}
            moduleId={moduleId}
            lessonId={lessonId}
            questions={constants.questions}
          />
        </CardWrapper>
      </div>
    </>
  );
};
