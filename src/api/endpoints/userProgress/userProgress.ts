import { api } from '../../api';
import { MainData } from './types';

export const modulesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMainProgress: builder.query<MainData, void>({
      query: () => `/progress/users/main-page`,
    }),
  }),
});

export const { useGetMainProgressQuery } = modulesApi;