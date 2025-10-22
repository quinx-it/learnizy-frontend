import { UserProfilePage } from '@/shared/app-pages/user-profile-page';
import { ReactNode, FC } from 'react';

interface IUserProfileProps {
  children: ReactNode;
}

const UserProfile: FC<IUserProfileProps> = (props) => {
  const { children } = props;

  return <UserProfilePage>{children}</UserProfilePage>;
};

export default UserProfile;
