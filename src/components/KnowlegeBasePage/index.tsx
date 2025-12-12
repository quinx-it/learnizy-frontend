'use client';

import Image from 'next/image';
import { type FC } from 'react';

import FrequentlyAskedQuestions from '@/components/FrequentlyAskedQuestions';
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
          <Image src="/images/circle-icon.svg" alt="Circle icon" width={8} height={8} />
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
