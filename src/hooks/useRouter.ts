'use client';

import { useRouter as useRouterBase, usePathname } from 'next/navigation';

import { LANGUAGES } from '@/constants';

type NavigateOptions = { scroll?: boolean };

export const useRouter = () => {
  const router = useRouterBase();
  const pathname = usePathname();

  const langs = Object.values(LANGUAGES);
  const match = langs.find((lang) => pathname.startsWith(`/${lang}/`));
  const lang = match ?? LANGUAGES.RU;

  const localize = (path: string) => {
    if (langs.some((l) => path.startsWith(`/${l}/`)) || path.startsWith('/api')) return path;

    return `/${lang}${path.startsWith('/') ? '' : '/'}${path}`;
  };

  return {
    ...router,
    push: (path: string, options?: NavigateOptions) => router.push(localize(path), options),
    replace: (path: string, options?: NavigateOptions) => router.replace(localize(path), options),
    lang,
  };
};
