import { api } from '@api';
import { MainPageInfoResponse } from './types';

export const progressApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMainPageProgress: builder.query<MainPageInfoResponse, void>({
      query: () => 'progress/users/main-page',
    }),
  }),
});

export const { useGetMainPageProgressQuery } = progressApi;
