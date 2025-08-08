'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { selectAuth } from '@/store/slices/auth/selectors';
import { useAppSelector } from '@/shared/hooks/redux';
import { routes } from '@/shared/constants';
import { useRefreshQuery } from '@/api/endpoints/auth';
import { FullscreenLoader } from '../fullscreen-loader/fullscreen-loader';
import { publicRoutes } from '@/shared/constants/routes';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { accessToken } = useAppSelector(selectAuth);

  const isPublic = publicRoutes.includes(pathname);
  const [checked, setChecked] = useState(false);

  const { data, isLoading, isError } = useRefreshQuery();

  useEffect(() => {
    if (isPublic) {
      setChecked(true);
      return;
    }

    if (isLoading) return;

    const token = accessToken || data?.accessToken;

    if (!token && isError) {
      router.replace(routes.loginPage);
      return;
    }

    if (token && pathname === routes.loginPage) {
      router.replace(routes.homePage);
      return;
    }

    setChecked(true);
  }, [isPublic, accessToken, data?.accessToken, isLoading, pathname, router, isError]);

  if (!checked) {
    return <FullscreenLoader />;
  }

  return children;
}
