'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { ChatInput, ChatMessageHistory } from '@/shared/components/ai-assistant-chat';
import { useGetChatMessagesQuery, useSendMessageMutation } from '@/api/endpoints/ai-assistant';
import { IMessage, ISendMessageRequest } from '@/api/endpoints/ai-assistant/typing';
import { Role } from '@/api/endpoints/ai-assistant/constants';
import { showToast } from '@/shared/ui/toaster';
import { Button } from '@/shared/ui/button';
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
  const inFlightSendRef = useRef<ReturnType<typeof sendMessage> | null>(null);
  const [isManuallyStopped, setIsManuallyStopped] = useState(false);

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
      setIsManuallyStopped(false);
      const promise = sendMessage({ chatId, data });
      inFlightSendRef.current = promise;
      await promise.unwrap();
      startPolling();
    } catch {
      showToast('error', 'Не удалось отправить сообщение', '');
      setOptimisticMessages((prev) => prev.filter((msg) => msg.id !== optimisticMessage.id));
      stopPolling();
    }
  };

  const handleStop = () => {
    // abort in-flight send if any
    try {
      inFlightSendRef.current?.abort?.();
    } catch { }
    inFlightSendRef.current = null;
    setIsManuallyStopped(true);
    stopPolling();
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
    <div className="relative flex h-screen w-full flex-col items-center justify-center px-5">
      <div className="no-scrollbar flex w-full flex-1 items-center justify-center overflow-auto">
        <ChatMessageHistory
          messages={optimisticMessages}
          isLoading={isLoadingMessages && optimisticMessages.length === 0}
          isWaitingForAssistant={!isManuallyStopped && userCount > assistantCount}
        />
      </div>

      <div className="absolute bottom-0 flex w-full justify-center bg-none p-4">
        <div className="flex w-full max-w-[659px] flex-col items-center gap-2">
          {!isManuallyStopped && userCount > assistantCount && (
            <Button size="small" variant="white" onClick={handleStop}>
              Остановить ответ
            </Button>
          )}
          <ChatInput
            onSendMessage={handleSendMessage}
            isLoading={isSendingMessage || userCount > assistantCount}
          />
        </div>
      </div>
    </div>
  );
};
