'use client';

import React, { FC, useEffect, useRef } from 'react';

import { useGetLastTestAttemptQuery, useGetTestByLessonIdQuery } from '@/api/endpoints/test';
import { CardWrapper } from '@/components/CardWrapper';
import { ErrorSection } from '@/components/ErrorSection';
import { FullscreenLoader } from '@/components/FullscreenLoader';
import Page from '@/components/Page';
import { globalConstants, routes } from '@/constants';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Text } from '@/components/ui/Typography';

import { LessonTestResponseType, LessonTestResultPagePropsType } from './types';

const mapEvaluation = (evaluation: string) => {
  switch (evaluation) {
    case 'CORRECT':
      return { text: 'Верно', color: 'text-green-600', value: 1 };
    case 'PARTIAL':
      return { text: 'Частично верно', color: 'text-yellow-600', value: 0.5 };
    case 'INCORRECT':
      return { text: 'Неверно', color: 'text-red-600', value: 0 };
    default:
      return { text: 'Ответ находится на проверке', color: 'text-gray-600', value: 0 };
  }
};

export const LessonTestResultPage: FC<LessonTestResultPagePropsType> = (props) => {
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
    <Page noIndex>
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

      <div className="space-y-6">
        <CardWrapper className="flex flex-col gap-5">
          <div>
            <Text variant="l" className="text-medium mb-5">
              Результаты теста {lessonSequenceOrder + 1}
            </Text>
            <hr className="border-gray mb-4" />
            <div className="space-y-1">
              <Text variant="m" className="text-medium">
                Результат: {scorePercent}%
              </Text>
              <Text variant="m" className="text-medium">
                Статус: {status === 'SUBMITTED' ? 'В обработке' : passed ? 'Пройден' : 'Не пройден'}
              </Text>
            </div>
          </div>
        </CardWrapper>

        <div className="space-y-4">
          {answers.map((a, idx) => {
            const evaluation = mapEvaluation(a.evaluation);

            return (
              <CardWrapper key={a.questionId} className="flex flex-col gap-3">
                <Text
                  variant="m"
                  className="mb-5 text-[20px] leading-[27px] font-medium transition-colors"
                >
                  {idx + 1}. {a.questionText}
                </Text>
                <Text variant="m" className="text-medium break-words">
                  Ваш ответ: {a.textAnswer || a.voiceTranscript || '—'}
                </Text>

                <Text variant="m" className={evaluation.color}>
                  {evaluation.text}
                </Text>
                {a.notes && (
                  <Text variant="m" className="text-gray-500">
                    Примечание: {a.notes}
                  </Text>
                )}
              </CardWrapper>
            );
          })}
        </div>
      </div>
    </Page>
  );
};
