'use client';

import { Box } from '@mui/material';
import { FC } from 'react';

import { LessonTestSubmitType, useSendTestMutation } from '@/api/endpoints/test';
import Breadcrumbs from '@/components/Breadcrumbs';
import ErrorSection from '@/components/ErrorSection';
import FullscreenLoader from '@/components/FullscreenLoader';
import LessonTestForm from '@/components/LessonTestForm';
import { showToast } from '@/components/Toaster';
import { Text } from '@/components/Typography';
import { globalConstants, routes } from '@/constants';
import { useTranslation } from '@/hooks';

import { constants, TestType } from './constants';
import { TestPagePropsType } from './typings';

import {
  CardContent,
  Container,
  DescriptionWrapper,
  Divider,
  InfoContainer,
  TitleWrapper,
} from './styles';

const TestPage: FC<TestPagePropsType> = (props) => {
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
        rootHref={testType === TestType.LESSON ? routes.user.modules : routes.user.exams}
        rootLabel={
          testType === TestType.LESSON
            ? t(globalConstants.rootBreadcrumbLabels.modulesLabel)
            : t(globalConstants.rootBreadcrumbLabels.examsLabel)
        }
      />
      <Container>
        <CardContent>
          <Box>
            <TitleWrapper>
              <Text variant="l" className="text-medium">
                {t(title)}{' '}
                {testType === 'LESSON_TEST' ? lessonSequenceOrder + 1 : moduleSequenceOrder}
              </Text>
            </TitleWrapper>

            <Divider />
            <InfoContainer>
              <DescriptionWrapper>
                <Text variant="l">{t(description)}</Text>
              </DescriptionWrapper>
              <Text variant="m" className="text-medium">
                {t(constants.questionAmount)} {questions.length}
              </Text>
              <Text variant="m" className="text-medium">
                {t(constants.procent)} {passThresholdPercentage}%
              </Text>
            </InfoContainer>
          </Box>
        </CardContent>
        <CardContent>
          <LessonTestForm
            loading={isLoadingResult}
            onSubmit={onSubmit}
            questions={questions}
            testId={id}
          />
        </CardContent>
      </Container>
    </>
  );
};

export default TestPage;
