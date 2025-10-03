'use client';

import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthFormValues, formSchema } from './validation';
import { useLoginMutation } from '@/api/endpoints/auth/auth';
import { Spinner } from '@/shared/ui/spinner';
import { Input } from '@/shared/ui/input';
import { PasswordInput } from '@/shared/ui/passwordInput';
import { Button } from '@/shared/ui/button';
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
      username: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<AuthFormValues> = async (data) => {
    try {
      await loginRequest({
        username: data.username,
        password: data.password,
      }).unwrap();
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-6">
      <Input
        label="Введите логин"
        id="username"
        autoComplete="username"
        placeholder="логин"
        {...register('username')}
        error={errors.username?.message}
      />

      <PasswordInput
        label="Введите пароль"
        id="password"
        autoComplete="current-password"
        placeholder="пароль"
        {...register('password')}
        error={errors.password?.message}
      />

      <div className="-mt-4 flex w-full justify-between text-[12px]">
        <Link href={routes.public.registerPage} className="text-medium !underline">
          Регистрация
        </Link>
        <Link href={routes.public.forgotPassword} className="text-medium !underline">
          Забыли пароль?
        </Link>
      </div>

      <Button type="submit" disabled={isLoading} size="medium" asChild={false}>
        {isLoading ? <Spinner type="ring" /> : 'Войти'}
      </Button>
    </form>
  );
};
