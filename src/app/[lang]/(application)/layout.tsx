'use client';

import { type PropsWithChildren, useEffect, type FC } from 'react';

import { useRefreshMutation } from '@/api/endpoints/auth';
import FullscreenLoader from '@/components/FullscreenLoader';
import NotFoundPage from '@/components/NotFoundPage';
import {
  ROUTES,
  DEFAULT_PAGE,
  PUBLIC_ROUTES,
  STATIC_USER_ROUTES,
  DYNAMIC_USER_ROUTES,
  STATIC_MENTOR_ROUTES,
  DYNAMIC_MENTOR_ROUTES,
} from '@/const/routes';
import { useRouter, usePathname } from '@/hooks';
import { useAppSelector } from '@/hooks/redux';
import { isRoleRoute } from '@/lib/utils';
import { selectToken, selectUserRole } from '@/store/slices/auth/selectors';

const allStaticRoutes = [...PUBLIC_ROUTES, ...STATIC_USER_ROUTES, ...STATIC_MENTOR_ROUTES];
const allDynamicRoutes = [...DYNAMIC_USER_ROUTES, ...DYNAMIC_MENTOR_ROUTES];

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

    if (!accessToken && !PUBLIC_ROUTES.includes(pathname)) {
      router.replace(ROUTES.public.loginPage);

      return;
    }

    if (role && pathname === ROUTES.public.loginPage) {
      router.replace(DEFAULT_PAGE[role]);

      return;
    }

    if (role && !isRoleRoute(role, pathname)) {
      if (isValidRoute(pathname)) {
        router.replace(DEFAULT_PAGE[role]);
      }
    }
  }, [accessToken, pathname, router, isLoading, role]);

  if (isLoading) return <FullscreenLoader />;

  if (role && (!isRoleRoute(role, pathname) || pathname === ROUTES.public.loginPage))
    return <FullscreenLoader />;

  if (!isValidRoute(pathname)) return <NotFoundPage />;

  return children;
};

export default ApplicationLayout;
