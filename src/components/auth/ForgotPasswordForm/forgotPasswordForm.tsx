'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useForgotPasswordMutation } from '@/api/endpoints/auth';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Spinner } from '@/ui/spinner';
import { showToast } from '@/ui/toaster';

import { IForgotPasswordFormValues } from './typings';
import { formSchema } from './validation';

export const ForgotPasswordForm = () => {
  const [forgotPasswordRequest, { isLoading, error }] = useForgotPasswordMutation();

  useEffect(() => {
    if (error) {
      showToast('error', 'Ошибка', 'Проверьте правильность введённых логина и пароля');
    }
  }, [error]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgotPasswordFormValues>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit: SubmitHandler<IForgotPasswordFormValues> = async (data) => {
    try {
      const { email } = data;
      await forgotPasswordRequest({ email }).unwrap();
    } catch {
      showToast('error', 'Ошибка смены пароля', 'Что-то не так');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-6">
      <Input
        label="Введите email"
        id="email"
        autoComplete="email"
        placeholder="E-mail"
        {...register('email')}
        error={errors.email?.message}
      />

      <Button type="submit" size="medium" disabled={isLoading} className="rounded-full">
        {isLoading ? <Spinner type="ring" /> : 'Отправить'}
      </Button>
    </form>
  );
};
