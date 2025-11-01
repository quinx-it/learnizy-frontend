'use client';

import { AuthForm } from '@/shared/components/auth/auth-form';
import { CardWrapper } from '@/shared/components/card-wrapper';
import { Logo } from '@/shared/ui/icons';
import React from 'react';
import Page from '@/shared/components/Page';

export const LoginPageDesign = () => {
  return (
    <Page seo="LOGIN_PAGE_SEO">
      <div className="flex h-[100vh] items-center justify-center">
        <CardWrapper className="max-w-[472px] px-8 py-16">
          <Logo className="mb-12 w-full" />
          <AuthForm />
        </CardWrapper>
      </div>
    </Page>
  );
};
