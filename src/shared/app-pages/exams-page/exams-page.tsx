import { CircleIcon } from '@/shared/ui/icons';
import { Heading } from '@/shared/ui/typography';
import React from 'react';
import { examsMock } from './constants';
import { ExamCard } from './exam-card';

export const ExamsPage = ({}) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="color-soft text-soft flex items-center justify-baseline gap-3 align-middle">
        <Heading variant="2xl" className="text-black">
          Экзамены
        </Heading>
        <CircleIcon className="block" />
        <Heading variant="2xl">Java Core</Heading>
      </div>
      {examsMock.map(({ exam, status }) => (
        <ExamCard key={exam.title} exam={exam} status={status} />
      ))}
    </div>
  );
};
