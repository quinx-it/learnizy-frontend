import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { logout, setCredentials } from '@/store/slices/auth/slice';
import { RootStateType } from '@/store';
import { HttpStatus } from '@/shared/constants';
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

let refreshPromise: Promise<IRefreshResponse> | null = null;

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === HttpStatus.UNAUTHORIZED) {
    if (!refreshPromise) {
      refreshPromise = baseQuery(
        {
          url: '/auth/refresh',
          method: 'POST',
          body: {},
          credentials: 'include',
        },
        api,
        extraOptions,
      ) as Promise<IRefreshResponse>;
    }

    const refreshResult = await refreshPromise;
    refreshPromise = null;

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
