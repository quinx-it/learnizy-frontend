'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useForgotPasswordMutation } from '@/api/endpoints/auth';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Spinner from '@/components/Spinner';
import { showToast } from '@/components/Toaster';
import { useTranslation } from '@/hooks';

import { IForgotPasswordFormValues } from './typings';
import { createFormSchema } from './validation';

import { Form } from './styles';

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
        placeholder="E-mail"
        {...register('email')}
        error={errors.email?.message}
      />

      <Button type="submit" size="medium" disabled={isLoading} className="rounded-full">
        {isLoading ? <Spinner type="ring" /> : t('AUTH.SEND')}
      </Button>
    </Form>
  );
};

export default ForgotPasswordForm;
