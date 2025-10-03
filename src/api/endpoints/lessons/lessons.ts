import { api } from '@/api';
import { Lesson } from './types';

export const lessonsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLesson: builder.query<Lesson, string>({
      query: (lessonId) => `/lesson/${lessonId}`,
    }),
  }),
});

export const { useGetLessonQuery } = lessonsApi;
