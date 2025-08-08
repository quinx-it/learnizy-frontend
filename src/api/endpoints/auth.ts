import { AuthState } from '@/store/slices/auth/types';
import { api } from '../api'
import { AuthFormValues } from '@/shared/components/auth-form/validation';

export const auth = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthState, AuthFormValues>({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
    refresh: builder.query<AuthState, void>({
      query: () => ({
        url: '/refresh',
        method: 'POST',
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRefreshQuery } = auth
