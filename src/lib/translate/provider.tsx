'use client';

import { createContext, useMemo } from 'react';

import { type DictionaryType } from '@/types';

interface DictContextType {
  dict: DictionaryType;
  lang: string;
}

interface DictionaryProviderProps {
  dict: DictionaryType;
  lang: string;
  children: React.ReactNode;
}

export const DictContext = createContext<DictContextType | null>(null);

export const DictionaryProvider = ({ dict, lang, children }: DictionaryProviderProps) => {
  const value = useMemo(() => ({ dict, lang }), [dict, lang]);

  return <DictContext.Provider value={value}>{children}</DictContext.Provider>;
};
