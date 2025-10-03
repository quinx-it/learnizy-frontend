'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { securitySettingsSchema, SecuritySettingsFormValues } from './validation';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { PasswordInput } from '@/shared/ui/passwordInput';

export const SecuritySettingsForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SecuritySettingsFormValues>({
    resolver: yupResolver(securitySettingsSchema),
    defaultValues: {
      password: '',
      newPassword: '',
      login: '',
    },
  });

  const onSubmit = (data: SecuritySettingsFormValues) => {
    console.log('Security settings form data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 grid-rows-[repeat(3,1fr)_auto] gap-x-4 gap-y-8">
        <PasswordInput
          label="Пароль"
          className="col-span-2"
          {...register('password')}
          error={errors.password?.message}
        />
        <PasswordInput
          label="Новый пароль"
          className="col-span-2"
          {...register('newPassword')}
          error={errors.newPassword?.message}
        />
        <Input
          label="Логин (Email или телефон)"
          className="col-span-2"
          {...register('login')}
          error={errors.login?.message}
        />

        <Button type="reset" variant="white" className="flex-1 text-[16px]" onClick={() => reset()}>
          Не сохранять
        </Button>
        <Button type="submit" variant="blue" className="flex-1 text-[16px]">
          Сохранить изменения
        </Button>
      </div>
    </form>
  );
};
