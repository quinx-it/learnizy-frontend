import { FC, PropsWithChildren } from 'react';

import UserProfilePage from '@/appPages/userProfilePage';

const UserProfile: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return <UserProfilePage>{children}</UserProfilePage>;
};

export default UserProfile;
