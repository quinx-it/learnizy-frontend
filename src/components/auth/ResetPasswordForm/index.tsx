'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect, type FC } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { useResetPasswordMutation } from '@/api/endpoints/auth';
import Button from '@/components/Button';
import { PasswordInput } from '@/components/PasswordInput';
import Spinner from '@/components/Spinner';
import { showToast } from '@/components/Toaster';
import { routes } from '@/const';
import { useRouter, useTranslation } from '@/hooks';

import { type IResetPasswordFormValues, createFormSchema } from './const';
import { type IResetPasswordFormProps } from './typings';

import { Form, SuccessContainer, SuccessText } from './styles';

const ResetPasswordForm: FC<IResetPasswordFormProps> = (props) => {
  const { token, onSuccess } = props;
  const { t } = useTranslation();
  const [resetPassword, { isLoading, error }] = useResetPasswordMutation();
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (error) {
      showToast('error', t('COMMON.ERROR'), t('AUTH.CHECK_CREDENTIALS'));
    }
  }, [error, t]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetPasswordFormValues>({
    resolver: yupResolver(createFormSchema(t)),
    defaultValues: {
      password: '',
      repeatPassword: '',
    },
  });

  const onSubmit: SubmitHandler<IResetPasswordFormValues> = async (data) => {
    try {
      await resetPassword({
        token,
        newPassword: data.password,
      }).unwrap();
      showToast('success', t('AUTH.SUCCESS'), t('AUTH.PASSWORD_CHANGED'));
      setIsSuccess(true);
      onSuccess?.();
    } catch {
      showToast('error', t('COMMON.ERROR'), t('AUTH.PASSWORD_CHANGE_ERROR'));
    }
  };

  const onClick = () => {
    router.push(routes.public.loginPage);
  };

  if (isSuccess) {
    return (
      <SuccessContainer>
        <SuccessText>{t('AUTH.PASSWORD_CHANGED')}</SuccessText>
        <Button onClick={onClick} size="medium">
          {t('AUTH.RETURN_TO_LOGIN')}
        </Button>
      </SuccessContainer>
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <PasswordInput
        label={t('SECURITY_SETTINGS.NEW_PASSWORD')}
        id="password"
        placeholder={t('AUTH.PASSWORD_PLACEHOLDER')}
        {...register('password')}
        error={errors.password?.message}
      />

      <PasswordInput
        label={t('AUTH.REPEAT_PASSWORD')}
        id="repeat-password"
        placeholder={t('AUTH.PASSWORD_PLACEHOLDER')}
        {...register('repeatPassword')}
        error={errors.repeatPassword?.message}
      />

      <Button type="submit" size="medium" className="rounded-full" disabled={isLoading}>
        {isLoading ? <Spinner size={22} /> : t('COMMON.SAVE')}
      </Button>
    </Form>
  );
};

export default ResetPasswordForm;
