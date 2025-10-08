import * as React from 'react';
import { cn } from '@/shared/lib/utils';
import { Text } from '@/shared/ui/typography';
import { Label } from '../label';
import { ComponentProps } from 'react';

export interface InputPropsType extends ComponentProps<'input'> {
  error?: string;
  label?: string;
  innerClassName?: string;
  autoComplete?: 'current-password' | 'new-password' | 'username' | 'email';
}

const Input = React.forwardRef<HTMLInputElement, InputPropsType>(
  ({ innerClassName, className, type = 'text', error, label, autoComplete, ...props }, ref) => {
    return (
      <div className={className}>
        {label && (
          <Label className="mb-1.5">
            <Text variant="s" className="text-medium">
              {label}
            </Text>
          </Label>
        )}
        <input
          ref={ref}
          type={type}
          autoComplete={autoComplete ?? ''}
          data-slot="input"
          className={cn(
            'bg-light flex h-9 w-full min-w-0 rounded-[50px] border px-[20px] py-0.5 text-[16px] font-medium text-black transition-[color] outline-none placeholder:text-black/50 md:text-sm',
            'disabled:text-gray disabled:placeholder:text-gray disabled:pointer-events-none disabled:cursor-not-allowed',
            'aria-invalid:text-error aria-invalid:border-error',
            innerClassName,
            error && 'border-error text-error',
          )}
          aria-invalid={!!error}
          {...props}
        />
        {error && (
          <Text variant="s" className="text-error ml-[20px]">
            {error}
          </Text>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
