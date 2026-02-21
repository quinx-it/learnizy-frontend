import { api } from '@/api';

import {
  type LessonTestResponseType,
  type LessonTestSubmitType,
  type ITestAttemptResponse,
  type CreateLessonTestRequest,
  type UpdateLessonTestRequest,
} from './types';

export const voice = api.injectEndpoints({
  endpoints: (builder) => ({
    getTestByLessonId: builder.query<LessonTestResponseType, number>({
      query: (lessonId) => `/tests/lesson/${lessonId}`,
      providesTags: (_result, _error, lessonId) => [{ type: 'LessonTest', id: lessonId }],
    }),
    createLessonTest: builder.mutation<LessonTestResponseType, CreateLessonTestRequest>({
      query: (body) => ({
        url: '/tests',
        method: 'POST',
        body,
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'LessonTest', id: arg.lessonId }],
    }),
    updateLessonTest: builder.mutation<
      LessonTestResponseType,
      { id: number; data: UpdateLessonTestRequest }
    >({
      query: ({ id, data }) => ({
        url: `/tests/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'LessonTest', id: arg.data.lessonId }],
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
  useCreateLessonTestMutation,
  useUpdateLessonTestMutation,
  useSendTestMutation,
  useGetLastTestAttemptQuery,
} = voice;
