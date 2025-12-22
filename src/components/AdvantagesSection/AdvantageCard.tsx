import { type FC } from 'react';

import { Text } from '@/components/Typography';

import { type AdvantageCardPropsType } from './typings';

import { StyledCard, CardContent, StyledCardHeading, ImageWrapper, StyledImage } from './styles';

export const AdvantageCard: FC<AdvantageCardPropsType> = (props) => {
  const { type, title, text, className } = props;

  return (
    <StyledCard cardType={type} className={className}>
      <CardContent>
        <StyledCardHeading variant="5xl">{title}</StyledCardHeading>
        <Text variant="l">{text}</Text>
      </CardContent>
      <ImageWrapper>
        <StyledImage width={305} height={306} src="/images/rocketOnBlue.webp" alt="rocket" />
      </ImageWrapper>
    </StyledCard>
  );
};
