'use client';

import { CircleIcon } from '@/shared/ui/icons';
import { Heading } from '@/shared/ui/typography';
import React from 'react';
import { ExamCard } from './exam-card';
import { useGetExamsQuery } from '@/api/endpoints/exams';
import { FullscreenLoader } from '@/shared/components/fullscreen-loader/fullscreen-loader';
import { ErrorSection } from '@/shared/components/error-section';
import { ExamStatus, Exam } from './types';

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

export const ExamsPage = ({ courseId = 1 }: { courseId?: number }) => {
  const { data, isLoading, isError, refetch } = useGetExamsQuery({ courseId, page: 0, size: 10 });

  if (isLoading) return <FullscreenLoader />;
  if (isError || !data) return <ErrorSection reset={refetch} />;

  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="color-soft text-soft flex items-center justify-baseline gap-3 align-middle">
        <Heading variant="2xl" className="text-black">
          Экзамены
        </Heading>
        <CircleIcon className="block" />
        <Heading variant="2xl">Java Core</Heading>
      </div>

      {data.content.map((examItem) => {
        const exam: Exam = {
          ...examItem,
          title: `Экзамен по модулю ${examItem.moduleSequenceOrder}`,
          description: examItem.moduleTitle,
          questions: examItem.questionsCount,
          time: 20,
        };

        return (
          <ExamCard key={examItem.testId} exam={exam} status={mapExamStatus(examItem.status)} />
        );
      })}
    </div>
  );
};
