'use client';

import { type FC } from 'react';

import FrequentlyAskedQuestions from '@/components/FrequentlyAskedQuestions';
import InterviewQuestions from '@/components/InterviewQuestions';
import InterviewRecords from '@/components/InterviewRecords';
import { useTranslation } from '@/hooks';

import { Container, HeaderContainer, HeaderTitle, InterviewRecordsWrapper } from './styles';

const KnowlegeBasePage: FC = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <HeaderContainer>
        <HeaderTitle>{t('NAVBAR.KNOWLEDGE_BASE')}</HeaderTitle>
      </HeaderContainer>
      <InterviewQuestions />
      <FrequentlyAskedQuestions />
      <InterviewRecordsWrapper>
        <InterviewRecords />
      </InterviewRecordsWrapper>
    </Container>
  );
};

export default KnowlegeBasePage;
