'use client'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { accessToken } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!accessToken) {
      router.push('/login');
    }
  }, [accessToken,router]);

  return accessToken ? children : null;
}
