import { ReactNode } from 'react';
import { ProfileDashboard } from './profile-dashboard';

interface UserProfilePageProps {
  children: ReactNode;
}

export const UserProfilePage = ({ children }: UserProfilePageProps) => {
  return (
    <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-[3fr_7fr]">
      <ProfileDashboard />
      {children}
    </div>
  );
};
