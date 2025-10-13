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
    <div className="no-scrollbar h-full w-full max-w-[666px] overflow-y-auto px-2 pt-6">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`mb-8 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-2xl rounded-3xl py-2 ${
              message.role === 'user' ? 'bg-[#238BA7] text-white' : ''
            }`}
          >
            {message.role === 'user' ? (
              isAudioUrl(message.content) ? (
                <div className="px-4">
                  <AudioPlayer src={message.content} />
                </div>
              ) : (
                <Text variant="m" className="max-w-[400px] px-6 text-base">
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
