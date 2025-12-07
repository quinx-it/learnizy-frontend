'use client';

import Image from 'next/image';
import { FC } from 'react';

import AuthForm from '@/components/auth/AuthForm';

import { Container, CardWrapper, LogoWrapper } from './styles';

const LoginPage: FC = () => {
  return (
    <Container>
      <CardWrapper>
        <LogoWrapper>
          <Image src="/images/logo.svg" alt="Logo" width={200} height={70} />
        </LogoWrapper>
        <AuthForm />
      </CardWrapper>
    </Container>
  );
};

export default LoginPage;
