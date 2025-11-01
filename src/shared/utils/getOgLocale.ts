import i18n from 'i18next';

const localeMap: Record<string, string> = {
  ru: 'ru_RU',
  en: 'en_US',
};

export const getOgLocale = (): string => {
  const lang = i18n.language;

  return localeMap[lang];
};
