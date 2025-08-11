'use client';

import React, { useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
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
import { CheckboxWithLabel } from '@/shared/ui/checkboxWithLabel/checkboxWithLabel';

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
    control,
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

      <PasswordInput
        label="Введите пароль"
        id="password"
        placeholder="пароль"
        {...register('password')}
        error={errors.password?.message}
      />

      <div className="flex flex-col gap-1">
        <Controller
          control={control}
          name="agreement"
          rules={{ required: 'Нужно принять соглашение' }}
          render={({ field }) => (
            <CheckboxWithLabel checked={field.value} onCheckedChange={field.onChange}>
              Принимаю условия{' '}
              <Link href={routes.userAgreement} className="inline !underline">
                пользовательского соглашения
              </Link>{' '}
              и даю согласие на{' '}
              <Link href={routes.privacyPolicy} className="inline !underline">
                обработку персональных данных
              </Link>
            </CheckboxWithLabel>
          )}
        />
        {errors.agreement && <p className="text-error text-[12px]">{errors.agreement.message}</p>}
      </div>

      <Button type="submit" disabled={isLoading} className="rounded-full">
        {isLoading ? <Spinner type="ring" /> : 'Войти'}
      </Button>
    </form>
  );
};
