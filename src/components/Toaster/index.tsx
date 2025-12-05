'use client';

import { useTheme } from 'next-themes';
import { FC } from 'react';
import { Toaster as Sonner, toast, ToasterProps } from 'sonner';

import { NotificationIcon, CrossIcon } from '@/components/Icons';

import { NotificationVariantType, ColorMapEntryType, CustomToastPropsType } from './typings';

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
    icon: <NotificationIcon status="info" color="black" />,
  },
  success: {
    bg: 'var(--success)',
    text: 'var(--black)',
    icon: <NotificationIcon status="success" />,
  },
  warning: {
    bg: 'var(--warning)',
    text: 'var(--black)',
    icon: <NotificationIcon status="warning" />,
  },
  error: {
    bg: 'var(--error)',
    text: 'var(--black)',
    icon: <NotificationIcon status="error" />,
  },
};

const CustomToast: FC<CustomToastPropsType> = (props) => {
  const { variant, title, description, onClose } = props;

  const { bg, text, icon } = colorMap[variant];

  return (
    <ToastContainer bg={bg} text={text}>
      <IconWrapper>{icon}</IconWrapper>
      <ContentWrapper>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </ContentWrapper>
      <CloseButton type="button" onClick={onClose} aria-label="Закрыть" text={text}>
        <CrossIcon color="black" />
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
