'use client';

import { type FC, type PropsWithChildren, useEffect } from 'react';

import FullscreenLoader from '@/components/FullscreenLoader';
import { ROUTES } from '@/const/routes';
import { useRouter } from '@/hooks';
import { useAppSelector } from '@/hooks/redux';
import { selectToken } from '@/store/slices/auth/selectors';

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const accessToken = useAppSelector(selectToken);

  useEffect(() => {
    if (!accessToken) {
      router.replace(ROUTES.LOGIN_PAGE);
    }
  }, [accessToken, router]);

  if (!accessToken) {
    return <FullscreenLoader />;
  }

  return children;
};

export default AuthLayout;
