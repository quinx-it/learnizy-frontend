'use client';

import { useParams } from 'next/navigation';
import React, { useState, useEffect, useRef, useCallback } from 'react';

import {
  useGetChatMessagesQuery,
  useSendMessageMutation,
  IMessage,
  ISendMessageRequest,
  Role,
} from '@/api/endpoints/aiAssistant';
import { ChatInput, ChatMessageHistory } from '@/components/aiAssistantChat';
import Page from '@/components/Page';
import { showToast } from '@/ui/toaster';

import { POLLING_INTERVAL } from './constants';

export const ChatAiAssistantPage = () => {
  const params = useParams();
  const chatId = params.id ? parseInt(params.id as string, 10) : null;

  const pollingInterval = useRef<NodeJS.Timeout | null>(null);
  const [optimisticMessages, setOptimisticMessages] = useState<IMessage[]>([]);

  const {
    data: chatData,
    isLoading: isLoadingMessages,
    refetch,
  } = useGetChatMessagesQuery(chatId!, { skip: !chatId });

  const [sendMessage, { isLoading: isSendingMessage }] = useSendMessageMutation();

  const startPolling = useCallback(() => {
    if (!pollingInterval.current) {
      pollingInterval.current = setInterval(() => {
        refetch();
      }, POLLING_INTERVAL);
    }
  }, [refetch]);

  const stopPolling = useCallback(() => {
    if (pollingInterval.current) {
      clearInterval(pollingInterval.current);
      pollingInterval.current = null;
    }
  }, []);

  useEffect(() => {
    if (!chatData?.messages) return;

    setOptimisticMessages(chatData.messages);

    const userCount = chatData.messages.filter((m) => m.role === Role.USER).length;
    const assistantCount = chatData.messages.filter((m) => m.role === Role.ASSISTANT).length;

    if (userCount > assistantCount) {
      startPolling();
    } else {
      stopPolling();
    }
  }, [chatData, startPolling, stopPolling]);

  const handleSendMessage = async (data: ISendMessageRequest) => {
    if (!chatId || isSendingMessage) return;

    const optimisticMessage: IMessage = {
      id: Date.now(),
      role: Role.USER,
      content: data.text || '',
      audioFileUrl: data.audioFileUrl || null,
      voiceTranscript: data.text || null,
      attachments: data.attachments || [],
    };

    setOptimisticMessages((prev) => [...prev, optimisticMessage]);

    try {
      await sendMessage({ chatId, data }).unwrap();
      startPolling();
    } catch {
      showToast('error', 'Не удалось отправить сообщение', '');
      setOptimisticMessages((prev) => prev.filter((msg) => msg.id !== optimisticMessage.id));
      stopPolling();
    }
  };

  useEffect(() => {
    return () => {
      stopPolling();
    };
  }, [stopPolling]);

  if (!chatId) return null;

  const userCount = optimisticMessages.filter((m) => m.role === Role.USER).length;
  const assistantCount = optimisticMessages.filter((m) => m.role === Role.ASSISTANT).length;

  return (
    <Page noIndex>
      <div className="relative flex h-screen w-full flex-col items-center justify-center px-5">
        <div className="no-scrollbar flex w-full flex-1 items-center justify-center overflow-auto">
          <ChatMessageHistory
            messages={optimisticMessages}
            isLoading={isLoadingMessages && optimisticMessages.length === 0}
            isWaitingForAssistant={userCount > assistantCount}
          />
        </div>

        <div className="mb-4 flex h-9 w-full justify-center" />
        <div className="absolute bottom-0 flex w-full justify-center bg-none p-4">
          <ChatInput
            onSendMessage={handleSendMessage}
            isLoading={isSendingMessage || userCount > assistantCount}
          />
        </div>
      </div>
    </Page>
  );
};
