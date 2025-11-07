import i18next from 'i18next';

import en from './messages/en.json';
import ru from './messages/ru.json';

let initialized = false;

export async function getServerT(lang = 'ru') {
  if (!initialized) {
    await i18next.init({
      lng: lang,
      fallbackLng: 'en',
      resources: {
        ru: { translation: ru },
        en: { translation: en },
      },
      interpolation: { escapeValue: false },
    });
    initialized = true;
  }

  return i18next.t.bind(i18next);
}
