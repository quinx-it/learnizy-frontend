import { usePathname as usePathnameBase } from 'next/navigation';

import { Language } from '@/const';

export const usePathname = () => {
  const pathname = usePathnameBase() || '/';
  const segments = pathname.split('/').filter(Boolean);

  if (segments[0] && Object.values(Language).includes(segments[0] as Language)) {
    segments.shift();
  }

  return `/${segments.join('/')}`;
};
