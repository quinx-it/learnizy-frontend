import { api } from '@/api';

import {
  type LessonTestResponseType,
  type LessonTestSubmitType,
  type ITestAttemptResponse,
  type CreateTestRequest,
} from './types';

export const voice = api.injectEndpoints({
  endpoints: (builder) => ({
    getTestByLessonId: builder.query<LessonTestResponseType, number>({
      query: (lessonId) => `/tests/lesson/${lessonId}`,
      providesTags: (_result, _error, lessonId) => [{ type: 'LessonTest', id: lessonId }],
    }),
    createTest: builder.mutation<LessonTestResponseType, CreateTestRequest>({
      query: (body) => ({
        url: '/tests',
        method: 'POST',
        body,
      }),
      invalidatesTags: (_result, _error, arg) =>
        arg.lessonId ? [{ type: 'LessonTest' as const, id: arg.lessonId }, 'Exams'] : ['Exams'],
    }),
    updateTest: builder.mutation<LessonTestResponseType, { id: number; data: CreateTestRequest }>({
      query: ({ id, data }) => ({
        url: `/tests/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, arg) =>
        arg.data.lessonId
          ? [{ type: 'LessonTest' as const, id: arg.data.lessonId }, 'Exams']
          : ['Exams'],
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

export const {
  useGetTestByLessonIdQuery,
  useCreateTestMutation,
  useUpdateTestMutation,
  useSendTestMutation,
  useGetLastTestAttemptQuery,
} = voice;
