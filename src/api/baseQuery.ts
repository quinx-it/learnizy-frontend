import {
  type BaseQueryFn,
  type FetchArgs,
  fetchBaseQuery,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

import { HttpStatus } from '@/const';
import { type RootStateType } from '@/store';
import { logout, setCredentials } from '@/store/slices/auth/slice';

import { AUTH_BASE_URL } from './const';
import { type BaseQueryApi, type BaseQueryExtraOptions } from './types';

const REFRESH_URL = `${AUTH_BASE_URL}/refresh`;

const baseQuery = fetchBaseQuery({
  baseUrl: '/api/v1',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootStateType).auth.accessToken;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

type RefreshResultType = Awaited<ReturnType<typeof baseQuery>>;

const isRefreshRequest = (args: string | FetchArgs) => {
  const url = typeof args === 'string' ? args : args.url;

  return url.startsWith(REFRESH_URL);
};

const performRefresh = async (
  api: BaseQueryApi,
  extraOptions: BaseQueryExtraOptions,
): Promise<RefreshResultType> =>
  baseQuery(
    {
      url: REFRESH_URL,
      method: 'POST',
      body: {},
      credentials: 'include',
    },
    api,
    extraOptions,
  );

let pendingRefresh: Promise<RefreshResultType> | null = null;

const refreshOnce = (
  api: BaseQueryApi,
  extraOptions: BaseQueryExtraOptions,
): Promise<RefreshResultType> => {
  if (!pendingRefresh) {
    pendingRefresh = performRefresh(api, extraOptions).finally(() => {
      pendingRefresh = null;
    });
  }

  return pendingRefresh;
};

const getAccessToken = (result: RefreshResultType) =>
  (result.data as { accessToken?: string } | undefined)?.accessToken;

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  if (isRefreshRequest(args)) return refreshOnce(api, extraOptions);

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === HttpStatus.UNAUTHORIZED) {
    const refreshResult = await refreshOnce(api, extraOptions);

    const accessToken = getAccessToken(refreshResult);

    if (accessToken) {
      api.dispatch(setCredentials({ accessToken }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};
