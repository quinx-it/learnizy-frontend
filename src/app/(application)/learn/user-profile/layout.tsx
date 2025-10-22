import { UserProfilePage } from '@/shared/app-pages/user-profile-page';
import { ReactNode } from 'react';

interface IUserProfileProps {
  children: ReactNode;
}

const UserProfile = ({ children }: IUserProfileProps) => {
  return <UserProfilePage>{children}</UserProfilePage>;
};

export default UserProfile;
