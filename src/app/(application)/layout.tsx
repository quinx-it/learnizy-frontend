import { ReactNode } from 'react';
import { AuthLayout } from '@/shared/components/auth-layout';

interface ApplicationLayoutProps {
  children: ReactNode;
}

const ApplicationLayout = ({ children }: ApplicationLayoutProps) => {
  return (
    <AuthLayout>
        <main>{children}</main>
    </AuthLayout>
  );
};

export default ApplicationLayout;
