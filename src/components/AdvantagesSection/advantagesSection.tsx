import { AdvantageCard } from './advantageCard';
import { constants } from './constants';

import {
  StyledSectionContent,
  SectionWrapper,
  HeaderContainer,
  StyledHeading7xl,
  StyledHeadingDescription,
  CardsGrid,
} from './styles';

export const AdvantagesSection = () => {
  return (
    <StyledSectionContent>
      <SectionWrapper>
        <HeaderContainer>
          <StyledHeading7xl variant="7xl">{constants.title}</StyledHeading7xl>
          <StyledHeadingDescription>{constants.description}</StyledHeadingDescription>
        </HeaderContainer>

        <CardsGrid>
          {constants.cards.map((item, index) => (
            <AdvantageCard key={index} {...item} />
          ))}
        </CardsGrid>
      </SectionWrapper>
    </StyledSectionContent>
  );
};
