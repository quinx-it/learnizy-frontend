'use client';

import React, { useRef, useLayoutEffect, useEffect, FC } from 'react';
import { Text } from '@/shared/ui/typography';
import { Spinner } from '@/shared/ui/spinner';
import { AudioPlayer } from '../../audioPlayer';
import { IChatMessageHistoryProps } from './typings';
import { Role } from './constants';
import { isAudioUrl } from '@/shared/lib/utils';
import { Typewriter } from '../chatTypewriter';
import { usePrevious } from '@/shared/hooks/usePrevious';
import clsx from 'clsx';
import { MarkdownRenderer } from '@/shared/components/markdownText';

export const ChatMessageHistory: FC<IChatMessageHistoryProps> = (props) => {
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
      lastMessage.role !== Role.USER &&
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
      <div className="flex h-full items-center justify-center text-[#238BA7]">
        <Spinner size={50} />
      </div>
    );
  }

  return (
    <div
      ref={scrollContainerRef}
      className="no-scrollbar h-full w-full max-w-[659px] overflow-y-auto pt-[90px]"
    >
      {messages.map((message, index) => {
        const shouldAnimate =
          index === messages.length - 1 &&
          message.role !== Role.USER &&
          prevIsWaiting === true &&
          isWaitingForAssistant === false;

        return (
          <div
            key={message.id}
            className={clsx('mb-3 flex', {
              'justify-end': message.role === Role.USER,
              'justify-start': message.role !== Role.USER,
            })}
          >
            <div
              className={clsx('rounded-3xl py-2 break-words lg:mr-0 lg:ml-0', {
                'ml-6 bg-[#238BA7] text-white': message.role === Role.USER,
                'w-full': message.role !== Role.USER,
              })}
            >
              {message.role === Role.USER ? (
                isAudioUrl(message.audioFileUrl || '') ? (
                  <AudioPlayer
                    src={message.audioFileUrl || ''}
                    transcript={message.voiceTranscript}
                  />
                ) : (
                  <Text variant="m" className="px-4 text-base">
                    {message.content}
                  </Text>
                )
              ) : shouldAnimate ? (
                <Typewriter key={message.id} text={message.content} />
              ) : (
                <div className="prose prose-sm max-w-none break-words">
                  <MarkdownRenderer
                    text={message.content}
                    className="prose max-w-none break-words"
                  />
                </div>
              )}

              {message.role === Role.USER &&
                message.attachments &&
                message.attachments.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {message.attachments.map((att) => (
                      <a
                        key={att.downloadUrl}
                        href={att.downloadUrl}
                        download={att.originalFilename}
                        className="flex items-center gap-2 rounded-full px-5 py-1 text-sm transition-colors hover:text-gray-300"
                      >
                        <span className="max-w-[150px] truncate" title={att.originalFilename}>
                          {att.originalFilename}
                        </span>
                      </a>
                    ))}
                  </div>
                )}
            </div>
          </div>
        );
      })}

      {isWaitingForAssistant && (
        <div className="mb-8 flex justify-start">
          <div className="flex max-w-[90%] items-center gap-2 rounded-3xl px-4 py-2 text-gray-700">
            <Spinner size={16} className="text-[#238BA7]" />
            <span>ИИ думает...</span>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};
