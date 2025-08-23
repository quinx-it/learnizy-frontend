import { AuthState } from '@/store/slices/auth/types';
import { api } from '../api';
import { AuthFormValues } from '@/shared/components/auth/auth-form/validation';
import { logout, setCredentials } from '@/store/slices/auth/slice';

type LoginRequest = Pick<AuthFormValues, 'username' | 'password'>
type ForgotPasswordRequest = { email: string }
type ResetPasswordRequest = {
    token: string;
    newPassword: string;
}
type RefreshResponse = { accessToken: string; }


export const auth = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<AuthState, LoginRequest>({
            query: (body) => ({
                url: '/auth/login',
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
                    console.error('Ошибка обновления токена: ', error)
                }
            },
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
        }),
        refresh: builder.mutation<RefreshResponse, void>({
            query: () => ({
                url: '/auth/refresh',
                method: 'POST',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setCredentials({ accessToken: data.accessToken }));
                } catch (error) {
                    dispatch(logout());
                    console.error('Ошибка обновления токена: ', error)
                }
            },
        }),
        forgotPassword: builder.mutation<void, ForgotPasswordRequest>({
            query: (body) => ({
                url: '/auth/forgot-password',
                method: 'POST',
                body,
            }),
        }),
        resetPassword: builder.mutation<void, ResetPasswordRequest>({
            query: (body) => ({
                url: '/auth/reset-password',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useLoginMutation, useLogoutMutation, useRefreshMutation, useForgotPasswordMutation, useResetPasswordMutation } = auth;
