'use client';

import { type FC } from 'react';

import { type ISectionContentProps } from './typings';

import { Container } from './styles';

const SectionContent: FC<ISectionContentProps> = (props) => {
  const { children, className, component = 'section' } = props;

  return (
    <Container className={className} component={component}>
      {children}
    </Container>
  );
};

export default SectionContent;
