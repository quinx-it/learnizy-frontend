'use client';

import { FC } from 'react';

import FrequentlyAskedQuestions from '@/components/FrequentlyAskedQuestions';
import { CircleIcon } from '@/components/Icons';
import InterviewQuestions from '@/components/InterviewQuestions';
import InterviewRecords from '@/components/InterviewRecords';
import { useTranslation } from '@/hooks';

import {
  Container,
  HeaderContainer,
  HeaderSubtitle,
  HeaderTitle,
  IconWrapper,
  InterviewRecordsWrapper,
} from './styles';

const KnowlegeBasePage: FC = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <HeaderContainer>
        <HeaderTitle>{t('NAVBAR.KNOWLEDGE_BASE')}</HeaderTitle>
        <IconWrapper>
          <CircleIcon />
        </IconWrapper>
        <HeaderSubtitle>Java Core</HeaderSubtitle>
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
