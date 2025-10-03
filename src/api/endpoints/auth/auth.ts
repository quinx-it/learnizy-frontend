import { AuthState } from '@/store/slices/auth/types';
import { api } from '@api';
import { logout, setCredentials } from '@/store/slices/auth/slice';
import {
  ForgotPasswordRequest,
  LoginRequest,
  RefreshResponse,
  ResetPasswordRequest,
  RegisterRequest,
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
          console.error('Ошибка обновления токена: ', error);
        }
      },
    }),

    register: builder.mutation<AuthState, RegisterRequest>({
      query: (body) => ({
        url: `${AUTH_BASE_URL}/register`,
        method: 'POST',
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const accessToken = data.accessToken;
          
          if (accessToken) dispatch(setCredentials({ accessToken }));
        } catch (error) {
          console.error('Ошибка обновления токена: ', error);
        }
      },
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
        } catch (error) {
          dispatch(logout());
          console.error('Ошибка обновления токена: ', error);
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
} = auth;
