'use client';

import { Box } from '@mui/material';
import { type FC } from 'react';

import { type LessonTestSubmitType, useSendTestMutation } from '@/api/endpoints/test';
import Breadcrumbs from '@/components/Breadcrumbs';
import ErrorSection from '@/components/ErrorSection';
import FullscreenLoader from '@/components/FullscreenLoader';
import LessonTestForm from '@/components/LessonTestForm';
import { showToast } from '@/components/Toaster';
import { Text } from '@/components/Typography';
import { GLOBAL_CONSTANTS, ROUTES } from '@/const';
import { useTranslation } from '@/hooks';

import { constants, TestType } from './const';
import { type TestPagePropsType } from './typings';

import {
  CardContent,
  Container,
  DescriptionWrapper,
  Divider,
  InfoContainer,
  TitleWrapper,
  MediumText,
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
      showToast('info', t('TEST_PAGE.SUCCESS'), t('TEST_PAGE.TEST_PASSED'));
    } catch {
      showToast('error', t('COMMON.ERROR'), t('TEST_PAGE.ERROR_SEND'));
    }
  };

  return (
    <>
      <Breadcrumbs
        items={currentBreadcrumbs}
        rootHref={testType === TestType.Lesson ? ROUTES.user.modules : ROUTES.user.exams}
        rootLabel={
          testType === TestType.Lesson
            ? t(GLOBAL_CONSTANTS.rootBreadcrumbLabels.modulesLabel)
            : t(GLOBAL_CONSTANTS.rootBreadcrumbLabels.examsLabel)
        }
      />
      <Container>
        <CardContent>
          <Box>
            <TitleWrapper>
              <MediumText variant="l">
                {t(title)}{' '}
                {testType === 'LESSON_TEST' ? lessonSequenceOrder + 1 : moduleSequenceOrder}
              </MediumText>
            </TitleWrapper>

            <Divider />
            <InfoContainer>
              <DescriptionWrapper>
                <Text variant="l">{t(description)}</Text>
              </DescriptionWrapper>
              <MediumText variant="m">
                {t(constants.questionAmount)} {questions.length}
              </MediumText>
              <MediumText variant="m">
                {t(constants.procent)} {passThresholdPercentage}%
              </MediumText>
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
