'use client';

import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { LessonTestSubmitType, useSendTestMutation } from '@/api/endpoints/test';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CardWrapper } from '@/components/CardWrapper';
import { ErrorSection } from '@/components/ErrorSection';
import { FullscreenLoader } from '@/components/FullscreenLoader';
import { LessonTestForm } from '@/components/LessonTestForm';
import Page from '@/components/Page';
import { showToast } from '@/components/Toaster';
import { Text } from '@/components/Typography';
import { globalConstants, routes } from '@/constants';

import { constants, TestType } from './constants';
import { TestPagePropsType } from './typings';

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
    <Page noIndex>
      <Breadcrumbs
        items={currentBreadcrumbs}
        rootHref={testType === TestType.LESSON ? routes.user.modules : routes.user.exams}
        rootLabel={
          testType === TestType.LESSON
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
    </Page>
  );
};
