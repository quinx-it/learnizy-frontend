import { UserProfilePage } from '@/pages/user-profile-page';
import { FC, PropsWithChildren } from 'react';

const UserProfile: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return <UserProfilePage>{children}</UserProfilePage>;
};

export default UserProfile;
