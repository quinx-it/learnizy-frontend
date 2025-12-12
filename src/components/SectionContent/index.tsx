'use client';

import { type FC } from 'react';

import { type ISectionContentProps } from './typings';

import { Container } from './styles';

const SectionContent: FC<ISectionContentProps> = (props) => {
  const { children, className } = props;

  return <Container className={className}>{children}</Container>;
};

export default SectionContent;
