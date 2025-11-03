'use client';
import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/shared/hooks/redux';
import { routes } from '@/shared/constants';
import { FullscreenLoader } from '../fullscreenLoader';
import { selectToken } from '@/store/slices/auth/selectors';

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
