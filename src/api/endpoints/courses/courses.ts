import { api } from '@/api';
import { ICourse } from './types';

export const courseApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCourse: builder.query<ICourse, number>({
      query: (id) => `/courses/${id}`,
    }),
  }),
});

export const { useGetCourseQuery } = courseApi;
