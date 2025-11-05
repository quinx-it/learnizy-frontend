'use client';

import { useRouter, usePathname } from 'next/navigation';
import { PropsWithChildren, useEffect, FC } from 'react';

import { useRefreshMutation } from '@/api/endpoints/auth';
import NotFoundPage from '@/appPages/NotFoundPage';
import { FullscreenLoader } from '@/components/FullscreenLoader';
import {
  routes,
  defaultPage,
  publicRoutes,
  staticUserRoutes,
  dynamicUserRoutes,
  staticMentorRoutes,
  dynamicMentorRoutes,
} from '@/constants/routes';
import { useAppSelector } from '@/hooks/redux';
import { isRoleRoute } from '@/lib/utils';
import { selectToken, selectUserRole } from '@/store/slices/auth/selectors';

const allStaticRoutes = [...publicRoutes, ...staticUserRoutes, ...staticMentorRoutes];
const allDynamicRoutes = [...dynamicUserRoutes, ...dynamicMentorRoutes];

const isValidRoute = (pathname: string) => {
  if (allStaticRoutes.includes(pathname)) return true;

  return allDynamicRoutes.some((regex) => regex.test(pathname));
};

const ApplicationLayout: FC<PropsWithChildren> = (props) => {
  const { children } = props;

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
