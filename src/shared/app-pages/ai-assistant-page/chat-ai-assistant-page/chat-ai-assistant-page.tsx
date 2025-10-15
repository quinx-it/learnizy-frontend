'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { ChatInput, ChatMessageHistory } from '@/shared/components/ai-assistant-chat';
import { useGetChatMessagesQuery, useSendMessageMutation } from '@/api/endpoints/ai-assistant';
import { IMessage, ISendMessageRequest, Role } from '@/api/endpoints/ai-assistant/typing';
import { showToast } from '@/shared/ui/toaster';
import { POLLING_INTERVAL } from './constants';

export const ChatAiAssistantPage = () => {
  const params = useParams();
  const chatId = params.id ? parseInt(params.id as string, 10) : null;

  const pollingInterval = useRef<NodeJS.Timeout | null>(null);
  const [isWaitingForAssistant, setIsWaitingForAssistant] = useState(false);
  const [optimisticMessages, setOptimisticMessages] = useState<IMessage[]>([]);

  const {
    data: messagesFromServer,
    isLoading: isLoadingMessages,
    refetch,
  } = useGetChatMessagesQuery(chatId!, {
    skip: !chatId,
  });

  const [sendMessage, { isLoading: isSendingMessage }] = useSendMessageMutation();

  useEffect(() => {
    if (messagesFromServer) {
      setOptimisticMessages(messagesFromServer);

      const lastMessage = messagesFromServer[messagesFromServer.length - 1];

      if (!lastMessage || lastMessage.role === Role.ASSISTANT) {
        setIsWaitingForAssistant(false);
        
        if (pollingInterval.current) {
          clearInterval(pollingInterval.current);
          pollingInterval.current = null;
        }
        return;
      }

      if (lastMessage.role === Role.USER) {
        setIsWaitingForAssistant(true);

        if (!pollingInterval.current) {
          pollingInterval.current = setInterval(() => {
            refetch();
          }, POLLING_INTERVAL);
        }
      }
    }

    return () => {
      if (pollingInterval.current) clearInterval(pollingInterval.current);
    };
  }, [messagesFromServer, refetch]);

  const handleSendMessage = async (data: ISendMessageRequest) => {
    if (!chatId || isSendingMessage || isWaitingForAssistant) return;

    if (pollingInterval.current) {
      clearInterval(pollingInterval.current);
      pollingInterval.current = null;
    }

    const optimisticMessage: IMessage = {
      role: Role.USER,
      content: data.text || '',
      audioFileUrl: data.audioFileUrl || null,
      voiceTranscript: data.text || null,
      attachments: data.attachments || [],
    };

    setOptimisticMessages((prev) => [...prev, optimisticMessage]);
    setIsWaitingForAssistant(true);

    try {
      await sendMessage({ chatId, data }).unwrap();
      await refetch();
    } catch {
      showToast('error', 'Не удалось отправить сообщение', '');
      setOptimisticMessages((prev) => prev.slice(0, -1));
      setIsWaitingForAssistant(false);
    }
  };

  if (!chatId) return null;

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center">
      <div className="flex w-full flex-1 items-center justify-center overflow-auto">
        <ChatMessageHistory
          messages={optimisticMessages}
          isLoading={isLoadingMessages && optimisticMessages.length === 0}
          isWaitingForAssistant={isWaitingForAssistant}
        />
      </div>

      <div className="mb-4 flex h-9 w-full justify-center" />
      <div className="absolute bottom-0 flex w-full justify-center bg-none p-4">
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isSendingMessage || isWaitingForAssistant}
        />
      </div>
    </div>
  );
};
