'use client';

import { useParams } from 'next/navigation';
import { FC, PropsWithChildren } from 'react';

import ChatHistory from '@/components/ChatHistory';
import { routes } from '@/constants/routes';
import { useRouter } from '@/hooks';

const AiAssistantLayout: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const params = useParams();

  const selectedChatId = params.id ? parseInt(params.id as string, 10) : null;

  const handleSelectChat = (chatId: number) => {
    router.push(`${routes.user.aiAssistant}/chat/${chatId}`);
  };

  const handleCreateChat = () => {
    router.push(routes.user.aiAssistant);
  };

  return (
    <div className="grid h-full w-full grid-cols-[1fr_auto]">
      <div className="relative flex flex-col overflow-hidden">{children}</div>
      <ChatHistory
        selectedChatId={selectedChatId}
        onSelectChat={handleSelectChat}
        onCreateChat={handleCreateChat}
      />
    </div>
  );
};

export default AiAssistantLayout;
