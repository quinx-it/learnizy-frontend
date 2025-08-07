'use client'

import { ReactNode, useEffect } from 'react';
import { Navbar } from '@/shared/components/navbar';
import { useAppSelector } from '@/shared/hooks/redux';
import { selectUser } from '@/store/slices/auth/selectors';
import { useRouter } from 'next/navigation';
import { UserRole } from '@/store/slices/auth/types';

interface ApplicationLayoutProps {
  children: ReactNode;
}

const ApplicationLayout = ({ children }: ApplicationLayoutProps) => {
  const user = useAppSelector(selectUser);
  const router = useRouter();

  useEffect(() => {
    if (!user || user?.role === UserRole.GUEST) {
      router.push('/login');
    }
  }, [user, router]);

  return (
    <div className="bg-accent-background grid min-h-[100vh] grid-cols-[auto_1fr]">
      <Navbar />
      <main className="h-full max-h-screen w-full overflow-y-auto px-7.5 py-5">{children}</main>
    </div>
  );
};

export default ApplicationLayout;
