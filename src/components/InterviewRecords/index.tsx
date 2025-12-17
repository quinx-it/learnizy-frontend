import { type FC } from 'react';

import CardWrapper from '@/components/CardWrapper';
import { ROUTES } from '@/const/routes';
import { useTranslation } from '@/hooks';

import { type IInterviewRecordsProps } from './typings';

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

        <StyledLinkButton href={ROUTES.USER_INTERVIEW_RECORDS}>
          {t('INTERVIEW_RECORDS.BUTTON')}
        </StyledLinkButton>
      </StyledCardWrapper>
    </CardWrapper>
  );
};

export default InterviewRecords;
