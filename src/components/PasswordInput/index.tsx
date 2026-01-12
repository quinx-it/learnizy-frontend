'use client';

import Image from 'next/image';
import { forwardRef, useState } from 'react';

import Label from '@/components/Label';
import { useTranslation } from '@/hooks';

import { type IPasswordInputProps } from './typings';

import {
  InputWrapper,
  PasswordInputWrapper,
  ScreenReaderOnly,
  EyeIconWrapper,
  StyledInput,
  ToggleButton,
} from './styles';
import { ErrorText, ErrorTextContent, LabelWrapper, MediumText } from '@/components/Input/styles';

const PasswordInput = forwardRef<HTMLInputElement, IPasswordInputProps>(
  ({ className, innerClassName, disabled, autoComplete, error, label, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const { t } = useTranslation();

    return (
      <PasswordInputWrapper className={className}>
        {label && (
          <LabelWrapper>
            <Label>
              <MediumText variant="s">{label}</MediumText>
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
            aria-label={
              showPassword ? t('COMMON_LABELS.HIDE_PASSWORD') : t('COMMON_LABELS.SHOW_PASSWORD')
            }
          >
            <EyeIconWrapper aria-hidden="true">
              <Image
                src={
                  showPassword && !disabled
                    ? '/images/eye-icon-open.svg'
                    : '/images/eye-icon-closed.svg'
                }
                alt={
                  showPassword ? t('COMMON_LABELS.HIDE_PASSWORD') : t('COMMON_LABELS.SHOW_PASSWORD')
                }
                width={22}
                height={showPassword && !disabled ? 16 : 18}
              />
            </EyeIconWrapper>
            <ScreenReaderOnly>
              {showPassword ? t('COMMON_LABELS.HIDE_PASSWORD') : t('COMMON_LABELS.SHOW_PASSWORD')}
            </ScreenReaderOnly>
          </ToggleButton>
        </InputWrapper>
        {error && (
          <ErrorText>
            <ErrorTextContent variant="s">{error}</ErrorTextContent>
          </ErrorText>
        )}
      </PasswordInputWrapper>
    );
  },
);
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
