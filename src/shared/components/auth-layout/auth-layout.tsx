'use client'
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { selectAuth } from '@/store/slices/auth/selectors';
import { useAppSelector } from '@/shared/hooks/redux';
import { routes } from '@/shared/constants';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { accessToken } = useAppSelector(selectAuth);

  useEffect(() => {
    if (!accessToken) {
      router.push(routes.loginPage);
    }

    if (accessToken && pathname === routes.loginPage) {
      router.push(routes.homePage);
    }
  }, [accessToken, router, pathname]);

  return accessToken ? children : null;
}

