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
      const { login, password } = data;
      await loginRequest({ login, password }).unwrap();
    } catch (err) {
      showToast('error', 'Ошибка авторизации', 'Чето не так');
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

      <div>
        <PasswordInput
          label="Введите пароль"
          id="password"
          placeholder="пароль"
          {...register('password')}
          error={errors.password?.message}
        />

        <Link href={routes.public.forgotPassword} className="block text-medium !underline w-full text-right text-[12px] mt-2">
          Забыли пароль?
        </Link>
      </div>

      <Button type="submit" disabled={isLoading} className="rounded-full">
        {isLoading ? <Spinner type="ring" /> : 'Войти'}
      </Button>
    </form>
  );
};
