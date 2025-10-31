import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { logout, setCredentials } from '@/store/slices/auth/slice';
import { RootStateType } from '@/store';
import { HttpStatus, REFRESH_THROTTLE } from '@/shared/constants';
import { AUTH_BASE_URL } from './constants';
interface IRefreshResponse {
  data?: {
    accessToken?: string;
  };
  error?: FetchBaseQueryError;
}

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

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === HttpStatus.UNAUTHORIZED) {
    const now = Date.now();
    let lastRefreshTime = 0;
    const timeSinceLastRefresh = now - lastRefreshTime;

    if (timeSinceLastRefresh < REFRESH_THROTTLE) {
      return result;
    }

    lastRefreshTime = now;

    const refreshResult = (await baseQuery(
      {
        url: `${AUTH_BASE_URL}/refresh`,
        method: 'POST',
        body: {},
        credentials: 'include',
      },
      api,
      extraOptions,
    )) as IRefreshResponse;

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
