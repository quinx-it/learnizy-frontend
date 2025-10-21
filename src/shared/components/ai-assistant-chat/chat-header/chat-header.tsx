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
    <header className={`flex flex-col items-center ${className} w-full`}>
      <h1
        className="py-5 text-center font-bold text-[#248EAB] md:text-xl"
        style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}
      >
        {isLoading ? 'Загрузка...' : title}
      </h1>
      <div
        className="w-full md:w-[80%] lg:w-[50%]"
        style={{
          height: '1px',
          borderBottom: '1px solid',
          borderImageSlice: 1,
          borderImageSource:
            'linear-gradient(270deg, #F2FCFF 0%, #248EAB 35%, #248EAB 65%, #F2FCFF 100%)',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      />
    </header>
  );
};
