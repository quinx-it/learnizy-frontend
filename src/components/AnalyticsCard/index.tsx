'use client';

import { FC } from 'react';

import { IAnalyticsCardProps } from './typings';

import { Container, Content, Percentage, Title, Value, ValueWrapper } from './styles';

const AnalyticsCard: FC<IAnalyticsCardProps> = (props) => {
  const { title, value, changePercentage, children } = props;

  const isPositive = typeof changePercentage === 'number' && changePercentage >= 0;

  return (
    <Container>
      <Title>{title}</Title>

      {children ? (
        <Content>{children}</Content>
      ) : (
        <ValueWrapper>
          <Value>{value}</Value>
          {typeof changePercentage === 'number' && (
            <Percentage $isPositive={isPositive}>
              {isPositive ? '+' : ''}
              {changePercentage.toFixed(1)}%
            </Percentage>
          )}
        </ValueWrapper>
      )}
    </Container>
  );
};

export default AnalyticsCard;
