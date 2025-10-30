import { api } from '@/api';
import { IUserDTO, IUpdateUserDTO, IAnalyticResponse, IPage } from './typings';

const USERS_URL = '/users';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<IPage<IUserDTO>, { page?: number; size?: number; sort?: string }>({
      query: ({ page = 0, size = 10, sort = 'username,asc' } = {}) =>
        `${USERS_URL}?page=${page}&size=${size}&sort=${sort}`,
    }),
    getUserById: builder.query<IUserDTO, number>({ query: (id) => `${USERS_URL}/${id}` }),
    updateUser: builder.mutation<IUserDTO, { id: number; data: IUpdateUserDTO }>({
      query: ({ id, data }) => ({
        url: `${USERS_URL}/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({ url: `${USERS_URL}/${id}`, method: 'DELETE' }),
    }),
    getDashboardAnalytics: builder.query<IAnalyticResponse, void>({
      query: () => `/admin/analytics/dashboard`,
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetDashboardAnalyticsQuery,
} = userApi;
