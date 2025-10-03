import { api } from '@/api';
import type { VoiceData, FileUploadResponse } from './index';

export const voice = api.injectEndpoints({
  endpoints: (builder) => ({
    uploadVoice: builder.mutation<FileUploadResponse, VoiceData>({
      query: (body) => ({
        url: '/file-storage/upload',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useUploadVoiceMutation } = voice;
