import {
  type ComponentProps,
  type Dispatch,
  type PropsWithChildren,
  type ReactNode,
  type SetStateAction,
} from 'react';

import type * as PopoverPrimitive from '@radix-ui/react-popover';

export interface IPopoverProps extends PropsWithChildren {
  content: ReactNode;
  side?: ComponentProps<typeof PopoverPrimitive.Content>['side'];
  align?: ComponentProps<typeof PopoverPrimitive.Content>['align'];
  offset?: number;
  open?: boolean;
  onOpenChange?: Dispatch<SetStateAction<boolean>>;
}
