import * as React from 'react';
import { Progress } from '@radix-ui/react-progress';
import { cn } from '@shared/lib/utils';

export interface ProgressBarProps {
  value: number;
  className?: string;
  variant?: 'linear' | 'circular';
  size?: number;
  strokeWidth?: number;
}

export const ProgressBar = ({
  value,
  className,
  variant = 'linear',
  size = 48,
  strokeWidth = 4,
}: ProgressBarProps) => {
  if (variant === 'circular') {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    return (
      <svg width={size} height={size} className={cn('rotate-[-90deg]', className)}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--color-soft, #e5e7eb)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--color-medium, #9ca3af)"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-300"
        />
      </svg>
    );
  }

  return (
    <Progress
      value={value}
      className={cn(
        'bg-soft relative w-full overflow-hidden rounded-full',
        strokeWidth && `h-${strokeWidth}`,
        className,
      )}
    >
      <div
        className="bg-medium h-full w-full flex-1 transition-all duration-300"
        style={{ transform: `translateX(-${100 - value}%)` }}
      />
    </Progress>
  );
};
