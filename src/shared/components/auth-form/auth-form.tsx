'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthFormValues, formSchema } from './validation';
import { useLoginMutation } from '@/api/endpoints/auth';
import { Spinner } from '@/shared/ui/spinner';
import { Input } from '@ui/input';
import { PasswordInput } from '@/shared/ui/passwordInput'; 
import { Button } from '@ui/button';
import { showToast } from '@/shared/ui/toaster';

const AuthForm = () => {
  const [login, { isLoading, error }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<AuthFormValues> = async (data) => {
    try {
      await login({
        email: data.email,
        password: data.password,
      }).unwrap();
    } catch (err) {
      showToast('error', 'Ошибка авторизации', 'Чето не так');
      console.error('Login error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto flex max-w-sm flex-col gap-4">
      <Input label='Введите логин' id="email" placeholder="логин" {...register('email')} error={errors.email?.message} />

      <PasswordInput
        label='Введите пароль'
        id="password"
        placeholder="пароль"
        {...register('password')}
        error={errors.password?.message}
      />

      {error && <p className="text-sm text-red-600">Ошибка входа. Проверьте логин и пароль.</p>}

      <Button type="submit" disabled={isLoading} className="rounded-full">
        {isLoading ? <Spinner type='ring'/> : 'Войти'}
      </Button>
    </form>
  );
};

export default AuthForm;
