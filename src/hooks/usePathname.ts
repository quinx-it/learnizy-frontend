import { usePathname as usePathnameBase } from 'next/navigation';

import { LANGUAGES } from '@/const';

export const usePathname = () => {
  const pathname = usePathnameBase() || '/';
  const segments = pathname.split('/').filter(Boolean);

  if (segments[0] && Object.values(LANGUAGES).includes(segments[0] as LANGUAGES)) {
    segments.shift();
  }

  return `/${segments.join('/')}`;
};
