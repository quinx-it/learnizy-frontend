import { api } from '@/api';

import { type ILessonWithContent } from './types';

export const lessonsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLesson: builder.query<ILessonWithContent, string>({
      query: (lessonId) => `/lesson/${lessonId}`,
    }),
  }),
});

export const { useGetLessonQuery } = lessonsApi;
