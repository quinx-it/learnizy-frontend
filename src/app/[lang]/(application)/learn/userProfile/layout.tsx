import { type FC, type PropsWithChildren } from 'react';

import UserProfilePage from '@/components/UserProfilePage';

const UserProfile: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return <UserProfilePage>{children}</UserProfilePage>;
};

export default UserProfile;
