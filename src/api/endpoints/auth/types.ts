import type { IAuthFormValues } from '@/components/auth/AuthForm';

export type LoginRequestType = Pick<IAuthFormValues, 'username' | 'password'>;
export type ForgotPasswordRequestType = { email: string };
export type ResetPasswordRequestType = {
  token: string;
  newPassword: string;
};
export type RegisterRequestType = {
  username: string;
  email: string;
  password: string;
};
export type RefreshResponseType = { accessToken: string };

export type AuthStateType = {
  accessToken: string;
};

export type RegisterResponseType = {
  message: string;
  email: string;
};

export type VerifyEmailRequestType = {
  email: string;
  code: string;
};

export type ResendCodeRequestType = {
  email: string;
};
