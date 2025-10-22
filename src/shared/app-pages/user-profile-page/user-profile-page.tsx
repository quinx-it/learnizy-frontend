import { ReactNode } from 'react';
import { ProfileDashboard } from './profile-dashboard';

interface IUserProfilePageProps {
  children: ReactNode;
}

export const UserProfilePage = ({ children }: IUserProfilePageProps) => {
  return (
    <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-[3fr_7fr]">
      <ProfileDashboard />
      {children}
    </div>
  );
};
