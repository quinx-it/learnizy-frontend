import { cn } from '@/lib/utils';
import React from 'react';
import { IIconProps } from '@/types';

function CircleIcon({ color = 'currentColor', className }: IIconProps) {
  return (
    <svg
      className={cn(className, '')}
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="4" cy="4" r="4" fill={color} />
    </svg>
  );
}

export { CircleIcon };
