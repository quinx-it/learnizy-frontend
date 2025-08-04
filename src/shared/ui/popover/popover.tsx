'use client'

import React, { Dispatch, SetStateAction } from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { cn } from '@shared/lib/utils'

interface PopoverProps {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: React.ComponentProps<typeof PopoverPrimitive.Content>['side'];
  align?: React.ComponentProps<typeof PopoverPrimitive.Content>['align'];
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
  onOpenChange
}: PopoverProps) => {
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
}
