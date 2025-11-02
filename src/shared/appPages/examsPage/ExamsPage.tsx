'use client';

import { CircleIcon } from '@/shared/ui/icons';
import { Heading } from '@/shared/ui/Typography';
import React, { FC } from 'react';
import { ExamCard } from './ExamCard';
import { useGetExamsQuery } from '@/api/endpoints/exams';
import { FullscreenLoader } from '@/shared/components/fullscreenLoader/FullscreenLoader';
import { ErrorSection } from '@/shared/components/errorSection';
import { ExamStatus, ExamType, ExamsPageProps } from './typings';
import { useTranslation } from 'react-i18next';
import Page from '@/shared/components/page';

const mapExamStatus = (status: string): ExamStatus => {
  switch (status) {
    case 'PASSED':
      return ExamStatus.Completed;
    case 'FAILED':
      return ExamStatus.Failed;
    case 'AVAILABLE':
      return ExamStatus.Available;
    case 'BLOCKED':
    default:
      return ExamStatus.Unavailable;
  }
};

export const ExamsPage: FC<ExamsPageProps> = (props) => {
  const { courseId = 1 } = props;

  const { t } = useTranslation();

  const { data, isLoading, isError, refetch } = useGetExamsQuery({ courseId, page: 0, size: 10 });

  if (isLoading) return <FullscreenLoader />;
  if (isError || !data) return <ErrorSection reset={refetch} />;

  return (
    <Page noIndex>
      <div className="grid grid-cols-1 gap-6">
        <div className="color-soft text-soft flex items-center justify-baseline gap-3 align-middle">
          <Heading variant="2xl" className="text-black">
            {t('EXAMS.TITLE')}
          </Heading>
          <CircleIcon className="block" />
          <Heading variant="2xl">Java Core</Heading>
        </div>

        {data.content.map((examItem) => {
          const exam: ExamType = {
            ...examItem,
            title: t('EXAMS.MODULE_TITLE', { moduleNumber: examItem.moduleSequenceOrder }),
            description: examItem.moduleTitle,
            questions: examItem.questionsCount,
            time: 20,
          };

          return (
            <ExamCard key={examItem.testId} exam={exam} status={mapExamStatus(examItem.status)} />
          );
        })}
      </div>
    </Page>
  );
};
