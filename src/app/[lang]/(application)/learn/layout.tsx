'use client';

import { type FC, type PropsWithChildren } from 'react';

import AuthLayout from '@/components/AuthLayout';
import ChatHeader from '@/components/ChatHeader';
import Navbar from '@/components/navbar';
import { NAVBAR_LINKS } from '@/const/constants';
import { ROUTES } from '@/const/routes';
import { usePathname, useTranslation } from '@/hooks';

import { ChatHeaderWrapper, LayoutGrid, MainContent } from './styles';

const LearnLayout: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const pathname = usePathname();
  const { t } = useTranslation();

  const showChatHeader = pathname.startsWith('/learn/ai-assistant/chat/');

  const isAiAssistantPage = pathname.startsWith(ROUTES.USER_AI_ASSISTANT);
  const links = NAVBAR_LINKS.user.map(({ label, ...rest }) => ({
    ...rest,
    label: t(label),
  }));

  return (
    <AuthLayout>
      {showChatHeader && (
        <ChatHeaderWrapper>
          <ChatHeader />
        </ChatHeaderWrapper>
      )}
      <LayoutGrid>
        <Navbar links={links} />
        <MainContent isAiPage={isAiAssistantPage}>{children}</MainContent>
      </LayoutGrid>
    </AuthLayout>
  );
};

export default LearnLayout;
