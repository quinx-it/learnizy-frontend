'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { DEFAULT_LANGUAGE } from '@/constants';

import { ResourcesType } from './typings';

import en from './messages/en.json';
import ru from './messages/ru.json';

i18n.use(initReactI18next).init<ResourcesType>({
  resources: {
    ru: { translation: ru },
    en: { translation: en },
  },
  lng: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
