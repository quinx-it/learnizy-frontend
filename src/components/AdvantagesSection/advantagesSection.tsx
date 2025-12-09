import { useTranslation } from '@/hooks';

import { AdvantageCard } from './advantageCard';
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
          {cards.map((type, index) => (
            <AdvantageCard
              key={index}
              type={type}
              title={t('ADVANTAGES.CARD_TITLE')}
              text={t('ADVANTAGES.CARD_TEXT')}
            />
          ))}
        </CardsGrid>
      </SectionWrapper>
    </StyledSectionContent>
  );
};
