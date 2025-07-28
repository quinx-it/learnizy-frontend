import React from 'react';
import { cn } from '@/shared/lib/utils';

type NotFoundProps = {
  errorText?: string;
  className?: string;
};

export const NotFound = ({ className, /* errorText = 'Страница не найдена' */ }: NotFoundProps) => {
  return (
    <div className={cn('text-deep mx-auto p-4 text-center', className)}>
      <h1>Not found</h1>
    </div>
  );
};
