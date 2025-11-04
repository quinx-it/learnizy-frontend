import { IAuthState } from '@/store/slices/auth/typings';
import { api } from '@/api';
import { logout, setCredentials } from '@/store/slices/auth/slice';
import { showToast } from '@/ui/toaster';
import {
  ForgotPasswordRequestType,
  LoginRequestType,
  RefreshResponseType,
  ResetPasswordRequestType,
  RegisterRequestType,
  RegisterResponseType,
  VerifyEmailRequestType,
  ResendCodeRequestType,
} from './types';
import { AUTH_BASE_URL } from '@/api/constants';

export const auth = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IAuthState, LoginRequestType>({
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
        } catch {
          dispatch(logout());
        }
      },
    }),

    register: builder.mutation<RegisterResponseType, RegisterRequestType>({
      query: (body) => ({
        url: `${AUTH_BASE_URL}/register`,
        method: 'POST',
        body,
      }),
    }),

    verifyEmail: builder.mutation<IAuthState, VerifyEmailRequestType>({
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

    resendVerificationCode: builder.mutation<{ message: string }, ResendCodeRequestType>({
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

    refresh: builder.mutation<RefreshResponseType, void>({
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

    forgotPassword: builder.mutation<void, ForgotPasswordRequestType>({
      query: (body) => ({
        url: `${AUTH_BASE_URL}/forgot-password`,
        method: 'POST',
        body,
      }),
    }),

    resetPassword: builder.mutation<void, ResetPasswordRequestType>({
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
