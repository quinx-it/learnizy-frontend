import { AuthState } from '@/store/slices/auth/types';
import { api } from '../api'

export const auth = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthState, { email: string; password: string }>({
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
  }),
})

export const { useLoginMutation, useLogoutMutation } = auth
