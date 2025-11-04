'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import { ChatInput, ChatMessageHistory } from '@/shared/components/aiAssistantChat';
import {
  useGetChatMessagesQuery,
  useSendMessageMutation,
  IMessage,
  ISendMessageRequest,
  Role,
} from '@/api/endpoints/aiAssistant';
import { showToast } from '@/shared/ui/toaster';
import Page from '@/shared/components/Page';

import { POLLING_INTERVAL, POLLING_DELAY_MS } from './constants';

export const ChatAiAssistantPage = () => {
  const params = useParams();
  const chatId = params.id ? parseInt(params.id as string, 10) : null;
  const { t } = useTranslation();

  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const delayedPollingRef = useRef<NodeJS.Timeout | null>(null);
  const cancelledAssistantsCountRef = useRef<number>(-1);

  const [optimisticMessages, setOptimisticMessages] = useState<IMessage[]>([]);
  const [isCancelled, setIsCancelled] = useState(false);

  const {
    data: chatData,
    isLoading: isLoadingMessages,
    refetch,
  } = useGetChatMessagesQuery(chatId!, { skip: !chatId });

  const [sendMessage, { isLoading: isSendingMessage }] = useSendMessageMutation();

  const startPolling = useCallback(() => {
    if (!pollingIntervalRef.current) {
      pollingIntervalRef.current = setInterval(() => {
        refetch();
      }, POLLING_INTERVAL);
    }
  }, [refetch]);

  const stopPolling = useCallback(() => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
    if (delayedPollingRef.current) {
      clearTimeout(delayedPollingRef.current);
      delayedPollingRef.current = null;
    }
  }, []);

  const filterCancelledMessages = useCallback((messages: IMessage[]) => {
    if (cancelledAssistantsCountRef.current < 0) return messages;

    const assistantMessages = messages.filter((m) => m.role === Role.ASSISTANT);

    if (assistantMessages.length <= cancelledAssistantsCountRef.current) return messages;

    const validMessages = assistantMessages.slice(0, cancelledAssistantsCountRef.current);
    const validIds = new Set(validMessages.map((m) => m.id));

    return messages.filter((m) => m.role !== Role.ASSISTANT || validIds.has(m.id));
  }, []);

  const handleSendMessage = async (data: ISendMessageRequest) => {
    if (!chatId || isSendingMessage) return;

    setIsCancelled(false);
    cancelledAssistantsCountRef.current = -1;

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
      delayedPollingRef.current = setTimeout(() => {
        startPolling();
      }, POLLING_DELAY_MS);
    } catch {
      showToast('error', t('CHAT_INPUT.ERROR_SENDING_MESSAGE'), '');
      setOptimisticMessages((prev) => prev.filter((msg) => msg.id !== optimisticMessage.id));
      stopPolling();
    }
  };

  const handleStopResponse = () => {
    stopPolling();
    setIsCancelled(true);
    const assistantMessages = optimisticMessages.filter((m) => m.role === Role.ASSISTANT);
    cancelledAssistantsCountRef.current = assistantMessages.length;
  };

  useEffect(() => {
    if (!chatData?.messages) return;

    const filteredMessages = filterCancelledMessages(chatData.messages);
    setOptimisticMessages(filteredMessages);

    const userCount = filteredMessages.filter((m) => m.role === Role.USER).length;
    const assistantCount = filteredMessages.filter((m) => m.role === Role.ASSISTANT).length;

    if (!(userCount > assistantCount) || isCancelled) {
      stopPolling();
    }
  }, [chatData, filterCancelledMessages, isCancelled, stopPolling]);

  useEffect(() => {
    return () => {
      stopPolling();
    };
  }, [stopPolling]);

  if (!chatId) return null;

  const userCount = optimisticMessages.filter((m) => m.role === Role.USER).length;
  const assistantCount = optimisticMessages.filter((m) => m.role === Role.ASSISTANT).length;
  const isWaitingForAssistant = userCount > assistantCount && !isCancelled;

  return (
    <Page noIndex>
      <div className="relative flex h-screen w-full flex-col items-center justify-center px-5">
        <div className="no-scrollbar flex w-full flex-1 items-center justify-center overflow-auto">
          <ChatMessageHistory
            messages={optimisticMessages}
            isLoading={isLoadingMessages && optimisticMessages.length === 0}
            isWaitingForAssistant={isWaitingForAssistant}
            isCancelled={isCancelled}
          />
        </div>

        <div className="mb-4 flex h-9 w-full justify-center" />
        <div className="absolute bottom-0 flex w-full justify-center bg-none p-4">
          <ChatInput
            onSendMessage={handleSendMessage}
            isLoading={isSendingMessage || isWaitingForAssistant}
            onStopResponse={handleStopResponse}
            isWaitingResponse={isWaitingForAssistant}
          />
        </div>
      </div>
    </Page>
  );
};
