import { type BaseQueryFn, type FetchArgs, type FetchBaseQueryError } from '@reduxjs/toolkit/query';

export interface IRefreshResponse {
  data?: {
    accessToken?: string;
  };
  error?: FetchBaseQueryError;
}

export type BaseQueryApi = Parameters<
  BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>
>[1];
export type BaseQueryExtraOptions = Parameters<
  BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>
>[2];
