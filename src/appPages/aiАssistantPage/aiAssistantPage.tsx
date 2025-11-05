'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  useCreateChatMutation,
  useSendMessageMutation,
  ISendMessageRequest,
} from '@/api/endpoints/aiAssistant';
import { ChatInput } from '@/components/aiAssistantChat/ChatInput';
import Page from '@/components/Page';
import { showToast } from '@/components/ui/Toaster';
import { Text } from '@/components/ui/Typography';
import { routes } from '@/constants';

export const AiAssistantPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
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
    <Page noIndex>
      <div className="flex flex-1 flex-col items-center justify-center p-4">
        <div className="relative h-[178px] w-[264px]">
          <Image
            src="/images/blue-planet-with-moon.webp"
            alt="Planet"
            fill
            className="object-contain"
          />
        </div>
        <Text className="mt-12 mb-6.5 text-center text-3xl">{t('COMMON.HELP_PROMPT')}</Text>
        <ChatInput onSendMessage={handleStartNewChat} isLoading={isLoading} />
      </div>
    </Page>
  );
};
