'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { selectAuth } from '@/store/slices/auth/selectors';
import { useAppSelector } from '@/shared/hooks/redux';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { accessToken } = useAppSelector(selectAuth);

  useEffect(() => {
    if (!accessToken) {
      router.push('/login');
    }
  }, [accessToken,router]);

  return accessToken ? children : null;
}

