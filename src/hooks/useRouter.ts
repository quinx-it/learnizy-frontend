'use client';

import { useRouter as useRouterBase, usePathname } from 'next/navigation';

import { Language } from '@/const';

type NavigateOptions = { scroll?: boolean };

export const useRouter = () => {
  const router = useRouterBase();
  const pathname = usePathname();

  const langs = Object.values(Language);
  const match = langs.find((lang) => pathname === `/${lang}` || pathname.startsWith(`/${lang}/`));
  const lang = match ?? Language.Ru;

  const localize = (path: string) => {
    if (langs.some((l) => path === `/${l}` || path.startsWith(`/${l}/`)) || path.startsWith('/api'))
      return path;

    return `/${lang}${path.startsWith('/') ? '' : '/'}${path}`;
  };

  return {
    ...router,
    push: (path: string, options?: NavigateOptions) => router.push(localize(path), options),
    replace: (path: string, options?: NavigateOptions) => router.replace(localize(path), options),
    lang,
  };
};
