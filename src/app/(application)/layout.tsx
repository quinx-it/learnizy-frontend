'use client';
import { useRefreshMutation } from '@/api/endpoints/auth';
import { ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppSelector } from '@/shared/hooks/redux';
import { routes } from '@/shared/constants';
import { selectToken } from '@/store/slices/auth/selectors';
import { FullscreenLoader } from '@/shared/components/fullscreen-loader/fullscreen-loader';

interface ApplicationLayoutProps {
  children: ReactNode;
}

const ApplicationLayout = ({ children }: ApplicationLayoutProps) => {
  const [refreshAccessToken, { isLoading }] = useRefreshMutation();
  const pathname = usePathname();
  const router = useRouter();
  const accessToken = useAppSelector(selectToken);

  useEffect(() => {
    refreshAccessToken();
  }, [refreshAccessToken]);

  useEffect(() => {
    if (isLoading) return;
    
    if (accessToken && pathname === routes.loginPage) {
      router.replace(routes.homePage);
    }
  }, [accessToken, pathname, router, isLoading]);

  if (isLoading) {
    return <FullscreenLoader />;
  }

  return children;
};

export default ApplicationLayout;
