'use client';
import { CardWrapper } from '@/shared/components/card-wrapper';
import { globalConstants, routes } from '@/shared/constants';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs';
import React from 'react';
import { Text } from '@/shared/ui/typography';
import { useGetLastTestAttemptQuery } from '@/api/endpoints/test';
import { useGetTestByLessonIdQuery } from '@/api/endpoints/test';

import { FullscreenLoader } from '@/shared/components/fullscreen-loader/fullscreen-loader';
import { ErrorSection } from '@/shared/components/error-section';

type AnswerView = {
  questionId: number;
  questionText: string;
  textAnswer: string | null;
  voiceTranscript: string | null;
  evaluation: 'CORRECT' | 'INCORRECT' | 'PARTIAL' | 'UNASSESSED';
  notes?: string | null;
};

type LessonTestResultPageProps = {
  lessonId: string;
  moduleId: string;
};

const mapEvaluation = (evaluation: string) => {
  switch (evaluation) {
    case 'CORRECT':
      return { text: 'Верно', color: 'text-green-600', value: 1 };
    case 'PARTIAL':
      return { text: 'Частично верно', color: 'text-yellow-600', value: 0.5 };
    case 'INCORRECT':
      return { text: 'Неверно', color: 'text-red-600', value: 0 };
    default:
      return { text: 'Не оценено', color: 'text-gray-600', value: 0 };
  }
};

export const LessonTestResultPage = ({ lessonId, moduleId }: LessonTestResultPageProps) => {
  const { data: lessonTest } = useGetTestByLessonIdQuery(+lessonId);

  const {
    data: testResult,
    isLoading,
    isError,
    refetch,
  } = useGetLastTestAttemptQuery(Number(lessonTest?.id));

  if (isLoading) return <FullscreenLoader />;
  if (isError || !testResult) return <ErrorSection reset={refetch} />;

  const { answers } = testResult;

  const totalPoints = answers.reduce((sum, a) => sum + mapEvaluation(a.evaluation).value, 0);
  const scorePercent = answers.length > 0 ? Math.round((totalPoints / answers.length) * 100) : 0;
  const passed = scorePercent >= 70;

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Модуль', href: routes.user.modules },
          { label: lessonId, href: '' },
        ]}
        rootHref={routes.user.modules}
        rootLabel={globalConstants.rootBreadcrumbLabels.modulesLabel}
      />

      <div className="space-y-6">
        <CardWrapper className="flex flex-col gap-5">
          <div>
            <Text variant="l" className="text-medium mb-5">
              Результаты теста
            </Text>
            <hr className="border-gray mb-4" />
            <div className="space-y-1">
              <Text variant="m" className="text-medium">
                Результат: {scorePercent}%
              </Text>
              <Text variant="m" className="text-medium">
                Статус: {passed ? 'Пройден' : 'Не пройден'}
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
                <Text variant="m" className="text-medium">
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
    </>
  );
};
