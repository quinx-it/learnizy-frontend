'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/shared/hooks/redux';
import { routes } from '@/shared/constants';
import { FullscreenLoader } from '../fullscreen-loader/fullscreen-loader';
import { selectToken } from '@/store/slices/auth/selectors';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const accessToken = useAppSelector(selectToken);

  useEffect(() => {
    if (!accessToken) {
      router.replace(routes.loginPage);
    }
  }, [accessToken, router]);

  if (!accessToken) {
    return <FullscreenLoader />;
  }

  return children;
}
