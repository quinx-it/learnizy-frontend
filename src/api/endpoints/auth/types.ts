import { AuthFormValues } from "@/shared/components/auth/auth-form/validation";

export type LoginRequest = Pick<AuthFormValues, 'username' | 'password'>;
export type ForgotPasswordRequest = { email: string };
export type ResetPasswordRequest = {
  token: string;
  newPassword: string;
};
export type RefreshResponse = { accessToken: string };
