'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
import { routes, HttpStatus } from '@/constants';

import { VerificationFormValuesType, RegisterStep, IRegisterFormValues } from './typings';
import { formSchema, verificationSchema } from './validation';

import type { HttpStatusError } from '@/types';

const RegisterForm: FC = () => {
  const router = useRouter();
  const [step, setStep] = useState<RegisterStep>(RegisterStep.REGISTER);
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
    resolver: yupResolver(formSchema),
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
    resolver: yupResolver(verificationSchema),
    defaultValues: { code: '' },
  });

  useEffect(() => {
    if (step !== RegisterStep.VERIFY) return;

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
      showToast('success', 'Успешно', 'Код подтверждения отправлен на вашу почту.');
      setUserEmail(data.email);
      setStep(RegisterStep.VERIFY);
      setTimer(30);
      setCanResend(false);
    } catch (error: unknown) {
      const status = (error as HttpStatusError)?.status;
      const isConflict = status === HttpStatus.CONFLICT;

      if (isConflict) {
        showToast(
          'error',
          'Ошибка',
          'Аккаунт с таким email уже существует. Войдите или восстановите доступ.',
        );

        return;
      }

      showToast('error', 'Ошибка', 'Не удалось зарегистрироваться. Попробуйте снова.');
    }
  };

  const onVerifySubmit: SubmitHandler<VerificationFormValuesType> = async (data) => {
    try {
      await verifyEmail({ email: userEmail, code: data.code }).unwrap();
      showToast('success', 'Успешно', 'Ваша почта подтверждена!');
      router.push(routes.user.homePage);
    } catch {
      showToast('error', 'Ошибка', 'Неверный код или истек срок его действия.');
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;

    try {
      await resendCode({ email: userEmail }).unwrap();
      showToast('success', 'Успешно', 'Новый код отправлен на вашу почту.');
      setTimer(30);
      setCanResend(false);
    } catch {
      showToast('error', 'Ошибка', 'Не удалось отправить код повторно.');
    }
  };

  if (step === 'verify') {
    return (
      <div className="w-full">
        <Heading variant="xl" className="mb-2">
          Подтвердите электронную почту
        </Heading>
        <Text variant="m" className="mb-6">
          Пожалуйста, введите 6-значный код, отправленный на{' '}
          <span className="font-medium text-black">{userEmail}</span>
        </Text>

        <form onSubmit={handleSubmitVerify(onVerifySubmit)} className="flex w-full flex-col gap-6">
          <Input
            label=""
            id="verification-code"
            placeholder="______"
            {...registerVerify('code')}
            error={verifyErrors.code?.message}
            inputMode="numeric"
            className="text-center text-2xl tracking-[0.1em]"
            maxLength={6}
            onInput={(e: ChangeEvent<HTMLInputElement>) => {
              e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '');

              if (e.currentTarget.value.length > 6) {
                e.currentTarget.value = e.currentTarget.value.slice(0, 6);
              }
            }}
          />
          <div className="text-sm text-gray-500">
            {timer > 0 ? (
              `Отправить код повторно через ${timer} сек.`
            ) : (
              <button
                type="button"
                onClick={handleResendCode}
                disabled={!canResend || isResending}
                className="text-blue-500 hover:underline disabled:text-gray-400 disabled:no-underline"
              >
                {isResending ? 'Отправка...' : 'Отправить код еще раз'}
              </button>
            )}
          </div>

          <Button type="submit" disabled={isVerifying} className="rounded-full">
            {isVerifying ? <Spinner type="ring" /> : 'Подтвердить'}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onRegisterSubmit)} className="flex w-full flex-col gap-6">
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

      <Button type="submit" disabled={isRegistering} className="rounded-full">
        {isRegistering ? <Spinner type="ring" /> : 'Зарегистрироваться'}
      </Button>
    </form>
  );
};

export default RegisterForm;
