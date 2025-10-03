import { api } from '@/api';
import { LessonTestResponse, LessonTestSubmit, TestAttemptResponse } from './types';

export const voice = api.injectEndpoints({
  endpoints: (builder) => ({
    getTestByLessonId: builder.query<LessonTestResponse, number>({
      query: (lessonId) => `/tests/lesson/${lessonId}`,
    }),
    sendTest: builder.mutation<LessonTestSubmit, LessonTestSubmit>({
      query: (body) => ({
        url: '/test-attempts',
        method: 'POST',
        body,
      }),
    }),
    getLastTestAttempt: builder.query<TestAttemptResponse, number>({
      query: (testId) => `/test-attempts/tests/${testId}/last`,
    }),
  }),
});

export const { useGetTestByLessonIdQuery, useSendTestMutation, useGetLastTestAttemptQuery } = voice;
