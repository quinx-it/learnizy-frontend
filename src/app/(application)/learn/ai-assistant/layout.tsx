'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ChatHistory } from '@/shared/components/ai-assistant-chat';
import { routes } from '@/shared/constants/routes';
import { PropsWithChildren } from 'react';

export default function AiAssistantLayout({ children }: PropsWithChildren) {
  const router = useRouter();
  const params = useParams();

  const selectedChatId = params?.id ? parseInt(params.id as string, 10) : null;

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
}
