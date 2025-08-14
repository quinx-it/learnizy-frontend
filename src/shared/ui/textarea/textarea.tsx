import * as React from 'react';

import { cn } from '@/shared/lib/utils';
import { Text } from '@/shared/ui/typography';
import { ComponentProps } from 'react';

interface TextareaProps extends ComponentProps<'textarea'> {
  error?: string;
}


function Textarea({ className,error, ...props }: TextareaProps) {
  return (
    <div>
      <div className="bg-light rounded-[12px] border px-[20px] py-1 pr-4">
        <textarea
          data-slot="textarea"
          className={cn(
            'flex w-full min-w-0 pr-4 text-[16px] font-medium text-black transition-[color] outline-none placeholder:text-black/50 md:text-sm',
            'disabled:text-gray disabled:placeholder:text-gray disabled:pointer-events-none disabled:cursor-not-allowed',
            'aria-invalid:text-error aria-invalid:border-error',
            className,
          )}
          aria-invalid={!!error}
          {...props}
        />
      </div>
      {error && (
        <Text variant={'s'} className="text-error ml-[20px]">
          {error}
        </Text>
      )}
    </div>
  );
}

export { Textarea };
