'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { type FC, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { useForgotPasswordMutation } from '@/api/endpoints/auth';
import Input from '@/components/Input';
import Spinner from '@/components/Spinner';
import { showToast } from '@/components/Toaster';
import { useTranslation } from '@/hooks';

import { createFormSchema } from './const';
import { type IForgotPasswordFormValues } from './typings';

import { Form, RoundedButton } from './styles';

const ForgotPasswordForm: FC = () => {
  const { t } = useTranslation();
  const [forgotPasswordRequest, { isLoading, error }] = useForgotPasswordMutation();

  useEffect(() => {
    if (error) {
      showToast('error', t('COMMON.ERROR'), t('AUTH.CHECK_CREDENTIALS'));
    }
  }, [error, t]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgotPasswordFormValues>({
    resolver: yupResolver(createFormSchema(t)),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit: SubmitHandler<IForgotPasswordFormValues> = async (data) => {
    try {
      const { email } = data;
      await forgotPasswordRequest({ email }).unwrap();
    } catch {
      showToast('error', t('AUTH.PASSWORD_RESET_ERROR'), t('AUTH.SOMETHING_WRONG'));
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label={t('AUTH.ENTER_EMAIL')}
        id="email"
        autoComplete="email"
        placeholder={t('AUTH.EMAIL_PLACEHOLDER')}
        {...register('email')}
        error={errors.email?.message}
      />

      <RoundedButton type="submit" size="medium" disabled={isLoading}>
        {isLoading ? <Spinner type="ring" /> : t('AUTH.SEND')}
      </RoundedButton>
    </Form>
  );
};

export default ForgotPasswordForm;
