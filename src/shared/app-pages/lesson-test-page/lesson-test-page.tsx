'use client';
import { CardWrapper } from '@/shared/components/card-wrapper';
import { globalConstants, routes } from '@/shared/constants';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs';
import React from 'react';
import { constants } from './constants';
import { Text } from '@/shared/ui/typography';
import { LessonTestForm } from '@/shared/components/lesson-test-form';
import { LessonTestSubmit } from '@/api/endpoints/test/types';
import { useGetTestByLessonIdQuery } from '@/api/endpoints/test';
import { FullscreenLoader } from '@/shared/components/fullscreen-loader/fullscreen-loader';
import { ErrorSection } from '@/shared/components/error-section';
import { useSendTestMutation } from '@/api/endpoints/test/test';
import { showToast } from '@/shared/ui/toaster';

type LessonTestPageProps = {
  lessonId: string;
};

export const LessonTestPage = ({ lessonId }: LessonTestPageProps) => {
  const { breadcrumbs } = constants;
  const { data: lessonTest, isLoading, isError, refetch } = useGetTestByLessonIdQuery(+lessonId);
  const [sendTestResult, { isLoading: isLoadingResult }] = useSendTestMutation();

  if (isLoading) {
    return <FullscreenLoader />;
  }

  if (isError || !lessonTest) {
    return <ErrorSection reset={refetch} />;
  }

  const {
    questions,
    title,
    passThresholdPercentage,
    id,
    lessonSequenceOrder,
    moduleSequenceOrder,
  } = lessonTest;


  const onSubmit = async (data: LessonTestSubmit) => {
    try {

      const testResult = await sendTestResult(data).unwrap();
      console.log(testResult);
      showToast('info', 'Отлично!', 'Тест пройден');
    } catch (error) {
      console.error('Ошибка отправки данных теста: ', error);
    }
  };

  return (
    <>
      <Breadcrumbs
        items={breadcrumbs(moduleSequenceOrder, lessonSequenceOrder)}
        rootHref={routes.user.modules}
        rootLabel={globalConstants.rootBreadcrumbLabels.modulesLabel}
      />

      <div className="space-y-6">
        <CardWrapper className="flex flex-col gap-5">
          <div>
            <Text variant="l" className="text-medium mb-5">
              {title} {lessonSequenceOrder}
            </Text>
            <hr className="border-gray mb-4" />
            <div className="space-y-1">
              <Text variant={'l'} className="mb-4 whitespace-pre-wrap xl:max-w-[90%]">
                {constants.description}
              </Text>
              <Text variant={'m'} className="text-medium">
                {constants.questionAmount} {questions.length}
              </Text>
              <Text variant={'m'} className="text-medium">
                {constants.procent} {passThresholdPercentage}%
              </Text>
            </div>
          </div>
        </CardWrapper>
        <CardWrapper className="flex flex-col gap-5">
          <LessonTestForm
            loading={isLoadingResult}
            onSubmit={onSubmit}
            questions={questions}
            testId={id}
          />
        </CardWrapper>
      </div>
    </>
  );
};
