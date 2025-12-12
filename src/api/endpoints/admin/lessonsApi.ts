import { api } from '@/api';

import {
  type ILessonRequest,
  type ILessonWithContentList,
  type IUpdateLessonRequest,
  type ILessonMarkdownContentUpdateRequest,
} from './typings';

const LESSON_URL = '/lesson';

export const lessonsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createLesson: builder.mutation<ILessonWithContentList, ILessonRequest>({
      query: (data) => ({
        url: LESSON_URL,
        method: 'POST',
        body: data,
      }),
    }),

    updateLesson: builder.mutation<
      ILessonWithContentList,
      { id: number; data: IUpdateLessonRequest }
    >({
      query: ({ id, data }) => ({
        url: `${LESSON_URL}/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),

    updateLessonContentMarkdown: builder.mutation<
      ILessonWithContentList,
      { lessonId: number; data: ILessonMarkdownContentUpdateRequest }
    >({
      query: ({ lessonId, data }) => ({
        url: `${LESSON_URL}/${lessonId}/content/markdown`,
        method: 'PATCH',
        body: data,
      }),
    }),

    deleteLesson: builder.mutation<void, number>({
      query: (id) => ({
        url: `${LESSON_URL}/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateLessonMutation,
  useUpdateLessonMutation,
  useUpdateLessonContentMarkdownMutation,
  useDeleteLessonMutation,
} = lessonsApi;
