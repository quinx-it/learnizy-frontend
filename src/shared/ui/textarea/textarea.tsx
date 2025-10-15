import * as React from 'react';
import { cn } from '@/shared/lib/utils';
import { Text } from '@/shared/ui/typography';
import { useState, useEffect } from 'react';
import { MAX_TEXTAREA_LENGTH } from './constants';
import { ITextareaProps } from './typings';

function Textarea({ className, error, maxLength = MAX_TEXTAREA_LENGTH, ...props }: ITextareaProps) {
  const [value, setValue] = useState(props.value || '');

  useEffect(() => {
    if (typeof props.value === 'string') {
      setValue(props.value);
    }
  }, [props.value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (props.onChange) props.onChange(e);
    setValue(e.target.value);
  };

  return (
    <div className="relative">
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
          maxLength={maxLength}
          value={value}
          onChange={handleChange}
          {...props}
        />
      </div>

      {error && (
        <Text variant="s" className="text-error mt-1 ml-[20px]">
          {error}
        </Text>
      )}

      <div className="absolute right-2 bottom-1 text-xs text-gray-500">
        {typeof value === 'string' ? value.length : 0}/{maxLength}
      </div>
    </div>
  );
}

export { Textarea };
