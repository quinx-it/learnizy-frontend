'use client';

import { CircleIcon } from '@/shared/ui/icons';
import { Heading } from '@/shared/ui/typography';
import React from 'react';
import { InterviewQuestions } from './interview-questoins';
import { FrequentlyAskedQuestions } from './frequently-asked-questions';
import { InterviewRecords } from './interview-records';

export const KnowlegeBasePage = () => {
  return (
    <div className="grid-rows-auto grid grid-cols-2 gap-6">
      <div className="color-soft text-soft col-span-2 flex items-center justify-baseline gap-3 align-middle">
        <Heading variant="2xl" className="text-black">
          База знаний
        </Heading>
        <CircleIcon className="block" />
        <Heading variant="2xl">Java Core</Heading>
      </div>
      <InterviewQuestions />
      <FrequentlyAskedQuestions />
      <InterviewRecords className='col-span-2 max-w-full' />
    </div>
  );
};
