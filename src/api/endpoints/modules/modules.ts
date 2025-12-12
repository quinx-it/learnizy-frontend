import { api } from '@/api';

import { type IGetModuleRequest, type IModuleData, type IModuleInfo } from './types';

export const modulesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getModules: builder.query<IModuleInfo[], number>({
      query: (courseId) => `/courses/${courseId}/modules`,
    }),
    getModule: builder.query<IModuleData, IGetModuleRequest>({
      query: ({ courseId, moduleId }) => `/modules/${courseId}/progress/${moduleId}`,
    }),
  }),
});

export const { useGetModuleQuery, useGetModulesQuery } = modulesApi;
