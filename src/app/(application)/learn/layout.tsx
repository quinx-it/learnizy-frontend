'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from '@/shared/components/navbar';
import { AuthLayout } from '@/shared/components/auth-layout';
import { navbarLinks } from '@/shared/constants/constants';
import { routes } from '@/shared/constants/routes';
import { ChatHeader } from '@/shared/components/ai-assistant-chat/chat-header';

interface IApplicationLayoutProps {
  children: ReactNode;
}

const LearnLayout = ({ children }: IApplicationLayoutProps) => {
  const pathname = usePathname();

  const showChatHeader = pathname.startsWith('/learn/ai-assistant/chat/');

  const isAiAssistantPage = pathname.startsWith(routes.user.aiAssistant);
  const mainClass = isAiAssistantPage
    ? 'h-full max-h-screen w-full overflow-y-auto'
    : 'h-full max-h-screen w-full overflow-y-auto px-4 py-5 md:px-7.5';

  return (
    <AuthLayout>
      {showChatHeader && (
        <ChatHeader className="fixed z-30 block w-full bg-[#F2FCFF] md:ml-10 lg:ml-0" />
      )}
      <div className="bg-accent-background grid min-h-screen md:grid-cols-[auto_1fr]">
        <Navbar links={navbarLinks.user} />
        <main className={mainClass}>{children}</main>
      </div>
    </AuthLayout>
  );
};

export default LearnLayout;
