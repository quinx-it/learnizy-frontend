'use client';

import { type FC } from 'react';

import NotFoundComponent from '@/components/NotFoundComponent';

import { Container } from './styles';

const NotFoundPage: FC = () => {
  return (
    <Container>
      <NotFoundComponent />
    </Container>
  );
};

export default NotFoundPage;
