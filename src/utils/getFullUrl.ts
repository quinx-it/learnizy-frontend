import { getBaseUrl } from '.';

export const getFullUrl = (path: string): string => {
  const base = getBaseUrl();

  if (!path) return base;

  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
};
