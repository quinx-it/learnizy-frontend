'use client';

import { type FC, type PropsWithChildren } from 'react';

import AuthLayout from '@/components/AuthLayout';
import Navbar from '@/components/navbar';
import { NAVBAR_LINKS } from '@/const/constants';

import { Content, LayoutGrid } from './styles';

const LearnLayout: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <AuthLayout>
      <LayoutGrid>
        <Navbar links={NAVBAR_LINKS.mentor} />
        <Content>{children}</Content>
      </LayoutGrid>
    </AuthLayout>
  );
};

export default LearnLayout;
