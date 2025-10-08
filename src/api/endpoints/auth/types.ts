import { AuthFormValues } from '@/shared/components/auth/auth-form/validation';

export type LoginRequest = Pick<AuthFormValues, 'username' | 'password'>;
export type ForgotPasswordRequest = { email: string };
export type ResetPasswordRequest = {
  token: string;
  newPassword: string;
};
export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
};
export type RefreshResponse = { accessToken: string };

export type AuthState = {
  accessToken: string;
};

export type RegisterResponse = {
  message: string;
  email: string;
};

export type VerifyEmailRequest = {
  email: string;
  code: string;
};

export type ResendCodeRequest = {
  email: string;
};
