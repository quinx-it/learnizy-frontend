import { BASE_URL } from '@/const';

export const getBaseUrl = (): string => {
  return BASE_URL.replace(/\/$/, '') || '';
};
