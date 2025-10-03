import { UserProfilePage } from '@/shared/app-pages/user-profile-page';
import { ReactNode } from 'react';

interface UserProfileProps {
  children: ReactNode;
}

const UserProfile = ({ children }: UserProfileProps) => {
  return <UserProfilePage>{children}</UserProfilePage>;
};

export default UserProfile;
