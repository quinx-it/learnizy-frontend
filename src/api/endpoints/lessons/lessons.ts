import { api } from '../../api';
import { Lesson, SequenceType } from './types';


export const lessonsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLesson: builder.query<Lesson, string>({
      query: (lessonId) => `/lesson/${lessonId}`,
    }),
    getSequence: builder.query<SequenceType, string>({
      query: (lessonId) => `/lesson/${lessonId}/sequence`,
    }),
  }),
});

export const { useGetLessonQuery, useGetSequenceQuery } = lessonsApi;