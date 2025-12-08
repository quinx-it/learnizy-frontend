'use client';

import { Box } from '@mui/material';
import { FC, useEffect, useRef } from 'react';

import {
  AnswerEvaluation,
  useGetLastTestAttemptQuery,
  useGetTestByLessonIdQuery,
} from '@/api/endpoints/test';
import Breadcrumbs from '@/components/Breadcrumbs';
import ErrorSection from '@/components/ErrorSection';
import FullscreenLoader from '@/components/FullscreenLoader';
import { Text } from '@/components/Typography';
import { globalConstants, routes } from '@/const';
import { useTranslation } from '@/hooks';

import { evaluationMap } from './constants';
import { LessonTestResponseType, LessonTestResultPagePropsType } from './types';

import {
  AnswerCard,
  AnswerText,
  AnswersList,
  Container,
  Divider,
  NotesText,
  QuestionText,
  ResultCard,
  ResultInfo,
  ResultText,
  ResultTitle,
} from './styles';

const mapEvaluation = (evaluation: AnswerEvaluation | string | null | undefined) => {
  return (
    evaluationMap[evaluation as AnswerEvaluation] || evaluationMap[AnswerEvaluation.Unassessed]
  );
};

const getStatus = (status: string, passed: boolean, t: (key: string) => string) => {
  if (status === 'SUBMITTED') return t('TEST_RESULT.STATUS_PROCESSING');

  if (passed) return t('TEST_RESULT.STATUS_PASSED');

  return t('TEST_RESULT.STATUS_FAILED');
};

const LessonTestResultPage: FC<LessonTestResultPagePropsType> = (props) => {
  const { lessonId, moduleId } = props;
  const { t } = useTranslation();

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
          {
            label: `${t('TEST_RESULT.MODULE')} ${moduleSequenceOrder}`,
            href: `${routes.user.modules}/${moduleId}`,
          },
          {
            label: `${t('TEST_RESULT.LESSON')} ${lessonSequenceOrder + 1}`,
            href: `${routes.user.modules}/${moduleId}/${lessonId}`,
          },
          { label: t('TEST_RESULT.RESULTS'), href: `` },
        ]}
        rootHref={routes.user.modules}
        rootLabel={t(globalConstants.rootBreadcrumbLabels.modulesLabel)}
      />

      <Container>
        <ResultCard>
          <Box>
            <ResultTitle>
              <Text variant="l">
                {t('TEST_RESULT.TITLE_LESSON')} {lessonSequenceOrder + 1}
              </Text>
            </ResultTitle>
            <Divider />
            <ResultInfo>
              <ResultText>
                <Text variant="m">
                  {t('TEST_RESULT.RESULT_LABEL')} {scorePercent}%
                </Text>
              </ResultText>
              <ResultText>
                <Text variant="m">
                  {t('TEST_RESULT.STATUS_LABEL')} {getStatus(status, passed, t)}
                </Text>
              </ResultText>
            </ResultInfo>
          </Box>
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
                  <Text variant="m">
                    {t('TEST_RESULT.YOUR_ANSWER')} {a.textAnswer || a.voiceTranscript || '—'}
                  </Text>
                </AnswerText>

                <EvaluationComponent>
                  <Text variant="m">{t(evaluation.translationKey)}</Text>
                </EvaluationComponent>
                {a.notes && (
                  <NotesText>
                    <Text variant="m">
                      {t('TEST_RESULT.NOTE')} {a.notes}
                    </Text>
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
