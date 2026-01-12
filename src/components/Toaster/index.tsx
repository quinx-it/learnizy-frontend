'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { type FC } from 'react';
import { Toaster as Sonner, toast, type ToasterProps } from 'sonner';

import { useTranslation } from '@/hooks';

import {
  type NotificationVariantType,
  type ColorMapEntryType,
  type CustomToastPropsType,
} from './typings';

import {
  CloseButton,
  ContentWrapper,
  Description,
  IconWrapper,
  StyledToaster,
  Title,
  ToastContainer,
} from './styles';

const colorMap: Record<NotificationVariantType, ColorMapEntryType> = {
  info: {
    bg: 'var(--soft)',
    text: 'var(--black)',
    icon: <Image src="/images/notification-icon-info.svg" alt="Info" width={18} height={18} />,
  },
  success: {
    bg: 'var(--success)',
    text: 'var(--black)',
    icon: (
      <Image src="/images/notification-icon-success.svg" alt="Success" width={18} height={18} />
    ),
  },
  warning: {
    bg: 'var(--warning)',
    text: 'var(--black)',
    icon: (
      <Image src="/images/notification-icon-warning.svg" alt="Warning" width={18} height={18} />
    ),
  },
  error: {
    bg: 'var(--error)',
    text: 'var(--black)',
    icon: <Image src="/images/notification-icon-error.svg" alt="Error" width={18} height={18} />,
  },
};

const CustomToast: FC<CustomToastPropsType> = (props) => {
  const { variant, title, description, onClose } = props;
  const { t } = useTranslation();

  const { bg, text, icon } = colorMap[variant];

  return (
    <ToastContainer bg={bg} text={text}>
      <IconWrapper>{icon}</IconWrapper>
      <ContentWrapper>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </ContentWrapper>
      <CloseButton
        type="button"
        onClick={onClose}
        aria-label={t('COMMON_LABELS.CLOSE')}
        text={text}
      >
        <Image
          src="/images/cross-icon.svg"
          alt="Close icon"
          width={16}
          height={16}
          style={{ color: 'inherit' }}
        />
      </CloseButton>
    </ToastContainer>
  );
};

const Toaster: FC<ToasterProps> = (props) => {
  const { theme = 'system' } = useTheme();

  return (
    <StyledToaster>
      <Sonner
        theme={theme as ToasterProps['theme']}
        toastOptions={{
          duration: 5000,
        }}
        {...props}
      />
    </StyledToaster>
  );
};

const showToast = (variant: NotificationVariantType, title: string, description: string) => {
  toast.custom((id) => (
    <CustomToast
      variant={variant}
      title={title}
      description={description}
      onClose={() => toast.dismiss(id)}
    />
  ));
};

export { Toaster, showToast, toast };
