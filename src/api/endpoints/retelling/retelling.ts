import { api } from '../../api';
import { LastRettelingResponse } from './types';

export const voice = api.injectEndpoints({
  endpoints: (builder) => ({
    getLastRetelling: builder.query<LastRettelingResponse, number>({
      query: (lessonId) => `reflections/lessons/${lessonId}`,
    }),
  }),
});

export const { useGetLastRetellingQuery } = voice;
