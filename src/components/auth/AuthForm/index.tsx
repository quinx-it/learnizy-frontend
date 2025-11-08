'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useLoginMutation } from '@/api/endpoints/auth';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { PasswordInput } from '@/components/PasswordInput';
import Spinner from '@/components/Spinner';
import { showToast } from '@/components/Toaster';
import { routes } from '@/constants';
import { useDict } from '@/providers/dictionaryProvider';

import { IAuthFormValues } from './typings';
import { formSchema } from './validation';

const AuthForm: FC = () => {
  const [loginRequest, { isLoading }] = useLoginMutation();
  const { t } = useDict();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthFormValues>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<IAuthFormValues> = async (data) => {
    try {
      await loginRequest({
        username: data.username,
        password: data.password,
      }).unwrap();
    } catch {
      showToast('error', 'Ошибка', 'Проверьте правильность введённых логина и пароля');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-6">
      <Input
        label={t('COMMON.HELP_PROMPT')}
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

export default AuthForm;
