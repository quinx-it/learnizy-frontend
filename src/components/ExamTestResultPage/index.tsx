'use client';

import { FC } from 'react';

import { AnswerEvaluation, useGetLastTestAttemptQuery } from '@/api/endpoints/test';
import Breadcrumbs from '@/components/Breadcrumbs';
import CardWrapper from '@/components/CardWrapper';
import ErrorSection from '@/components/ErrorSection';
import FullscreenLoader from '@/components/FullscreenLoader';
import { globalConstants, routes } from '@/const';

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

  return evaluationMap[evaluationEnum] || evaluationMap[AnswerEvaluation.UNASSESSED];
};

const getStatus = (status: string, passed: boolean) => {
  if (status === 'SUBMITTED') return 'В обработке';

  if (passed) return 'Пройден';

  return 'Не пройден';
};

const ExamTestResultPage: FC<ExamTestResultPagePropsType> = (props) => {
  const { testId } = props;

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
        items={[{ label: `Результаты`, href: `` }]}
        rootHref={routes.user.exams}
        rootLabel={globalConstants.rootBreadcrumbLabels.examsLabel}
      />

      <Container>
        <CardWrapper>
          <ResultCardContent>
            <ResultTitle variant="l">Результаты экзамена</ResultTitle>
            <StyledDivider />
            <ResultsContainer>
              <ResultText variant="m">Результат: {scorePercent}%</ResultText>
              <ResultText variant="m">Статус: {getStatus(testResult.status, passed)}</ResultText>
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
                    Ваш ответ: {a.textAnswer || a.voiceTranscript || '—'}
                  </AnswerText>
                  <EvaluationText variant="m" evaluation={evaluation.evaluation}>
                    {evaluation.text}
                  </EvaluationText>
                  {a.notes && <NotesText variant="m">Примечание: {a.notes}</NotesText>}
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
