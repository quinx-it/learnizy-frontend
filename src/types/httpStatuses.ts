export type HttpStatusError =
  | {
      status?: number | string;
      data?: { message?: string } | unknown;
    }
  | undefined;
