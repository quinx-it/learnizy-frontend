import { AuthState } from '@/store/slices/auth/types';
import { api } from '@/api';
import { logout, setCredentials } from '@/store/slices/auth/slice';
import { showToast } from '@/shared/ui/toaster';
import {
  ForgotPasswordRequest,
  LoginRequest,
  RefreshResponse,
  ResetPasswordRequest,
  RegisterRequest,
  RegisterResponse,
  VerifyEmailRequest,
  ResendCodeRequest,
} from './types';

const AUTH_BASE_URL = '/auth';

export const auth = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthState, LoginRequest>({
      query: (body) => ({
        url: `${AUTH_BASE_URL}/login`,
        method: 'POST',
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const accessToken = data.accessToken;

          if (accessToken) dispatch(setCredentials({ accessToken }));
        } catch (error) {
          dispatch(logout());
        }
      },
    }),

    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: `${AUTH_BASE_URL}/register`,
        method: 'POST',
        body,
      }),
    }),

    verifyEmail: builder.mutation<AuthState, VerifyEmailRequest>({
      query: (body) => ({
        url: `${AUTH_BASE_URL}/verify-email`,
        method: 'POST',
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const accessToken = data.accessToken;
          if (accessToken) {
            dispatch(setCredentials({ accessToken }));
          }
        } catch {
          showToast('error', 'Ошибка верификации email', '');
        }
      },
    }),

    resendVerificationCode: builder.mutation<{ message: string }, ResendCodeRequest>({
      query: (body) => ({
        url: `${AUTH_BASE_URL}/resend-verification-code`,
        method: 'POST',
        body,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${AUTH_BASE_URL}/logout`,
        method: 'POST',
      }),
    }),

    refresh: builder.mutation<RefreshResponse, void>({
      query: () => ({
        url: `${AUTH_BASE_URL}/refresh`,
        method: 'POST',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({ accessToken: data.accessToken }));
        } catch {
          dispatch(logout());
        }
      },
    }),

    forgotPassword: builder.mutation<void, ForgotPasswordRequest>({
      query: (body) => ({
        url: `${AUTH_BASE_URL}/forgot-password`,
        method: 'POST',
        body,
      }),
    }),

    resetPassword: builder.mutation<void, ResetPasswordRequest>({
      query: (body) => ({
        url: `${AUTH_BASE_URL}/reset-password`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useRefreshMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
  useResendVerificationCodeMutation,
} = auth;
