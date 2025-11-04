'use client';

import { FC, PropsWithChildren } from 'react';
import { Navbar } from '@/shared/components/navbar';
import { AuthLayout } from '@/shared/components/AuthLayout';
import { navbarLinks } from '@/shared/constants/constants';

const LearnLayout: FC<PropsWithChildren> = (props) => {
  const { children } = props;

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
