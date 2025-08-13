import { cn } from '@/shared/lib/utils';
import { Text } from '@/shared/ui/typography';
import React from 'react';

export const Dot = ({ className }: { className?: string }) => (
  <span className={cn('bg-medium h-[3px] w-[3.2px] rounded-full', className)}></span>
);

interface DotTitleProps {
  firstLabel: string;
  firstClassName?: string;
  secondClassName?: string;
  secondLabel: string;
  firstVariant?: 'l' | 'l-bold' | 'm' | 'm-bold';
  secondVariant?: 'l' | 'l-bold' | 'm' | 'm-bold';
  className?: string;
  dotClassName?: string;
}

export const DotTitle = ({
  firstLabel,
  secondLabel,
  firstVariant = 'm-bold',
  secondVariant = 'm',
  className,
  firstClassName,
  secondClassName,
  dotClassName,
}: DotTitleProps) => {
  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <Text variant={firstVariant} className={firstClassName}>
        {firstLabel}
      </Text>
      <Dot className={dotClassName} />
      <Text variant={secondVariant} className={cn('text-medium',secondClassName)}>
        {secondLabel}
      </Text>
    </div>
  );
};