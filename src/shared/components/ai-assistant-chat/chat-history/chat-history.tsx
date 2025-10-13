'use client';

import React, { FC } from 'react';
import { Text } from '@/shared/ui/typography';
import { Plus } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { useGetChatsQuery } from '@/api/endpoints/ai-assistant';
import { IChatHistoryProps } from './typing';

export const ChatHistory: FC<IChatHistoryProps> = (props) => {
  const { selectedChatId, onSelectChat, onCreateChat } = props;

  const { data: chats, isLoading, isError } = useGetChatsQuery();

  return (
    <div className="bg-none lg:w-[230px]">
      <aside className="bg-light box-shadow fixed top-0 right-0 z-50 flex h-screen w-[230px] flex-col overflow-y-auto rounded-none rounded-l-4xl px-6">
        <div className="mt-8 mb-[61px] flex justify-end">
          <span className="block h-[48px] text-right text-[20px] break-words">
            История запросов
          </span>
        </div>
        <div className="mb-4 border-gray-200 pb-2">
          <Button
            onClick={onCreateChat}
            variant="blue"
            size="small"
            className="mt-auto w-full justify-start gap-2 border-0 !px-5 !py-2"
          >
            <Plus size={16} />
            Новый чат
          </Button>
        </div>
        <Text
          variant={'s'}
          className="mb-4 block text-left text-[12px] font-semibold tracking-[0.5px] text-[#238BA7]"
        >
          Чаты
        </Text>
        <div className="no-scrollbar flex-1 overflow-y-auto">
          {isLoading && <Text className="p-3 text-sm text-gray-500">Загрузка...</Text>}
          {isError && <Text className="p-3 text-sm text-red-500">Не удалось загрузить чаты</Text>}
          {chats?.map((chat) => (
            <div
              key={chat.id}
              className={`mt-2 flex cursor-pointer items-center rounded-2xl p-2 transition last:mb-[20px] ${
                selectedChatId === chat.id ? 'bg-gray-200' : 'hover:bg-gray-100'
              }`}
              onClick={() => onSelectChat(chat.id)}
            >
              <Text variant={'s'} className="ml-2">
                {' '}
                {chat.title || 'Новый чат'}
              </Text>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};
