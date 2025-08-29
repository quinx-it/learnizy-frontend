import { api } from '../../api';
import { CourseData } from './types';

export const modulesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMainProgress: builder.query<CourseData[], number>({
      query: (userId) => `/progress/users/${userId}/main-page`,
    }),
  }),
});

export const { useGetMainProgressQuery } = modulesApi;