import { api } from '@/api';
import {
  IUserDTO,
  IUpdateUserDTO,
  IAnalyticResponse,
  IPage,
  IModuleResponse,
  IModuleRequest,
  IModuleWithLessonList,
  IModuleDetailsDTO,
  ILessonRequest,
  ILessonWithContentList,
  IUpdateLessonRequest,
  ILessonMarkdownContentUpdateRequest,
} from './typings';

const USERS_URL = '/users';
const MODULES_URL = '/modules';
const LESSON_URL = '/lesson';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<IPage<IUserDTO>, { page?: number; size?: number; sort?: string }>({
      query: ({ page = 0, size = 10, sort = 'username,asc' } = {}) =>
        `${USERS_URL}?page=${page}&size=${size}&sort=${sort}`,
    }),
    getUserById: builder.query<IUserDTO, number>({ query: (id) => `${USERS_URL}/${id}` }),
    updateUser: builder.mutation<IUserDTO, { id: number; data: IUpdateUserDTO }>({
      query: ({ id, data }) => ({
        url: `${USERS_URL}/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({ url: `${USERS_URL}/${id}`, method: 'DELETE' }),
    }),
    getDashboardAnalytics: builder.query<IAnalyticResponse, void>({
      query: () => `/admin/analytics/dashboard`,
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetDashboardAnalyticsQuery,
} = userApi;

export const modulesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getModules: builder.query<
      IPage<IModuleResponse>,
      {
        title?: string;
        description?: string;
        courseId?: number;
        createdAfter?: string;
        createdBefore?: string;
        page?: number;
        size?: number;
        sort?: string;
      }
    >({
      query: ({
        title,
        description,
        courseId,
        createdAfter,
        createdBefore,
        page = 0,
        size = 10,
        sort = 'title,asc',
      }) => ({
        url: MODULES_URL,
        params: { title, description, courseId, createdAfter, createdBefore, page, size, sort },
      }),
    }),

    getModuleById: builder.query<IModuleWithLessonList, number>({
      query: (id) => `${MODULES_URL}/${id}`,
    }),

    createModule: builder.mutation<IModuleResponse, IModuleRequest>({
      query: (data) => ({
        url: MODULES_URL,
        method: 'POST',
        body: data,
      }),
    }),

    updateModule: builder.mutation<IModuleResponse, { id: number; data: IModuleRequest }>({
      query: ({ id, data }) => ({
        url: `${MODULES_URL}/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),

    deleteModule: builder.mutation<void, number>({
      query: (id) => ({
        url: `${MODULES_URL}/${id}`,
        method: 'DELETE',
      }),
    }),

    getModuleProgress: builder.query<IModuleDetailsDTO, { courseId: number; moduleId: number }>({
      query: ({ courseId, moduleId }) => `${MODULES_URL}/${courseId}/progress/${moduleId}`,
    }),
  }),
});

export const {
  useGetModulesQuery,
  useGetModuleByIdQuery,
  useCreateModuleMutation,
  useUpdateModuleMutation,
  useDeleteModuleMutation,
  useGetModuleProgressQuery,
} = modulesApi;

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
