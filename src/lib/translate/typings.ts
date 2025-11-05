import en from './messages/en.json';
import ru from './messages/ru.json';

export type ResourcesType = {
  ru: { translation: typeof ru };
  en: { translation: typeof en };
};
