import { api } from '@/api';
import { ExamsResponse, ExamTestResponse } from './types';

const TESTS_PATH = '/tests';

export const examsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getExams: builder.query<ExamsResponse, { courseId: number; page?: number; size?: number }>({
      query: ({ courseId, page = 0, size = 10 }) =>
        `${TESTS_PATH}/api/v1/exams?courseId=${courseId}&page=${page}&size=${size}`,
    }),
    getExamById: builder.query<ExamTestResponse, number>({
      query: (testId) => `${TESTS_PATH}/${testId}`,
    }),
  }),
});

export const { useGetExamsQuery, useGetExamByIdQuery } = examsApi;
