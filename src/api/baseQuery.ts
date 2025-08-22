import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { logout, setCredentials } from '@/store/slices/auth/slice'
import { RootState } from '@/store/store'
interface RefreshResponse {
    data?: {
        accessToken?: string;
    };
    error?: FetchBaseQueryError;
}

const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.accessToken
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    },
})

export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        const refreshResult = (await baseQuery(
            {
                url: '/auth/refresh',
                method: 'POST', 
                body: {},                
                credentials: 'include',   
            },
            api,
            extraOptions
        )) as RefreshResponse
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
