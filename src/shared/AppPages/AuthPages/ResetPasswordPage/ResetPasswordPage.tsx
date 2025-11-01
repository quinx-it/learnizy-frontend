import { ResetPasswordForm } from '@/shared/components/Auth/ResetPasswordForm';
import { CardWrapper } from '@/shared/components/CardWrapper';
import { Logo } from '@/shared/ui/icons';
import { Heading, Text } from '@/shared/ui/Typography';
import React, { FC } from 'react';
import { IResetPasswordPageProps } from './typings';
import Page from '@/shared/components/Page';

export const ResetPasswordPage: FC<IResetPasswordPageProps> = (props) => {
  const { token } = props;

  return (
    <Page noIndex>
      <div className="flex h-[100vh] items-center justify-center">
        <CardWrapper className="max-w-[472px] px-8 py-16">
          <Logo className="mb-12 w-full" />
          <Heading variant="xl" className="mb-2">
            Создайте новый пароль
          </Heading>
          <Text variant="m" className="mb-6">
            Чтобы завершить восстановление, придумайте новый надежный пароль для вашего аккаунта.
          </Text>
          <ResetPasswordForm token={token} />
        </CardWrapper>
      </div>
    </Page>
  );
};
