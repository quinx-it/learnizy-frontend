'use client';

import { useRouter } from 'next/navigation';
import { FC, PropsWithChildren, useEffect } from 'react';

import { routes } from '@/constants';
import { useAppSelector } from '@/hooks/redux';
import { selectToken } from '@/store/slices/auth/selectors';

import FullscreenLoader from '../FullscreenLoader';

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const accessToken = useAppSelector(selectToken);

  useEffect(() => {
    if (!accessToken) {
      router.replace(routes.public.loginPage);
    }
  }, [accessToken, router]);

  if (!accessToken) {
    return <FullscreenLoader />;
  }

  return children;
};

export default AuthLayout;
