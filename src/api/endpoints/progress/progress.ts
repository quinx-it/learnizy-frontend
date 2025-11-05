import { api } from '@/api';

import { IMainPageInfoResponse } from './types';

export const progressApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMainPageProgress: builder.query<IMainPageInfoResponse, void>({
      query: () => 'progress/users/main-page',
    }),
  }),
});

export const { useGetMainPageProgressQuery } = progressApi;
