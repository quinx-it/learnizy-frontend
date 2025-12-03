import { api } from '@/api';

import {
  IPage,
  IModuleResponse,
  IModuleRequest,
  IModuleWithLessonList,
  IModuleDetailsDTO,
} from './typings';

const MODULES_URL = '/modules';

export const modulesApi = api.injectEndpoints({
  overrideExisting: true,
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
