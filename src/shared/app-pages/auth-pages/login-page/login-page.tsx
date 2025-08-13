import { AuthForm } from '@/shared/components/auth/auth-form';
import { CardWrapper } from '@/shared/components/card-wrapper';
import { Logo } from '@/shared/ui/icons';
import React from 'react';

export const LoginPageDesign = () => {
  return (
    <div className="flex h-[100vh] items-center justify-center">
      <CardWrapper className='max-w-[472px] px-8 py-16'>
        <Logo className='w-full mb-12' />
        <AuthForm />
      </CardWrapper>
    </div>
  );
};
