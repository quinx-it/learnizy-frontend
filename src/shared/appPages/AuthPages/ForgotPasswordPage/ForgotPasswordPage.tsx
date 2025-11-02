import { ForgotPasswordForm } from '@/shared/components/auth/ForgotPasswordForm';
import { CardWrapper } from '@/shared/components/cardWrapper';
import { Logo } from '@/shared/ui/icons';
import { Heading, Text } from '@/shared/ui/Typography';
import React from 'react';
import Page from '@/shared/components/page';

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
