import { NotificationIcon } from '@/shared/ui/icons';
import { Text } from '@/shared/ui/typography';
import { X } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

type ToastStatus = 'success' | 'error';

interface CustomToastOptions {
  message: string | React.ReactNode;
  status?: ToastStatus;
}

export const showCustomToast = ({ message, status = 'error' }: CustomToastOptions) => {
  const isError = status === 'error';

  return toast.custom((t) => (
    <div
      className={`text-light z-100 flex w-full max-w-[648px] items-center justify-between gap-4 rounded-2xl px-6 py-3 transition-all ${isError ? 'bg-error' : 'bg-success'}`}
    >
      <div className="flex items-center gap-3">
        <NotificationIcon
          status={status}
          className="text-light size-[18px] min-h-[18px] min-w-[18px]"
        />
        <Text variant="s-14">{message}</Text>
      </div>
      <button onClick={() => toast.dismiss(t)} className="cursor-pointer transition-colors">
        <X className="h-6 w-6" />
      </button>
    </div>
  ));
};
