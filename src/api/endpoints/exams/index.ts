import { api } from '../../api';
import { ExamsResponse } from './types';

export const examsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getExams: builder.query<
      ExamsResponse,
      { courseId: number; page?: number; size?: number }
    >({
      query: ({ courseId, page = 0, size = 10 }) =>
        `/tests/api/v1/exams?courseId=${courseId}&page=${page}&size=${size}`,
    }),
  }),
});

export const { useGetExamsQuery } = examsApi;
