'use client';

import Image from 'next/image';
import { type FC } from 'react';

import { useGetCourseQuery } from '@/api/endpoints/courses';
import { useGetExamsQuery, ExamApiStatus } from '@/api/endpoints/exams';
import { useGetMainPageProgressQuery } from '@/api/endpoints/progress';
import ErrorSection from '@/components/ErrorSection';
import ExamCard from '@/components/ExamCard';
import FullscreenLoader from '@/components/FullscreenLoader';
import { useTranslation } from '@/hooks';

import { ExamStatus, type ExamType, type IExamsPageProps } from './typings';

import {
  Container,
  HeaderContainer,
  StyledHeading,
  StyledHeadingSecondary,
  IconWrapper,
} from './styles';

const mapExamStatus = (status: ExamApiStatus): ExamStatus => {
  switch (status) {
    case ExamApiStatus.Passed:
      return ExamStatus.Completed;
    case ExamApiStatus.Failed:
      return ExamStatus.Failed;
    case ExamApiStatus.Available:
      return ExamStatus.Available;
    case ExamApiStatus.Blocked:
      return ExamStatus.Unavailable;
    default:
      return ExamStatus.Unavailable;
  }
};

const ExamsPage: FC<IExamsPageProps> = (props) => {
  const { courseId: courseIdProp } = props;

  const { t } = useTranslation();

  const { data: mainPage, isLoading: isMainPageLoading } = useGetMainPageProgressQuery(undefined, {
    skip: courseIdProp !== undefined,
  });

  const courseId = courseIdProp ?? mainPage?.courseInfo?.id;

  const { data, isLoading, isError, refetch } = useGetExamsQuery(
    { courseId: courseId ?? 0, page: 0, size: 10 },
    { skip: !courseId },
  );
  const { data: course } = useGetCourseQuery(courseId ?? 0, { skip: !courseId });

  if (isMainPageLoading || isLoading) return <FullscreenLoader />;

  if (courseId && (isError || !data)) return <ErrorSection reset={refetch} />;

  return (
    <Container>
      <HeaderContainer>
        <StyledHeading variant="2xl">{t('EXAMS.TITLE')}</StyledHeading>
        {course?.title && (
          <>
            <IconWrapper>
              <Image src="/images/circle-icon.svg" alt="Circle icon" width={8} height={8} />
            </IconWrapper>
            <StyledHeadingSecondary variant="2xl">{course.title}</StyledHeadingSecondary>
          </>
        )}
      </HeaderContainer>

      {(data?.content ?? []).map((examItem) => {
        const exam: ExamType = {
          ...examItem,
          title: t('EXAMS.MODULE_TITLE', { moduleNumber: examItem.moduleSequenceOrder }),
          description: examItem.moduleTitle,
          questions: examItem.questionsCount,
        };

        return (
          <ExamCard key={examItem.testId} exam={exam} status={mapExamStatus(examItem.status)} />
        );
      })}
    </Container>
  );
};

export default ExamsPage;
