const localeMap: Record<string, string> = {
  ru: 'ru_RU',
  en: 'en_US',
};

export const getOgLocale = (lang: string): string => localeMap[lang] || localeMap.en;
