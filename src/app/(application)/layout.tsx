'use client';

import { useRefreshMutation } from '@/api/endpoints/auth';
import { ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppSelector } from '@/shared/hooks/redux';
import { routes, defaultPage } from '@/shared/constants';
import { selectToken, selectUserRole } from '@/store/slices/auth/selectors';
import { FullscreenLoader } from '@/shared/components/fullscreen-loader/fullscreen-loader';
import { roleRoutes } from '@/shared/constants/routes';

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
    if (!accessToken) {
      router.replace(routes.public.loginPage);
    } else if (
      role &&
      (pathname === routes.public.loginPage || !roleRoutes[role].includes(pathname))
    ) {
      router.replace(defaultPage[role]);
    }
  }, [accessToken, pathname, router, isLoading, role]);

  if (isLoading) {
    return <FullscreenLoader />;
  }
  if (role && !roleRoutes[role].includes(pathname)) {
    return <FullscreenLoader />;
  }

  return children;
};

export default ApplicationLayout;
