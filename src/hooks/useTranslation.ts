import { useContext } from 'react';

import { DictContext } from '@/lib/translate';
import { Dict, TranslationFunction } from '@/types';

interface UseTranslationReturn {
  t: TranslationFunction;
  lang: string;
}

export const useTranslation = (): UseTranslationReturn => {
  const ctx = useContext(DictContext);

  if (!ctx) throw new Error('useTranslation must be used within DictionaryProvider');

  const t = (path: string, values?: Record<string, string | number>): string => {
    const keys = path.split('.');

    const result = keys.reduce<string | Dict>((acc, key) => {
      if (typeof acc !== 'object' || acc === null) return path;

      return acc[key] as string | Dict;
    }, ctx.dict);

    if (typeof result !== 'string') return path;

    if (!values) return result;

    return Object.entries(values).reduce(
      (str, [key, value]) => str.replace(new RegExp(`{{\\s*${key}\\s*}}`, 'g'), String(value)),
      result,
    );
  };

  return { t, lang: ctx.lang };
};
