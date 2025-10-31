import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { logout, setCredentials } from '@/store/slices/auth/slice';
import { RootStateType } from '@/store';
import { HttpStatus, REFRESH_THROTTLE as THROTTLE } from '@/shared/constants';
import { AUTH_BASE_URL } from '@/api/endpoints/auth/auth';
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

let lastRefreshAttempt: number | null = null;

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === HttpStatus.UNAUTHORIZED) {
    const now = Date.now();
    const canRefresh = !lastRefreshAttempt || now - lastRefreshAttempt >= THROTTLE;

    if (!canRefresh) {
      return result;
    }

    lastRefreshAttempt = now;
    const refreshResult = (await baseQuery(
      {
        url: `${AUTH_BASE_URL}/refresh`,
        method: 'POST',
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
