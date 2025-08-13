import { cn } from '@/shared/lib/utils';
import { Heading, Text } from '@/shared/ui/typography';
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
  heading?: boolean;
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
  heading = false
}: DotTitleProps) => {
  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      {heading ? <Heading variant={'2xl'} className={firstClassName}>{firstLabel}</Heading> : (
        <Text variant={firstVariant} className={firstClassName}>
        {firstLabel}
      </Text>
    )}
      <Dot className={dotClassName} />
      {heading ? <Heading variant={'2xl'} className={cn('text-medium',secondClassName)}>{secondLabel}</Heading> : (
        <Text variant={secondVariant} className={cn('text-medium',secondClassName)}>
        {secondLabel}
      </Text>
     )}
    </div>
  );
};
