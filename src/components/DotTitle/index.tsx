'use client';

import { FC } from 'react';

import { Heading, Text } from '@/components/Typography';
import { cn } from '@/lib/utils';

import { IDotTitleProps } from './typings';

import { Container, Dot, SecondLabel } from './styles';

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
        <Heading variant="2xl" className={cn('min-w-fit', firstClassName)}>
          {firstLabel}

          <SecondLabel className={secondClassName}>
            <Dot className={cn(dotClassName)}>•</Dot>
            {secondLabel}
          </SecondLabel>
        </Heading>
      ) : (
        <Text variant={firstVariant} className={cn('min-w-fit', firstClassName)}>
          {firstLabel}

          <SecondLabel className={secondClassName}>
            <Dot className={cn('dot-small', dotClassName)}>•</Dot>
            {secondLabel}
          </SecondLabel>
        </Text>
      )}
    </Container>
  );
};

export default DotTitle;
