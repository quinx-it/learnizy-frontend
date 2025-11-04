import ru from './messages/ru.json';
import en from './messages/en.json';

export type ResourcesType = {
  ru: { translation: typeof ru };
  en: { translation: typeof en };
};
