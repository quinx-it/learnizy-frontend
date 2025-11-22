'use client';

import { FC } from 'react';

import RegisterForm from '@/components/auth/RegisterForm';
import CardWrapper from '@/components/CardWrapper';
import { Logo } from '@/components/Icons';

import { CardWrapperContainer, Container, LogoWrapper } from './styles';

const RegisterPage: FC = () => {
  return (
    <Container>
      <CardWrapperContainer>
        <CardWrapper>
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
          <RegisterForm />
        </CardWrapper>
      </CardWrapperContainer>
    </Container>
  );
};

export default RegisterPage;
