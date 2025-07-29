import * as React from 'react';

import { cn } from '@/shared/lib/utils';
import { Text } from '@/shared/ui/typography';

interface InputProps extends React.ComponentProps<'input'> {
  error?: string; // текст ошибки, если есть
}

function Input({ className, type = 'text',error, ...props }: InputProps) {
  return (
    <div className="flex flex-col">
      <input
        type={type}
        data-slot="input"
        className={cn(
          'bg-light flex h-9 w-full min-w-0 rounded-[50px] border px-[20px] py-0.5 text-[16px] font-medium text-black transition-[color] outline-none placeholder:text-black/50 md:text-sm',
          'disabled:text-gray disabled:placeholder:text-gray disabled:pointer-events-none disabled:cursor-not-allowed',
          'aria-invalid:text-error aria-invalid:border-error',
          error && 'border-error text-error',
          className,
        )}
        aria-invalid={!!error}
        {...props}
      />
      {error && (
        <Text variant={'s'} className="text-error ml-[20px]">
          {error}
        </Text>
      )}
    </div>
  );
}

export { Input };
