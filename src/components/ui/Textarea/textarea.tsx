import React, { ChangeEvent, useState, useEffect } from 'react';

import { Text } from '@/components/ui/Typography';
import { cn } from '@/lib/utils';

import { MAX_TEXTAREA_LENGTH } from './constants';
import { ITextareaProps } from './typings';

function Textarea({ className, error, maxLength = MAX_TEXTAREA_LENGTH, ...props }: ITextareaProps) {
  const [value, setValue] = useState(props.value || '');

  useEffect(() => {
    if (typeof props.value === 'string') {
      setValue(props.value);
    }
  }, [props.value]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (props.onChange) props.onChange(e);

    setValue(e.target.value);
  };

  return (
    <div className="relative w-full">
      <div className={cn('bg-light rounded-[12px] border px-2 pt-2 pb-0', className)}>
        <div className="relative">
          <textarea
            data-slot="textarea"
            className={cn(
              'w-full text-[16px] font-medium text-black transition-[color] outline-none placeholder:text-black/50 md:text-sm',
              'h-32 resize-y overflow-auto pr-14',
              'disabled:text-gray disabled:placeholder:text-gray disabled:pointer-events-none disabled:cursor-not-allowed',
              'aria-invalid:text-error aria-invalid:border-error',
              className,
            )}
            aria-invalid={!!error}
            maxLength={maxLength}
            value={value}
            onChange={handleChange}
            {...props}
          />
          <div className="absolute right-3 bottom-1 text-xs text-gray-500">
            {String(value).length}/{maxLength}
          </div>
        </div>
      </div>

      {error && (
        <Text variant="s" className="text-error mt-1 ml-2">
          {error}
        </Text>
      )}
    </div>
  );
}

export { Textarea };
