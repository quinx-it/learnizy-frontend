import { RegisterForm } from '@/shared/components/auth/register-form';
import { CardWrapper } from '@/shared/components/card-wrapper';
import { Logo } from '@/shared/ui/icons';
import React from 'react';
import Page from '@/shared/components/Page';

export const RegisterPageDesign = () => {
  return (
    <Page noIndex>
      <div className="flex h-[100vh] items-center justify-center">
        <CardWrapper className="max-w-[472px] px-8 py-16">
          <Logo className="mb-12 w-full" />
          <RegisterForm />
        </CardWrapper>
      </div>
    </Page>
  );
};
