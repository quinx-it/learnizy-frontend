import React from 'react';

import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';
import { CardWrapper } from '@/components/CardWrapper';
import { Logo } from '@/components/Icons';
import Page from '@/components/Page';
import { Heading, Text } from '@/components/Typography';

export const ForgotPasswordPage = () => {
  return (
    <Page noIndex>
      <div className="flex h-[100vh] items-center justify-center">
        <CardWrapper className="max-w-[472px] px-8 py-16">
          <Logo className="mb-12 w-full" />
          <Heading variant="xl" className="mb-2">
            Забыли пароль?
          </Heading>
          <Text variant="m" className="mb-6">
            Не волнуйтесь! Просто укажите ваш email, и мы вышлем ссылку для сброса пароля.
          </Text>
          <ForgotPasswordForm />
        </CardWrapper>
      </div>
    </Page>
  );
};
