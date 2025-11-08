'use client';

import { createContext, useContext, useMemo } from 'react';

export type Dict = {
  [key: string]: string | Dict;
};

interface DictContextType {
  dict: Dict;
  lang: string;
}

const DictContext = createContext<DictContextType | null>(null);

interface DictionaryProviderProps {
  dict: Dict;
  lang: string;
  children: React.ReactNode;
}

export const DictionaryProvider = ({ dict, lang, children }: DictionaryProviderProps) => {
  const value = useMemo(() => ({ dict, lang }), [dict, lang]);

  return <DictContext.Provider value={value}>{children}</DictContext.Provider>;
};

export const useDict = () => {
  const ctx = useContext(DictContext);

  if (!ctx) throw new Error('useDict must be used within DictionaryProvider');

  const t = (path: string): string => {
    const keys = path.split('.');

    const result = keys.reduce<string | Dict>((acc, key) => {
      if (typeof acc !== 'object' || acc === null) return path;

      return acc[key] as string | Dict;
    }, ctx.dict);

    return typeof result === 'string' ? result : path;
  };

  return { t, lang: ctx.lang };
};
