'use client';

import Image from 'next/image';
import { forwardRef, useState } from 'react';

import Label from '@/components/Label';
import { Text } from '@/components/Typography';

import { IPasswordInputProps } from './typings';

import {
  InputWrapper,
  PasswordInputWrapper,
  ScreenReaderOnly,
  EyeIconWrapper,
  StyledInput,
  ToggleButton,
} from './styles';
import { ErrorText, LabelWrapper } from '@/components/Input/styles';

const PasswordInput = forwardRef<HTMLInputElement, IPasswordInputProps>(
  ({ className, innerClassName, disabled, autoComplete, error, label, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <PasswordInputWrapper className={className}>
        {label && (
          <LabelWrapper>
            <Label>
              <Text variant="s" className="text-medium">
                {label}
              </Text>
            </Label>
          </LabelWrapper>
        )}
        <InputWrapper>
          <StyledInput
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            autoComplete={autoComplete ?? ''}
            data-slot="input"
            hasError={!!error}
            aria-invalid={!!error}
            className={innerClassName}
            disabled={disabled}
            {...props}
          />
          <ToggleButton
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            disabled={disabled}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <EyeIconWrapper aria-hidden="true">
              <Image
                src={
                  showPassword && !disabled
                    ? '/images/eye-icon-open.svg'
                    : '/images/eye-icon-closed.svg'
                }
                alt={showPassword ? 'Hide password' : 'Show password'}
                width={22}
                height={showPassword && !disabled ? 16 : 18}
              />
            </EyeIconWrapper>
            <ScreenReaderOnly>{showPassword ? 'Hide password' : 'Show password'}</ScreenReaderOnly>
          </ToggleButton>
        </InputWrapper>
        {error && (
          <ErrorText>
            <Text variant="s" className="text-error">
              {error}
            </Text>
          </ErrorText>
        )}
      </PasswordInputWrapper>
    );
  },
);
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
