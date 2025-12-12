'use client';

import { type PropsWithChildren, type FC } from 'react';

import ProfileDashboard from '@/components/ProfileDashboard';

import { Container } from './styles';

const UserProfilePage: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <Container>
      <ProfileDashboard />
      {children}
    </Container>
  );
};

export default UserProfilePage;
