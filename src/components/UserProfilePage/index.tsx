import { PropsWithChildren, FC } from 'react';

import ProfileDashboard from '@/components/ProfileDashboard';

const UserProfilePage: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-[3fr_7fr]">
      <ProfileDashboard />
      {children}
    </div>
  );
};

export default UserProfilePage;
