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
import { useTranslation } from '@/hooks';

import { createFormSchema } from './const';
import { IAuthFormValues } from './typings';

import { AuthLink, Form, LinksRow } from './styles';

const AuthForm: FC = () => {
  const { t } = useTranslation();
  const [loginRequest, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthFormValues>({
    resolver: yupResolver(createFormSchema(t)),
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
      showToast('error', t('COMMON.ERROR'), t('AUTH.CHECK_CREDENTIALS'));
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label={t('AUTH.ENTER_LOGIN')}
        id="username"
        autoComplete="username"
        placeholder={t('AUTH.LOGIN_PLACEHOLDER')}
        {...register('username')}
        error={errors.username?.message}
      />

      <PasswordInput
        label={t('AUTH.ENTER_PASSWORD')}
        id="password"
        autoComplete="current-password"
        placeholder={t('AUTH.PASSWORD_PLACEHOLDER')}
        {...register('password')}
        error={errors.password?.message}
      />

      <LinksRow>
        <AuthLink href={routes.public.registerPage}>{t('LOGIN.REGISTRATION')}</AuthLink>
        <AuthLink href={routes.public.forgotPassword}>{t('LOGIN.FORGOT_PASSWORD')}</AuthLink>
      </LinksRow>

      <Button type="submit" disabled={isLoading} size="medium" asChild={false}>
        {isLoading ? (
          <Box sx={{ color: 'primary.main', display: 'flex', alignItems: 'center' }}>
            <Spinner type="ring" />
          </Box>
        ) : (
          t('LOGIN.ENTER')
        )}
      </Button>
    </Form>
  );
};

export default AuthForm;
