'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect, ChangeEvent, FC } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import {
  useRegisterMutation,
  useVerifyEmailMutation,
  useResendVerificationCodeMutation,
} from '@/api/endpoints/auth';
import Button from '@/components/Button';
import CheckboxWithLabel from '@/components/CheckboxWithLabel';
import Input from '@/components/Input';
import { PasswordInput } from '@/components/PasswordInput';
import Spinner from '@/components/Spinner';
import { showToast } from '@/components/Toaster';
import { Heading, Text } from '@/components/Typography';
import { routes, HttpStatus } from '@/const';
import { useRouter, useTranslation } from '@/hooks';

import { VerificationFormValuesType, RegisterStep, IRegisterFormValues } from './typings';
import { createFormSchema, createVerificationSchema } from './validation';

import {
  CheckboxContainer,
  Container,
  EmailText,
  ErrorText,
  Form,
  HeadingContainer,
  LinkStyled,
  ResendButton,
  ResendText,
  TextContainer,
  VerificationInput,
} from './styles';

import type { HttpStatusError } from '@/types';

const RegisterForm: FC = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [step, setStep] = useState<RegisterStep>(RegisterStep.Register);
  const [userEmail, setUserEmail] = useState('');
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const [registerRequest, { isLoading: isRegistering }] = useRegisterMutation();
  const [verifyEmail, { isLoading: isVerifying }] = useVerifyEmailMutation();
  const [resendCode, { isLoading: isResending }] = useResendVerificationCodeMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IRegisterFormValues>({
    resolver: yupResolver(createFormSchema(t)),
    defaultValues: {
      login: '',
      email: '',
      password: '',
      repeatPassword: '',
      agreement: false,
    },
  });

  const {
    register: registerVerify,
    handleSubmit: handleSubmitVerify,
    formState: { errors: verifyErrors },
  } = useForm<VerificationFormValuesType>({
    resolver: yupResolver(createVerificationSchema(t)),
    defaultValues: { code: '' },
  });

  useEffect(() => {
    if (step !== RegisterStep.Verify) return;

    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }

    setCanResend(true);
  }, [timer, step]);

  const onRegisterSubmit: SubmitHandler<IRegisterFormValues> = async (data) => {
    try {
      await registerRequest({
        username: data.login,
        email: data.email,
        password: data.password,
      }).unwrap();
      showToast('success', t('AUTH.SUCCESS'), t('AUTH.CODE_SENT'));
      setUserEmail(data.email);
      setStep(RegisterStep.Verify);
      setTimer(30);
      setCanResend(false);
    } catch (error: unknown) {
      const status = (error as HttpStatusError)?.status;
      const isConflict = status === HttpStatus.CONFLICT;

      if (isConflict) {
        showToast('error', t('COMMON.ERROR'), t('AUTH.EMAIL_EXISTS'));

        return;
      }

      showToast('error', t('COMMON.ERROR'), t('AUTH.REGISTER_ERROR'));
    }
  };

  const onVerifySubmit: SubmitHandler<VerificationFormValuesType> = async (data) => {
    try {
      await verifyEmail({ email: userEmail, code: data.code }).unwrap();
      showToast('success', t('AUTH.SUCCESS'), t('AUTH.EMAIL_CONFIRMED'));
      router.push(routes.user.homePage);
    } catch {
      showToast('error', t('COMMON.ERROR'), t('AUTH.INVALID_CODE'));
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;

    try {
      await resendCode({ email: userEmail }).unwrap();
      showToast('success', t('AUTH.SUCCESS'), t('AUTH.NEW_CODE_SENT'));
      setTimer(30);
      setCanResend(false);
    } catch {
      showToast('error', t('COMMON.ERROR'), t('AUTH.RESEND_ERROR'));
    }
  };

  if (step === RegisterStep.Verify) {
    return (
      <Container>
        <HeadingContainer>
          <Heading variant="xl">{t('AUTH.CONFIRM_EMAIL')}</Heading>
        </HeadingContainer>
        <TextContainer>
          <Text variant="m">
            {t('AUTH.ENTER_CODE')} <EmailText>{userEmail}</EmailText>
          </Text>
        </TextContainer>

        <Form onSubmit={handleSubmitVerify(onVerifySubmit)}>
          <VerificationInput
            label=""
            id="verification-code"
            placeholder="______"
            {...registerVerify('code')}
            error={verifyErrors.code?.message}
            inputMode="numeric"
            maxLength={6}
            onInput={(e: ChangeEvent<HTMLInputElement>) => {
              e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '');

              if (e.currentTarget.value.length > 6) {
                e.currentTarget.value = e.currentTarget.value.slice(0, 6);
              }
            }}
          />
          <ResendText>
            {timer > 0 ? (
              t('AUTH.RESEND_CODE_TIMER', { seconds: timer })
            ) : (
              <ResendButton
                type="button"
                onClick={handleResendCode}
                disabled={!canResend || isResending}
              >
                {isResending ? t('AUTH.SENDING') : t('AUTH.RESEND_CODE')}
              </ResendButton>
            )}
          </ResendText>

          <Button type="submit" disabled={isVerifying} className="rounded-full">
            {isVerifying ? <Spinner type="ring" /> : t('AUTH.CONFIRM')}
          </Button>
        </Form>
      </Container>
    );
  }

  return (
    <Form onSubmit={handleSubmit(onRegisterSubmit)}>
      <Input
        label={t('AUTH.ENTER_LOGIN')}
        id="login"
        autoComplete="username"
        placeholder={t('AUTH.LOGIN_PLACEHOLDER')}
        {...register('login')}
        error={errors.login?.message}
      />

      <Input
        label={t('AUTH.ENTER_EMAIL')}
        id="email"
        type="email"
        autoComplete="email"
        placeholder="email"
        {...register('email')}
        error={errors.email?.message}
      />

      <PasswordInput
        label={t('AUTH.ENTER_PASSWORD')}
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

      <CheckboxContainer>
        <Controller
          control={control}
          name="agreement"
          rules={{ required: t('AUTH.ACCEPT_AGREEMENT') }}
          render={({ field }) => (
            <CheckboxWithLabel checked={field.value} onCheckedChange={field.onChange}>
              {t('AUTH.ACCEPT_TERMS')}{' '}
              <LinkStyled href={routes.public.userAgreement}>{t('AUTH.USER_AGREEMENT')}</LinkStyled>{' '}
              {t('AUTH.AND_CONSENT')}{' '}
              <LinkStyled href={routes.public.privacyPolicy}>{t('AUTH.PERSONAL_DATA')}</LinkStyled>
            </CheckboxWithLabel>
          )}
        />
        {errors.agreement && <ErrorText>{errors.agreement.message}</ErrorText>}
      </CheckboxContainer>

      <Button type="submit" disabled={isRegistering} className="rounded-full">
        {isRegistering ? <Spinner type="ring" /> : t('AUTH.REGISTER')}
      </Button>
    </Form>
  );
};

export default RegisterForm;
