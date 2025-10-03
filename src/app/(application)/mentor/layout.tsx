'use client';

import { ReactNode } from 'react';
import { Navbar } from '@/shared/components/navbar';
import { AuthLayout } from '@/shared/components/auth-layout';
import { navbarLinks } from '@/shared/constants/constants';

interface ApplicationLayoutProps {
  children: ReactNode;
}

const LearnLayout = ({ children }: ApplicationLayoutProps) => {
  return (
    <AuthLayout>
      <div className="bg-accent-background grid min-h-[100vh] grid-cols-[auto_1fr]">
        <Navbar links={navbarLinks.mentor} />
        <main className="h-full max-h-screen w-full overflow-y-auto px-7.5 py-5">{children}</main>
      </div>
    </AuthLayout>
  );
};

export default LearnLayout;
