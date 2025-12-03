'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useLoginMutation } from '@/api/endpoints/auth';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { PasswordInput } from '@/components/PasswordInput';
import Spinner from '@/components/Spinner';
import { showToast } from '@/components/Toaster';
import { routes } from '@/const';

import { IAuthFormValues } from './typings';
import { formSchema } from './validation';

import { AuthLink, Form, LinksRow } from './styles';

const AuthForm: FC = () => {
  const [loginRequest, { isLoading }] = useLoginMutation();

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
    <Form onSubmit={handleSubmit(onSubmit)}>
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

      <LinksRow>
        <AuthLink href={routes.public.registerPage}>Регистрация</AuthLink>
        <AuthLink href={routes.public.forgotPassword}>Забыли пароль?</AuthLink>
      </LinksRow>

      <Button type="submit" disabled={isLoading} size="medium" asChild={false}>
        {isLoading ? (
          <Box sx={{ color: 'primary.main', display: 'flex', alignItems: 'center' }}>
            <Spinner type="ring" />
          </Box>
        ) : (
          'Войти'
        )}
      </Button>
    </Form>
  );
};

export default AuthForm;
