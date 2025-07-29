'use client';

import * as React from 'react';

import { Button } from '@ui/button';
import { Input, type InputProps } from '@ui/input';
import { cn } from '@/shared/lib/utils';
import './styles.css';
import { EyeIcon } from '@ui/icons';

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const disabled = props.disabled;

    return (
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          className={cn('hide-password-toggle pr-10', className)}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          variant="white"
          size="small"
          className="absolute top-0 right-0 h-full cursor-pointer border-none bg-transparent px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword((prev) => !prev)}
          disabled={disabled}
        >
          <EyeIcon open={showPassword && !disabled} className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
        </Button>
      </div>
    );
  },
);
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
