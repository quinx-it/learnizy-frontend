'use client';

import React, { useEffect, FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IResetPasswordFormValues, formSchema } from './validation';
import { PasswordInput } from '@/shared/ui/passwordInput';
import { Button } from '@/shared/ui/button';
import { useResetPasswordMutation } from '@/api/endpoints/auth/auth';
import { showToast } from '@/shared/ui/toaster';
import { Spinner } from '@/shared/ui/spinner';
import { useRouter } from 'next/navigation';
import { routes } from '@/shared/constants';

interface IResetPasswordFormProps {
  token: string;
}
import { IResetPasswordFormProps } from './typings';

export const ResetPasswordForm: FC<IResetPasswordFormProps> = (props) => {
  const { token } = props;
  const router = useRouter();
  const [resetPassword, { isLoading, error }] = useResetPasswordMutation();
  const [success, setSuccess] = React.useState(false);

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
      setSuccess(true);
    } catch {
      showToast('error', 'Ошибка!', 'Не удалось изменить пароль');
    }
  };

  if (success) {
    return (
      <div className="flex w-full flex-col items-center gap-6">
        <span className="text-lg text-green-600">Пароль успешно изменён!</span>
        <Button
          type="button"
          className="rounded-full"
          onClick={() => router.push(routes.public.loginPage)}
        >
          Вернуться на страницу авторизации
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
