import { ReactNode } from 'react';
import { ProfileDashboard } from './profile-dashboard';

interface UserProfilePageProps {
  children: ReactNode;
}

export const UserProfilePage = ({ children }: UserProfilePageProps) => {
  return (
    <div className="grid grid-cols-[3fr_7fr] gap-4">
      <ProfileDashboard />
      {children}
    </div>
  );
};
