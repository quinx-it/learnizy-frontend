import { api } from '@/api';

import {
  type ICurrentUserResponse,
  type IFileUploadResponse,
  type IUpdateProfileRequest,
} from './types';

export const userProfileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query<ICurrentUserResponse, void>({
      query: () => 'users/me',
      providesTags: ['CurrentUser'],
    }),

    updateCurrentUser: builder.mutation<ICurrentUserResponse, IUpdateProfileRequest>({
      query: (body) => ({
        url: 'users/me',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['CurrentUser'],
    }),

    uploadFile: builder.mutation<IFileUploadResponse, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append('file', file);

        return {
          url: 'file-storage/upload',
          method: 'POST',
          body: formData,
        };
      },
    }),
  }),
});

export const { useGetCurrentUserQuery, useUpdateCurrentUserMutation, useUploadFileMutation } =
  userProfileApi;
