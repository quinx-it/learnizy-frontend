export type DictionaryType = {
  [key: string]: string | DictionaryType;
};

export type TranslationFunctionType = (
  path: string,
  values?: Record<string, string | number>,
) => string;
