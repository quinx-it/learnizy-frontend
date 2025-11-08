export type Dict = {
  [key: string]: string | Dict;
};

export type TranslationFunction = (
  path: string,
  values?: Record<string, string | number>,
) => string;
