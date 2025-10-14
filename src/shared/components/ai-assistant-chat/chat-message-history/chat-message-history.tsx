'use client';

import React, { useEffect, useRef, FC } from 'react';
import { Text } from '@/shared/ui/typography';
import { Spinner } from '@/shared/ui/spinner';
import ReactMarkdown from 'react-markdown';
import { AudioPlayer } from '../../audio-player';
import { IChatMessageHistoryProps } from './typing';
import { isAudioUrl } from '@/shared/lib/utils';

export const ChatMessageHistory: FC<IChatMessageHistoryProps> = (props) => {
  const { messages, isLoading } = props;

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (isLoading && messages.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="no-scrollbar h-full w-full max-w-[666px] overflow-y-auto px-4 pt-6">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`mb-8 flex ${message.role === 'USER' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[90%] rounded-3xl px-4 py-2 break-words md:max-w-2xl ${
              message.role === 'USER' ? 'bg-[#238BA7] text-white' : ''
            }`}
          >
            {message.role === 'USER' ? (
              isAudioUrl(message.content) ? (
                <AudioPlayer src={message.content} />
              ) : (
                <Text variant="m" className="text-base">
                  {message.content}
                </Text>
              )
            ) : (
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};
