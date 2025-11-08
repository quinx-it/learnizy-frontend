'use client';

import { createContext, useMemo } from 'react';

import { Dict } from '@/types';

interface DictContextType {
  dict: Dict;
  lang: string;
}

interface DictionaryProviderProps {
  dict: Dict;
  lang: string;
  children: React.ReactNode;
}

export const DictContext = createContext<DictContextType | null>(null);

export const DictionaryProvider = ({ dict, lang, children }: DictionaryProviderProps) => {
  const value = useMemo(() => ({ dict, lang }), [dict, lang]);

  return <DictContext.Provider value={value}>{children}</DictContext.Provider>;
};
