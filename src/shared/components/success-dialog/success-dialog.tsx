import { cn } from '@/shared/lib/utils';
import { NotificationIcon } from '@/shared/ui/icons';
import { Dialog, DialogContent, DialogTitle } from '@shared/ui/dialog';
import React from 'react';
import { Text } from '@/shared/ui/typography';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

type SuccessDialog = {
  className?: string;
  message: string | React.ReactNode;
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export const SuccessDialog = ({ message, className, open, setIsOpen }: SuccessDialog) => {
  const handleInteractOutside = (e: Event) => {
    e.preventDefault();
  };
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent
        className={cn(
          'bg-soft z-[100] w-full max-w-[95%] py-6 pr-10 pl-8 sm:max-w-[450px] sm:py-13 md:max-w-[520px]',
          className,
        )}
        onInteractOutside={handleInteractOutside}
      >
        <VisuallyHidden>
          <DialogTitle>Success</DialogTitle>
        </VisuallyHidden>
        <div className="flex items-center">
          <NotificationIcon className="text-deep mr-4 size-6 min-h-6 min-w-6" />
          <Text variant="l-20">{message}</Text>
        </div>
      </DialogContent>
    </Dialog>
  );
};
