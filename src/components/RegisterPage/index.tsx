'use client';

import Image from 'next/image';
import { FC } from 'react';

import RegisterForm from '@/components/auth/RegisterForm';
import CardWrapper from '@/components/CardWrapper';

import { CardWrapperContainer, Container, LogoWrapper } from './styles';

const RegisterPage: FC = () => {
  return (
    <Container>
      <CardWrapperContainer>
        <CardWrapper>
          <LogoWrapper>
            <Image src="/images/logo.svg" alt="Logo" width={200} height={70} />
          </LogoWrapper>
          <RegisterForm />
        </CardWrapper>
      </CardWrapperContainer>
    </Container>
  );
};

export default RegisterPage;
