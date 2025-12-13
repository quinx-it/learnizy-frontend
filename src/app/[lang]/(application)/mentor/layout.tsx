'use client';

import { type FC, type PropsWithChildren } from 'react';

import AuthLayout from '@/components/AuthLayout';
import Navbar from '@/components/navbar';
import { NAVBAR_LINKS } from '@/const/constants';

const LearnLayout: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <AuthLayout>
      <div className="bg-accent-background grid min-h-[100vh] grid-cols-[auto_1fr]">
        <Navbar links={NAVBAR_LINKS.mentor} />
        <main className="h-full max-h-screen w-full overflow-y-auto px-7.5 py-5">{children}</main>
      </div>
    </AuthLayout>
  );
};

export default LearnLayout;
