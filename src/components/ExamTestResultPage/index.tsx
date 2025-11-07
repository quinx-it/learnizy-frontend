'use client';

import { FC } from 'react';

import { useGetLastTestAttemptQuery } from '@/api/endpoints/test';
import Breadcrumbs from '@/components/Breadcrumbs';
import CardWrapper from '@/components/CardWrapper';
import ErrorSection from '@/components/ErrorSection';
import FullscreenLoader from '@/components/FullscreenLoader';
import { Text } from '@/components/Typography';
import { globalConstants, routes } from '@/constants';

import { ExamTestResultPagePropsType } from './typings';

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

      <div className="space-y-6">
        <CardWrapper className="flex flex-col gap-5">
          <div>
            <Text variant="l" className="text-medium mb-5">
              Результаты экзамена
            </Text>
            <hr className="border-gray mb-4" />
            <div className="space-y-1">
              <Text variant="m" className="text-medium">
                Результат: {scorePercent}%
              </Text>
              <Text variant="m" className="text-medium">
                Статус: {getStatus(testResult.status, passed)}
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
    </>
  );
};

export default ExamTestResultPage;
