import { cleanEnv, url } from 'envalid';

const rawEnv = {
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
};

const env = cleanEnv(rawEnv, {
  NEXT_PUBLIC_BASE_URL: url(),
  NEXT_PUBLIC_API_BASE_URL: url(),
});

export const API_BASE_URL = env.NEXT_PUBLIC_API_BASE_URL;
export const BASE_URL = env.NEXT_PUBLIC_BASE_URL;
