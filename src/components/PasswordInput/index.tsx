'use client';

import { forwardRef, useState } from 'react';

import Label from '@/components/Label';
import { Text } from '@/components/Typography';

import { IPasswordInputProps } from './typings';

import {
  InputWrapper,
  PasswordInputWrapper,
  ScreenReaderOnly,
  StyledEyeIcon,
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
            <StyledEyeIcon open={showPassword && !disabled} aria-hidden="true" />
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
