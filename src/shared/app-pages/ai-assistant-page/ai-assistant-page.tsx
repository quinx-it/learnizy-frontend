'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Text } from '@/shared/ui/typography';
import { ChatInput } from '@/shared/components/ai-assistant-chat/chat-input/chat-input';
import { useCreateChatMutation, useSendMessageMutation } from '@/api/endpoints/ai-assistant';
import { routes } from '@/shared/constants';
import { showToast } from '@/shared/ui/toaster';
import { ISendMessageRequest } from '@/api/endpoints/ai-assistant/typing';

export const AiAssistantPage = () => {
  const router = useRouter();
  const [createChat, { isLoading: isCreatingChat }] = useCreateChatMutation();
  const [sendMessage, { isLoading: isSendingMessage }] = useSendMessageMutation();

  const isLoading = isCreatingChat || isSendingMessage;

  const handleStartNewChat = async (data: ISendMessageRequest) => {
    try {
      const newChatResponse = await createChat().unwrap();
      const newChatId = newChatResponse.chatId;
      await sendMessage({
        chatId: newChatId,
        data,
      }).unwrap();

      router.push(`${routes.user.aiAssistant}/chat/${newChatId}`);
    } catch {
      showToast('error', 'Не удалось создать новый чат', '');
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-4">
      <div className="relative h-[178px] w-[264px]">
        <Image
          src="/images/blue-planet-with-moon.webp"
          alt="Planet"
          fill
          className="object-contain"
        />
      </div>
      <Text className="mt-12 mb-6.5 text-center text-3xl">Чем я могу вам помочь?</Text>
      <ChatInput onSendMessage={handleStartNewChat} isLoading={isLoading} />
    </div>
  );
};
