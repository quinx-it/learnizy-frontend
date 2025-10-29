export interface IIconProps {
  color?: string;
  className?: string;
}

export type HttpStatusError =
  | {
      status?: number | string;
      data?: { message?: string } | unknown;
    }
  | undefined;
