import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { throttle } from 'lodash';
import { logout, setCredentials } from '@/store/slices/auth/slice';
import { RootStateType } from '@/store';
import { HttpStatus, REFRESH_THROTTLE } from '@/constants';
import { AUTH_BASE_URL } from './constants';
import { IRefreshResponse, BaseQueryApi, BaseQueryExtraOptions } from './types';

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootStateType).auth.accessToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const performRefresh = async (
  api: BaseQueryApi,
  extraOptions: BaseQueryExtraOptions,
): Promise<IRefreshResponse> => {
  return (await baseQuery(
    {
      url: `${AUTH_BASE_URL}/refresh`,
      method: 'POST',
      body: {},
      credentials: 'include',
    },
    api,
    extraOptions,
  )) as IRefreshResponse;
};

const throttledRefresh = throttle(performRefresh, REFRESH_THROTTLE, {
  leading: true,
  trailing: false,
}) as typeof performRefresh;

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === HttpStatus.UNAUTHORIZED) {
    const refreshResult = await throttledRefresh(api, extraOptions);

    const accessToken = refreshResult.data?.accessToken;

    if (accessToken) {
      api.dispatch(setCredentials({ accessToken }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};
