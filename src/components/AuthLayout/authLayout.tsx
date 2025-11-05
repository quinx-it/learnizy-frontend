'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

import { routes } from '@/constants';
import { useAppSelector } from '@/hooks/redux';
import { selectToken } from '@/store/slices/auth/selectors';

import { FullscreenLoader } from '../FullscreenLoader';

export function AuthLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const accessToken = useAppSelector(selectToken);

  useEffect(() => {
    if (!accessToken) {
      router.replace(routes.public.loginPage);
    }
  }, [accessToken, router]);

  if (!accessToken) {
    return <FullscreenLoader />;
  }

  return children;
}
