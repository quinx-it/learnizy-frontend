'use client';

import { type FC } from 'react';

import { Heading } from '@/components/Typography';
import { useTranslation } from '@/hooks';

import { exploreItems } from './const';

import {
  CardAction,
  CardLink,
  CardText,
  CardsGrid,
  HeaderContainer,
  SectionDescription,
  SectionTitle,
  SectionWrapper,
  StyledSectionContent,
} from './styles';

const ExploreSection: FC = () => {
  const { t } = useTranslation();

  return (
    <StyledSectionContent>
      <SectionWrapper>
        <HeaderContainer>
          <SectionTitle tag="h2" variant="5xl">
            {t('LANDING.EXPLORE.TITLE')}
          </SectionTitle>
          <SectionDescription variant="l">{t('LANDING.EXPLORE.DESCRIPTION')}</SectionDescription>
        </HeaderContainer>

        <CardsGrid>
          {exploreItems.map((item) => (
            <CardLink key={item.route} href={item.route}>
              <Heading tag="h3" variant="xl-bold">
                {t(item.titleKey)}
              </Heading>

              <CardText variant="m">{t(item.textKey)}</CardText>

              <CardAction className="exploreArrow" tag="span" variant="s-bold">
                {t('LANDING.EXPLORE.OPEN')} →
              </CardAction>
            </CardLink>
          ))}
        </CardsGrid>
      </SectionWrapper>
    </StyledSectionContent>
  );
};

export default ExploreSection;
