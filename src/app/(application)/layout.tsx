'use client';

import { useRefreshMutation } from '@/api/endpoints/auth';
import { ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppSelector } from '@/shared/hooks/redux';
import { routes, defaultPage } from '@/shared/constants';
import { selectToken, selectUserRole } from '@/store/slices/auth/selectors';
import { FullscreenLoader } from '@/shared/components/fullscreen-loader/fullscreen-loader';
import { publicRoutes } from '@/shared/constants/routes';
import { isRoleRoute } from '@/shared/lib/utils';
import { NotFoundPage } from '@/shared/app-pages/notFound-page';

interface ApplicationLayoutProps {
  children: ReactNode;
}

const ApplicationLayout = ({ children }: ApplicationLayoutProps) => {
  const [refreshAccessToken, { isLoading }] = useRefreshMutation();
  const pathname = usePathname();
  const router = useRouter();
  const accessToken = useAppSelector(selectToken);
  const role = useAppSelector(selectUserRole);

  useEffect(() => {
    refreshAccessToken();
  }, [refreshAccessToken]);

  useEffect(() => {
    if (isLoading) return;
    if (!accessToken && !publicRoutes.includes(pathname)) {
      router.replace(routes.public.loginPage);
    } else if (role && pathname === routes.public.loginPage) {
      router.replace(defaultPage[role]);
    }
  }, [accessToken, pathname, router, isLoading, role]);

  if (!isRoleRoute(role, pathname)) {
  }
  if (isLoading) {
    return <FullscreenLoader />;
  }
  if (role && pathname === routes.public.loginPage) {
    return <FullscreenLoader />;
  }

  if (role && !isRoleRoute(role, pathname)) {
    return <NotFoundPage />;
  }

  return children;
};

export default ApplicationLayout;
