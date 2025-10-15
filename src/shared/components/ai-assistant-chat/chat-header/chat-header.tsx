'use client';

import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useGetChatMessagesQuery } from '@/api/endpoints/ai-assistant';

interface ChatHeaderProps {
  className?: string;
}

export const ChatHeader: FC<ChatHeaderProps> = ({ className }) => {
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
    <header
      className={`flex items-center justify-center ${className}`}
      style={{
        borderBottom: '1px solid',
        borderImageSlice: 1,
        borderImageSource:
          'linear-gradient(270deg, #F2FCFF 0%, #248EAB 35%, #248EAB 65%, #F2FCFF 100%)',
      }}
    >
      <h1
        className="text-center text-xl font-bold text-[#248EAB] md:text-xl"
        style={{
          textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
        }}
      >
        {isLoading ? 'Загрузка...' : title}
      </h1>
    </header>
  );
};
