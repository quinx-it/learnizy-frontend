'use client';

import { FC, PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from '@/shared/components/navbar';
import { AuthLayout } from '@/shared/components/authLayout';
import { navbarLinks } from '@/shared/constants/constants';
import { routes } from '@/shared/constants/routes';
import { ChatHeader } from '@/shared/components/aiAssistantChat/ChatHeader';
import { useTranslation } from 'react-i18next';

const LearnLayout: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const pathname = usePathname();
  const { t } = useTranslation();

  const showChatHeader = pathname.startsWith('/learn/ai-assistant/chat/');

  const isAiAssistantPage = pathname.startsWith(routes.user.aiAssistant);
  const mainClass = isAiAssistantPage
    ? 'h-full max-h-screen w-full overflow-y-auto'
    : 'h-full max-h-screen w-full overflow-y-auto px-4 py-5 md:px-7.5';

  const links = navbarLinks.user.map(({ label, ...rest }) => ({
    ...rest,
    label: t(label),
  }));

  return (
    <AuthLayout>
      {showChatHeader && (
        <ChatHeader className="fixed z-30 block w-full bg-[#F2FCFF] md:ml-10 lg:ml-0" />
      )}
      <div className="bg-accent-background grid min-h-screen md:grid-cols-[auto_1fr]">
        <Navbar links={links} />
        <main className={mainClass}>{children}</main>
      </div>
    </AuthLayout>
  );
};

export default LearnLayout;
