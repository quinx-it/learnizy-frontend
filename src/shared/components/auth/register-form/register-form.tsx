'use client';

import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterFormValues, formSchema } from './validation';
import { useRegisterMutation } from '@/api/endpoints/auth/auth';
import { Spinner } from '@/shared/ui/spinner';
import { Input } from '@/shared/ui/input';
import { PasswordInput } from '@/shared/ui/passwordInput';
import { Button } from '@/shared/ui/button';
import { showToast } from '@/shared/ui/toaster';
import Link from 'next/link';
import { routes } from '@/shared/constants';
import { CheckboxWithLabel } from '@/shared/ui/checkboxWithLabel/checkboxWithLabel';
import { useRouter } from 'next/navigation';

export const RegisterForm = () => {
  const router = useRouter();
  const [registerRequest, { isLoading }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      login: '',
      email: '',
      password: '',
      repeatPassword: '',
      agreement: false,
    },
  });

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    try {
      const result = await registerRequest({
        username: data.login,
        email: data.email,
        password: data.password,
      });
      if ('error' in result) {
        showToast('error', 'Ошибка', 'Не удалось зарегистрироваться. Попробуйте снова.');
      } else {
        showToast('success', 'Успешно', 'Вы зарегистрированы!');
        router.push(routes.user.homePage);
      }
    } catch (err) {
      console.error('Register error:', err);
      showToast('error', 'Ошибка', 'Произошла ошибка при регистрации.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-6">
      <Input
        label="Введите логин"
        id="login"
        autoComplete="username"
        placeholder="логин"
        {...register('login')}
        error={errors.login?.message}
      />

      <Input
        label="Введите email"
        id="email"
        type="email"
        autoComplete="email"
        placeholder="email"
        {...register('email')}
        error={errors.email?.message}
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

      <Button type="submit" disabled={isLoading} className="rounded-full">
        {isLoading ? <Spinner type="ring" /> : 'Зарегистрироваться'}
      </Button>
    </form>
  );
};
