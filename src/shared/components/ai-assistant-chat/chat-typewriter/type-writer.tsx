'use client';

import React, { FC, useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { ITypewriterProps } from './typing';

export const Typewriter: FC<ITypewriterProps> = (props) => {
  const { text, speed = 2, onUpdate } = props;

  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
        onUpdate?.();
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, onUpdate]);

  return (
    <div className="prose prose-sm max-w-none">
      <ReactMarkdown>{displayedText}</ReactMarkdown>
    </div>
  );
};
