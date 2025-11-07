'use client';

import { FC } from 'react';

import AuthForm from '@/components/auth/AuthForm';
import CardWrapper from '@/components/CardWrapper';
import { Logo } from '@/components/Icons';

const LoginPageDesign: FC = () => {
  return (
    <div className="flex h-[100vh] items-center justify-center">
      <CardWrapper className="max-w-[472px] px-8 py-16">
        <Logo className="mb-12 w-full" />
        <AuthForm />
      </CardWrapper>
    </div>
  );
};

export default LoginPageDesign;
