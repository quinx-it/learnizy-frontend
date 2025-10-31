import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export interface IRefreshResponse {
  data?: {
    accessToken?: string;
  };
  error?: FetchBaseQueryError;
}
