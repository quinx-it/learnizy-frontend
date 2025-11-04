'use client';
import { CardWrapper } from '@/components/CardWrapper';
import { globalConstants, routes } from '@/constants';
import { Breadcrumbs } from '@/ui/breadcrumbs';
import React, { FC } from 'react';
import { constants, TestType } from './constants';
import { Text } from '@/ui/typography';
import { LessonTestForm } from '@/components/LessonTestForm';
import { LessonTestSubmitType } from '@/api/endpoints/test';
import { FullscreenLoader } from '@/components/FullscreenLoader';
import { ErrorSection } from '@/components/ErrorSection';
import { useSendTestMutation } from '@/api/endpoints/test';
import { showToast } from '@/ui/toaster';
import { TestPagePropsType } from './typings';
import { useTranslation } from 'react-i18next';
import Page from '@/components/Page';

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
