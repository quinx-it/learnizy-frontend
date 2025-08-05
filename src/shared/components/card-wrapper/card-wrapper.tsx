import { cn } from '@/shared/lib/utils';
import React from 'react';

type CardWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

export const CardWrapper = ({ children, className }: CardWrapperProps) => {
  return (
    <div className={cn('box-shadow bg-light relative p-6 rounded-2xl w-full max-w-fit', className)}>
      {children}
    </div>
  );
};
