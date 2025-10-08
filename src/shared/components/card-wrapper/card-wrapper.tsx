'use client';

import { cn } from '@/shared/lib/utils';
import React, { ReactNode } from 'react';

type CardWrapperPropsType = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export const CardWrapper = ({ children, className, onClick }: CardWrapperPropsType) => {
  return (
    <div
      onClick={onClick}
      className={cn('box-shadow bg-light relative w-full rounded-2xl p-6', className)}
    >
      {children}
    </div>
  );
};
