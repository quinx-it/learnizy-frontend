'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ChatInput } from '@/shared/components/ai-assistant-chat';
import { ChatMessageHistory } from '@/shared/components/ai-assistant-chat';
import { useGetChatMessagesQuery, useSendMessageMutation } from '@/api/endpoints/ai-assistant';
import { IMessage } from '@/api/endpoints/ai-assistant/typing';
import { showToast } from '@/shared/ui/toaster';

export const ChatAiAssistantPage = () => {
  const params = useParams();
  const chatId = params.id ? parseInt(params.id as string, 10) : null;

  const [optimisticMessages, setOptimisticMessages] = useState<IMessage[]>([]);
  const {
    data: messagesFromServer,
    isLoading: isLoadingMessages,
    isFetching,
  } = useGetChatMessagesQuery(chatId!, {
    skip: !chatId,
  });

  const [sendMessage, { isLoading: isSendingMessage }] = useSendMessageMutation();

  useEffect(() => {
    if (messagesFromServer) {
      setOptimisticMessages(messagesFromServer);
    }
  }, [messagesFromServer]);

  const handleSendMessage = async (text: string) => {
    if (!chatId) return;

    const optimisticMessage: IMessage = {
      role: 'user',
      content: text,
    };
    setOptimisticMessages((prev) => [...prev, optimisticMessage]);

    try {
      await sendMessage({
        chatId: chatId,
        data: { text: text, audioFileUrl: '' },
      }).unwrap();
    } catch {
      showToast('error', 'Не удалось отправить сообщение', '');
    }
  };

  if (!chatId) {
    return null;
  }

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center">
      <div className="flex w-full flex-1 items-center justify-center overflow-auto">
        <ChatMessageHistory
          messages={optimisticMessages}
          isLoading={isLoadingMessages || isFetching}
        />
      </div>
      <div className="mb-4 flex h-9 w-full justify-center" />
      <div className="absolute bottom-0 flex w-full justify-center bg-none p-4">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isSendingMessage} />
      </div>
    </div>
  );
};
