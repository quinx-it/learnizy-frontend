'use client';

import { type FC } from 'react';

import { type CardWrapperPropsType } from './typings';

import { Container } from './styles';

const CardWrapper: FC<CardWrapperPropsType> = (props) => {
  const { children, className, onClick } = props;

  return (
    <Container
      role="button"
      tabIndex={0}
      onClick={onClick}
      className={className}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick?.();
      }}
    >
      {children}
    </Container>
  );
};

export default CardWrapper;
