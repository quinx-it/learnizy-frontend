import { api } from '@api';
import type { CreateLessonAIQueryRequest, LessonAIQuery, LessonAIQueryPage } from './types';

export const lessonAI = api.injectEndpoints({
  endpoints: (builder) => ({
    createLessonAIQuery: builder.mutation<
      LessonAIQuery,
      { lessonId: number; body: CreateLessonAIQueryRequest }
    >({
      query: ({ lessonId, body }) => ({
        url: `/reflections/lessons/${lessonId}`,
        method: 'POST',
        body,
      }),
    }),

    getLessonAIQueries: builder.query<
      LessonAIQueryPage,
      { lessonId: number; page?: number; size?: number; sort?: string }
    >({
      query: ({ lessonId, page = 0, size = 20, sort = 'createdAt,desc' }) => ({
        url: `/reflections/lessons/${lessonId}`,
        method: 'GET',
        params: { page, size, sort },
      }),
    }),
  }),
});

export const { useCreateLessonAIQueryMutation, useGetLessonAIQueriesQuery } = lessonAI;
