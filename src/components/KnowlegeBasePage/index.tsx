'use client';

import { FC } from 'react';

import FrequentlyAskedQuestions from '@/components/FrequentlyAskedQuestions';
import { CircleIcon } from '@/components/Icons';
import InterviewQuestions from '@/components/InterviewQuestions';
import InterviewRecords from '@/components/InterviewRecords';
import { Heading } from '@/components/Typography';
import { useTranslation } from '@/hooks';

const KnowlegeBasePage: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="color-soft text-soft flex items-center justify-baseline gap-3 md:col-span-2">
        <Heading className="text-lg text-black md:text-2xl">{t('NAVBAR.KNOWLEDGE_BASE')}</Heading>
        <CircleIcon className="block" />
        <Heading className="text-lg md:text-2xl">Java Core</Heading>
      </div>
      <InterviewQuestions />
      <FrequentlyAskedQuestions />
      <InterviewRecords className="col-span-1 w-full md:col-span-2" />
    </div>
  );
};

export default KnowlegeBasePage;
