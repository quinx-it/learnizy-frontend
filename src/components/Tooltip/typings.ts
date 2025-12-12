import { type ComponentProps, type PropsWithChildren, type ReactNode } from 'react';

import type CustomTooltip from '.';
import type * as TooltipPrimitive from '@radix-ui/react-tooltip';
import type { StoryObj } from '@storybook/nextjs';

export interface ITooltipProps extends PropsWithChildren {
  content: ReactNode;
  offset?: number;
  side?: ComponentProps<typeof TooltipPrimitive.Content>['side'];
  delay?: number;
}

export type StoryType = StoryObj<typeof CustomTooltip>;
