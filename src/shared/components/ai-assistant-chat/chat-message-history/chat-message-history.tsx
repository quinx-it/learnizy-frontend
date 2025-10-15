'use client';

import React, { useEffect, useRef, FC } from 'react';
import { Text } from '@/shared/ui/typography';
import { Spinner } from '@/shared/ui/spinner';
import ReactMarkdown from 'react-markdown';
import { AudioPlayer } from '../../audio-player';
import { IChatMessageHistoryProps } from './typing';
import { Role } from './constants';
import { isAudioUrl } from '@/shared/lib/utils';
import { Typewriter } from '../chat-typewriter';
import { usePrevious } from '@/shared/hooks/use-previous';
import clsx from 'clsx';

export const ChatMessageHistory: FC<IChatMessageHistoryProps> = (props) => {
  const { messages, isLoading, isWaitingForAssistant } = props;

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const prevIsWaiting = usePrevious(isWaitingForAssistant);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
  };

  const smoothScrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    smoothScrollToBottom();
  }, [messages, isWaitingForAssistant]);

  if (isLoading && messages.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-[#238BA7]">
        <Spinner size={50} />
      </div>
    );
  }

  return (
    <div className="no-scrollbar h-full w-full max-w-[666px] overflow-y-auto px-4 pt-6">
      {messages.map((message, index) => {
        const shouldAnimate =
          index === messages.length - 1 &&
          message.role !== Role.USER &&
          prevIsWaiting === true &&
          isWaitingForAssistant === false;

        return (
          <div
            key={index}
            className={clsx('mb-8 flex', {
              'justify-end': message.role === Role.USER,
              'justify-start': message.role !== Role.USER,
            })}
          >
            <div
              className={clsx('max-w-[90%] rounded-3xl px-4 py-2 break-words md:max-w-2xl', {
                'bg-[#238BA7] text-white': message.role === Role.USER,
              })}
            >
              {message.role === Role.USER ? (
                isAudioUrl(message.audioFileUrl || '') ? (
                  <AudioPlayer
                    src={message.audioFileUrl || ''}
                    transcript={message.voiceTranscript}
                  />
                ) : (
                  <Text variant="m" className="text-base">
                    {message.content}
                  </Text>
                )
              ) : shouldAnimate ? (
                <Typewriter text={message.content} onUpdate={scrollToBottom} />
              ) : (
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              )}
              {message.role === Role.USER &&
                message.attachments &&
                message.attachments.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {message.attachments.map((att, idx) => (
                      <a
                        key={idx}
                        href={att.downloadUrl}
                        download={att.originalFilename}
                        className="text-black-800 flex items-center gap-2 rounded-full py-1 text-sm transition-colors hover:text-gray-300"
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
