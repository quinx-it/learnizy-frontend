'use client';

import { FC } from 'react';

import AuthForm from '@/components/auth/AuthForm';
import CardWrapper from '@/components/CardWrapper';
import { Logo } from '@/components/Icons';
import Page from '@/components/Page';

const LoginPageDesign: FC = () => {
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

export default LoginPageDesign;
