'use client';

import React, { FC } from 'react';

import { Heading, Text } from '@/components/Typography';
import { cn } from '@/lib/utils';

import { IDotTitleProps } from './typings';

export const Dot = ({ className }: { className?: string }) => (
  <span
    className={cn(
      'bg-medium !mt-2.5 h-[3px] max-h-[3px] min-h-[3px] w-[3px] max-w-[3px] min-w-[3px] rounded-full',
      className,
    )}
  />
);

export const DotTitle: FC<IDotTitleProps> = (props) => {
  const {
    firstLabel,
    secondLabel,
    firstVariant = 'm-bold',
    className,
    firstClassName,
    secondClassName,
    dotClassName,
    heading = false,
  } = props;

  return (
    <div className={cn('flex items-start gap-1.5', className)}>
      {heading ? (
        <Heading variant="2xl" className={cn('min-w-fit', firstClassName)}>
          {firstLabel}

          <span className={cn('text-medium inline', secondClassName)}>
            <span className={cn('leading-inherit !bg-transparent px-1 text-[22px]', dotClassName)}>
              •
            </span>
            {secondLabel}
          </span>
        </Heading>
      ) : (
        <Text variant={firstVariant} className={cn('min-w-fit', firstClassName)}>
          {firstLabel}

          <span className={cn('text-medium inline', secondClassName)}>
            <span className={cn('leading-inherit !bg-transparent px-1 text-[16px]', dotClassName)}>
              •
            </span>
            {secondLabel}
          </span>
        </Text>
      )}
    </div>
  );
};
