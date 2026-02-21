import { api } from '@/api';

import { type IMainPageInfoResponse } from './types';

export const progressApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMainPageProgress: builder.query<IMainPageInfoResponse, number | void>({
      query: (courseId) =>
        courseId ? `progress/users/main-page?courseId=${courseId}` : 'progress/users/main-page',
    }),
  }),
});

export const { useGetMainPageProgressQuery } = progressApi;
