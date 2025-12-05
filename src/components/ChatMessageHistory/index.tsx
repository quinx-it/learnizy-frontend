'use client';

import { useRef, useLayoutEffect, useEffect, FC } from 'react';

import AudioPlayer from '@/components/AudioPlayer';
import Typewriter from '@/components/ChatTypewriter';
import MarkdownRenderer from '@/components/MarkdownText';
import Spinner from '@/components/Spinner';
import { usePrevious } from '@/hooks/usePrevious';
import { isAudioUrl } from '@/lib/utils';

import { Role } from './constants';
import { IChatMessageHistoryProps } from './typings';

import {
  AttachmentFilename,
  AttachmentLink,
  AttachmentsWrapper,
  LoadingContainer,
  MarkdownWrapper,
  MessageBubble,
  MessageWrapper,
  ScrollContainer,
  ThinkingBubble,
  ThinkingText,
  ThinkingWrapper,
  UserMessageText,
} from './styles';

const ChatMessageHistory: FC<IChatMessageHistoryProps> = (props) => {
  const { messages = [], isLoading, isWaitingForAssistant } = props;

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const prevIsWaiting = usePrevious(isWaitingForAssistant);

  useLayoutEffect(() => {
    if (messages.length > 0) {
      scrollContainerRef.current?.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'auto',
      });
    }
  }, [messages.length]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];

    if (
      lastMessage &&
      lastMessage.role !== Role.User &&
      prevIsWaiting === true &&
      isWaitingForAssistant === false
    ) {
      scrollContainerRef.current?.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isWaitingForAssistant, prevIsWaiting]);

  if (isLoading && messages.length === 0) {
    return (
      <LoadingContainer>
        <Spinner size={50} />
      </LoadingContainer>
    );
  }

  return (
    <ScrollContainer ref={scrollContainerRef}>
      {messages.map((message, index) => {
        const shouldAnimate =
          index === messages.length - 1 &&
          message.role !== Role.User &&
          prevIsWaiting === true &&
          isWaitingForAssistant === false;

        const isUser = message.role === Role.User;

        return (
          <MessageWrapper key={message.id} isUser={isUser}>
            <MessageBubble isUser={isUser}>
              {(() => {
                if (isUser) {
                  if (isAudioUrl(message.audioFileUrl || '')) {
                    return (
                      <AudioPlayer
                        src={message.audioFileUrl || ''}
                        transcript={message.voiceTranscript}
                      />
                    );
                  }

                  return <UserMessageText>{message.content}</UserMessageText>;
                }

                if (shouldAnimate) {
                  return <Typewriter key={message.id} text={message.content} />;
                }

                return (
                  <MarkdownWrapper>
                    <MarkdownRenderer text={message.content} />
                  </MarkdownWrapper>
                );
              })()}

              {isUser && message.attachments && message.attachments.length > 0 && (
                <AttachmentsWrapper>
                  {message.attachments.map((att) => (
                    <AttachmentLink
                      key={att.downloadUrl}
                      href={att.downloadUrl}
                      download={att.originalFilename}
                    >
                      <AttachmentFilename title={att.originalFilename}>
                        {att.originalFilename}
                      </AttachmentFilename>
                    </AttachmentLink>
                  ))}
                </AttachmentsWrapper>
              )}
            </MessageBubble>
          </MessageWrapper>
        );
      })}

      {isWaitingForAssistant && (
        <ThinkingWrapper>
          <ThinkingBubble>
            <Spinner size={16} />
            <ThinkingText>ИИ думает...</ThinkingText>
          </ThinkingBubble>
        </ThinkingWrapper>
      )}

      <div ref={messagesEndRef} />
    </ScrollContainer>
  );
};

export default ChatMessageHistory;
