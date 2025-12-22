'use client';

import { useParams } from 'next/navigation';
import { type FC, type PropsWithChildren } from 'react';

import ChatHistory from '@/components/ChatHistory';
import { ROUTES } from '@/const/routes';
import { useRouter } from '@/hooks';

import { ContentWrapper, LayoutGrid } from './styles';

const AiAssistantLayout: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const params = useParams();

  const selectedChatId = params.id ? parseInt(params.id as string, 10) : null;

  const handleSelectChat = (chatId: number) => {
    router.push(`${ROUTES.user.aiAssistant}/chat/${chatId}`);
  };

  const handleCreateChat = () => {
    router.push(ROUTES.user.aiAssistant);
  };

  return (
    <LayoutGrid>
      <ContentWrapper>{children}</ContentWrapper>
      <ChatHistory
        selectedChatId={selectedChatId}
        onSelectChat={handleSelectChat}
        onCreateChat={handleCreateChat}
      />
    </LayoutGrid>
  );
};

export default AiAssistantLayout;
