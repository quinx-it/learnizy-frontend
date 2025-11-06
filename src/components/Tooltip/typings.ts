import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { ComponentProps, PropsWithChildren, ReactNode } from 'react';

import CustomTooltip from '.';

import type { StoryObj } from '@storybook/nextjs';

export interface ITooltipProps extends PropsWithChildren {
  content: ReactNode;
  offset?: number;
  side?: ComponentProps<typeof TooltipPrimitive.Content>['side'];
  delay?: number;
}

export type StoryType = StoryObj<typeof CustomTooltip>;
