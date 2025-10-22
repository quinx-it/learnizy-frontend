import { ResetPasswordForm } from '@/shared/components/auth/reset-password-form';
import { CardWrapper } from '@/shared/components/card-wrapper';
import { Logo } from '@/shared/ui/icons';
import { Heading, Text } from '@/shared/ui/typography';
import React, { FC } from 'react';

interface IResetPasswordPageProps {
  token: string;
}

export const ResetPasswordPage: FC<IResetPasswordPageProps> = (props) => {
  const { token } = props;

  return (
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
  );
};
