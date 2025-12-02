'use client';

import { FC } from 'react';

import { useGetExamsQuery } from '@/api/endpoints/exams';
import ErrorSection from '@/components/ErrorSection';
import ExamCard from '@/components/ExamCard';
import FullscreenLoader from '@/components/FullscreenLoader';
import { CircleIcon } from '@/components/Icons';
import { useTranslation } from '@/hooks';

import { ExamStatus, ExamType, IExamsPageProps } from './typings';

import {
  Container,
  HeaderContainer,
  StyledHeading,
  StyledHeadingSecondary,
  IconWrapper,
} from './styles';

const mapExamStatus = (status: string): ExamStatus => {
  switch (status) {
    case 'PASSED':
      return ExamStatus.Completed;
    case 'FAILED':
      return ExamStatus.Failed;
    case 'AVAILABLE':
      return ExamStatus.Available;
    case 'BLOCKED':
      return ExamStatus.Unavailable;
    default:
      return ExamStatus.Unavailable;
  }
};

const ExamsPage: FC<IExamsPageProps> = (props) => {
  const { courseId = 1 } = props;

  const { t } = useTranslation();

  const { data, isLoading, isError, refetch } = useGetExamsQuery({ courseId, page: 0, size: 10 });

  if (isLoading) return <FullscreenLoader />;

  if (isError || !data) return <ErrorSection reset={refetch} />;

  return (
    <Container>
      <HeaderContainer>
        <StyledHeading variant="2xl">{t('EXAMS.TITLE')}</StyledHeading>
        <IconWrapper>
          <CircleIcon />
        </IconWrapper>
        <StyledHeadingSecondary variant="2xl">Java Core</StyledHeadingSecondary>
      </HeaderContainer>

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
    </Container>
  );
};

export default ExamsPage;
