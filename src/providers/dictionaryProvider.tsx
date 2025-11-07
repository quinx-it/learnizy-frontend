'use client';

import { createContext, useContext, useMemo } from 'react';

type Dict = Record<string, string | Record<string, string>>;

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

  return ctx;
};
