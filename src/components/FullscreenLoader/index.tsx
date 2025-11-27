'use client';

import { FC } from 'react';

import Spinner from '@/components/Spinner';

import { Container } from './styles';

const FullscreenLoader: FC = () => {
  return (
    <Container>
      <Spinner size={100} />
    </Container>
  );
};

export default FullscreenLoader;
