'use client';

import { useParams } from 'next/navigation';
import { type FC, useEffect, useState } from 'react';

import { useGetChatMessagesQuery } from '@/api/endpoints/aiAssistant';
import { useTranslation } from '@/hooks';

import { type IChatHeaderProps } from './typings';

import { Container, Divider, Title } from './styles';

const ChatHeader: FC<IChatHeaderProps> = (props) => {
  const { className } = props;
  const { t } = useTranslation();

  const params = useParams();
  const chatId = params.id ? parseInt(params.id as string, 10) : null;

  const { data: chatData, isLoading } = useGetChatMessagesQuery(chatId!, { skip: !chatId });

  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    if (chatData?.title) {
      setTitle(chatData.title);
    }
  }, [chatData]);

  if (!chatId) return null;

  return (
    <Container className={className}>
      <Title variant="h1">{isLoading ? t('COMMON.LOADING') : title}</Title>
      <Divider />
    </Container>
  );
};

export default ChatHeader;
