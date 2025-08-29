import { api } from '../../api';
import { LessonTestResponse, LessonTestSubmit } from './types';

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
  }),
});

export const { useGetTestByLessonIdQuery, useSendTestMutation } = voice;
