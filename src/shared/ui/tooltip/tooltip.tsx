'use client';

import React, { ComponentProps, ReactNode } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '@/shared/lib/utils';

interface ITooltipProps {
  children: ReactNode;
  content: ReactNode;
  offset?: number;
  side?: ComponentProps<typeof TooltipPrimitive.Content>['side'];
  delay?: number;
}

export const CustomTooltip = ({
  children,
  content,
  offset = 0,
  side = 'top',
  delay = 0,
}: ITooltipProps) => {
  return (
    <TooltipPrimitive.Provider delayDuration={delay}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            sideOffset={offset}
            side={side}
            className={cn(
              'z-50 w-fit rounded-sm px-3 py-1.5 text-xs text-balance',
              'bg-light text-medium',
              'animate-in fade-in-0 zoom-in-95',
              'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
              'data-[side=bottom]:slide-in-from-top-2',
              'data-[side=left]:slide-in-from-right-2',
              'data-[side=right]:slide-in-from-left-2',
              'data-[side=top]:slide-in-from-bottom-2',
              'origin-[--radix-tooltip-content-transform-origin]',
            )}
          >
            {content}
            <TooltipPrimitive.Arrow className="bg-light fill-light z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};
