'use client';

import { type FC } from 'react';

import { useTranslation } from '@/hooks';

import { steps } from './const';

import {
  CostChip,
  HeaderContainer,
  SectionDescription,
  SectionTitle,
  SectionWrapper,
  StepCard,
  StepNumber,
  StepText,
  StepTitle,
  StepsGrid,
  StyledSectionContent,
} from './styles';

const HowItWorksSection: FC = () => {
  const { t } = useTranslation();

  return (
    <StyledSectionContent>
      <SectionWrapper>
        <HeaderContainer>
          <SectionTitle tag="h2" variant="5xl">
            {t('LANDING.HOW_IT_WORKS.TITLE')}
          </SectionTitle>
          <SectionDescription variant="l">
            {t('LANDING.HOW_IT_WORKS.DESCRIPTION')}
          </SectionDescription>
        </HeaderContainer>

        <StepsGrid>
          {steps.map((step, index) => (
            <StepCard key={step.titleKey}>
              <StepNumber tag="h3" variant="4xl-bold">
                {index + 1}
              </StepNumber>

              <StepTitle tag="h4" variant="xl-bold">
                {t(step.titleKey)}
              </StepTitle>

              <StepText variant="m">{t(step.textKey)}</StepText>

              <CostChip isPaid={step.isPaid} tag="span" variant="s-bold">
                {t(step.isPaid ? 'LANDING.HOW_IT_WORKS.PAID' : 'LANDING.HOW_IT_WORKS.FREE')}
              </CostChip>
            </StepCard>
          ))}
        </StepsGrid>
      </SectionWrapper>
    </StyledSectionContent>
  );
};

export default HowItWorksSection;
