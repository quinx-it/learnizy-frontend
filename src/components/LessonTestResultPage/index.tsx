'use client';

import { FC, useEffect, useRef } from 'react';

import { useGetLastTestAttemptQuery, useGetTestByLessonIdQuery } from '@/api/endpoints/test';
import Breadcrumbs from '@/components/Breadcrumbs';
import ErrorSection from '@/components/ErrorSection';
import FullscreenLoader from '@/components/FullscreenLoader';
import { Text } from '@/components/Typography';
import { globalConstants, routes } from '@/constants';

import { LessonTestResponseType, LessonTestResultPagePropsType } from './types';

import {
  AnswerCard,
  AnswerText,
  AnswersList,
  Container,
  Divider,
  EvaluationTextCorrect,
  EvaluationTextIncorrect,
  EvaluationTextPartial,
  EvaluationTextPending,
  NotesText,
  QuestionText,
  ResultCard,
  ResultHeader,
  ResultInfo,
  ResultText,
  ResultTitle,
} from './styles';

const mapEvaluation = (evaluation: string) => {
  switch (evaluation) {
    case 'CORRECT':
      return { text: 'Верно', component: EvaluationTextCorrect, value: 1 };
    case 'PARTIAL':
      return { text: 'Частично верно', component: EvaluationTextPartial, value: 0.5 };
    case 'INCORRECT':
      return { text: 'Неверно', component: EvaluationTextIncorrect, value: 0 };
    default:
      return { text: 'Ответ находится на проверке', component: EvaluationTextPending, value: 0 };
  }
};

const getStatus = (status: string, passed: boolean) => {
  if (status === 'SUBMITTED') return 'В обработке';

  if (passed) return 'Пройден';

  return 'Не пройден';
};

const LessonTestResultPage: FC<LessonTestResultPagePropsType> = (props) => {
  const { lessonId, moduleId } = props;

  const { data: lessonTest } = useGetTestByLessonIdQuery(+lessonId);
  const {
    data: testResult,
    isLoading,
    isError,
    refetch,
  } = useGetLastTestAttemptQuery(Number(lessonTest?.id), {
    skip: !lessonTest?.id,
  });

  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!lessonTest?.id) return;

    if (!testResult || testResult.status === 'SUBMITTED') {
      if (!pollingRef.current) {
        pollingRef.current = setInterval(() => {
          refetch();
        }, 1000);
      }
    } else if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }

    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
    };
  }, [lessonTest?.id, testResult, refetch]);

  if (!testResult && isLoading) return <FullscreenLoader />;

  if (isError) return <ErrorSection reset={refetch} />;

  if (!testResult) return <FullscreenLoader />;

  const { moduleSequenceOrder, lessonSequenceOrder } = lessonTest as LessonTestResponseType;
  const { answers, status } = testResult;

  const totalPoints = answers.reduce((sum, a) => sum + mapEvaluation(a.evaluation).value, 0);
  const scorePercent = answers.length > 0 ? Math.round((totalPoints / answers.length) * 100) : 0;
  const passed = scorePercent >= 70;

  return (
    <>
      <Breadcrumbs
        items={[
          { label: `Модуль ${moduleSequenceOrder}`, href: `${routes.user.modules}/${moduleId}` },
          {
            label: `Урок ${lessonSequenceOrder + 1}`,
            href: `${routes.user.modules}/${moduleId}/${lessonId}`,
          },
          { label: `Результаты`, href: `` },
        ]}
        rootHref={routes.user.modules}
        rootLabel={globalConstants.rootBreadcrumbLabels.modulesLabel}
      />

      <Container>
        <ResultCard>
          <ResultHeader>
            <ResultTitle>
              <Text variant="l">Результаты теста {lessonSequenceOrder + 1}</Text>
            </ResultTitle>
            <Divider />
            <ResultInfo>
              <ResultText>
                <Text variant="m">Результат: {scorePercent}%</Text>
              </ResultText>
              <ResultText>
                <Text variant="m">Статус: {getStatus(status, passed)}</Text>
              </ResultText>
            </ResultInfo>
          </ResultHeader>
        </ResultCard>

        <AnswersList>
          {answers.map((a, idx) => {
            const evaluation = mapEvaluation(a.evaluation);
            const EvaluationComponent = evaluation.component;

            return (
              <AnswerCard key={a.questionId}>
                <QuestionText>
                  <Text variant="m">
                    {idx + 1}. {a.questionText}
                  </Text>
                </QuestionText>
                <AnswerText>
                  <Text variant="m">Ваш ответ: {a.textAnswer || a.voiceTranscript || '—'}</Text>
                </AnswerText>

                <EvaluationComponent>
                  <Text variant="m">{evaluation.text}</Text>
                </EvaluationComponent>
                {a.notes && (
                  <NotesText>
                    <Text variant="m">Примечание: {a.notes}</Text>
                  </NotesText>
                )}
              </AnswerCard>
            );
          })}
        </AnswersList>
      </Container>
    </>
  );
};

export default LessonTestResultPage;
