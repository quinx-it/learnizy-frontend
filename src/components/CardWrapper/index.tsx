'use client';

import { FC } from 'react';

import { cn } from '@/lib/utils';

import { CardWrapperPropsType } from './typings';

const CardWrapper: FC<CardWrapperPropsType> = (props) => {
  const { children, className, onClick } = props;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      className={cn('box-shadow bg-light relative w-full rounded-2xl p-6', className)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick?.();
      }}
    >
      {children}
    </div>
  );
};

export default CardWrapper;
