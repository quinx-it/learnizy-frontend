'use client';

import {
  useCreateChatMutation,
  useSendMessageMutation,
  type ISendMessageRequest,
} from '@/api/endpoints/aiAssistant';
import ChatInput from '@/components/ChatInput';
import { showToast } from '@/components/Toaster';
import { Text } from '@/components/Typography';
import { routes } from '@/const';
import { useRouter, useTranslation } from '@/hooks';

import { Container, ImageContainer, StyledImage, WelcomeText } from './styles';

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
      showToast('error', t('CHAT.CREATE_CHAT_ERROR'), '');
    }
  };

  return (
    <Container>
      <ImageContainer>
        <StyledImage src="/images/blue-planet-with-moon.webp" alt="Planet" fill />
      </ImageContainer>
      <WelcomeText>
        <Text>{t('COMMON.HELP_PROMPT')}</Text>
      </WelcomeText>
      <ChatInput onSendMessage={handleStartNewChat} isLoading={isLoading} />
    </Container>
  );
};
