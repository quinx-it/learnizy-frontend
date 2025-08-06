'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthFormValues, formSchema } from './validation';
import { useLoginMutation } from '@/api/endpoints/auth';
import { Spinner } from '@/shared/ui/spinner';

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
        email: data.name,
        password: data.password,
      }).unwrap();
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto flex max-w-sm flex-col gap-4">
      <div>
        <label htmlFor="name">Имя</label>
        <input id="name" type="text" {...register('name')} className="w-full border px-2 py-1" />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="password">Пароль</label>
        <input
          id="password"
          type="password"
          {...register('password')}
          className="w-full border px-2 py-1"
        />
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
      </div>

      {error && <p className="text-sm text-red-600">Ошибка входа. Проверьте логин и пароль.</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="rounded bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
      >
        {isLoading ? <Spinner /> : 'Войти'}
      </button>
    </form>
  );
};

export default AuthForm;
