import { api } from '@/api';
import type { VoiceDataType, FileUploadResponseType } from './index';

export const voice = api.injectEndpoints({
  endpoints: (builder) => ({
    uploadVoice: builder.mutation<FileUploadResponseType, VoiceDataType>({
      query: (body) => ({
        url: '/file-storage/upload',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useUploadVoiceMutation } = voice;
