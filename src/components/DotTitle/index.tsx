'use client';

import { type FC } from 'react';

import { type IDotTitleProps } from './typings';

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
    <Container className={className}>
      {heading ? (
        <StyledHeading variant="2xl" className={firstClassName}>
          {firstLabel}

          <SecondLabel className={secondClassName}>
            <Dot className={dotClassName}>•</Dot>
            {secondLabel}
          </SecondLabel>
        </StyledHeading>
      ) : (
        <StyledText variant={firstVariant} className={firstClassName}>
          {firstLabel}

          <SecondLabel className={secondClassName}>
            <Dot isSmall className={dotClassName}>
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
