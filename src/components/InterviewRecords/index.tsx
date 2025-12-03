import { FC } from 'react';

import CardWrapper from '@/components/CardWrapper';
import { routes } from '@/const';
import { useTranslation } from '@/hooks';

import { IInterviewRecordsProps } from './typings';

import {
  DescriptionText,
  StyledCardWrapper,
  StyledDivider,
  StyledLinkButton,
  Title,
} from './styles';

const InterviewRecords: FC<IInterviewRecordsProps> = (props) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <CardWrapper className={className}>
      <StyledCardWrapper>
        <Title variant="m">{t('INTERVIEW_RECORDS.TITLE')}</Title>

        <StyledDivider />

        <DescriptionText variant="m">{t('INTERVIEW_RECORDS.DESCRIPTION')}</DescriptionText>

        <StyledLinkButton href={routes.user.interviewRecords}>
          {t('INTERVIEW_RECORDS.BUTTON')}
        </StyledLinkButton>
      </StyledCardWrapper>
    </CardWrapper>
  );
};

export default InterviewRecords;
