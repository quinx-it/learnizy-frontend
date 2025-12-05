'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { FC } from 'react';

import { ITooltipProps } from './typings';

import { StyledArrow, StyledContent } from './styles';

const Tooltip: FC<ITooltipProps> = (props) => {
  const { children, content, offset = 0, side = 'top', delay = 0 } = props;

  return (
    <TooltipPrimitive.Provider delayDuration={delay}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <StyledContent sideOffset={offset} side={side}>
            {content}
            <StyledArrow />
          </StyledContent>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};

export default Tooltip;
