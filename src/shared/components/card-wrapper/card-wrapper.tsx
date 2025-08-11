import { cn } from '@/shared/lib/utils';
import React from 'react';

type CardWrapperProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export const CardWrapper = ({ children, className, onClick }: CardWrapperProps) => {
  return (
    <div
      onClick={onClick}
      className={cn('box-shadow bg-light relative w-full max-w-fit rounded-2xl p-6', className)}
    >
      {children}
    </div>
  );
};
