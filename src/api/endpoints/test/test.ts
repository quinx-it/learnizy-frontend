import { api } from '@/api';
import { LessonTestResponseType, LessonTestSubmitType, ITestAttemptResponse } from './types';

export const voice = api.injectEndpoints({
  endpoints: (builder) => ({
    getTestByLessonId: builder.query<LessonTestResponseType, number>({
      query: (lessonId) => `/tests/lesson/${lessonId}`,
    }),
    sendTest: builder.mutation<LessonTestSubmitType, LessonTestSubmitType>({
      query: (body) => ({
        url: '/test-attempts',
        method: 'POST',
        body,
      }),
    }),
    getLastTestAttempt: builder.query<ITestAttemptResponse, number>({
      query: (testId) => `/test-attempts/tests/${testId}/last`,
    }),
  }),
});

export const { useGetTestByLessonIdQuery, useSendTestMutation, useGetLastTestAttemptQuery } = voice;
