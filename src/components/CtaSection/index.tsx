'use client';

import { type FC } from 'react';

import LinkButton from '@/components/LinkButton';
import { ROUTES } from '@/const';
import { useTranslation } from '@/hooks';

import { SectionText, SectionTitle, SectionWrapper, StyledSectionContent } from './styles';

const CtaSection: FC = () => {
  const { t } = useTranslation();

  return (
    <StyledSectionContent>
      <SectionWrapper>
        <SectionTitle tag="h2" variant="6xl-bold">
          {t('LANDING.CTA.TITLE')}
        </SectionTitle>

        <SectionText variant="l">{t('LANDING.CTA.TEXT')}</SectionText>

        <LinkButton href={ROUTES.REGISTER_PAGE} variant="blue">
          {t('LANDING.CTA.BUTTON')}
        </LinkButton>
      </SectionWrapper>
    </StyledSectionContent>
  );
};

export default CtaSection;
