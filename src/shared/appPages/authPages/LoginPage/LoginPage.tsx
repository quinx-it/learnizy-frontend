'use client';

import { AuthForm } from '@/shared/components/auth/AuthForm';
import { CardWrapper } from '@/shared/components/cardWrapper';
import { Logo } from '@/shared/ui/icons';
import React from 'react';
import Page from '@/shared/components/page';

export const LoginPageDesign = () => {
  return (
    <Page key="LOGIN_PAGE_SEO">
      <div className="flex h-[100vh] items-center justify-center">
        <CardWrapper className="max-w-[472px] px-8 py-16">
          <Logo className="mb-12 w-full" />
          <AuthForm />
        </CardWrapper>
      </div>
    </Page>
  );
};
