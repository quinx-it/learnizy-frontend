'use client';

import * as React from 'react';

import { Button } from '@ui/button';
import { Input, type InputProps } from '@ui/input';
import { cn } from '@/shared/lib/utils';
import './styles.css';
import { EyeIcon } from '@ui/icons';
import { forwardRef, useState } from 'react';
interface PasswordInputProps extends InputProps {
  innerClassName?: string;
}
const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, innerClassName, disabled, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className={cn('relative', className)}>
        <Input
          type={showPassword ? 'text' : 'password'}
          className=''
          innerClassName={cn(innerClassName,"hide-password-toggle pr-10")}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          variant="white"
          size="small"
          className="absolute bottom-0.5 right-0 cursor-pointer border-none bg-transparent px-3 py-2 hover:bg-transparent"
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
