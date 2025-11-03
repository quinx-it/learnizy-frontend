import { ResetPasswordForm } from '@/shared/components/auth/ResetPasswordForm';
import { CardWrapper } from '@/shared/components/CardWrapper';
import { Logo } from '@/shared/ui/icons';
import { Heading, Text } from '@/shared/ui/typography';
import React, { FC, useState } from 'react';
import { IResetPasswordPageProps } from './typings';

export const ResetPasswordPage: FC<IResetPasswordPageProps> = (props) => {
  const { token } = props;
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <div className="flex h-[100vh] items-center justify-center">
      <CardWrapper className="max-w-[472px] px-8 py-16">
        <Logo className="mb-12 w-full" />
        {!isSuccess && (
          <>
            <Heading variant="xl" className="mb-2">
              Создайте новый пароль
            </Heading>
            <Text variant="m" className="mb-6">
              Чтобы завершить восстановление, придумайте новый надежный пароль для вашего аккаунта.
            </Text>
          </>
        )}
        <ResetPasswordForm token={token} onSuccess={() => setIsSuccess(true)} />
      </CardWrapper>
    </div>
  );
};
