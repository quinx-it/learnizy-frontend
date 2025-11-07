'use client';

import { FC } from 'react';

import AuthForm from '@/components/auth/AuthForm';

import { Container, CardWrapper, Logo } from './styles';

const LoginPage: FC = () => {
  return (
    <Container>
      <CardWrapper>
        <Logo />
        <AuthForm />
      </CardWrapper>
    </Container>
  );
};

export default LoginPage;
