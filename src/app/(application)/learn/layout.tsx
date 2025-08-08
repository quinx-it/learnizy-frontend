import { ReactNode } from 'react';
import { Navbar } from '@/shared/components/navbar';

interface ApplicationLayoutProps {
  children: ReactNode;
}

const LearnLayout = ({ children }: ApplicationLayoutProps) => {
  return (
      <div className="bg-accent-background grid min-h-[100vh] grid-cols-[auto_1fr]">
        <Navbar />
        <div className="h-full max-h-screen w-full overflow-y-auto px-7.5 py-5">{children}</div>
      </div>
  );
};

export default LearnLayout;
