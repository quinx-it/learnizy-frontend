const localeMap: Record<string, string> = {
  ru: 'ru_RU',
  en: 'en_US',
};

export const getOgLocale = (): string => {
  const lang = 'en_US';

  return localeMap[lang];
};
