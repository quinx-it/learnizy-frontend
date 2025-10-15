'use client';

import { useRefreshMutation } from '@/api/endpoints/auth/auth';
import { ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppSelector } from '@/shared/hooks/redux';
import {
  routes,
  defaultPage,
  publicRoutes,
  staticUserRoutes,
  dynamicUserRoutes,
  staticMentorRoutes,
  dynamicMentorRoutes,
} from '@/shared/constants/routes';
import { selectToken, selectUserRole } from '@/store/slices/auth/selectors';
import { FullscreenLoader } from '@/shared/components/fullscreen-loader/fullscreen-loader';
import { isRoleRoute } from '@/shared/lib/utils';
import { NotFoundPage } from '@/shared/app-pages/notFound-page';

interface ApplicationLayoutProps {
  children: ReactNode;
}

const allStaticRoutes = [...publicRoutes, ...staticUserRoutes, ...staticMentorRoutes];
const allDynamicRoutes = [...dynamicUserRoutes, ...dynamicMentorRoutes];

const isValidRoute = (pathname: string) => {
  if (allStaticRoutes.includes(pathname)) return true;
  return allDynamicRoutes.some((regex) => regex.test(pathname));
};

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
      return;
    }

    if (role && pathname === routes.public.loginPage) {
      router.replace(defaultPage[role]);
      return;
    }

    if (role && !isRoleRoute(role, pathname)) {
      if (isValidRoute(pathname)) {
        router.replace(defaultPage[role]);
      }
    }
  }, [accessToken, pathname, router, isLoading, role]);

  if (isLoading) return <FullscreenLoader />;

  if (role && (!isRoleRoute(role, pathname) || pathname === routes.public.loginPage))
    return <FullscreenLoader />;

  if (!isValidRoute(pathname)) return <NotFoundPage />;

  return children;
};

export default ApplicationLayout;
