'use client';

import { type FC } from 'react';

import LinkButton from '@/components/LinkButton';
import { ROUTES } from '@/const';
import { useTranslation } from '@/hooks';

import {
  Eyebrow,
  ImageColumn,
  SectionText,
  SectionTitle,
  SectionWrapper,
  StyledImage,
  StyledSectionContent,
  TextColumn,
} from './styles';

const AiAssistantSection: FC = () => {
  const { t } = useTranslation();

  return (
    <StyledSectionContent>
      <SectionWrapper>
        <TextColumn>
          <Eyebrow variant="s-bold">{t('LANDING.AI.EYEBROW')}</Eyebrow>

          <SectionTitle tag="h2" variant="5xl">
            {t('LANDING.AI.TITLE')}
          </SectionTitle>

          <SectionText variant="l">{t('LANDING.AI.TEXT')}</SectionText>

          <LinkButton href={ROUTES.USER_AI_ASSISTANT} variant="blue">
            {t('LANDING.AI.CTA')}
          </LinkButton>
        </TextColumn>

        <ImageColumn>
          <StyledImage
            width={280}
            height={266}
            src="/images/astronaut2.webp"
            alt=""
            aria-hidden="true"
          />
        </ImageColumn>
      </SectionWrapper>
    </StyledSectionContent>
  );
};

export default AiAssistantSection;
