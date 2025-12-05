import { Language } from '@/const';

export const i18n = {
  defaultLocale: Language.En,
  locales: Object.values(Language),
} as const;

export type Locale = (typeof i18n)['locales'][number];
