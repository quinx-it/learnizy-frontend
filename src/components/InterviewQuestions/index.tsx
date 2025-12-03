import { FC } from 'react';

import CardWrapper from '@/components/CardWrapper';
import { routes } from '@/const';
import { useTranslation } from '@/hooks';

import {
  DescriptionContainer,
  DescriptionSecondaryText,
  DescriptionText,
  ImageWrapper,
  StyledImage,
  StyledLinkButton,
  StyledCardWrapper,
  StyledDivider,
  Title,
} from './styles';

const InterviewQuestions: FC = () => {
  const { t } = useTranslation();

  return (
    <CardWrapper>
      <StyledCardWrapper>
        <Title variant="m">{t('INTERVIEW.TITLE')}</Title>
        <StyledDivider />
        <DescriptionContainer>
          <DescriptionText variant="m">{t('INTERVIEW.DESCRIPTION_1')}</DescriptionText>
          <DescriptionSecondaryText variant="s">
            {t('INTERVIEW.DESCRIPTION_2')}
          </DescriptionSecondaryText>
        </DescriptionContainer>

        <StyledLinkButton href={routes.user.interviewQuestions}>
          {t('INTERVIEW.BUTTON')}
        </StyledLinkButton>

        <ImageWrapper>
          <StyledImage src="/images/planet-with-disc-blue.webp" alt="" width={176} height={88} />
        </ImageWrapper>
      </StyledCardWrapper>
    </CardWrapper>
  );
};

export default InterviewQuestions;
