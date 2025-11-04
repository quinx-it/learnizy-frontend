'use client';

import React, { FC } from 'react';
import { useTheme } from 'next-themes';
import { Toaster as Sonner, toast, ToasterProps } from 'sonner';
import { NotificationIcon, CrossIcon } from '@/ui/icons';
import { NotificationVariantType, ColorMapEntryType, CustomToastPropsType } from './typings';
import './toaster.css';

const iconSize = 24;

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
    <div
      className="flex max-w-[400px] min-w-[320px] items-start gap-3 rounded-2xl p-4"
      style={{ backgroundColor: bg, color: text }}
    >
      <div style={{ fontSize: iconSize }} className="mt-2">
        {icon}
      </div>
      <div className="flex-1">
        <div className="mb-1 text-[16px] leading-[22px] font-bold">{title}</div>
        <div className="text-[12px]">{description}</div>
      </div>
      <button
        onClick={onClose}
        aria-label="Закрыть"
        className="mt-2 cursor-pointer border-0 bg-transparent"
        style={{ color: text, fontSize: iconSize }}
      >
        <CrossIcon color="black" />
      </button>
    </div>
  );
};

const Toaster: FC<ToasterProps> = (props) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      toastOptions={{
        duration: 5000,
      }}
      className=""
      {...props}
    />
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
