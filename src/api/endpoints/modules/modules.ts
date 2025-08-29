import { api } from '../../api';
import { GetModuleRequest, ModuleData, ModuleInfo } from './types';


export const modulesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getModules: builder.query<ModuleInfo[], number>({
      query: (courseId) => `/courses/${courseId}/modules`,
    }),
    getModule: builder.query<ModuleData, GetModuleRequest>({
      query: ({ courseId, moduleId }) => `/modules/${courseId}/progress/${moduleId}`,
    }),
  }),
});

export const { useGetModuleQuery, useGetModulesQuery } = modulesApi;
