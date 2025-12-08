'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect, useRef, useCallback, FC } from 'react';

import {
  useGetChatMessagesQuery,
  useSendMessageMutation,
  IMessage,
  ISendMessageRequest,
  Role,
} from '@/api/endpoints/aiAssistant';
import ChatHeader from '@/components/ChatHeader';
import ChatInput from '@/components/ChatInput';
import ChatMessageHistory from '@/components/ChatMessageHistory';
import { showToast } from '@/components/Toaster';
import { useTranslation } from '@/hooks';

import { POLLING_INTERVAL } from './constants';

import { Container, InputContainer, MessagesContainer, Spacer } from './styles';

const ChatAiAssistantPage: FC = () => {
  const params = useParams();
  const { t } = useTranslation();
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

    const userCount = chatData.messages.filter((m) => m.role === Role.User).length;
    const assistantCount = chatData.messages.filter((m) => m.role === Role.Assistant).length;

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
      role: Role.User,
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
      showToast('error', t('CHAT.SEND_ERROR'), '');
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

  const userCount = optimisticMessages.filter((m) => m.role === Role.User).length;
  const assistantCount = optimisticMessages.filter((m) => m.role === Role.Assistant).length;

  return (
    <Container>
      <ChatHeader />
      <MessagesContainer>
        <ChatMessageHistory
          messages={optimisticMessages}
          isLoading={isLoadingMessages && optimisticMessages.length === 0}
          isWaitingForAssistant={userCount > assistantCount}
        />
      </MessagesContainer>

      <Spacer />
      <InputContainer>
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isSendingMessage || userCount > assistantCount}
        />
      </InputContainer>
    </Container>
  );
};

export default ChatAiAssistantPage;
