import { LANGUAGES } from '@/const';

export const i18n = {
  defaultLocale: LANGUAGES.EN,
  locales: Object.values(LANGUAGES),
} as const;

export type Locale = (typeof i18n)['locales'][number];
