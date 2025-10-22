'use client';

import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IResetPasswordFormValues, formSchema } from './validation';
import { PasswordInput } from '@/shared/ui/passwordInput';
import { Button } from '@/shared/ui/button';
import { useResetPasswordMutation } from '@/api/endpoints/auth/auth';
import { showToast } from '@/shared/ui/toaster';
import { Spinner } from '@/shared/ui/spinner';

interface IResetPasswordFormProps {
  token: string;
}

export const ResetPasswordForm = ({ token }: IResetPasswordFormProps) => {
  const [resetPassword, { isLoading, error }] = useResetPasswordMutation();

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
    } catch {
      showToast('error', 'Ошибка!', 'Не удалось изменить пароль');
    }
  };

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
