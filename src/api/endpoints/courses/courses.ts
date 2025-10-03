import { api } from '@/api';
import { Course } from './types';

export const courseApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCourse: builder.query<Course, number>({
      query: (id) => `/courses/${id}`,
    }),
  }),
});

export const { useGetCourseQuery } = courseApi;
