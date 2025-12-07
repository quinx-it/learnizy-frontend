'use client';

import { Plus, X } from 'lucide-react';
import Image from 'next/image';
import { FC, useState } from 'react';

import { useGetChatsQuery, IChat } from '@/api/endpoints/aiAssistant';
import { useTranslation } from '@/hooks';
import { formatRelativeDate } from '@/lib/utils';

import { IChatHistoryProps } from './typings';

import {
  ChatGroup,
  ChatItem,
  ChatText,
  ChatsLabel,
  CloseButton,
  DesktopHeaderTitle,
  DesktopNewChatButton,
  DesktopNewChatButtonWrapper,
  DesktopSidebar,
  DesktopSidebarHeader,
  DesktopWrapper,
  ErrorText,
  GroupLabel,
  HeaderTitle,
  LoadingText,
  MobileButtonWrapper,
  MobileOpenButton,
  MobileSidebar,
  MobileSidebarHeader,
  NewChatButton,
  NewChatButtonWrapper,
  Overlay,
  ScrollContainer,
} from './styles';

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
      <MobileButtonWrapper>
        <MobileOpenButton variant="blue" size="small" onClick={() => setIsOpen(true)}>
          <Image src="/images/history-icon.svg" alt="History icon" width={24} height={24} />
        </MobileOpenButton>
      </MobileButtonWrapper>

      {isOpen && (
        <>
          <Overlay
            role="button"
            tabIndex={0}
            aria-label="Закрыть"
            onClick={() => setIsOpen(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setIsOpen(false);
            }}
          />
          <MobileSidebar isOpen={isOpen}>
            <MobileSidebarHeader>
              <CloseButton variant="white" size="small" onClick={() => setIsOpen(false)}>
                <X />
              </CloseButton>

              <HeaderTitle>{t('COMMON.REQUEST_HISTORY')}</HeaderTitle>
            </MobileSidebarHeader>

            <NewChatButtonWrapper>
              <NewChatButton onClick={onCreateChat} variant="blue" size="small">
                <Plus size={16} strokeWidth={4} />
                {t('COMMON.NEW_CHAT')}
              </NewChatButton>
            </NewChatButtonWrapper>

            <ChatsLabel>{t('COMMON.CHATS')}</ChatsLabel>

            <ScrollContainer>
              {isLoading && <LoadingText>{t('COMMON.LOADING')}</LoadingText>}
              {isError && <ErrorText>{t('COMMON.FAILED_TO_LOAD_CHATS')}</ErrorText>}

              {chatGroups.map((group) => (
                <ChatGroup key={group}>
                  <GroupLabel>{group}</GroupLabel>
                  {groupedChats[group].map((chat) => (
                    <ChatItem
                      role="button"
                      tabIndex={0}
                      key={chat.id}
                      isSelected={selectedChatId === chat.id}
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
                      <ChatText>{chat.title || t('COMMON.NEW_CHAT')}</ChatText>
                    </ChatItem>
                  ))}
                </ChatGroup>
              ))}
            </ScrollContainer>
          </MobileSidebar>
        </>
      )}

      <DesktopWrapper>
        <DesktopSidebar>
          <DesktopSidebarHeader>
            <DesktopHeaderTitle>{t('COMMON.REQUEST_HISTORY')}</DesktopHeaderTitle>
          </DesktopSidebarHeader>
          <DesktopNewChatButtonWrapper>
            <DesktopNewChatButton onClick={onCreateChat} variant="blue" size="small">
              <Plus size={16} strokeWidth={4} />
              {t('COMMON.NEW_CHAT')}
            </DesktopNewChatButton>
          </DesktopNewChatButtonWrapper>
          <ChatsLabel>{t('COMMON.CHATS')}</ChatsLabel>
          <ScrollContainer>
            {isLoading && <LoadingText>{t('COMMON.LOADING')}</LoadingText>}
            {isError && <ErrorText>{t('COMMON.FAILED_TO_LOAD_CHATS')}</ErrorText>}

            {chatGroups.map((group) => (
              <ChatGroup key={group}>
                <GroupLabel>{group}</GroupLabel>
                {groupedChats[group].map((chat) => (
                  <ChatItem
                    role="button"
                    tabIndex={0}
                    key={chat.id}
                    isSelected={selectedChatId === chat.id}
                    onClick={() => onSelectChat(chat.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') onSelectChat(chat.id);
                    }}
                  >
                    <ChatText>{chat.title || t('COMMON.NEW_CHAT')}</ChatText>
                  </ChatItem>
                ))}
              </ChatGroup>
            ))}
          </ScrollContainer>
        </DesktopSidebar>
      </DesktopWrapper>
    </>
  );
};

export default ChatHistory;
