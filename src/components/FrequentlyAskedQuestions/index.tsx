import Image from 'next/image';
import { type FC } from 'react';

import CardWrapper from '@/components/CardWrapper';
import { routes } from '@/const';
import { useTranslation } from '@/hooks';

import {
  DescriptionContainer,
  DescriptionSecondaryText,
  DescriptionText,
  ImageWrapper,
  StyledLinkButton,
  StyledCardWrapper,
  StyledDivider,
  Title,
} from './styles';

const FrequentlyAskedQuestions: FC = () => {
  const { t } = useTranslation();

  return (
    <CardWrapper>
      <StyledCardWrapper>
        <Title variant="m">{t('FAQ.TITLE')}</Title>
        <StyledDivider />
        <DescriptionContainer>
          <DescriptionText variant="m">{t('FAQ.DESCRIPTION_1')}</DescriptionText>
          <DescriptionSecondaryText variant="s">{t('FAQ.DESCRIPTION_2')}</DescriptionSecondaryText>
        </DescriptionContainer>

        <StyledLinkButton href={routes.user.frequentlyAskedQuestions}>
          {t('FAQ.BUTTON')}
        </StyledLinkButton>

        <ImageWrapper>
          <Image src="/images/blue-planet-with-moon.webp" alt="" width={160} height={107} />
        </ImageWrapper>
      </StyledCardWrapper>
    </CardWrapper>
  );
};

export default FrequentlyAskedQuestions;
