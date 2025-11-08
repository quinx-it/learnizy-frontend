'use client';

import clsx from 'clsx';
import { Plus, X } from 'lucide-react';
import { FC, useState } from 'react';

import { useGetChatsQuery, IChat } from '@/api/endpoints/aiAssistant';
import Button from '@/components/Button';
import { HistoryIcon } from '@/components/Icons';
import { Text } from '@/components/Typography';
import { useTranslation } from '@/hooks';
import { formatRelativeDate } from '@/lib/utils';

import { IChatHistoryProps } from './typings';

const ChatHistory: FC<IChatHistoryProps> = (props) => {
  const { selectedChatId, onSelectChat, onCreateChat } = props;

  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);

  const { data: chats, isLoading, isError } = useGetChatsQuery();

  const groupChatsByDate = (chatList?: IChat[] | undefined) => {
    if (!chatList) return {};

    const validChats = chatList.filter((chat) => chat.updatedAt);
    const sortedChats = [...validChats].sort(
      (a, b) => new Date(b.updatedAt!).getTime() - new Date(a.updatedAt!).getTime(),
    );

    return sortedChats.reduce((groups: { [key: string]: IChat[] }, chat) => {
      const groupKey = formatRelativeDate(new Date(chat.updatedAt!), t);

      if (!groups[groupKey]) groups[groupKey] = [];

      groups[groupKey].push(chat);

      return groups;
    }, {});
  };

  const groupedChats = groupChatsByDate(chats);
  const chatGroups = Object.keys(groupedChats);

  return (
    <>
      <div className="right-none fixed top-4 z-40 ml-6 md:right-4 lg:hidden">
        <Button
          variant="blue"
          size="small"
          onClick={() => setIsOpen(true)}
          className="rounded-full border p-2"
        >
          <HistoryIcon />
        </Button>
      </div>

      {isOpen && (
        <>
          <div
            role="button"
            tabIndex={0}
            aria-label="Закрыть"
            className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
            onClick={() => setIsOpen(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setIsOpen(false);
            }}
          />
          <div
            className={clsx(
              'bg-light fixed top-0 left-0 z-50 flex h-full w-[80%] max-w-[280px] transform flex-col rounded-r-4xl p-4 shadow-lg transition-transform duration-300 lg:hidden',
              {
                'translate-x-0': isOpen,
                '-translate-x-full': !isOpen,
              },
            )}
          >
            <div className="relative mt-2 mb-[32px] flex items-center justify-start gap-3">
              <Button
                variant="white"
                size="small"
                onClick={() => setIsOpen(false)}
                className="h-[32px] w-[32px] cursor-pointer rounded-full border-none p-0 text-[#238BA7]"
              >
                <X />
              </Button>

              <span className="text-[20px] break-words"> {t('COMMON.REQUEST_HISTORY')}</span>
            </div>

            <div className="mb-4">
              <Button
                onClick={onCreateChat}
                variant="blue"
                size="small"
                className="w-full justify-start gap-2 border-0 !px-5 !py-2"
              >
                <Plus size={16} strokeWidth={4} />
                {t('COMMON.NEW_CHAT')}
              </Button>
            </div>

            <Text
              variant="s"
              className="mb-4 block text-left text-[12px] font-semibold tracking-[0.5px] text-[#238BA7]"
            >
              {t('COMMON.CHATS')}
            </Text>

            <div className="no-scrollbar flex-1 overflow-y-auto">
              {isLoading && (
                <Text className="p-3 text-sm text-gray-500">{t('COMMON.LOADING')}</Text>
              )}
              {isError && (
                <Text className="p-3 text-sm text-red-500">{t('COMMON.FAILED_TO_LOAD_CHATS')}</Text>
              )}

              {chatGroups.map((group) => (
                <div key={group}>
                  <Text
                    variant="s"
                    className="block text-left text-[12px] tracking-[0.5px] text-[#B9B9B9]"
                  >
                    {group}
                  </Text>
                  {groupedChats[group].map((chat) => (
                    <div
                      role="button"
                      tabIndex={0}
                      key={chat.id}
                      className={clsx(
                        'mt-2 flex cursor-pointer items-center rounded-2xl p-2 transition last:mb-[10px]',
                        {
                          'bg-gray-200': selectedChatId === chat.id,
                          'hover:bg-gray-100': selectedChatId !== chat.id,
                        },
                      )}
                      onClick={() => {
                        onSelectChat(chat.id);
                        setIsOpen(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          onSelectChat(chat.id);
                          setIsOpen(false);
                        }
                      }}
                    >
                      <Text variant="s" className="ml-2 truncate">
                        {chat.title || t('COMMON.NEW_CHAT')}
                      </Text>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="hidden bg-none lg:block lg:w-[230px]">
        <aside className="bg-light box-shadow fixed top-0 right-0 z-50 flex h-screen w-[230px] flex-col overflow-y-auto rounded-none rounded-l-4xl px-6">
          <div className="mt-8 mb-[61px] flex justify-end">
            <span className="block h-[48px] text-right text-[20px] break-words">
              {t('COMMON.REQUEST_HISTORY')}
            </span>
          </div>
          <div className="mb-4 border-gray-200 pb-2">
            <Button
              onClick={onCreateChat}
              variant="blue"
              size="small"
              className="mt-auto w-full justify-start gap-2 border-0 !px-5 !py-2"
            >
              <Plus size={16} strokeWidth={4} />
              {t('COMMON.NEW_CHAT')}
            </Button>
          </div>
          <Text
            variant="s"
            className="mb-4 block text-left text-[12px] font-semibold tracking-[0.5px] text-[#238BA7]"
          >
            {t('COMMON.CHATS')}
          </Text>
          <div className="no-scrollbar flex-1 overflow-y-auto">
            {isLoading && <Text className="p-3 text-sm text-gray-500">{t('COMMON.LOADING')}</Text>}
            {isError && (
              <Text className="p-3 text-sm text-red-500">{t('COMMON.FAILED_TO_LOAD_CHATS')}</Text>
            )}

            {chatGroups.map((group) => (
              <div key={group}>
                <Text
                  variant="s"
                  className="block text-left text-[12px] tracking-[0.5px] text-[#B9B9B9]"
                >
                  {group}
                </Text>
                {groupedChats[group].map((chat) => (
                  <div
                    role="button"
                    tabIndex={0}
                    key={chat.id}
                    className={clsx(
                      'mt-2 flex cursor-pointer items-center rounded-2xl p-2 transition last:mb-[10px]',
                      {
                        'bg-gray-200': selectedChatId === chat.id,
                        'hover:bg-gray-100': selectedChatId !== chat.id,
                      },
                    )}
                    onClick={() => onSelectChat(chat.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') onSelectChat(chat.id);
                    }}
                  >
                    <Text variant="s" className="ml-2 truncate">
                      {chat.title || t('COMMON.NEW_CHAT')}
                    </Text>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </>
  );
};

export default ChatHistory;
