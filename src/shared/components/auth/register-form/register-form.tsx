'use client';

import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterFormValues, formSchema } from './validation';
import { Input } from '@ui/input';
import { PasswordInput } from '@/shared/ui/passwordInput';
import { Button } from '@ui/button';
import Link from 'next/link';
import { routes } from '@/shared/constants';
import { CheckboxWithLabel } from '@/shared/ui/checkboxWithLabel/checkboxWithLabel';

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      login: '',
      password: '',
      agreement: false,
    },
  });

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    console.log(data)
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

      <PasswordInput
        label="Повторите пароль"
        id="repeat-password"
        placeholder="пароль"
        {...register('repeatPassword')}
        error={errors.repeatPassword?.message}
      />

      <div className="flex flex-col gap-1">
        <Controller
          control={control}
          name="agreement"
          rules={{ required: 'Нужно принять соглашение' }}
          render={({ field }) => (
            <CheckboxWithLabel checked={field.value} onCheckedChange={field.onChange}>
              Принимаю условия{' '}
              <Link href={routes.public.userAgreement} className="inline !underline">
                пользовательского соглашения
              </Link>{' '}
              и даю согласие на{' '}
              <Link href={routes.public.privacyPolicy} className="inline !underline">
                обработку персональных данных
              </Link>
            </CheckboxWithLabel>
          )}
        />
        {errors.agreement && <p className="text-error text-[12px]">{errors.agreement.message}</p>}
      </div>

      <Button type="submit" className="rounded-full">
        Войти
      </Button>
    </form>
  );
};
