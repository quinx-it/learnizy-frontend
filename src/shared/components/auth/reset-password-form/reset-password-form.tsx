'use client';

import React from 'react';
import { useForm, SubmitHandler} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ResetPasswordFormValues, formSchema } from './validation';
import { PasswordInput } from '@/shared/ui/passwordInput';
import { Button } from '@ui/button';

interface ResetPasswordFormProps {
    token: string
}

export const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      password: '',
      repeatPassword: '',
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordFormValues> = async (data) => {
    console.log(data, token)
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

      <Button type="submit" className="rounded-full">
        Сохранить
      </Button>
    </form>
  );
};
