'use client';

import { FC } from 'react';

import { AnswerEvaluation, useGetLastTestAttemptQuery } from '@/api/endpoints/test';
import Breadcrumbs from '@/components/Breadcrumbs';
import CardWrapper from '@/components/CardWrapper';
import ErrorSection from '@/components/ErrorSection';
import FullscreenLoader from '@/components/FullscreenLoader';
import { globalConstants, routes } from '@/const';
import { useTranslation } from '@/hooks';

import { evaluationMap } from './constants';
import { ExamTestResultPagePropsType } from './typings';

import {
  Container,
  ResultCardContent,
  ResultTitle,
  StyledDivider,
  ResultsContainer,
  ResultText,
  AnswersContainer,
  AnswerCardContent,
  QuestionText,
  AnswerText,
  EvaluationText,
  NotesText,
} from './styles';

const mapEvaluation = (evaluation: string) => {
  const evaluationEnum = evaluation as AnswerEvaluation;

  return evaluationMap[evaluationEnum] || evaluationMap[AnswerEvaluation.Unassessed];
};

const getStatus = (status: string, passed: boolean, t: (key: string) => string) => {
  if (status === 'SUBMITTED') return t('TEST_RESULT.STATUS_PROCESSING');

  if (passed) return t('TEST_RESULT.STATUS_PASSED');

  return t('TEST_RESULT.STATUS_FAILED');
};

const ExamTestResultPage: FC<ExamTestResultPagePropsType> = (props) => {
  const { testId } = props;
  const { t } = useTranslation();

  const {
    data: testResult,
    isLoading,
    isError,
    refetch,
  } = useGetLastTestAttemptQuery(Number(testId));

  if (isLoading) return <FullscreenLoader />;

  if (isError || !testResult) return <ErrorSection reset={refetch} />;

  const { answers } = testResult;
  const totalPoints = answers.reduce((sum, a) => sum + mapEvaluation(a.evaluation).value, 0);
  const scorePercent = answers.length > 0 ? Math.round((totalPoints / answers.length) * 100) : 0;
  const passed = scorePercent >= 70;

  return (
    <>
      <Breadcrumbs
        items={[{ label: t('TEST_RESULT.RESULTS'), href: `` }]}
        rootHref={routes.user.exams}
        rootLabel={t(globalConstants.rootBreadcrumbLabels.examsLabel)}
      />

      <Container>
        <CardWrapper>
          <ResultCardContent>
            <ResultTitle variant="l">{t('TEST_RESULT.TITLE_EXAM')}</ResultTitle>
            <StyledDivider />
            <ResultsContainer>
              <ResultText variant="m">
                {t('TEST_RESULT.RESULT_LABEL')} {scorePercent}%
              </ResultText>
              <ResultText variant="m">
                {t('TEST_RESULT.STATUS_LABEL')} {getStatus(testResult.status, passed, t)}
              </ResultText>
            </ResultsContainer>
          </ResultCardContent>
        </CardWrapper>

        <AnswersContainer>
          {answers.map((a, idx) => {
            const evaluation = mapEvaluation(a.evaluation);

            return (
              <CardWrapper key={a.questionId}>
                <AnswerCardContent>
                  <QuestionText variant="m">
                    {idx + 1}. {a.questionText}
                  </QuestionText>
                  <AnswerText variant="m">
                    {t('TEST_RESULT.YOUR_ANSWER')} {a.textAnswer || a.voiceTranscript || '—'}
                  </AnswerText>
                  <EvaluationText variant="m" evaluation={evaluation.evaluation}>
                    {t(evaluation.translationKey)}
                  </EvaluationText>
                  {a.notes && (
                    <NotesText variant="m">
                      {t('TEST_RESULT.NOTE')} {a.notes}
                    </NotesText>
                  )}
                </AnswerCardContent>
              </CardWrapper>
            );
          })}
        </AnswersContainer>
      </Container>
    </>
  );
};

export default ExamTestResultPage;
