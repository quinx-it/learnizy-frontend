'use client';

import { Box } from '@mui/material';
import { forwardRef } from 'react';

import Label from '@/components/Label';
import { Text } from '@/components/Typography';

import { IInputProps } from './typings';

import { ErrorText, LabelWrapper, StyledInput } from './styles';

const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ innerClassName, className, type = 'text', error, label, autoComplete, ...props }, ref) => {
    return (
      <Box className={className}>
        {label && (
          <LabelWrapper>
            <Label>
              <Text variant="s" className="text-medium">
                {label}
              </Text>
            </Label>
          </LabelWrapper>
        )}
        <StyledInput
          ref={ref}
          type={type}
          autoComplete={autoComplete ?? ''}
          data-slot="input"
          $hasError={!!error}
          aria-invalid={!!error}
          className={innerClassName}
          {...props}
        />
        {error && (
          <ErrorText>
            <Text variant="s" className="text-error">
              {error}
            </Text>
          </ErrorText>
        )}
      </Box>
    );
  },
);

Input.displayName = 'Input';

export default Input;
