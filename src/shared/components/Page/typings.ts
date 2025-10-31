import { PropsWithChildren } from 'react';

export interface IPageProps extends PropsWithChildren {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  noIndex?: boolean;
  fullUrl?: string;
  supportedLanguages?: string[];
  baseUrLClean?: string;
  theme?: {
    palette: {
      background: { default: string };
      primary: { main: string };
    };
  };
  ogLocale?: string;
}
