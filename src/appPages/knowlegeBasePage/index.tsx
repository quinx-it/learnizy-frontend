'use client';

import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { CircleIcon } from '@/components/Icons';
import Page from '@/components/Page';
import { Heading } from '@/components/Typography';

import FrequentlyAskedQuestions from './FrequentlyAskedQuestions';
import InterviewQuestions from './InterviewQuestions';
import InterviewRecords from './InterviewRecords';

const KnowlegeBasePage: FC = () => {
  const { t } = useTranslation();

  return (
    <Page noIndex>
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
    </Page>
  );
};

export default KnowlegeBasePage;
