import 'server-only';
import type { Locale } from './i18nConfig';

const dictionaries = {
  en: () => import('@/lib/translate/messages/en.json').then((module) => module.default),
  ru: () => import('@/lib/translate/messages/ru.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]?.() ?? dictionaries.en();
