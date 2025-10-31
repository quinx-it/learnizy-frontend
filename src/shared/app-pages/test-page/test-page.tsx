'use client';
import { CardWrapper } from '@/shared/components/card-wrapper';
import { globalConstants, routes } from '@/shared/constants';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs';
import React, { FC } from 'react';
import { constants } from './constants';
import { Text } from '@/shared/ui/typography';
import { LessonTestForm } from '@/shared/components/lesson-test-form';
import { LessonTestSubmitType } from '@/api/endpoints/test/types';
import { FullscreenLoader } from '@/shared/components/fullscreen-loader/fullscreen-loader';
import { ErrorSection } from '@/shared/components/error-section';
import { useSendTestMutation } from '@/api/endpoints/test/test';
import { showToast } from '@/shared/ui/toaster';
import { TestType, TestPagePropsType } from './typings';
import { useTranslation } from 'react-i18next';

export const TestPage: FC<TestPagePropsType> = (props) => {
  const { lessonId, moduleId, lessonTest, isLoading, isError, refetch } = props;

  const { t } = useTranslation();

  const [sendTestResult, { isLoading: isLoadingResult }] = useSendTestMutation();

  if (isLoading) return <FullscreenLoader />;
  if (isError || !lessonTest) return <ErrorSection reset={refetch} />;

  const {
    questions,
    moduleSequenceOrder,
    lessonSequenceOrder,
    passThresholdPercentage,
    id,
    testType: rawTestType,
  } = lessonTest;

  const testType = rawTestType as TestType;

  const title = constants.title[testType];
  const description = constants.description[testType];
  const currentBreadcrumbs = constants.breadcrumbs(
    moduleId,
    lessonId,
    testType,
    lessonSequenceOrder,
    moduleSequenceOrder,
  );

  const onSubmit = async (data: LessonTestSubmitType) => {
    try {
      await sendTestResult(data).unwrap();
      showToast('info', 'Отлично!', 'Тест пройден');
    } catch {
      showToast('error', 'Ошибка', 'Не удалось отправить тест');
    }
  };

  return (
    <>
      <Breadcrumbs
        items={currentBreadcrumbs}
        rootHref={testType === 'LESSON_TEST' ? routes.user.modules : routes.user.exams}
        rootLabel={
          testType === 'LESSON_TEST'
            ? t(globalConstants.rootBreadcrumbLabels.modulesLabel)
            : t(globalConstants.rootBreadcrumbLabels.examsLabel)
        }
      />
      <div className="space-y-6">
        <CardWrapper className="flex flex-col gap-5">
          <div>
            <Text variant="l" className="text-medium mb-5">
              {t(title)}{' '}
              {testType === 'LESSON_TEST' ? lessonSequenceOrder + 1 : moduleSequenceOrder}
            </Text>

            <hr className="border-gray mb-4" />
            <div className="space-y-1">
              <Text variant="l" className="mb-4 whitespace-pre-wrap xl:max-w-[90%]">
                {t(description)}
              </Text>
              <Text variant="m" className="text-medium">
                {t(constants.questionAmount)} {questions.length}
              </Text>
              <Text variant="m" className="text-medium">
                {t(constants.procent)} {passThresholdPercentage}%
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
