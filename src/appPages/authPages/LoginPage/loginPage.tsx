'use client';

import { AuthForm } from '@/components/auth/AuthForm';
import { CardWrapper } from '@/components/CardWrapper';
import { Logo } from '@/ui/icons';
import React from 'react';
import Page from '@/components/Page';

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
