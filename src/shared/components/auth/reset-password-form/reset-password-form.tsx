'use client';

import React, { useEffect, FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IResetPasswordFormValues, formSchema } from './validation';
import { PasswordInput } from '@/shared/ui/passwordInput';
import { Button } from '@/shared/ui/button';
import { useResetPasswordMutation } from '@/api/endpoints/auth';
import { showToast } from '@/shared/ui/toaster';
import { Spinner } from '@/shared/ui/spinner';
import { useRouter } from 'next/navigation';
import { routes } from '@/shared/constants';

interface IResetPasswordFormProps {
  token: string;
}

export const ResetPasswordForm: FC<IResetPasswordFormProps> = (props) => {
  const { token } = props;
  const [resetPassword, { isLoading, error }] = useResetPasswordMutation();
  const [isSuccess, setIsSuccess] = React.useState(false);
  const router = useRouter();

  useEffect(() => {
    if (error) {
      showToast('error', 'Ошибка', 'Проверьте правильность введённых логина и пароля');
    }
  }, [error]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetPasswordFormValues>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      password: '',
      repeatPassword: '',
    },
  });

  const onSubmit: SubmitHandler<IResetPasswordFormValues> = async (data) => {
    try {
      await resetPassword({
        token,
        newPassword: data.password,
      }).unwrap();
      showToast('success', 'Ура!', 'Пароль успешно изменён');
      setIsSuccess(true);
    } catch {
      showToast('error', 'Ошибка!', 'Не удалось изменить пароль');
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center gap-6">
        <div className="text-lg font-semibold text-green-700">Пароль успешно изменён!</div>
        <Button onClick={() => router.push(routes.public.loginPage)} size="medium">
          Вернуться к окну авторизации
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-6">
      <PasswordInput
        label="Новый пароль"
        id="password"
        placeholder="пароль"
        {...register('password')}
        error={errors.password?.message}
      />

      <PasswordInput
        label="Повторите новый пароль"
        id="repeat-password"
        placeholder="пароль"
        {...register('repeatPassword')}
        error={errors.repeatPassword?.message}
      />

      <Button type="submit" size="medium" className="rounded-full" disabled={isLoading}>
        {isLoading ? <Spinner size={22} /> : 'Сохранить'}
      </Button>
    </form>
  );
};
