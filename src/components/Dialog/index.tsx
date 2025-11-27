'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import { ComponentProps } from 'react';

import {
  CloseButton,
  DialogDescription as StyledDialogDescription,
  DialogFooter as StyledDialogFooter,
  DialogHeader as StyledDialogHeader,
  DialogTitle as StyledDialogTitle,
  ScreenReaderOnly,
  StyledContent,
  StyledOverlay,
} from './styles';

function Dialog({ ...props }: ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({ ...props }: ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }: ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({ ...props }: ComponentProps<typeof DialogPrimitive.Overlay>) {
  return <StyledOverlay data-slot="dialog-overlay" {...props} />;
}

function DialogContent({
  children,
  showCloseButton = true,
  ...props
}: ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <StyledContent data-slot="dialog-content" {...props}>
        {children}
        {showCloseButton && (
          <CloseButton data-slot="dialog-close">
            <XIcon />
            <ScreenReaderOnly>Close</ScreenReaderOnly>
          </CloseButton>
        )}
      </StyledContent>
    </DialogPortal>
  );
}

function DialogHeader({ ...props }: ComponentProps<'div'>) {
  return <StyledDialogHeader data-slot="dialog-header" {...props} />;
}

function DialogFooter({ ...props }: ComponentProps<'div'>) {
  return <StyledDialogFooter data-slot="dialog-footer" {...props} />;
}

function DialogTitle({ ...props }: ComponentProps<typeof DialogPrimitive.Title>) {
  return <StyledDialogTitle data-slot="dialog-title" {...props} />;
}

function DialogDescription({ ...props }: ComponentProps<typeof DialogPrimitive.Description>) {
  return <StyledDialogDescription data-slot="dialog-description" {...props} />;
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
