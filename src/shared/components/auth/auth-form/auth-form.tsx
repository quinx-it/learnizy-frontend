'use client';

import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthFormValues, formSchema } from './validation';
import { useLoginMutation } from '@/api/endpoints/auth';
import { Spinner } from '@/shared/ui/spinner';
import { Input } from '@ui/input';
import { PasswordInput } from '@/shared/ui/passwordInput';
import { Button } from '@ui/button';
import { showToast } from '@/shared/ui/toaster';
import Link from 'next/link';
import { routes } from '@/shared/constants';

export const AuthForm = () => {
  const [loginRequest, { isLoading, error }] = useLoginMutation();

  useEffect(() => {
    if (error) {
      showToast('error', 'Ошибка', 'Проверьте правильность введённых логина и пароля');
    }
  }, [error]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      login: '',
      password: '',
      agreement: false,
    },
  });

  const onSubmit: SubmitHandler<AuthFormValues> = async (data) => {
    try {
      const result = await loginRequest({ login: data.login, password: data.password }).unwrap();
      console.log('Login result:', result);
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-6">
      <Input
        label="Введите логин"
        id="login"
        placeholder="логин"
        {...register('login')}
        error={errors.login?.message}
      />

      <PasswordInput
        label="Введите пароль"
        id="password"
        placeholder="пароль"
        {...register('password')}
        error={errors.password?.message}
      />

      <Link
        href={routes.public.forgotPassword}
        className="text-medium -mt-4 block w-full text-right text-[12px] !underline"
      >
        Забыли пароль?
      </Link>

      <Button type="submit" disabled={isLoading} size="medium" asChild={false}>
        {isLoading ? <Spinner type="ring" /> : 'Войти'}
      </Button>
    </form>
  );
};
