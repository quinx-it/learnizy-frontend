import { api } from '@/api';

import { ILesson } from './types';

export const lessonsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLesson: builder.query<ILesson, string>({
      query: (lessonId) => `/lesson/${lessonId}`,
    }),
  }),
});

export const { useGetLessonQuery } = lessonsApi;
