'use client';

import { FC, PropsWithChildren } from 'react';

import AuthLayout from '@/components/AuthLayout/authLayout';
import Navbar from '@/components/navbar';
import { navbarLinks } from '@/constants/constants';

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
