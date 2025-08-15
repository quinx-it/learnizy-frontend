'use client';

import { useRefreshMutation } from '@/api/endpoints/auth';
import { ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppSelector } from '@/shared/hooks/redux';
import { routes } from '@/shared/constants';
import { selectToken, selectUser } from '@/store/slices/auth/selectors';
import { FullscreenLoader } from '@/shared/components/fullscreen-loader/fullscreen-loader';
import { defaultPage, loginPageUrl } from '@/shared/constants/routes';
import { decodeToken } from '@/shared/lib/utils';

interface ApplicationLayoutProps {
  children: ReactNode;
}

const ApplicationLayout = ({ children }: ApplicationLayoutProps) => {
  const [refreshAccessToken, { isLoading }] = useRefreshMutation();
  const pathname = usePathname();
  const router = useRouter();
  const accessToken = useAppSelector(selectToken);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    refreshAccessToken();
  }, [refreshAccessToken]);

  useEffect(() => {
    if (isLoading) return;

    if (accessToken && pathname === routes.public.loginPage) {
      if (user?.role) {
        router.replace(defaultPage[user.role]);
      } else {
        try {
          const role = decodeToken(accessToken).user?.role;
          if (role) {
            router.replace(defaultPage[role]);
          }
        } catch {
          console.log('Failed to decode token');
          router.replace(loginPageUrl);
        }
      }
    }
  }, [accessToken, pathname, router, isLoading, user]);

  if (isLoading) {
    return <FullscreenLoader />;
  }

  return children;
};

export default ApplicationLayout;
