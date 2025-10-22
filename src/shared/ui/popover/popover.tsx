'use client';

import React, { ComponentProps, Dispatch, ReactNode, SetStateAction } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '@/shared/lib/utils';

interface IPopoverProps {
  children: ReactNode;
  content: ReactNode;
  side?: ComponentProps<typeof PopoverPrimitive.Content>['side'];
  align?: ComponentProps<typeof PopoverPrimitive.Content>['align'];
  offset?: number;
  open?: boolean;
  onOpenChange?: Dispatch<SetStateAction<boolean>>;
}

export const Popover = ({
  children,
  content,
  side = 'bottom',
  align = 'center',
  offset = 4,
  open,
  onOpenChange,
}: IPopoverProps) => {
  return (
    <PopoverPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <PopoverPrimitive.Trigger asChild>{children}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side={side}
          align={align}
          sideOffset={offset}
          className={cn(
            'z-50 w-72 rounded-md border p-4 shadow-md outline-hidden',
            'bg-popover text-popover-foreground',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
            'data-[side=bottom]:slide-in-from-top-2',
            'data-[side=left]:slide-in-from-right-2',
            'data-[side=right]:slide-in-from-left-2',
            'data-[side=top]:slide-in-from-bottom-2',
            'origin-[--radix-popover-content-transform-origin]',
          )}
        >
          {content}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
};
