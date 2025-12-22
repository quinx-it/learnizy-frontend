'use client';

import { Box } from '@mui/material';
import { forwardRef } from 'react';

import Label from '@/components/Label';

import { type IInputProps } from './typings';

import { ErrorText, ErrorTextContent, LabelWrapper, MediumText, StyledInput } from './styles';

const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ innerClassName, className, type = 'text', error, label, autoComplete, ...props }, ref) => {
    return (
      <Box className={className}>
        {label && (
          <LabelWrapper>
            <Label>
              <MediumText variant="s">{label}</MediumText>
            </Label>
          </LabelWrapper>
        )}
        <StyledInput
          ref={ref}
          type={type}
          autoComplete={autoComplete ?? ''}
          data-slot="input"
          hasError={!!error}
          aria-invalid={!!error}
          className={innerClassName}
          {...props}
        />
        {error && (
          <ErrorText>
            <ErrorTextContent variant="s">{error}</ErrorTextContent>
          </ErrorText>
        )}
      </Box>
    );
  },
);

Input.displayName = 'Input';

export default Input;
