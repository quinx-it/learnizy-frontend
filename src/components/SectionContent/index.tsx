'use client';

import { FC } from 'react';

import { ISectionContentProps } from './typings';

import { Container } from './styles';

const SectionContent: FC<ISectionContentProps> = (props) => {
  const { children, className } = props;

  return <Container className={className}>{children}</Container>;
};

export default SectionContent;
