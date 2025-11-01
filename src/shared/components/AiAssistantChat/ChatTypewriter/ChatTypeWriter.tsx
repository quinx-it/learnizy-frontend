'use client';

import React, { FC, useState, useEffect } from 'react';
import { ITypewriterProps } from './typing';
import { MarkdownRenderer } from '@/shared/components/MarkdownText';

export const Typewriter: FC<ITypewriterProps> = (props) => {
  const { text, speed = 1, onUpdate } = props;

  const [displayedLength, setDisplayedLength] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const typeNext = () => {
      if (cancelled) return;

      setDisplayedLength((prev) => {
        if (prev < text.length) {
          onUpdate?.();
          setTimeout(typeNext, speed);
          return prev + 1;
        }
        return prev;
      });
    };

    setDisplayedLength(0);
    typeNext();

    return () => {
      cancelled = true;
    };
  }, [text, speed, onUpdate]);

  const visibleText = text.slice(0, displayedLength);

  return (
    <div className="prose prose-sm max-w-none">
      <MarkdownRenderer text={visibleText} />
    </div>
  );
};
