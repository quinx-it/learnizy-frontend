import { useTranslation } from '@/hooks';

import { AdvantageCard } from './AdvantageCard';
import { cards } from './const';

import {
  StyledSectionContent,
  SectionWrapper,
  HeaderContainer,
  StyledHeading7xl,
  StyledHeadingDescription,
  CardsGrid,
} from './styles';

export const AdvantagesSection = () => {
  const { t } = useTranslation();

  return (
    <StyledSectionContent>
      <SectionWrapper>
        <HeaderContainer>
          <StyledHeading7xl variant="7xl">{t('ADVANTAGES.TITLE')}</StyledHeading7xl>
          <StyledHeadingDescription>{t('ADVANTAGES.DESCRIPTION')}</StyledHeadingDescription>
        </HeaderContainer>

        <CardsGrid>
          {cards.map((card) => (
            <AdvantageCard
              key={card.titleKey}
              type={card.type}
              title={t(card.titleKey)}
              text={t(card.textKey)}
              image={card.image}
            />
          ))}
        </CardsGrid>
      </SectionWrapper>
    </StyledSectionContent>
  );
};
