'use client';

import { cn } from '@/shared/lib/utils';
import React, { ReactNode, FC } from 'react';

type CardWrapperPropsType = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export const CardWrapper: FC<CardWrapperPropsType> = (props) => {
  const { children, className, onClick } = props;

  return (
    <div
      onClick={onClick}
      className={cn('box-shadow bg-light relative w-full rounded-2xl p-6', className)}
    >
      {children}
    </div>
  );
};
