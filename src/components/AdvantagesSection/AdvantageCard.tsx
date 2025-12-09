import Image from 'next/image';
import { FC } from 'react';

import { Text } from '@/components/Typography';

import { AdvantageCardPropsType } from './typings';

import { StyledCard, CardContent, StyledCardHeading, ImageWrapper } from './styles';

export const AdvantageCard: FC<AdvantageCardPropsType> = (props) => {
  const { type, title, text, className } = props;

  return (
    <StyledCard cardType={type} className={className}>
      <CardContent>
        <StyledCardHeading variant="5xl">{title}</StyledCardHeading>
        <Text variant="l">{text}</Text>
      </CardContent>
      <ImageWrapper>
        <Image
          width={305}
          height={306}
          src="/images/rocketOnBlue.webp"
          alt="rocket"
          style={{
            position: 'absolute',
            right: '-10%',
            bottom: '-10%',
            width: '50%',
            maxWidth: '305px',
            transform: 'scaleX(-1)',
          }}
          className="xl:w-full"
        />
      </ImageWrapper>
    </StyledCard>
  );
};
