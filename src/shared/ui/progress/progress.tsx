import * as React from 'react';
import { Progress } from '@radix-ui/react-progress';
import { cn } from '@shared/lib/utils';

export interface ProgressBarProps {
  value: number;
  className?: string;
}

export const ProgressBar = ({ value, className }: ProgressBarProps) => {
  return (
    <Progress
      value={value}
      className={cn(
        'relative h-4 w-full overflow-hidden rounded-full bg-soft',
        className
      )}
    >
      <div
        className='h-full w-full flex-1 bg-medium transition-all duration-300'
        style={{ transform: `translateX(-${100 - value}%)` }}
      />
    </Progress>
  );
};