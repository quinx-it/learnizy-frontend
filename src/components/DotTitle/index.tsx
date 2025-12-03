'use client';

import { FC } from 'react';

import { IDotTitleProps } from './typings';

import { Container, Dot, SecondLabel, StyledHeading, StyledText } from './styles';

const DotTitle: FC<IDotTitleProps> = (props) => {
  const {
    firstLabel,
    secondLabel,
    firstVariant = 'm-bold',
    className,
    firstClassName,
    secondClassName,
    dotClassName,
    heading = false,
  } = props;

  return (
    <Container className={`dot-title-container ${className || ''}`}>
      {heading ? (
        <StyledHeading variant="2xl" className={firstClassName}>
          {firstLabel}

          <SecondLabel className={`dot-title-second-label ${secondClassName || ''}`}>
            <Dot className={`dot-title-dot ${dotClassName || ''}`}>•</Dot>
            {secondLabel}
          </SecondLabel>
        </StyledHeading>
      ) : (
        <StyledText variant={firstVariant} className={firstClassName}>
          {firstLabel}

          <SecondLabel className={`dot-title-second-label ${secondClassName || ''}`}>
            <Dot isSmall className={`dot-title-dot ${dotClassName || ''}`}>
              •
            </Dot>
            {secondLabel}
          </SecondLabel>
        </StyledText>
      )}
    </Container>
  );
};

export default DotTitle;
