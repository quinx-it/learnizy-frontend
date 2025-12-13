'use client';

import { usePathname, useRouter } from 'next/navigation';
import { type ReactNode, type FC } from 'react';

import CardWrapper from '@/components/CardWrapper';
import DotTitle from '@/components/DotTitle';
import { type ExamCardPropsType, ExamStatus } from '@/components/ExamsPage/typings';
import Link from '@/components/Link';
import { Text } from '@/components/Typography';
import { ROUTES } from '@/const/routes';
import { useTranslation } from '@/hooks';

import {
  StyledCardWrapper,
  ContentWrapper,
  StatusContainer,
  StatusBadge,
  ButtonsContainer,
  TitleDotTitleWrapper,
  InfoDotTitleWrapper,
  StyledButton,
  UnavailableStatusText,
  InlineLinkWrapper,
} from './styles';

const ExamCard: FC<ExamCardPropsType> = (props) => {
  const { exam, status } = props;

  const { t } = useTranslation();

  const { title, description, questions, time } = exam;
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigate = (path: string) => {
    router.push(`${pathname}/${path}`);
  };

  const buttonConfig: Record<ExamStatus, { children?: string; disabled?: boolean }> = {
    [ExamStatus.Completed]: {},
    [ExamStatus.Failed]: {
      children: t('EXAMS.BUTTONS.RETRY'),
    },
    [ExamStatus.Available]: {
      children: t('EXAMS.BUTTONS.START'),
    },
    [ExamStatus.Unavailable]: {
      children: t('EXAMS.BUTTONS.START'),
      disabled: true,
    },
  };

  const examStatusUi: Record<ExamStatus, ReactNode> = {
    [ExamStatus.Completed]: (
      <StatusContainer>
        <StatusBadge statusVariant={ExamStatus.Completed} variant="m">
          {t('EXAMS.STATUS.COMPLETED')}
        </StatusBadge>
      </StatusContainer>
    ),
    [ExamStatus.Failed]: (
      <StatusContainer>
        <StatusBadge statusVariant={ExamStatus.Failed} variant="m">
          {t('EXAMS.STATUS.FAILED')}
        </StatusBadge>
      </StatusContainer>
    ),
    [ExamStatus.Available]: <Text variant="l">{t('EXAMS.STATUS.AVAILABLE')}</Text>,
    [ExamStatus.Unavailable]: (
      <UnavailableStatusText>
        {t('EXAMS.STATUS.UNAVAILABLE', { moduleLink: exam.moduleId })}{' '}
        <InlineLinkWrapper>
          <Link href={`${ROUTES.user.modules}/${exam.moduleId}`}>{t('EXAMS.STATUS.LESSONS')}</Link>
        </InlineLinkWrapper>
        {` ${t('EXAMS.STATUS.MODULE')}`}
      </UnavailableStatusText>
    ),
  };

  return (
    <CardWrapper>
      <StyledCardWrapper>
        <ContentWrapper>
          <TitleDotTitleWrapper>
            <DotTitle
              firstLabel={title}
              secondLabel={description}
              firstVariant="l"
              firstClassName="exam-title-first"
              secondClassName="exam-title-second"
            />
          </TitleDotTitleWrapper>

          <InfoDotTitleWrapper>
            <DotTitle
              firstLabel={t('EXAMS.QUESTIONS_COUNT', { count: questions })}
              secondLabel={t('EXAMS.DURATION', { time })}
              firstVariant="m"
            />
          </InfoDotTitleWrapper>
          {examStatusUi[status]}
        </ContentWrapper>

        <ButtonsContainer>
          {status !== ExamStatus.Completed && (
            <StyledButton
              onClick={() => handleNavigate(`/${exam.moduleId}/${exam.testId}/test`)}
              {...buttonConfig[status]}
            />
          )}
          {(status === ExamStatus.Completed || status === ExamStatus.Failed) && (
            <StyledButton onClick={() => handleNavigate(`/${exam.moduleId}/${exam.testId}/result`)}>
              Результаты
            </StyledButton>
          )}
        </ButtonsContainer>
      </StyledCardWrapper>
    </CardWrapper>
  );
};

export default ExamCard;
