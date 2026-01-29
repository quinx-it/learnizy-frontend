import { api } from '@/api';

import {
  type ICourseResponse,
  type ICourseRequest,
  type IPage,
  type IModuleResponse,
} from './typings';

const COURSES_URL = '/courses';

export const coursesApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getCourses: builder.query<IPage<ICourseResponse>, { page?: number; size?: number }>({
      query: ({ page = 0, size = 10 }) => ({
        url: COURSES_URL,
        params: { page, size },
      }),
    }),

    getCourseById: builder.query<ICourseResponse, number>({
      query: (id) => `${COURSES_URL}/${id}`,
    }),

    createCourse: builder.mutation<ICourseResponse, ICourseRequest>({
      query: (data) => ({
        url: COURSES_URL,
        method: 'POST',
        body: data,
      }),
    }),

    updateCourse: builder.mutation<ICourseResponse, { id: number; data: ICourseRequest }>({
      query: ({ id, data }) => ({
        url: `${COURSES_URL}/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),

    deleteCourse: builder.mutation<void, number>({
      query: (id) => ({
        url: `${COURSES_URL}/${id}`,
        method: 'DELETE',
      }),
    }),

    getCourseModules: builder.query<
      IPage<IModuleResponse>,
      { courseId: number; page?: number; size?: number }
    >({
      query: ({ courseId, page = 0, size = 10 }) => ({
        url: `${COURSES_URL}/${courseId}/modules`,
        params: { page, size },
      }),
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useGetCourseModulesQuery,
} = coursesApi;
