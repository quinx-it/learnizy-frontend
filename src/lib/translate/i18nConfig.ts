import { LANGUAGES } from '@/constants';

export const i18n = {
  defaultLocale: LANGUAGES.EN,
  locales: Object.values(LANGUAGES),
} as const;

export type Locale = (typeof i18n)['locales'][number];
