import { PropsWithChildren, FC } from 'react';
import { ProfileDashboard } from './ProfileDashboard/profileDashboard';
import Page from '@/components/Page';

export const UserProfilePage: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <Page noIndex>
      <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-[3fr_7fr]">
        <ProfileDashboard />
        {children}
      </div>
    </Page>
  );
};
