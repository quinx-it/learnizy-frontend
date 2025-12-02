'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import { FC } from 'react';

import { IPopoverProps } from './typings';

import { StyledPopoverContent } from './styles';

const Popover: FC<IPopoverProps> = (props) => {
  const {
    children,
    content,
    side = 'bottom',
    align = 'center',
    offset = 4,
    open,
    onOpenChange,
  } = props;

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <PopoverPrimitive.Trigger asChild>{children}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <StyledPopoverContent side={side} align={align} sideOffset={offset}>
          {content}
        </StyledPopoverContent>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
};

export default Popover;
